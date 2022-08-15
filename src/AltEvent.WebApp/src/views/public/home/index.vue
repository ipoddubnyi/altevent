<template>
    <div class="page-home p-1 ml-auto mr-auto" style="width: 40rem;">
        <div class="mb-2 text-center">
            <img class="logo" src="@/assets/logo-full.png" />
            <p class="text-center">Управление событиями</p>
        </div>

        <table style="border: 0; width: 100%;" class="mb-1">
            <tr>
                <td class="px-1 py-0.5">
                    <strong>Ты организатор</strong>
                </td>
                <td class="px-1 py-0.5">
                    <strong>Ты посетитель</strong>
                </td>
            </tr>
            <tr>
                <td class="px-1 py-0.5">
                    <ul>
                        <li class="mb-0.5">
                            <router-link to="registration">Зарегистрируй компанию</router-link>
                            или
                            <router-link to="login">войди в аккаунт</router-link>
                        </li>
                        <li class="mb-0.5">Запланируй события</li>
                    </ul>
                </td>
                <td class="px-1 py-0.5">
                    <ul>
                        <li class="mb-0.5">Найди компанию</li>
                        <li class="mb-0.5">Отметься, что придёшь на событие</li>
                    </ul>
                </td>
            </tr>
        </table>

        <div class="ml-auto mr-auto" style="width: 20rem;">
            <div class="flex justify-content-between align-items-center line-h-1.5 w-100">
                <label for="login" class="ml-0.5">Поиск компаний</label>
            </div>
            <alt-input
                id="login"
                class="mb-0.5"
                v-model="searchString"
                @keyup.enter="search"
                @keyup.esc="searchString = ''; search()"
            >
                <template #prefix>
                    <span class="pt-0.125"><i class="bx bx-search"></i></span>
                </template>
            </alt-input>

            <alt-button
                class="w-100"
                type="primary"
                @click="search"
            >Искать</alt-button>

            <div class="mt-1">
                <div v-for="company of companies" :key="company.id">
                    <router-link :to="`/e/${company.id}`">{{ company.name }}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./index.ts" />

<style lang="scss" scoped>
.page-home {
    .logo {
        height: 8rem;
    }
}
</style>
