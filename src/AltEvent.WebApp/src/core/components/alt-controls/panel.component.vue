<template>
    <div v-if="handler.visible"
        :class="handler.class"
        :style="handler.style"
    >
        <control-component
            v-for="(control, index) of handler.controls"
            :key="index"
            :handler="control"
            :class="{ 'mb-1': control.visible }"
        />
    </div>

    <div v-else />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AltInput from "./alt-input.vue";
import { Panel } from "./panel";
import ControlComponent from "../alt-controls/control.component.vue";

@Options({
    name: "panel-component",
    components: {
        AltInput,
        ControlComponent,
    },
    props: {
        handler: { type: Object, required: true }
    }
})
export default class PanelComponent extends Vue {
    private handler!: Panel;
}
</script>
