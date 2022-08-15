import { AuthLoginDto, AuthRegistrationDto, AuthResultDto } from "@/core/dtos";
import { DataLoadException } from "@/core/exceptions";
import { ApiAuth } from "./axios";

export class AuthUseCase {

    public async register(dto: AuthRegistrationDto): Promise<AuthResultDto> {
        try {
            const response = await ApiAuth.post<AuthResultDto>("/auth/registration", dto);
            return response.data;
        } catch (e: any) {
            throw new DataLoadException(e);
        }
    }

    public async login(dto: AuthLoginDto): Promise<AuthResultDto> {
        try {
            const response = await ApiAuth.post<AuthResultDto>("/auth/login", dto);
            return response.data;
        } catch (e: any) {
            throw new DataLoadException(e);
        }
    }
}
