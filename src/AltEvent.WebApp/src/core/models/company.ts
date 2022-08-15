import { User } from "./user";

export class Company {
    public id!: number;
    public name!: string;
    public description?: string;
    public createdAt!: Date;
    public updatedAt!: Date;
    public users!: User[];
}
