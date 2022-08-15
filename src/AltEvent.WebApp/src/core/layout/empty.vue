<template>
  <div class="empty">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
  props: {}
})
export default class EmptyLayout extends Vue {
  //
}
</script>

<style lang="scss" scoped>
.empty {
  position: relative;
  background: var(--alt-main-background);;
  height: 100vh;
  left: 0px;
  width: 100%;
  transition: all 0.5s ease;
}
</style>