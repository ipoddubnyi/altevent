import { Company } from "./company";
import { Reservation } from "./reservation";
import { User } from "./user";

export class Event {
    public id!: number;
    public companyId!: number;
    public creatorId!: number;
    public name!: string;
    public description?: string;
    public allDay!: boolean;
    public startDate!: Date;
    public endDate!: Date;
    public startTime?: Date;
    public endTime?: Date;
    public location!: string;
    //public locationId: number;
    public capacity!: number;
    public createdAt!: Date;
    public updatedAt!: Date;

    public company!: Company;
    public creator!: User;
    //public location!: Location;

    public hosts!: User[];
    public reservations!: Reservation[];
}
