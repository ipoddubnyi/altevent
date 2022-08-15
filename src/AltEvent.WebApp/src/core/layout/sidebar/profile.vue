<template>
  <li>
    <div class="profile-details">
      <div class="profile-content">
        <!--<img src="image/profile.jpg" alt="profileImg">-->
        <img src="@/assets/profile.png" alt="profileImg">
        <!-- <el-avatar src="@/assets/profile.png" /> -->
      </div>
      <div class="name-position">
        <div class="profile_name">{{ name }}</div>
        <div class="position">{{ position }}</div>
      </div>
      <i class="bx bx-log-out" @click="logout"></i>
    </div>
  </li>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    name: { type: String, required: true },
    position: { type: String, required: true },
  }
})
export default class SidebarProfile extends Vue {
    public name!: string;
    public position!: string;

    public logout(): void {
        this.$emit("logout");
    }
}
</script>

<style lang="scss" src="./profile.scss" scoped />
