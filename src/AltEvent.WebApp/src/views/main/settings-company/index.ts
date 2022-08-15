import { Options, Vue } from "vue-class-component";
import { Company, User } from "@/core/models";
import { Menu } from "../calendar/menu";

@Options({
    components: {},
})
export default class CompanyePage extends Vue {
    private user: User | null = null;
    private company: Company | null = null;
    private events: Event[] = [];
    private loaded = false;
    
    public async mounted(): Promise<void> {
        await this.init();
    }

    private async init(): Promise<void> {
        try {
            this.loaded = false;
            this.user = await this.$store.getUser();
            this.company = await this.$store.getCompany();
            this.updateLayoutData();
            //await this.selectData();
            this.loaded = true;
        } catch (e: any) {
            this.$alt.toast.error(e.message);
        }
    }

    private updateLayoutData(): void {
        this.$store.layout = {
            user: {
                name: this.user?.name ?? "",
                email: this.user?.email ?? "",
            },
            title: this.company?.name ?? "",
            menu: Menu,
        };
    }
}
