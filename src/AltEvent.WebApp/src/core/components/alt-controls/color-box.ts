import { computed, ComputedRef, defineAsyncComponent } from "vue";
import { Control } from "./control";
import { EventHandler } from "../alt-common";

export class ColorBoxValueChangedEventArgs {
    value!: string;
}

export class ColorBox extends Control {
    public label = "";
    public placeholder = "";
    public help = "";

    public get component(): ComputedRef | null {
        return computed(() => defineAsyncComponent(() => import("./color-box.component.vue")));
    }

    private _value: string = "";
    public get value(): string {
        return this._value;
    }
    public set value(value: string) {
        if (value === this._value) {
            return;
        }

        this._value = value;
        this.notifyValueChangedHandler();
    }

    private _valueChangedHandlers = new Set<EventHandler<ColorBoxValueChangedEventArgs>>();
    public addValueChangedHandler(handler: EventHandler<ColorBoxValueChangedEventArgs>): void {
        this._valueChangedHandlers.add(handler);
    }
    public removeValueChangedHandler(handler: EventHandler<ColorBoxValueChangedEventArgs>): void {
        this._valueChangedHandlers.delete(handler);
    }
    private notifyValueChangedHandler(): void {
        const args: ColorBoxValueChangedEventArgs = { value: this._value };
        for (const handler of this._valueChangedHandlers) {
            handler(this, args);
        }
    }
}
