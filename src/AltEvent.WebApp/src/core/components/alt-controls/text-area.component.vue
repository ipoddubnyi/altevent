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

        <alt-text-area
            :id="handler.id"
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
import AltTextArea from "./alt-text-area.vue";
import { TextArea } from "./text-area";

@Options({
    name: "text-area-component",
    components: {
        AltTextArea,
    },
    props: {
        handler: { type: Object, required: true }
    }
})
export default class TextAreaComponent extends Vue {
    private handler!: TextArea;
}
</script>
