import { Company, User } from "@/core/models";
import { AuthResultDataDto } from "@/core/dtos";
import { TokenService } from "@/core/usecases/token.service";
import { AppException } from "@/core/exceptions";
import { AuthTokenUseCase } from "@/core/usecases/auth-token.usecase";

export class AltStorePlugin {
    public readonly token = new TokenService();

    // current user

    private _user: User | null = null;
    
    public async getUser(): Promise<User> {
        if (this._user === null) {
            await this.loadAuthData();
            
            if (!this._user) {
                throw new AppException("User has not been loaded.");
            }
        }

        return this._user;
    }

    // current company

    private _company: Company | null = null;

    public async getCompany(): Promise<Company> {
        if (!this._company) {
            await this.loadAuthData();

            if (!this._company) {
                throw new AppException("Company has not been loaded.");
            }
        }

        return this._company;
    }

    //

    public async loadAuthData(): Promise<void> {
        const data = await new AuthTokenUseCase().loadData();
        this.setAuthInfo(data);
    }

    public setAuthInfo(data: AuthResultDataDto): void {
        this._user = data.user;
        this._company = data.company ?? null;
    }

    public clean(): void {
        this._user = null;
        this._company = null;
    }

    // Layout data

    private _layout: IPageLayoutData | null = null;
    public get layout(): IPageLayoutData | null {
        return this._layout;
    }
    public set layout(layout: IPageLayoutData | null) {
        this._layout = layout;
        this.notifyLayoutDataChangedHandlers();
    }

    private _layoutDataChangedHandlers: any[] = [];
    public addLayoutDataChangedHandler(handler: any): void {
        this._layoutDataChangedHandlers.push(handler);
    }
    private notifyLayoutDataChangedHandlers(): void {
        for (const handler of this._layoutDataChangedHandlers) {
            handler(this._layout);
        }
    }
}

interface IPageLayoutData {
    user: {
        name: string;
        email: string;
    };
    title: string;
    menu: {
        name: string;
        link: string;
        icon: string;
    }[];
}
