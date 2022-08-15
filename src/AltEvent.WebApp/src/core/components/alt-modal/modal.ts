import { EventHandler, EventHandlerAsync, ValidateEventArgs, VisibilityChangedEventArgs } from "../alt-common";
import { Control } from "../alt-controls";

export abstract class Modal<T = undefined, TResult = void> {
    protected _visible: boolean = false;
    protected _hideEvent: Function | null = null;
    protected _errorEvent: Function | null = null;

    public readonly id: string;
    public title: string;

    public constructor(id: string, title = "") {
        this.id = id;
        this.title = title;
    }

    public get controls(): Control[] {
        return [];
    }

    public get controlsFooter(): Control[] {
        return [];
    }

    //

    public get visible(): boolean {
        return this._visible;
    }

    public set visible(visible: boolean) {
        this._visible = visible;
    }

    public show(data?: T): Promise<TResult> {
        this._visible = true;
        this.notifyVisibleChangedHandlers();

        return new Promise((resolve: any, reject: any) => {
            this._hideEvent = (result: TResult) => resolve(result);
            this._errorEvent = (e: Error) => reject(e);
        });
    }

    public hide<TResult>(result?: TResult): void {
        if (this._hideEvent) {
            this._hideEvent(result);
            this._hideEvent = null;
        }

        this._visible = false;
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
