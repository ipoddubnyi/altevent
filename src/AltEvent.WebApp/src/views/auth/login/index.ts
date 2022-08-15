import { Options, Vue } from "vue-class-component";
import AltButton from "@/core/components/alt-controls/alt-button.vue";
import AltInput from "@/core/components/alt-controls/alt-input.vue";
import { AuthUseCase } from "@/core/usecases/auth.usecase";
import { AuthLoginDto, AuthResultDto } from "@/core/dtos";

@Options({
    components: {
        AltButton,
        AltInput,
    },
    props: {}
})
export default class Login extends Vue {
    private formData = {
        login: "",
        password: "",
    };

    private formRules = {
        login: [
            { required: true, message: "Поле обязательно для заполнения", trigger: "blur" },
            { type: "email", message: "Поле должно быть в формате электронной почты", trigger: "blur" },
            { max: 32, message: "Длина поля должна быть не более 32", trigger: "blur" },
        ],
        password: [
            { required: true, message: "Поле обязательно для заполнения", trigger: "blur" },
            { min: 6, message: "Длина поля должна быть не менее 6", trigger: "blur" },
            { max: 32, message: "Длина поля должна быть не более 32", trigger: "blur" },
        ],
    };

    private async login(): Promise<void> {
        try {
            const valid = await (this.$refs.formLogin as any).validate(() => {});
            if (!valid) {
                return;
            }

            this.$alt.loader.show();

            const dto: AuthLoginDto = {
                email: this.formData.login,
                password: this.formData.password,
            };

            const result = await new AuthUseCase().login(dto);
            
            if (result.data.company) {
                // company token
                this.applyCompanyData(result);
                await this.$router.push({ name: "calendar" });
            } else {
                // user-only token
                // this.applyUserOnlyData(result);
                // await this.$router.push({ name: "switch-company" });
            }
        } catch (e: any) {
            this.$alt.toast.error(e.message);
        } finally {
            this.$alt.loader.hide();
        }
    }

    private applyCompanyData(result: AuthResultDto): void {
        this.$store.token.cleanData();
        this.$store.token.setCompanyToken(result.accessToken);
        this.$store.clean();
        this.$store.setAuthInfo(result.data);
        //this.$store.settings.set(result.data.settings);
        //this.$secure.grant(result.data.permissions);
    }

    // private applyUserOnlyData(result: AuthResultDto): void {
    //     this.$store.token.cleanData();
    //     this.$store.token.setUserOnlyToken(result.accessToken);
    //     this.$store.clean();
    //     this.$store.setAuthInfo(result.data);
    //     //this.$store.settings.set(result.data.settings);
    //     //this.$secure.grant(result.data.permissions);
    // }
}
