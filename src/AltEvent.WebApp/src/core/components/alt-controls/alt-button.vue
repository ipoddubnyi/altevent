<template>
    <el-button
        :type="type"
        :size="size"
        :disabled="disabled"
        class="alt-button"
    ><slot /></el-button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    name: "alt-button",
    components: {},
    props: {
        type: { type: String },
        size: { type: String },
        disabled: { type: Boolean },
    }
})
export default class AltButton extends Vue {
    // public click(): void {
    //     this.$emit("click");
    // }
}
</script>

<style lang="scss">
.alt-button {
    // default

    background: var(--alt-control-default-background);
    border-color: var(--alt-control-default-border-color);
    color: var(--alt-control-default-text-color);

    &:hover,
    &:active,
    &:focus {
        background: var(--alt-primary-light-9);
        border-color: var(--alt-primary-light-2);
        color: var(--alt-primary);
    }

    &.is-plain {
        background: var(--alt-primary-light-9);
        border-color: var(--alt-primary-light-2);
        color: var(--alt-primary);

        &:hover,
        &:active,
        &:focus {
            background: var(--alt-primary);
            border-color: var(--alt-primary);
            color: var(--alt-control-contrast-text-color);
        }
    }

    &.is-disabled {
        background: var(--alt-control-default-background);
        border-color: var(--alt-control-default-border-color);
        color: var(--alt-primary);
        opacity: 0.5;

        &:hover,
        &:active,
        &:focus {
            background: var(--alt-control-default-background);
            border-color: var(--alt-control-default-border-color);
            color: var(--alt-primary);
            opacity: 0.5;
        }
    }

    // primary

    &.el-button--primary {
        background: var(--alt-primary);
        border-color: var(--alt-primary);
        color: var(--alt-control-contrast-text-color);

        &:hover,
        &:active,
        &:focus {
            background: var(--alt-primary-light-2);
            border-color: var(--alt-primary-light-2);
            color: var(--alt-control-contrast-text-color);
        }

        &.is-plain {
            background: var(--alt-primary-light-9);
            border-color: var(--alt-primary-light-2);
            color: var(--alt-primary);

            &:hover,
            &:active,
            &:focus {
                background: var(--alt-primary);
                border-color: var(--alt-primary);
                color: var(--alt-control-contrast-text-color);
            }
        }

        &.is-disabled {
            background: var(--alt-primary-light-6);
            border-color: var(--alt-primary-light-4);
            color: var(--alt-primary);

            &:hover,
            &:active,
            &:focus {
                background: var(--alt-primary-light-6);
                border-color: var(--alt-primary-light-4);
                color: var(--alt-primary);
            }
        }
    }

    // success

    &.el-button--success {
        background: var(--alt-success);
        border-color: var(--alt-success);
        color: var(--alt-control-contrast-text-color);

        &:hover,
        &:active,
        &:focus {
            background: var(--alt-success-light-2);
            border-color: var(--alt-success-light-2);
            color: var(--alt-control-contrast-text-color);
        }

        &.is-plain {
            background: var(--alt-success-light-9);
            border-color: var(--alt-success-light-2);
            color: var(--alt-success);

            &:hover,
            &:active,
            &:focus {
                background: var(--alt-success);
                border-color: var(--alt-success);
                color: var(--alt-control-contrast-text-color);
            }
        }

        &.is-disabled {
            background: var(--alt-success-light-6);
            border-color: var(--alt-success-light-4);
            color: var(--alt-success);

            &:hover,
            &:active,
            &:focus {
                background: var(--alt-success-light-6);
                border-color: var(--alt-success-light-4);
                color: var(--alt-success);
            }
        }
    }

    // warning

    &.el-button--warning {
        background: var(--alt-warning);
        border-color: var(--alt-warning);
        color: var(--alt-control-contrast-text-color);

        &:hover,
        &:active,
        &:focus {
            background: var(--alt-warning-light-2);
            border-color: var(--alt-warning-light-2);
            color: var(--alt-control-contrast-text-color);
        }

        &.is-plain {
            background: var(--alt-warning-light-9);
            border-color: var(--alt-warning-light-2);
            color: var(--alt-warning);

            &:hover,
            &:active,
            &:focus {
                background: var(--alt-warning);
                border-color: var(--alt-warning);
                color: var(--alt-control-contrast-text-color);
            }
        }

        &.is-disabled {
            background: var(--alt-warning-light-6);
            border-color: var(--alt-warning-light-4);
            color: var(--alt-warning);

            &:hover,
            &:active,
            &:focus {
                background: var(--alt-warning-light-6);
                border-color: var(--alt-warning-light-4);
                color: var(--alt-warning);
            }
        }
    }

    // danger

    &.el-button--danger {
        background: var(--alt-danger);
        border-color: var(--alt-danger);
        color: var(--alt-control-contrast-text-color);

        &:hover,
        &:active,
        &:focus {
            background: var(--alt-danger-light-2);
            border-color: var(--alt-danger-light-2);
            color: var(--alt-control-contrast-text-color);
        }

        &.is-plain {
            background: var(--alt-danger-light-9);
            border-color: var(--alt-danger-light-2);
            color: var(--alt-danger);

            &:hover,
            &:active,
            &:focus {
                background: var(--alt-danger);
                border-color: var(--alt-danger);
                color: var(--alt-control-contrast-text-color);
            }
        }

        &.is-disabled {
            background: var(--alt-danger-light-6);
            border-color: var(--alt-danger-light-4);
            color: var(--alt-danger);

            &:hover,
            &:active,
            &:focus {
                background: var(--alt-danger-light-6);
                border-color: var(--alt-danger-light-4);
                color: var(--alt-danger);
            }
        }
    }

    // info

    &.el-button--info {
        background: var(--alt-info);
        border-color: var(--alt-info);
        color: var(--alt-control-contrast-text-color);

        &:hover,
        &:active,
        &:focus {
            background: var(--alt-info-light-2);
            border-color: var(--alt-info-light-2);
            color: var(--alt-control-contrast-text-color);
        }

        &.is-plain {
            background: var(--alt-info-light-9);
            border-color: var(--alt-info-light-2);
            color: var(--alt-info);

            &:hover,
            &:active,
            &:focus {
                background: var(--alt-info);
                border-color: var(--alt-info);
                color: var(--alt-control-contrast-text-color);
            }
        }

        &.is-disabled {
            background: var(--alt-info-light-6);
            border-color: var(--alt-info-light-4);
            color: var(--alt-info);

            &:hover,
            &:active,
            &:focus {
                background: var(--alt-info-light-6);
                border-color: var(--alt-info-light-4);
                color: var(--alt-info);
            }
        }
    }
}
</style>
