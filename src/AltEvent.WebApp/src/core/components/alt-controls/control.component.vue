<template>
    <component v-if="handler.component !== null"
        :is="handler.component"
        :handler="handler"
    />

    <div v-else>Ошибка! {{ handler.id }}</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { VNode } from "vue";
import { Control } from ".";

@Options({
    name: "control-component",
    components: {},
    props: {
        handler: { type: Object, required: true }
    }
})
export default class ControlComponent extends Vue {
    private handler!: Control;
}
</script>
