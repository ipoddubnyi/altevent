import { computed, ComputedRef, defineAsyncComponent } from "vue";
import { Control } from "./control";
import { EventHandler } from "../alt-common";

export class TimeRangeBoxValueChangedEventArgs {
    start!: Date;
    end!: Date;
}

export class TimeRangeBox extends Control {
    public label = "";
    public startPlaceholder = ""
    public endPlaceholder = ""
    public separator = "-"
    public clearable = true;
    public format = "HH:mm";
    public help = "";

    public get component(): ComputedRef | null {
        return computed(() => defineAsyncComponent(() => import("./time-range-box.component.vue")));
    }

    public _value: [Date, Date] = [new Date(), new Date()];
    public get value(): [Date, Date] {
        return this._value;
    }
    public set value(value: [Date, Date]) {
        this._value = value;
        this.notifyValueChangedHandler();
    }
    
    public get start(): Date {
        return this._value[0];
    }
    public set start(start: Date) {
        this._value[0] = start;
        this.notifyValueChangedHandler();
    }
    
    public get end(): Date {
        return this._value[1];
    }
    public set end(end: Date) {
        this._value[1] = end;
        this.notifyValueChangedHandler();
    }

    private _valueChangedHandlers = new Set<EventHandler<TimeRangeBoxValueChangedEventArgs>>();
    public addValueChangedHandler(handler: EventHandler<TimeRangeBoxValueChangedEventArgs>): void {
        this._valueChangedHandlers.add(handler);
    }
    public removeValueChangedHandler(handler: EventHandler<TimeRangeBoxValueChangedEventArgs>): void {
        this._valueChangedHandlers.delete(handler);
    }
    private notifyValueChangedHandler(): void {
        const args: TimeRangeBoxValueChangedEventArgs = {
            start: this.start,
            end: this.end,
        };
        for (const handler of this._valueChangedHandlers) {
            handler(this, args);
        }
    }
}
