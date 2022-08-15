<template>
  <li v-if="children && children.length > 0" :class="{ 'showMenu': showSubmenu }">
    <div class="iocn-link" @click="toggleSubmenu">
      <!-- <a :href="link">
        <i class="bx" :class="icon" ></i>
        <span class="link_name">{{ name }}</span>
      </a> -->
      <router-link :to="{ path: link }">
        <i class="bx" :class="icon" ></i>
        <span class="link_name">{{ name }}</span>
      </router-link>
      <i class="bx bxs-chevron-down arrow" ></i>
    </div>
    <ul class="sub-menu">
      <!-- <li><a class="link_name" :href="link">{{ name }}</a></li> -->
      <!-- <li><router-link :to="{ path: link }">{{ name }}</router-link></li> -->
      <li><span>{{ name }}</span></li>
      <li v-for="(child, index) of children" :key="index"><a :href="child.link">{{ child.name }}</a></li>
    </ul>
  </li>
  <li v-else>
    <!-- <a :href="link">
      <i class="bx" :class="icon" ></i>
      <span class="link_name">{{ name }}</span>
    </a> -->
    <router-link :to="{ path: link }">
      <i class="bx" :class="icon" ></i>
      <span class="link_name">{{ name }}</span>
    </router-link>
    <ul class="sub-menu blank">
      <!-- <li><a class="link_name" :href="link">{{ name }}</a></li> -->
      <li><router-link :to="{ path: link }">{{ name }}</router-link></li>
    </ul>
  </li>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    name: { type: String, required: true },
    link: { type: String, required: true },
    icon: { type: String, required: true },
    children: { type: Array, default: () => [] },
  }
})
export default class SidebarItem extends Vue {
  public name!: string;
  public link!: string;
  public icon!: string;
  // eslint-disable-next-line
  public children!: any[];

  public showSubmenu = false;

  public toggleSubmenu(): void {
    this.showSubmenu = !this.showSubmenu;
  }
}
</script>

<style lang="scss" src="./item.scss" scoped />
