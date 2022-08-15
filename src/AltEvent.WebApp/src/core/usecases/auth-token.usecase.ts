import { AuthResultDataDto } from "@/core/dtos";
import { DataLoadException } from "@/core/exceptions";
import { Api } from "./axios";

export class AuthTokenUseCase {

    public async loadData(): Promise<AuthResultDataDto> {
        try {
            const response = await Api.get<AuthResultDataDto>("/auth/load-data");
            return response.data;
        } catch (e: any) {
            throw new DataLoadException(e);
        }
    }
}
