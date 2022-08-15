import { computed, ComputedRef, defineAsyncComponent } from "vue";
import { Control, IValidated } from "./control";
import { EventHandler } from "../alt-common";

export class TextChangedEventArgs {
    text!: string;
}

export class TextBox extends Control implements IValidated {
    public label = "";
    public placeholder = "";
    public help = "";
    public type = "text";
    public validation: string | null = null;

    public get component(): ComputedRef | null {
        return computed(() => defineAsyncComponent(() => import("./text-box.component.vue")));
    }

    private _text: string = "";
    public get text(): string {
        return this._text;
    }
    public set text(text: string) {
        if (text === this._text) {
            return;
        }

        this._text = text;
        this.notifyTextChangedHandler();
    }

    private _textChangedHandlers = new Set<EventHandler<TextChangedEventArgs>>();
    public addTextChangedHandler(handler: EventHandler<TextChangedEventArgs>): void {
        this._textChangedHandlers.add(handler);
    }
    public removeTextChangedHandler(handler: EventHandler<TextChangedEventArgs>): void {
        this._textChangedHandlers.delete(handler);
    }
    private notifyTextChangedHandler(): void {
        const args: TextChangedEventArgs = { text: this._text };
        for (const handler of this._textChangedHandlers) {
            handler(this, args);
        }
    }
}
