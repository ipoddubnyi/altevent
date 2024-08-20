import { Options, Vue } from "vue-class-component";
import { ref } from "vue";
import moment from "moment";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import ruLocale from "@fullcalendar/core/locales/ru";
import AltButton from "@/core/components/alt-controls/alt-button.vue";
import ModalComponent from "@/core/components/alt-modal/modal.component.vue";
import { Event, Reservation } from "@/core/models";
import { ReservationCreateDto } from "@/core/dtos";
import { EventUseCase } from "@/core/usecases/event.usecase";
import { ReservationUseCase } from "@/core/usecases/reservation.usecase";
import { ReservationModal } from "../reservation/reservation.modal";

@Options({
    components: { AltButton, FullCalendar, ModalComponent },
})
export default class EventsPage extends Vue {
    private EventUseCase = new EventUseCase();
    private ReservationUseCase = new ReservationUseCase();

    private companyId: number | null = null;
    private events: Event[] = [];
    private loaded = false;

    private calendarStart: Date | null = null;
    private calendarEnd: Date | null = null;
    private fullCalendar: any = ref(null);
    private calendarOptions = {
        plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin ],
        initialView: "dayGridMonth",
        headerToolbar: {
            start: "prev,next",
            center: "title",
            end: "today dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        },
        //dateClick: this.clickCalendarDate,
        eventClick: info => {
            const id = parseInt(info.event.id);
            const event = this.events.find(e => e.id === id);
            if (!event) {
                return;
            }

            this.showModalReserve(event);
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
        },
        height: 650,
    };

    private reservationModal = new ReservationModal();

    public created(): void {
        this.reservationModal.onCreate = this.create.bind(this);
    }
    
    public async mounted(): Promise<void> {
        await this.init();
    }

    private async init(): Promise<void> {
        try {
            this.loaded = false;
            await this.selectData();
            this.loaded = true;
        } catch (e: any) {
            this.$alt.toast.error(e.message);
        }
    }

    private async selectData(): Promise<boolean> {
        try {
            this.$alt.loader.show();
            this.selectParams();
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

    private selectParams(): void {
        if (this.$route.params.companyId) {
            this.companyId = parseInt(this.$route.params.companyId as string);
        }
    }

    private async selectEvents(): Promise<void> {
        if (!this.companyId) {
            // TODO
            return;
        }

        const query = {
            start: this.calendarStart ? moment(this.calendarStart).format("YYYY-MM-DD") : undefined,
            end: this.calendarEnd ? moment(this.calendarEnd).format("YYYY-MM-DD") : undefined,
        };
        this.events = await this.EventUseCase.select(this.companyId, query);
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
            title: `${event.name} (${event.reservations.length}/${event.capacity})`,
            allDay: event.allDay,
            start: start,
            end: end,
        };
    }

    //

    private async showModalReserve(event: Event): Promise<void> {
        const context = {
            event: event,
            readonly: event.reservations.length === event.capacity,
        };
        await this.reservationModal.show(context);
    }

    //

    private async create(event: Event, dto: ReservationCreateDto): Promise<Reservation | null> {
        try {
            this.$alt.loader.show();
            const result = await this.ReservationUseCase.create(dto);
            await this.selectData();
            this.$alt.toast.success("Резервация успешно создана.");
            await this.$router.push({
                name: "reservation",
                params: { reservationId: result.reservation.id },
                query: { code: result.accessCode },
            }).catch(() => {});
            return result.reservation;
        } catch (e: any) {
            this.$alt.toast.error(e.message);
            return null;
        } finally {
            this.$alt.loader.hide();
        }
    }
}
