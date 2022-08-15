<template>
  <div class="sidebar">
    <div class="logo-details cursor-pointer" @click="$router.push({ name: 'home' })">
      <img src="@/assets/logo.svg" style="color: #409eff;" />
      <!-- <i class="bx bxl-c-plus-plus"></i> -->
      <span class="logo_name">{{ title }}</span>
    </div>
    <ul class="nav-links">
      <item v-for="(item, index) of items" :key="index"
        :name="item.name"
        :link="item.link"
        :icon="item.icon"
        :children="item.children"
      />

      <!-- <profile :name="profile.name" :position="profile.position" @logout="logout" /> -->
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Item from "./item.vue";
import Profile from "./profile.vue";

@Options({
    components: {
        Item,
        Profile
    },
    props: {
        title: { type: String, required: true },
        items: { type: Array, default: () => [] },
        //profile: { type: Object, default: () => ({ name: "", position: "" }) },
    }
})
export default class Sidebar extends Vue {
    public logout(): void {
        this.$emit("logout");
    }
}
</script>

<style lang="scss" src="./index.scss" scoped />
