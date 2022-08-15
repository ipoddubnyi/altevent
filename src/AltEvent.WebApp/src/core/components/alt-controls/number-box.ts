import { computed, ComputedRef, defineAsyncComponent } from "vue";
import { Control } from "./control";
import { EventHandler } from "../alt-common";

export class NumberBoxValueChangedEventArgs {
    value!: number;
}

export class NumberBox extends Control {
    public label = "";
    public help = "";
    public min = -Infinity;
    public max = Infinity;
    public step = 1;

    public get component(): ComputedRef | null {
        return computed(() => defineAsyncComponent(() => import("./number-box.component.vue")));
    }

    public _value = 1;
    public get value(): number {
        return this._value;
    }
    public set value(value: number) {
        this._value = value;
        this.notifyValueChangedHandler();
    }

    private _valueChangedHandlers = new Set<EventHandler<NumberBoxValueChangedEventArgs>>();
    public addValueChangedHandler(handler: EventHandler<NumberBoxValueChangedEventArgs>): void {
        this._valueChangedHandlers.add(handler);
    }
    public removeValueChangedHandler(handler: EventHandler<NumberBoxValueChangedEventArgs>): void {
        this._valueChangedHandlers.delete(handler);
    }
    private notifyValueChangedHandler(): void {
        const args: NumberBoxValueChangedEventArgs = {
            value: this.value,
        };
        for (const handler of this._valueChangedHandlers) {
            handler(this, args);
        }
    }
}
