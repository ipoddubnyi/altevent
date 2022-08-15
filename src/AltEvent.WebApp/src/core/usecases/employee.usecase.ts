import { IEmployee, IEmployeeCreateDto, IEmployeeUseCase } from "@lib";
import { DataLoadException } from "@/core/exceptions";
import { Api } from "./axios";

export class EmployeeUseCase implements IEmployeeUseCase {
    public async select(
        companyId: string
    ): Promise<IEmployee[]> {
        try {
            const response = await Api.get<IEmployee[]>(`/companies/${companyId}/employees`);
            return response.data;
        } catch (e: any) {
            throw new DataLoadException(e);
        }
    }

    public async get(
        companyId: string,
        userId: string
    ): Promise<IEmployee> {
        try {
            const response = await Api.get<IEmployee>(`/companies/${companyId}/employees/${userId}`);
            return response.data;
        } catch (e: any) {
            throw new DataLoadException(e);
        }
    }

    public async create(
        companyId: string,
        userId: string,
        dto: IEmployeeCreateDto
    ): Promise<IEmployee> {
        try {
            const response = await Api.post<IEmployee>(`/companies/${companyId}/employees/${userId}`, dto);
            return response.data;
        } catch (e: any) {
            throw new DataLoadException(e);
        }
    }

    public async delete(
        companyId: string,
        userId: string
    ): Promise<void> {
        try {
            await Api.delete<void>(`/companies/${companyId}/employees/${userId}`);
        } catch (e: any) {
            throw new DataLoadException(e);
        }
    }
}
