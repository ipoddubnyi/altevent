<template>
    <div v-if="handler.visible"
        :class="handler.class"
        :style="handler.style"
    >
        <label v-if="handler.label && handler.label.length > 0"
            class="text-nowrap pb-0.5"
            :for="handler.id"
        >
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
            <el-input-number
                :id="handler.id"
                class="w-100"
                :min="handler.min"
                :max="handler.max"
                :step="handler.step"
                :disabled="handler.disabled"
                v-model="handler.value"
            />
        </div>
    </div>

    <div v-else />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AltInput from "./alt-input.vue";
import { NumberBox } from "./number-box";

@Options({
    name: "number-box-component",
    components: {
        AltInput,
    },
    props: {
        handler: { type: Object, required: true }
    }
})
export default class NumberBoxComponent extends Vue {
    private handler!: NumberBox;
}
</script>
