import { computed, ComputedRef, defineAsyncComponent } from "vue";
import { Control } from "./control";
import { EventHandler } from "../alt-common";

export class DateBoxValueChangedEventArgs {
    value!: Date;
}

export class DateBox extends Control {
    public label = "";
    public placeholder = "";
    public clearable = true;
    public format = "DD.MM.YYYY";
    public help = "";

    public get component(): ComputedRef | null {
        return computed(() => defineAsyncComponent(() => import("./date-box.component.vue")));
    }

    public _value = new Date();
    public get value(): Date {
        return this._value;
    }
    public set value(value: Date) {
        this._value = value;
        this.notifyValueChangedHandler();
    }

    private _valueChangedHandlers = new Set<EventHandler<DateBoxValueChangedEventArgs>>();
    public addValueChangedHandler(handler: EventHandler<DateBoxValueChangedEventArgs>): void {
        this._valueChangedHandlers.add(handler);
    }
    public removeValueChangedHandler(handler: EventHandler<DateBoxValueChangedEventArgs>): void {
        this._valueChangedHandlers.delete(handler);
    }
    private notifyValueChangedHandler(): void {
        const args: DateBoxValueChangedEventArgs = {
            value: this.value,
        };
        for (const handler of this._valueChangedHandlers) {
            handler(this, args);
        }
    }
}
