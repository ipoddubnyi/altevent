import { AuthResultDataDto } from "./auth-result-data.dto";

export class AuthResultDto {
    public accessToken!: string;
    //public refreshToken!: string;
    public data!: AuthResultDataDto;
}
