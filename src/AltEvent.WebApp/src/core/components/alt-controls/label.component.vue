<template>
    <div v-if="handler.visible"
        :class="handler.class"
        :style="handler.style"
    >
        <label
            class="text-nowrap pb-0.5"
            :for="handler.id"
        >
            {{ handler.text }}
        </label>
    </div>

    <div v-else />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Label } from "./label";

@Options({
    name: "label-component",
    components: {},
    props: {
        handler: { type: Object, required: true }
    }
})
export default class LabelComponent extends Vue {
    private handler!: Label;
}
</script>
