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

        <alt-input
            :id="handler.id"
            :type="handler.type"
            :placeholder="handler.placeholder"
            :disabled="handler.disabled"
            autocomplete="off"
            v-model="handler.text"
        />
    </div>

    <div v-else />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AltInput from "./alt-input.vue";
import { TextBox } from "./text-box";

@Options({
    name: "text-box-component",
    components: {
        AltInput,
    },
    props: {
        handler: { type: Object, required: true }
    }
})
export default class TextBoxComponent extends Vue {
    private handler!: TextBox;
}
</script>
