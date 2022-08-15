import { computed, ComputedRef, defineAsyncComponent } from "vue";
import { EventHandler } from "../alt-common";
import { Control } from "./control";

export type OptionFieldReceiver<T> = (item: T) => any;

export class SelectChangedEventArgs<T = any> {
    item!: T | null;
    index!: number;
}

export class Select<T = any> extends Control {
    public items: T[] = [];
    public label = "";
    public placeholder = "";
    public help = "";

    public getOptionText: OptionFieldReceiver<T> = (item: T) => item;

    public get component(): ComputedRef | null {
        return computed(() => defineAsyncComponent(() => import("./select.component.vue")));
    }

    private _selectedItem: T | null = null;
    public get selectedItem(): T | null {
        return this._selectedItem;
    }
    public set selectedItem(item: T | null) {
        if (item === this._selectedItem) {
            return;
        }

        this._selectedItem = item;
        this._selectedIndex = this.items.findIndex(i => i === item);
        this.notifyChangedHandler();
    }

    private _selectedIndex = -1;
    public get selectedIndex(): number {
        return this._selectedIndex;
    }
    public set selectedIndex(index: number) {
        if (index === this._selectedIndex) {
            return;
        }

        this._selectedIndex = index;
        this._selectedItem = this.items[index];
        this.notifyChangedHandler();
    }

    private _changedHandlers = new Set<EventHandler<SelectChangedEventArgs<T>>>();
    public addChangedHandler(handler: EventHandler<SelectChangedEventArgs<T>>): void {
        this._changedHandlers.add(handler);
    }
    public removeChangedHandler(handler: EventHandler<SelectChangedEventArgs<T>>): void {
        this._changedHandlers.delete(handler);
    }
    private notifyChangedHandler(): void {
        const args: SelectChangedEventArgs<T> = {
            item: this._selectedItem,
            index: this._selectedIndex,
        };
        for (const handler of this._changedHandlers) {
            handler(this, args);
        }
    }
}
