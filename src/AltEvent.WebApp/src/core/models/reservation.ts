export class Reservation {
    public id!: number;
    public eventId!: number;
    public name!: string;
    public comment?: string;
    public phone!: string;
    public email!: string;
    public createdAt!: Date;
    public updatedAt!: Date;

    public event!: Event;
}
