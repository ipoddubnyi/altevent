<template>
    <el-input
        :type="type"
        :size="size"
        :placeholder="placeholder"
        :disabled="disabled"
        autocomplete="off"
        v-model="text"
        class="alt-input"
    >
        <template #prefix v-if="$slots.prefix">
            <slot name="prefix"/>
        </template>
    </el-input>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    name: "alt-input",
    components: {},
    props: {
        type: { type: String },
        size: { type: String },
        placeholder: { type: String },
        disabled: { type: Boolean },
        modelValue: { type: String },
    }
})
export default class AltInput extends Vue {
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
.alt-input {
    .el-input__inner,
    .el-textarea__inner {
        background: var(--alt-control-default-background);
        border-color: var(--alt-control-default-border-color);
        color: var(--alt-control-default-text-color);
    }
}
</style>
