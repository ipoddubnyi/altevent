import moment from "moment";
import { Modal } from "@/core/components/alt-modal";
import {
    Button,
    CheckBox,
    CheckBoxValueChangedEventArgs,
    Control,
    DateRangeBox,
    Form,
    NumberBox,
    TextArea,
    TextBox,
    TimeRangeBox
} from "@/core/components/alt-controls";
import { Event, User } from "@/core/models";
import { EventCreateDto, EventUpdateDto } from "@/core/dtos";

export interface IEventModalContext {
    user: User;
    event?: Event;
}

export class EventModal extends Modal<IEventModalContext, Event> {
    private form!: Form;

    private tbName!: TextBox;
    private taDescription!: TextArea;
    private chbAllDay!: CheckBox;
    private drbDate!: DateRangeBox;
    private trbTime!: TimeRangeBox;
    private tbLocation!: TextBox;
    private nbCapacity!: NumberBox;

    private btnDelete!: Button;
    private btnCancel!: Button;
    private btnSave!: Button;

    private context: IEventModalContext | null = null;

    public onCreate: ((dto: EventCreateDto) => Promise<Event | null>) | null = null;
    public onUpdate: ((orig: Event, dto: EventUpdateDto) => Promise<Event | null>) | null = null;
    public onDelete: ((orig: Event) => Promise<boolean>) | null = null;

    public constructor() {
        super("event.modal", "");
        this.initalizeComponents();
    }

    public show(context: IEventModalContext): Promise<Event> {
        this.context = context;
        this.initalizeComponents();

        if (context.event) {
            this.title = "Изменение события";
            this.btnSave.text = "Изменить";
            this.populateControls(context.event);
        } else {
            this.title = "Новое событие";
            this.btnSave.text = "Создать";
        }

        return super.show(context);
    }

    private initalizeComponents(): void {
        this.tbName = new TextBox();
        this.tbName.id = "event.name";
        this.tbName.label = "Название";
        this.tbName.validation = "required";

        this.taDescription = new TextArea();
        this.taDescription.id = "event.description";
        this.taDescription.label = "Описание";

        this.chbAllDay = new CheckBox();
        this.chbAllDay.id = "event.allday";
        this.chbAllDay.text = "Весь день";
        this.chbAllDay.addValueChangedHandler(this.changeAllDay.bind(this));

        const dtStart = new Date();
        dtStart.setHours(dtStart.getHours() + 1);
        dtStart.setMinutes(0);

        const dtEnd = new Date();
        dtEnd.setHours(dtEnd.getHours() + 2);
        dtEnd.setMinutes(0);

        this.drbDate = new DateRangeBox();
        this.drbDate.id = "event.date";
        //this.drbDate.startPlaceholder = "Дата начала";
        //this.drbDate.endPlaceholder = "Дата завершения";
        this.drbDate.clearable = false;
        this.drbDate.value = [dtStart, dtEnd];

        this.trbTime = new TimeRangeBox();
        this.trbTime.id = "event.time";
        //this.trbTime.startPlaceholder = "Время начала";
        //this.trbTime.endPlaceholder = "Время завершения";
        this.trbTime.clearable = false;
        this.trbTime.value = [dtStart, dtEnd];

        this.tbLocation = new TextBox();
        this.tbLocation.id = "event.location";
        this.tbLocation.label = "Место";

        this.nbCapacity = new NumberBox();
        this.nbCapacity.id = "event.location";
        this.nbCapacity.label = "Количество мест";
        this.nbCapacity.min = 1;

        this.form = new Form();
        this.form.id = "event.form";
        this.form.addControls([
            this.tbName,
            this.taDescription,
            this.chbAllDay,
            this.drbDate,
            this.trbTime,
            this.tbLocation,
            this.nbCapacity,
        ]);

        //
        
        this.btnDelete = new Button();
        this.btnDelete.id = "event.delete";
        this.btnDelete.type = "danger";
        this.btnDelete.class = "mr-1";
        this.btnDelete.text = "Удалить";
        this.btnDelete.addClickHandler(this.clickDelete.bind(this));
        this.btnDelete.visible = false;
        
        this.btnCancel = new Button();
        this.btnCancel.id = "event.cancel";
        this.btnCancel.text = "Отмена";
        this.btnCancel.addClickHandler(this.clickCancel.bind(this));

        this.btnSave = new Button();
        this.btnSave.id = "event.save";
        this.btnSave.type = "primary";
        this.btnSave.text = "Создать";
        this.btnSave.addClickHandler(this.clickSave.bind(this));
    }

