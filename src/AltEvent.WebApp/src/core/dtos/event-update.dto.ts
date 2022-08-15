export class EventUpdateDto {
    public name?: string;
    public description?: string;
    public allDay?: boolean;
    public startDate?: string;
    public endDate?: string;
    public startTime?: string;
    public endTime?: string;
    public location?: string;
    //public locationId: number;
    public capacity?: number;

    //public company!: Company;
    //public creator!: User;
    //public location!: Location;

    //public hosts?: User[];
}
