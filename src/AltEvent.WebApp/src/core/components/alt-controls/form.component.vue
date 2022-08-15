<template>
    <el-form v-if="handler.visible"
        :class="handler.class"
        :style="handler.style"
        :ref="validatorId"
        :model="formData"
        :rules="validationRules"
        label-position="top"
        @submit.prevent
    >
        <el-form-item v-for="control of handler.controls" :key="control.id" :prop="control.id">
            <control-component :handler="control" class="w-100" />
        </el-form-item>
    </el-form>

    <div v-else />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { VNode } from "vue";
import { IValidated } from "./control";
import { Form } from "./form";
import ControlComponent from "./control.component.vue";

@Options({
    name: "form-component",
    components: {
        ControlComponent,
    },
    props: {
        handler: { required: true }
    }
})
export default class FormComponent extends Vue {
    private handler!: Form;
    private model: any = {};
    private rules: any = {};

    private get validatorId(): string {
        return `${this.handler.id}-validator`;
    }

    private get formData(): any {
        const data: any = {};
        for (const control of this.handler.controls) {
            if (control.id) {
                if ((control as any).text !== undefined) {
                    data[control.id] = (control as any).text;
                }
            }
        }
        return data;
    }

    private get validationRules(): any {
        const rules: any = {};
        for (const control of this.handler.controls) {
            if (control.id && this.isIValidated(control)) {
                rules[control.id] = this.getValidationRules(control);
            }
        }
        return rules;
    }

    private isIValidated(object: any): object is IValidated {
        return "validation" in object;
    }

    private getValidationRules(control: IValidated): any[] {
        if (!control.validation || control.validation.length === 0)
            return [];

        const rules: any[] = [];
        const rulesStr = control.validation.split("|");
        for (const ruleStr of rulesStr) {
            const values = ruleStr.split(":");

            switch (values[0]) {
                case "required":
                    rules.push({ required: true, message: "Поле обязательно для заполнения", trigger: "blur" });
                    break;
                case "min":
                    {
                        const minValue = parseInt(values[1]);
                        rules.push({ min: minValue, message: `Длина поля должна быть не менее ${minValue}`, trigger: "blur" });
                    }
                    break;
                case "max":
                    {
                        const maxValue = parseInt(values[1]);
                        rules.push({ max: maxValue, message: `Длина поля должна быть не более ${maxValue}`, trigger: "blur" });
                    }
                    break;
            }
        }
        return rules;
    }

    public mounted(): void {
        this.$watch("handler", () => this.init(), { immediate: true });
    }

    private init(): void {
        this.handler.addValidateHandler(this.validate.bind(this));
        (this.$refs[this.validatorId] as any)?.resetFields();
    }

    private async validate(sender: any, e: any): Promise<void> {
        e.valid = await (this.$refs[this.validatorId] as any).validate(() => {});
    }
}
</script>
