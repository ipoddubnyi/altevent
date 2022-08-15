import { Company } from "../models/company";
import { User } from "../models/user";

export class AuthResultDataDto {
    public user!: User;
    public company!: Company;
}
