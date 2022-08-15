import { ElLoading } from "element-plus";

export class AltLoader {
    private loading: any = null;
    private readonly background = "rgba(0, 0, 0, 0.7)";

    public show(): void { // public show(text?: string): void {
        this.loading = ElLoading.service({
            lock: true,
            //text: text,
            background: this.background,
        });
    }

    public hide(): void {
        this.loading?.close();
    }
}
