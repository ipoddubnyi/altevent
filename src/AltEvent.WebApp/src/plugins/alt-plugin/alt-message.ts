import { VNode } from "vue";
import { ElMessageBox } from "element-plus";

export class AltMessage {
    public async show(message: string, title?: string, options?: any): Promise<void> {
        await ElMessageBox.alert(message, title, {
            confirmButtonText: options?.okText,
            type: options?.type,
            customClass: `v-align-top my-6 ${options?.customClass}`,
            confirmButtonClass: `${this.getButtonClass(options?.type)} ${options?.confirmButtonClass}`,
        });
    }

    public async confirm(message: string | VNode, title?: string, options?: any): Promise<boolean> {
        try {
            await ElMessageBox.confirm(message, title,{
                confirmButtonText: options?.okText ?? "Подтвердить",
                cancelButtonText: options?.cancelText ?? "Отмена",
                type: options?.type,
                confirmButtonClass: `${this.getButtonClass(options?.type)} ${options?.confirmButtonClass}`,
                cancelButtonClass: options?.cancelButtonClass,
                customClass: `v-align-top my-6 ${options?.customClass}`,
            });
            return true;
        } catch {
            return false;
        }
    }

    public async prompt(message: string | VNode, title?: string, options?: any): Promise<string | null> {
        try {
            const res = await ElMessageBox.prompt(message, title,{
                confirmButtonText: options?.okText,
                cancelButtonText: options?.cancelText ?? "Отмена",
                type: options?.type,
                confirmButtonClass: `${this.getButtonClass(options?.type)} ${options?.confirmButtonClass}`,
                cancelButtonClass: options?.cancelButtonClass,
                inputPattern: options?.inputPattern,
                inputErrorMessage: options?.inputErrorMessage,
                customClass: `v-align-top my-6 ${options?.customClass}`,
            });
            return res.value ?? "";
        } catch {
            return null;
        }
    }

    private getButtonClass(type?: string): string {
        switch (type) {
            case "success":
                return "el-button--success";
            // case "info":
            //     return "el-button--info";
            case "warning":
                return "el-button--warning";
            case "error":
                return "el-button--danger";
        }

        return "";
    }
}
