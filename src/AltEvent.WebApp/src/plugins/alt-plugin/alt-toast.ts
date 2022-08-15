import { VNode } from "vue";
import { ElNotification } from "element-plus";

export class AltToast {
    private readonly position = "bottom-left";

    private show(message: string | VNode, title?: string, options?: any): void {
        ElNotification({
            title: title,
            message: message,
            type: options?.type,
            duration: options?.duration,
            position: this.position,
        });
    }

    public info(message: string | VNode, title?: string, options?: any): void {
        this.show(message, title, { type: "info", ...options });
    }

    public success(message: string | VNode, title?: string, options?: any): void {
        this.show(message, title, { type: "success", ...options });
    }

    public error(message: string | VNode, title: string = "Ошибка", options?: any): void {
        this.show(message, title, { type: "error", ...options });
    }

    public warning(message: string | VNode, title?: string, options?: any): void {
        this.show(message, title, { type: "warning", ...options });
    }
}
