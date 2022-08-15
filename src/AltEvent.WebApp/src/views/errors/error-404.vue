<template>
    <el-result
        icon="error"
        title="Ой!"
        sub-title="Страница не найдена"
      >
        <template #extra>
          <alt-button type="primary" @click="$router.go(-1)">Назад</alt-button>
        </template>
      </el-result>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AltButton from "@/core/components/alt-controls/alt-button.vue";

@Options({
    components: { AltButton },
})
export default class Error404 extends Vue {
    //
}

</script>
