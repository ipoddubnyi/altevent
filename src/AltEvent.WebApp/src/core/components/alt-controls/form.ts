import { computed, ComputedRef, defineAsyncComponent } from "vue";
import { EventHandlerAsync, ValidateEventArgs } from "../alt-common";
import { Control } from "../alt-controls";

export class Form extends Control {
    private _controls: Control[] = [];
    public get controls(): Control[] {
        return this._controls;
    }

    public addControl(control: Control): void {
        this._controls.push(control);
    }

    public addControls(controls: Control[]): void {
        this._controls.push(...controls);
    }

    public get component(): ComputedRef | null {
        return computed(() => defineAsyncComponent(() => import("./form.component.vue")));
    }

    //

    public async validate(): Promise<boolean> {
        return await this.notifyValidateHandlers();
    }

    private _validateHandlers = new Set<EventHandlerAsync<ValidateEventArgs>>();
    public addValidateHandler(handler: EventHandlerAsync<ValidateEventArgs>): void {
        this._validateHandlers.add(handler);
    }
    public removeValidateHandler(handler: EventHandlerAsync<ValidateEventArgs>): void {
        this._validateHandlers.delete(handler);
    }
    private async notifyValidateHandlers(): Promise<boolean> {
        const args: ValidateEventArgs = { valid: true };
        for (const handler of this._validateHandlers) {
            await handler(this, args);
            if (!args.valid) {
                return false;
            }
        }
        return true;
    }
}
