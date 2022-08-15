import { computed, ComputedRef, defineAsyncComponent } from "vue";
import { Control } from "./control";
import { EventHandler } from "../alt-common";

export class CheckBoxValueChangedEventArgs {
    value!: boolean;
}

export class CheckBox extends Control {
    public name = "";
    public text = "";

    public get component(): ComputedRef | null {
        return computed(() => defineAsyncComponent(() => import("./check-box.component.vue")));
    }

    private _value: boolean = false;
    public get value(): boolean {
        return this._value;
    }
    public set value(value: boolean) {
        if (value === this._value) {
            return;
        }

        this._value = value;
        this.notifyValueChangedHandlers();
    }

    private _valueChangedHandlers = new Set<EventHandler<CheckBoxValueChangedEventArgs>>();
    public addValueChangedHandler(handler: EventHandler<CheckBoxValueChangedEventArgs>): void {
        this._valueChangedHandlers.add(handler);
    }
    public removeValueChangedHandler(handler: EventHandler<CheckBoxValueChangedEventArgs>): void {
        this._valueChangedHandlers.delete(handler);
    }
    private notifyValueChangedHandlers(): void {
        const args: CheckBoxValueChangedEventArgs = { value: this._value };
        for (const handler of this._valueChangedHandlers) {
            handler(this, args);
        }
    }
}
