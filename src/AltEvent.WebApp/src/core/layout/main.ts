import { Options, Vue } from "vue-class-component";
import { AuthUseCase } from "@/core/usecases/auth.usecase";
import { AuthTokenUseCase } from "../usecases/auth-token.usecase";
import Sidebar from "./sidebar/index.vue";

@Options({
    components: { Sidebar },
    props: {}
})
export default class MainLayout extends Vue {
    public sideBarTitle = process.env.VUE_APP_NAME;
    public topTitle = "";
    public menuItems = [];
    public menuVisible = false;
    public profile = { name: "", position: "" };
    //public routerTransition = "zoom-fade";

    public created(): void {
        this.$store.addLayoutDataChangedHandler(layout => {
            this.topTitle = layout?.title ?? "";
            this.menuItems = layout?.menu ?? [];
            this.profile = {
                name: layout?.user.name ?? "",
                position: layout?.user.email ?? "",
            };
        });
    }

    public toggleSidebar(): void {
        this.menuVisible = !this.menuVisible;
    }

    public async logoutCompany(): Promise<void> {
        const yes = await this.$alt.message.confirm(
            "Вы уверены, что хотите сменить компанию?",
            "Смена компании",
            { okText: "Да", cancelText: "Нет", type: "info" },
        );
        if (yes) {
            await this.doLogoutCompany();
        }
    }
    
    private async doLogoutCompany(): Promise<void> {
        // try {
        //     const result = await new AuthTokenUseCase().logoutCompany();
        //     this.applyUserOnlyData(result);
        //     await this.$router.push({ name: "switch-company" }).catch(() => {});
        // } catch (e: any) {
        //     this.$alt.toast.error(e.message);
        // }
    }

    // private async applyUserOnlyData(result: IAuthLoginResultDto): Promise<void> {
    //     this.$store.token.cleanData();
    //     this.$store.token.setUserOnlyToken(result.accessToken);
    //     this.$store.clean();
    //     this.$store.setAuthInfo(result.data);
    //     //this.$store.settings.set(result.data.settings);
    //     //this.$secure.grant(result.data.permissions);
    // }

    public async logout(): Promise<void> {
        const yes = await this.$alt.message.confirm(
            "Вы уверены, что хотите выйти?",
            "Выход",
            { okText: "Да", cancelText: "Нет", type: "info" },
        );
        if (yes) {
            await this.doLogout();
        }
    }

    private async doLogout(): Promise<void> {
        try {
            //await new AuthUseCase().logout();

            // this.$secure.reset();
            this.$store.clean();
            this.$store.token.cleanData();

            await this.$router.push({ name: "login" }).catch(() => {});
        } catch (e: any) {
            this.$alt.toast.error(e.message);
        }
    }
}
