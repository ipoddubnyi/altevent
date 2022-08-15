import { computed, ComputedRef, defineAsyncComponent } from "vue";
import { Control } from "./control";

export class Label extends Control {
    public get component(): ComputedRef | null {
        return computed(() => defineAsyncComponent(() => import("./label.component.vue")));
    }

    public text: string = "";
}
