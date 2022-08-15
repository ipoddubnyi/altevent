<template>
    <div v-if="handler.visible"
        :class="handler.class"
        :style="handler.style"
    >
        <label v-if="handler.label && handler.label.length > 0"
            class="text-nowrap pb-0.5"
            :for="handler.id"
        >{{ handler.label }}</label>

        <el-tooltip v-if="handler.help && handler.help.length > 0"
            effect="dark"
            :content="handler.help"
            placement="right"
        >
            <i class="bx bx-help-circle cursor-pointer text-grey hover:text-primary ml-0.25"></i>
        </el-tooltip>

        <div>
            <el-select-v2
                :id="handler.id"
                class="w-100"
                :placeholder="handler.placeholder"
                :disabled="handler.disabled"
                :options="options"
                v-model="handler.selectedItem"
            />
        </div>
    </div>

    <div v-else />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Select } from "./select";

@Options({
    name: "select-component",
    components: {},
    props: {
        handler: { type: Object, required: true }
    }
})
export default class SelectComponent extends Vue {
    private handler!: Select;

    private get options(): any[] {
        return this.handler.items.map(item => ({
            label: this.handler.getOptionText ? this.handler.getOptionText(item) : "",
            value: item,
        }));
    }
}
</script>
