<template>
    <div v-if="handler.visible"
        :class="handler.class"
        :style="handler.style"
    >
        <el-checkbox
            :id="handler.id"
            :class="handler.class"
            :style="handler.style"
            :disabled="handler.disabled"
            :label="handler.text"
            v-model="handler.value"
        />
    </div>

    <div v-else />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { CheckBox } from "./check-box";

@Options({
    name: "check-box-component",
    components: {},
    props: {
        handler: { type: Object, required: true }
    }
})
export default class CheckBoxComponent extends Vue {
    private handler!: CheckBox;
}
</script>
