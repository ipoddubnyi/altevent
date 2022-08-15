import { ComputedRef } from "vue";
import { EventHandler, VisibilityChangedEventArgs } from "../alt-common";

export interface IValidated {
    validation: string | null;
}

export abstract class Control {
    private _visible = true;

    public id: string | null = null;
    public disabled: boolean = false;
    public class: string = "";
    public style: string = "";

    // TODO: make abstract
    public get component(): ComputedRef | null {
        return null;
    }

    public get visible(): boolean {
        return this._visible;
    }
    public set visible(value: boolean) {
        this._visible = value;
        this.notifyVisibleChangedHandlers();
    }

    private _visibleChangedHandlers = new Set<EventHandler<VisibilityChangedEventArgs>>();
    public addVisibleChangedHandler(handler: EventHandler<VisibilityChangedEventArgs>): void {
        this._visibleChangedHandlers.add(handler);
    }
    public removeVisibleChangedHandler(handler: EventHandler<VisibilityChangedEventArgs>): void {
        this._visibleChangedHandlers.delete(handler);
    }
    private notifyVisibleChangedHandlers(): void {
        const args: VisibilityChangedEventArgs = { visible: this._visible };
        for (const handler of this._visibleChangedHandlers) {
            handler(this, args);
        }
    }
}
