import { Reservation } from "../models";

export class ReservationCreateResultDto {
    public reservation!: Reservation;
    public accessCode!: number;
}
