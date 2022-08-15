<template>
    <alt-button v-if="handler.visible"
        :id="handler.id"
        :type="handler.type"
        :class="handler.class"
        :style="handler.style"
        :disabled="handler.disabled"
        @click="click"
    >{{ handler.text }}</alt-button>

    <div v-else />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AltButton from "./alt-button.vue";
import { Button } from "./button";

@Options({
    name: "button-component",
    components: {
        AltButton,
    },
    props: {
        handler: { type: Object, required: true },
    }
})
export default class ButtonComponent extends Vue {
    private handler!: Button;

    public click(): void {
        this.handler.click();
    }
}
</script>
