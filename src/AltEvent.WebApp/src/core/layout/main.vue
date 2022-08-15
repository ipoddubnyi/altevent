<template>
  <div>
    <sidebar
      :class="{ 'close': !menuVisible }"
      :title="sideBarTitle"
      :items="menuItems"
      :profile="profile"
      @logout="logout"
    />

    <section class="home-section">
      <div class="home-content justify-content-between">
        <div class="flex align-items-center">
          <i class="bx bx-menu cursor-pointer mr-1" @click="toggleSidebar"></i>
          <span class="text">{{ topTitle }}</span>
        </div>
        <div>
          <!-- <el-avatar :size="32"><i class="bx bxs-user"></i></el-avatar> -->
          <el-dropdown trigger="click">
            <el-avatar :size="32" class="cursor-pointer"><i class="bx bxs-user"></i></el-avatar>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="$router.push({ name: 'settings-profile' })"><i class="bx bx-user"></i>Профиль</el-dropdown-item>
                <el-dropdown-item @click="$router.push({ name: 'settings-company' })"><i class="bx bx-group"></i>Компания</el-dropdown-item>
                <!-- <el-dropdown-item><i class="bx bx-credit-card"></i>Оплата</el-dropdown-item> -->
                <!-- <el-dropdown-item divided><i class="bx bx-book-alt"></i>Документация</el-dropdown-item> -->
                <!-- <el-dropdown-item divided @click="logoutCompany"><i class="bx bx-directions"></i>Смена компании</el-dropdown-item> -->
                <!-- <i class='bx bx-briefcase'></i> -->
                <el-dropdown-item @click="logout" divided><i class="bx bx-log-out"></i>Выход</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <!-- <transition :name="routerTransition" mode="out-in"> -->
          <router-view class="mt-1" />
      <!-- </transition> -->
    </section>
  </div>
</template>

<script lang="ts" src="./main.ts" />

<style lang="scss" src="./main.scss" scoped />
