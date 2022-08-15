import { Event, Reservation } from "../models";
import { ReservationCreateDto, ReservationCreateResultDto, ReservationUpdateDto } from "../dtos";
import { DataLoadException } from "@/core/exceptions";
import { Api } from "./axios";

export class ReservationUseCase {
    public async get(
        reservationId: number,
        reservationCode: number
    ): Promise<Reservation> {
        try {
            const response = await Api.get<Reservation>(`/reservations/${reservationId}?code=${reservationCode}`);
            return response.data;
        } catch (e: any) {
            throw new DataLoadException(e);
        }
    }

    public async getEvent(
        reservationId: number,
        reservationCode: number
    ): Promise<Event> {
        try {
            const response = await Api.get<Event>(`/reservations/${reservationId}/event?code=${reservationCode}`);
            return response.data;
        } catch (e: any) {
            throw new DataLoadException(e);
        }
    }

    public async create(
        dto: ReservationCreateDto
    ): Promise<ReservationCreateResultDto> {
        try {
            const response = await Api.post<ReservationCreateResultDto>("/reservations", dto);
            return response.data;
        } catch (e: any) {
            throw new DataLoadException(e);
        }
    }

    public async update(
        reservationId: number,
        reservationCode: number,
        dto: ReservationUpdateDto
    ): Promise<Reservation> {
        try {
            const response = await Api.put<Reservation>(`/reservations/${reservationId}?code=${reservationCode}`, dto);
            return response.data;
        } catch (e: any) {
            throw new DataLoadException(e);
        }
    }

    public async delete(
        reservationId: number,
        reservationCode: number
    ): Promise<void> {
        try {
            await Api.delete<void>(`/reservations/${reservationId}?code=${reservationCode}`);
        } catch (e: any) {
            throw new DataLoadException(e);
        }
    }
}
