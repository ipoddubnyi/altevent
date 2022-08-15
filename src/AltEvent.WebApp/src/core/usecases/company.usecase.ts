import { Company } from "@/core/models";
import { DataLoadException } from "@/core/exceptions";
import { Api } from "./axios";

export class CompanyUseCase {
    public async select(
        query?: any,
    ): Promise<Company[]> {
        try {
            const config = { params: query };
            const response = await Api.get<Company[]>(`/companies`, config);
            return response.data;
        } catch (e: any) {
            throw new DataLoadException(e);
        }
    }
}
