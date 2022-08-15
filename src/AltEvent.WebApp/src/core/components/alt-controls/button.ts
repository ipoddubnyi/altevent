import { computed, ComputedRef, defineAsyncComponent } from "vue";
import { Control } from "./control";
import { EventHandler } from "../alt-common";

export class Button extends Control {
    public text = "";
    public type = "";

    public get component(): ComputedRef | null {
        return computed(() => defineAsyncComponent(() => import("./button.component.vue")));
    }

    private _clickHandlers = new Set<EventHandler>();
    public addClickHandler(handler: EventHandler): void {
        this._clickHandlers.add(handler);
    }
    public removeClickHandler(handler: EventHandler): void {
        this._clickHandlers.delete(handler);
    }
    private notifyClickHandlers(): void {
        const args = {};
        for (const handler of this._clickHandlers) {
            handler(this, args);
        }
    }

    public click(): void {
        this.notifyClickHandlers();
    }
}
