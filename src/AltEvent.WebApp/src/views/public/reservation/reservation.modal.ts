import moment from "moment";
import { Modal } from "@/core/components/alt-modal";
import {
    Button,
    Control,
    Form,
    Label,
    Panel,
    TextArea,
    TextBox,
} from "@/core/components/alt-controls";
import { Event } from "@/core/models";
import { Reservation } from "@/core/models/reservation";
import { ReservationCreateDto, ReservationUpdateDto } from "@/core/dtos";

export interface IReservationModalContext {
    event: Event;
    reservation?: Reservation;
    readonly?: boolean;
}

export class ReservationModal extends Modal<IReservationModalContext, Event> {
    private lblFull!: Label;
    
    private pnlEvent!: Panel;
    private lblEventName!: Label;
    private lblEventDescription!: Label;
    private lblEventDates!: Label;
    private lblEventCapacity!: Label;

    private form!: Form;
    private tbName!: TextBox;
    private taComment!: TextArea;
    private tbPhone!: TextBox;
    private tbEmail!: TextBox;

    private btnCancel!: Button;
    private btnSave!: Button;

    private context: IReservationModalContext | null = null;

    public onCreate: ((event: Event, dto: ReservationCreateDto) => Promise<Reservation | null>) | null = null;
    public onUpdate: ((orig: Reservation, dto: ReservationUpdateDto) => Promise<Reservation | null>) | null = null;

    public constructor() {
        super("reservation.modal", "Резервация");
        this.initalizeComponents();
    }

    public show(context: IReservationModalContext): Promise<Event> {
        this.context = context;
        this.initalizeComponents();
        this.populateControls(context.event);
        return super.show(context);
    }

    private initalizeComponents(): void {
        this.lblFull = new Label();
        this.lblFull.text = "Нет мест";
        this.lblFull.class = "text-danger bold uppercase";
        this.lblFull.visible = false;

        this.lblEventName = new Label();
        this.lblEventName.style = "margin-bottom: 0";

        this.lblEventDescription = new Label();
        this.lblEventDescription.style = "margin-bottom: 0";

        this.lblEventDates = new Label();
        this.lblEventDates.style = "margin-bottom: 0";

        this.lblEventCapacity = new Label();
        this.lblEventCapacity.style = "margin-bottom: 0";

        this.pnlEvent = new Panel();
        this.pnlEvent.id = "reservation.event";
        this.pnlEvent.class = "text-sm ml-1";
        this.pnlEvent.addControls([
            this.lblEventName,
            this.lblEventDescription,
            this.lblEventDates,
            this.lblEventCapacity,
        ]);

        this.tbName = new TextBox();
        this.tbName.id = "reservation.name";
        this.tbName.label = "Имя";
        this.tbName.validation = "required";

        this.taComment = new TextArea();
        this.taComment.id = "reservation.comment";
        this.taComment.label = "Комментарий";

        this.tbPhone = new TextBox();
        this.tbPhone.id = "reservation.phone";
        this.tbPhone.label = "Телефон";
        this.tbPhone.validation = "required";

        this.tbEmail = new TextBox();
        this.tbEmail.id = "reservation.email";
        this.tbEmail.label = "Почта";
        this.tbEmail.validation = "required";

        this.form = new Form();
        this.form.id = "reservation.form";
        this.form.addControls([
            this.tbName,
            this.taComment,
            this.tbPhone,
            this.tbEmail,
        ]);

        //
        
        this.btnCancel = new Button();
        this.btnCancel.id = "reservation.cancel";
        this.btnCancel.text = "Отмена";
        this.btnCancel.addClickHandler(this.clickCancel.bind(this));

        this.btnSave = new Button();
        this.btnSave.id = "reservation.save";
        this.btnSave.type = "primary";
        this.btnSave.text = "Резервировать";
        this.btnSave.addClickHandler(this.clickSave.bind(this));
    }

    private populateControls(event: Event): void {
        this.lblEventName.text = event.name;
        this.lblEventDescription.text = event.description ?? "";
        this.lblEventCapacity.text = `Свободных мест: ${event.capacity - event.reservations.length}`;
        if (event.allDay) {
            this.lblEventDates.text = `
                ${moment(event.startDate).format("L")} - ${moment(event.endDate).format("L")}`;
        } else {
            this.lblEventDates.text = `
                ${moment(event.startDate).format("L")} ${event.startTime} -
                ${moment(event.endDate).format("L")} ${event.endTime}`;
        }

        if (this.context?.readonly) {
            this.lblFull.visible = true;
            this.form.visible = false;
            this.btnSave.disabled = true;
        }

        if (this.context?.reservation) {
            this.title = "Изменение резервации";
            this.btnSave.text = "Изменить";
            
            this.tbName.text = this.context.reservation.name;
            this.taComment.text = this.context.reservation.comment ?? "";
            this.tbPhone.text = this.context.reservation.phone;
            this.tbEmail.text = this.context.reservation.email;
        }
    }

    public get controls(): Control[] {
        return [
            this.lblFull,
            this.pnlEvent,
            this.form,
        ];
    }

    public get controlsFooter(): Control[] {
        return [
            this.btnCancel,
            this.btnSave,
        ];
    }

    private clickCancel(sender: any, e: any): void {
        this.hide();
    }

    private async clickSave(sender: any, e: any): Promise<void> {
        const valid = await this.form.validate();
        if (!valid) {
            return;
        }

        const event = this.context?.reservation
            ? await this.updateReservation(this.context.reservation)
            : await this.createReservation();

        if (event) {
            this.hide(event);
        }
    }
    
    private async createReservation(): Promise<Reservation | null> {
        if (!this.context || !this.onCreate)
            return null;

        const dto: ReservationCreateDto = {
            eventId: this.context.event.id,
            name: this.tbName.text,
            comment: this.taComment.text.length > 0 ? this.taComment.text : undefined,
            phone: this.tbPhone.text,
            email: this.tbEmail.text,
        };

        return await this.onCreate(this.context.event, dto);
    }
    
    private async updateReservation(orig: Reservation): Promise<Reservation | null> {
        if (!this.context || !this.onUpdate)
            return null;

        const dto: ReservationUpdateDto = {
            name: this.tbName.text,
            comment: this.taComment.text.length > 0 ? this.taComment.text : undefined,
            phone: this.tbPhone.text,
            email: this.tbEmail.text,
        };

        return await this.onUpdate(orig, dto);
    }
}
