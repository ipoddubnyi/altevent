<template>
    <el-input
        type="textarea"
        :size="size"
        :rows="rows"
        :placeholder="placeholder"
        :disabled="disabled"
        autocomplete="off"
        v-model="text"
        class="alt-textarea"
    >
        <template #prefix v-if="$slots.prefix">
            <slot name="prefix"/>
        </template>
    </el-input>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    name: "alt-text-area",
    components: {},
    props: {
        size: { type: String },
        rows: { type: Number, default: 3 },
        placeholder: { type: String },
        disabled: { type: Boolean },
        modelValue: { type: String },
    }
})
export default class AltTextArea extends Vue {
    private modelValue!: string;

    public get text(): string {
        return this.modelValue;
    }

    public set text(text: string) {
        this.$emit("update:modelValue", text);
    }
}
</script>

<style lang="scss">
.alt-textarea {
    .el-textarea__inner {
        background: var(--alt-control-default-background);
        border-color: var(--alt-control-default-border-color);
        color: var(--alt-control-default-text-color);
    }
}
</style>
