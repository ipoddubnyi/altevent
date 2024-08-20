import { Options, Vue } from "vue-class-component";
import { h, ref } from "vue";
import moment from "moment";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import ruLocale from "@fullcalendar/core/locales/ru";
import AltButton from "@/core/components/alt-controls/alt-button.vue";
import ModalComponent from "@/core/components/alt-modal/modal.component.vue";
import { Company, Event, User } from "@/core/models";
import { EventCreateDto, EventUpdateDto } from "@/core/dtos";
import { EventUseCase } from "@/core/usecases/event.usecase";
import { EventModal } from "./event.modal";
import { Menu } from "./menu";

@Options({
    components: { AltButton, FullCalendar, ModalComponent },
})
export default class CalendarPage extends Vue {
    private EventUseCase = new EventUseCase();

    private user: User | null = null;
    private company: Company | null = null;
    private events: Event[] = [];
    private loaded = false;

    private calendarStart: Date | null = null;
    private calendarEnd: Date | null = null;
    private fullCalendar: any = ref(null);
    private calendarOptions = {
        plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin ],
        initialView: "dayGridMonth",
        customButtons: {
            new: {
                text: "+ Событие",
                click: () => this.showModalCreate(),
            },
        },
        headerToolbar: {
            start: "new prev,next",
            center: "title",
            end: "today dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        },
        //dateClick: arg => console.log(arg.dateStr),
        eventClick: info => {
            const id = parseInt(info.event.id);
            const event = this.events.find(e => e.id === id);
            if (!event) {
                return;
            }

            this.showEventUpdate(event);
        },
        navLinks: true,
        navLinkDayClick: (date: Date) => {
            const api = this.fullCalendar.getApi();
            api.changeView("timeGridDay", date);
        },
        locale: ruLocale,
        firstDay: 1,
        dayHeaderClassNames: "text-last-center capitalize",
        events: [] as any[],
        datesSet: async info => {
            if (this.calendarStart === info.startStr && this.calendarEnd === info.endStr) {
                return;
            }

            this.calendarStart = info.startStr;
            this.calendarEnd = info.endStr;
            await this.selectEvents();
            this.calendarOptions.events = this.events.map(e => this.convertForCalendar(e));
            // const api = this.fullCalendar.getApi();
            // api.addEventSource(events.map(e => this.convertForCalendar(e)));
        },
        height: 650,
    };

    private eventModal = new EventModal();

    public created(): void {
        this.eventModal.onCreate = this.create.bind(this);
        this.eventModal.onUpdate = this.update.bind(this);
        this.eventModal.onDelete = this.confirmDelete.bind(this);
    }
    
    public async mounted(): Promise<void> {
        await this.init();
    }

    private async init(): Promise<void> {
        try {
            this.loaded = false;
            this.user = await this.$store.getUser();
            this.company = await this.$store.getCompany();
            this.updateLayoutData();
            await this.selectData();
            this.loaded = true;
        } catch (e: any) {
            this.$alt.toast.error(e.message);
        }
    }

    private updateLayoutData(): void {
        this.$store.layout = {
            user: {
                name: this.user?.name ?? "",
                email: this.user?.email ?? "",
            },
            title: this.company?.name ?? "",
            menu: Menu,
        };
    }

    private async selectData(): Promise<boolean> {
        try {
            this.$alt.loader.show();
            await this.selectEvents();
            this.calendarOptions.events = this.events.map(e => this.convertForCalendar(e));
            return true;
        } catch (e: any) {
            this.$alt.toast.error(e.message);
            return false;
        } finally {
            this.$alt.loader.hide();
        }
    }

    private async selectEvents(): Promise<void> {
        if (!this.company) {
            //console.log("null");
            return;
        }

        const query = {
            start: this.calendarStart ? moment(this.calendarStart).format("YYYY-MM-DD") : undefined,
            end: this.calendarEnd ? moment(this.calendarEnd).format("YYYY-MM-DD") : undefined,
        };
        const companyId = this.company?.id as number;
        this.events = await this.EventUseCase.select(companyId, query);
    }

    private convertForCalendar(event: Event): any {
        // end - дата конца события
        // поэтому, если весь день, увеличиваем конечную дату на сутки для правильного отображения
        // https://stackoverflow.com/questions/44368866/fullcalendar-include-end-date
        const dtEnd = new Date(event.endDate);
        if (event.allDay) {
            dtEnd.setDate(dtEnd.getDate() + 1);
        }

        const start = event.allDay ? event.startDate : `${event.startDate}T${event.startTime}`;
        const end = event.allDay ? dtEnd : `${dtEnd}T${event.endTime}`;

        return {
            id: event.id,
            title: event.name,
            allDay: event.allDay,
            start: start,
            end: end,
        };
    }

    private async openEvent(event: Event): Promise<void> {
        try {
            await this.$router.push({ name: "event", params: { "eventId": event.id } });
        } catch (e: any) {
            this.$alt.toast.error(e.message);
        }
    }

    //

    private async showModalCreate(): Promise<void> {
        const context = {
            user: this.user as User,
        };
        await this.eventModal.show(context);
    }

    private async showEventUpdate(event: Event): Promise<void> {
        const context = {
            user: this.user as User,
            event: event,
        };
        await this.eventModal.show(context);
    }

    private async confirmDelete(event: Event): Promise<boolean> {
        const confirm = await this.$alt.message.confirm(
            h("p", null, [
                "Вы уверены, что хотите удалить событие:",
                h("br"),
                h("b", null, event.name),
                "?",
            ]),
            "Удаление события",
            { okText: "Удалить", type: "warning" }
        );

        if (confirm) {
            await this.delete(event);
        }

        return confirm;
    }

    //

    private async create(dto: EventCreateDto): Promise<Event | null> {
        try {
            this.$alt.loader.show();
            const companyId = this.company?.id as number;
            const event = await this.EventUseCase.create(companyId, dto);
            await this.selectData();
            this.$alt.toast.success("Событие успешно создано.");
            return event;
        } catch (e: any) {
            this.$alt.toast.error(e.message);
            return null;
        } finally {
            this.$alt.loader.hide();
        }
    }

    private async update(orig: Event, dto: EventUpdateDto): Promise<Event | null> {
        try {
            this.$alt.loader.show();
            const companyId = this.company?.id as number;
            const event = await this.EventUseCase.update(companyId, orig.id, dto);
            await this.selectData();
            this.$alt.toast.success("Событие успешно изменено.");
            return event;
        } catch (e: any) {
            this.$alt.toast.error(e.message);
            return null;
        } finally {
            this.$alt.loader.hide();
        }
    }

    private async delete(event: Event): Promise<void> {
        try {
            this.$alt.loader.show();
            const companyId = this.company?.id as number;
            await this.EventUseCase.delete(companyId, event.id);
            await this.selectData();
            this.$alt.toast.success("Событие успешно удалено.");
        } catch (e: any) {
            this.$alt.toast.error(e.message);
        } finally {
            this.$alt.loader.hide();
        }
    }
}
