import { Options, Vue } from "vue-class-component";
import AltButton from "@/core/components/alt-controls/alt-button.vue";
import AltInput from "@/core/components/alt-controls/alt-input.vue";
import { AuthUseCase } from "@/core/usecases/auth.usecase";
import { AuthRegistrationDto, AuthResultDto } from "@/core/dtos";

@Options({
    components: {
        AltButton,
        AltInput,
    },
    props: {}
})
export default class Registration extends Vue {
    private formData = {
        name: "",
        login: "",
        password: "",
        accept: false,
    };

    private formRules = {
        name: [
            { required: true, message: "Поле обязательно для заполнения", trigger: "blur" },
            { min: 3, message: "Длина поля должна быть не менее 3", trigger: "blur" },
            { max: 32, message: "Длина поля должна быть не более 32", trigger: "blur" },
        ],
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
        accept: [
            { type: "enum", enum: [true], required: true, message: "Поле обязательно для заполнения", trigger: "change" },
        ],
    };

    private async register(): Promise<void> {
        try {
            const valid = await (this.$refs.formRegistration as any).validate(() => {});
            if (!valid) {
                return;
            }

            this.$alt.loader.show();

            const dto: AuthRegistrationDto = {
                name: this.formData.name,
                email: this.formData.login,
                password: this.formData.password,
            };

            const result = await new AuthUseCase().register(dto);
            this.applyData(result);

            await this.$router.push({ name: "calendar", query: { welcome: "" } });
        } catch (e: any) {
            this.$alt.toast.error(e.message);
        } finally {
            this.$alt.loader.hide();
        }
    }

    private async applyData(result: AuthResultDto): Promise<void> {
        this.$store.token.cleanData();
        this.$store.token.setCompanyToken(result.accessToken);
        this.$store.clean();
        this.$store.setAuthInfo(result.data);
        //this.$store.settings.set(result.data.settings);
        //this.$secure.grant(result.data.permissions);
    }
}
