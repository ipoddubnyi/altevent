import { computed, ComputedRef, defineAsyncComponent } from "vue";
import { Control } from "./control";
import { EventHandler } from "../alt-common";

export class TimeBoxValueChangedEventArgs {
    value!: Date;
}

export class TimeBox extends Control {
    public label = "";
    public placeholder = "";
    public clearable = true;
    public format = "HH:mm";
    public help = "";

    public get component(): ComputedRef | null {
        return computed(() => defineAsyncComponent(() => import("./time-box.component.vue")));
    }

    public _value = new Date();
    public get value(): Date {
        return this._value;
    }
    public set value(value: Date) {
        this._value = value;
        this.notifyValueChangedHandler();
    }

    private _valueChangedHandlers = new Set<EventHandler<TimeBoxValueChangedEventArgs>>();
    public addValueChangedHandler(handler: EventHandler<TimeBoxValueChangedEventArgs>): void {
        this._valueChangedHandlers.add(handler);
    }
    public removeValueChangedHandler(handler: EventHandler<TimeBoxValueChangedEventArgs>): void {
        this._valueChangedHandlers.delete(handler);
    }
    private notifyValueChangedHandler(): void {
        const args: TimeBoxValueChangedEventArgs = {
            value: this.value,
        };
        for (const handler of this._valueChangedHandlers) {
            handler(this, args);
        }
    }
}
