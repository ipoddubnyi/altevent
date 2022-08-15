import { Event } from "@/core/models";
import { EventCreateDto, EventUpdateDto } from "../dtos";
import { DataLoadException } from "@/core/exceptions";
import { Api } from "./axios";

export class EventUseCase {
    public async select(
        companyId: number,
        query?: any,
    ): Promise<Event[]> {
        try {
            const config = { params: query };
            const response = await Api.get<Event[]>(`/companies/${companyId}/events`, config);
            return response.data;
        } catch (e: any) {
            throw new DataLoadException(e);
        }
    }

    public async create(
        companyId: number,
        dto: EventCreateDto
    ): Promise<Event> {
        try {
            const response = await Api.post<Event>(`/companies/${companyId}/events`, dto);
            return response.data;
        } catch (e: any) {
            throw new DataLoadException(e);
        }
    }

    public async update(
        companyId: number,
        eventId: number,
        dto: EventUpdateDto
    ): Promise<Event> {
        try {
            const response = await Api.put<Event>(`/companies/${companyId}/events/${eventId}`, dto);
            return response.data;
        } catch (e: any) {
            throw new DataLoadException(e);
        }
    }

    public async delete(
        companyId: number,
        eventId: number
    ): Promise<void> {
        try {
            await Api.delete<void>(`/companies/${companyId}/events/${eventId}`);
        } catch (e: any) {
            throw new DataLoadException(e);
        }
    }
}
