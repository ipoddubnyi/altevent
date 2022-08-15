<template>
    <div v-if="handler.visible"
        :class="handler.class"
        :style="handler.style"
    >
        <label v-if="handler.label && handler.label.length > 0"
            class="text-nowrap pb-0.5"
            :for="handler.id"
        >
            <span v-if="handler.validation?.includes('required')" class="text-danger">* </span>
            {{ handler.label }}
        </label>

        <el-tooltip v-if="handler.help && handler.help.length > 0"
            effect="dark"
            :content="handler.help"
            placement="right"
        >
            <i class="bx bx-help-circle cursor-pointer text-grey hover:text-primary ml-0.25"></i>
        </el-tooltip>

        <div>
            <el-color-picker
                :id="handler.id"
                class="w-100"
                :disabled="handler.disabled"
                v-model="handler.value"
            />
        </div>
    </div>

    <div v-else />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ColorBox } from "./color-box";

@Options({
    name: "color-box-component",
    components: {},
    props: {
        handler: { type: Object, required: true }
    }
})
export default class ColorBoxComponent extends Vue {
    private handler!: ColorBox;
}
</script>

<style lang="scss">
.el-color-picker {
    width: 100%;

    .el-color-picker__trigger {
        width: 100%;
    }
}
</style>