    private populateControls(event: Event): void {
        let dtStart = new Date(event.startDate);
        let dtEnd = new Date(event.endDate);
        if (!event.allDay && event.startTime && event.endTime) {
            dtStart = new Date(`${event.startDate}T${event.startTime}`);
            dtEnd = new Date(`${event.endDate}T${event.endTime}`);
        }
        
        this.tbName.text = event.name;
        this.taDescription.text = event.description ?? "";
        this.chbAllDay.value = event.allDay;
        this.drbDate.value = [dtStart, dtEnd];
        this.trbTime.value = [dtStart, dtEnd];
        this.tbLocation.text = event.location;
        this.nbCapacity.value = event.capacity;
        this.btnDelete.visible = true;
    }

    public get controls(): Control[] {
        return [
            this.form,
        ];
    }

    public get controlsFooter(): Control[] {
        return [
            this.btnDelete,
            this.btnCancel,
            this.btnSave,
        ];
    }

    private changeAllDay(sender: any, e: CheckBoxValueChangedEventArgs): void {
        this.trbTime.visible = !e.value;
    }

    private async clickDelete(sender: any, e: any): Promise<void> {
        if (!this.context?.event || !this.onDelete)
            return;

        const deleted = await this.onDelete(this.context.event);
        if (deleted) {
            this.hide();
        }
    }

    private clickCancel(sender: any, e: any): void {
        this.hide();
    }

    private async clickSave(sender: any, e: any): Promise<void> {
        const valid = await this.form.validate();
        if (!valid) {
            return;
        }

        const event = this.context?.event
            ? await this.updateEvent(this.context.event)
            : await this.createEvent();

        if (event) {
            this.hide(event);
        }
    }
    
    private async createEvent(): Promise<Event | null> {
        if (!this.context || !this.onCreate)
            return null;

        const dto: EventCreateDto = {
            creatorId: this.context.user.id,
            name: this.tbName.text,
            description: this.taDescription.text.length > 0 ? this.taDescription.text : undefined,
            allDay: this.chbAllDay.value,
            startDate: moment(this.drbDate.start).format("YYYY-MM-DD"),
            endDate: moment(this.drbDate.end).format("YYYY-MM-DD"),
            startTime: !this.chbAllDay.value ? moment(this.trbTime.start).format("HH:mm") : undefined,
            endTime: !this.chbAllDay.value ? moment(this.trbTime.end).format("HH:mm") : undefined,
            location: this.tbLocation.text,
            capacity: this.nbCapacity.value,
            //hosts: [],
        };

        return await this.onCreate(dto);
    }
    
    private async updateEvent(orig: Event): Promise<Event | null> {
        if (!this.context || !this.onUpdate)
            return null;

        const dto: EventUpdateDto = {
            name: this.tbName.text,
            description: this.taDescription.text.length > 0 ? this.taDescription.text : undefined,
            allDay: this.chbAllDay.value,
            // startDate: this.drbDate.start,
            // endDate: this.drbDate.end,
            // startTime: !this.chbAllDay.value ? this.trbTime.start : undefined,
            // endTime: !this.chbAllDay.value ? this.trbTime.end : undefined,
            startDate: moment(this.drbDate.start).format("YYYY-MM-DD"),
            endDate: moment(this.drbDate.end).format("YYYY-MM-DD"),
            startTime: !this.chbAllDay.value ? moment(this.trbTime.start).format("HH:mm") : undefined,
            endTime: !this.chbAllDay.value ? moment(this.trbTime.end).format("HH:mm") : undefined,
            location: this.tbLocation.text,
            capacity: this.nbCapacity.value,
            //hosts: [],
        };

        return await this.onUpdate(orig, dto);
    }
}
