import { computed, ComputedRef, defineAsyncComponent } from "vue";
import { Control } from "./control";

export class Panel extends Control {
    private _controls: Control[] = [];

    public get controls(): Control[] {
        return this._controls;
    }

    public get component(): ComputedRef | null {
        return computed(() => defineAsyncComponent(() => import("./panel.component.vue")));
    }

    public clearControls(): void {
        this._controls = [];
    }

    public addControl(control: Control): void {
        this._controls.push(control);
    }

    public addControls(controls: Control[]): void {
        this._controls.push(...controls);
    }
}
