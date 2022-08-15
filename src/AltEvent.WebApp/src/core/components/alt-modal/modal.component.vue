<template>
    <el-dialog
        :ref="handler.id"
        :title="handler.title.toUpperCase()"
        :show-close="true"
        :before-close="close"
        width="30rem"
        top="5vh"
        v-model="visible"
    >
        <control-component
            v-for="control of handler.controls"
            :key="control.id"
            :handler="control"
            :class="{ 'mb-1': control.visible }"
        />

        <template #footer v-if="handler.controlsFooter.length > 0">
            <control-component v-for="control of handler.controlsFooter" :key="control.id" :handler="control" />

            <!-- <span class="dialog-footer">
                <alt-button @click="close">{{ resources.ButtonTextCancel }}</alt-button>
                <alt-button type="primary" @click="save">{{ resources.ButtonTextSave }}</alt-button>
            </span> -->
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Modal } from "./modal";
import { VisibilityChangedEventArgs } from "../alt-common";
import ControlComponent from "../alt-controls/control.component.vue";
//import AltButton from "@/core/components/alt-controls/alt-button.vue";

@Options({
    name: "modal-component",
    components: {
        ControlComponent,
    },
    props: {
        handler: { type: Object, required: true }
    }
})
export default class ModalComponent extends Vue {
    private handler!: Modal;
    private visible = false;

    // @Watch("handler")
    // private onHandlerChanged(): void {
    //     this.init();
    // }

    public mounted(): void {
        this.init();
    }

    private init(): void {
        this.handler.addVisibleChangedHandler(this.onVisibleChanged.bind(this));
    }

    private close(): void {
        this.handler.hide();
    }

    private onVisibleChanged(sender: any, e: VisibilityChangedEventArgs): void {
        this.visible = e.visible;
        // if (e.visible) {
        //     this.$bvModal.show(this.handler.id);
        // } else {
        //     this.$bvModal.hide(this.handler.id);
        // }
    }
}
</script>

<style lang="scss">
.el-dialog__header {
    text-align: center;
}
</style>
