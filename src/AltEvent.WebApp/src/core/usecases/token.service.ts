export class TokenService {
    // user + company

    private readonly StorageCompanyTokenKeyName = "accessToken";

    public hasCompanyToken(): boolean {
        return !!localStorage.getItem(this.StorageCompanyTokenKeyName);
    }

    public getCompanyToken(): string | null {
        return localStorage.getItem(this.StorageCompanyTokenKeyName);
    }
    
    public setCompanyToken(token: string): void {
        localStorage.setItem(this.StorageCompanyTokenKeyName, token);
    }
    
    public removeCompanyToken(): void {
        localStorage.removeItem(this.StorageCompanyTokenKeyName);
    }

    // user only (choosing company)

    // private readonly StorageUserOnlyTokenKeyName = "userToken";

    // public hasUserOnlyToken(): boolean {
    //     return !!localStorage.getItem(this.StorageUserOnlyTokenKeyName);
    // }

    // public getUserOnlyToken(): string | null {
    //     return localStorage.getItem(this.StorageUserOnlyTokenKeyName);
    // }
    
    // public setUserOnlyToken(token: string): void {
    //     localStorage.setItem(this.StorageUserOnlyTokenKeyName, token);
    // }
    
    // public removeUserOnlyToken(): void {
    //     localStorage.removeItem(this.StorageUserOnlyTokenKeyName);
    // }

    //

    public hasAnyToken(): boolean {
        return this.hasCompanyToken(); // || this.hasUserOnlyToken();
    }
    
    public cleanData(): void {
        this.removeCompanyToken();
        //this.removeUserOnlyToken();
    }
}
