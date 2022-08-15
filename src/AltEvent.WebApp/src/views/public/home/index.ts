import { Options, Vue } from "vue-class-component";
import AltButton from "@/core/components/alt-controls/alt-button.vue";
import AltInput from "@/core/components/alt-controls/alt-input.vue";
import { CompanyUseCase } from "@/core/usecases/company.usecase";
import { Company } from "@/core/models";

@Options({
    components: { AltButton, AltInput },
})
export default class HomePage extends Vue {
    private CompanyUseCase = new CompanyUseCase();

    public searchString = "";
    public companies: Company[] = [];
    
    public async search(): Promise<void> {
        try {
            this.companies = [];

            if (this.searchString.length === 0) {
                return;
            }

            this.$alt.loader.show();
            const query = { search: this.searchString }
            this.companies = await this.CompanyUseCase.select(query);
            
        } catch (e: any) {
            this.$alt.toast.error(e.message);
        } finally {
            this.$alt.loader.hide();
        }
    }
}
