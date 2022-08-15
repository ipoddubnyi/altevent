<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <img class="logo" src="@/assets/logo-full.png" />
                </div>
            </template>

            <el-form ref="formRegistration" :model="formData" :rules="formRules" @submit.prevent>
                <div class="mb-1">
                    <span class="bold-500">Приветствуем!</span><br/>
                    <span class="font-0.75">Пожалуйста, введите данные для входа:</span>
                </div>

                <el-form-item prop="name" class="mb-1">
                    <div class="flex justify-content-between align-items-center line-h-1.5 w-100">
                        <label for="name" class="ml-0.5">Имя</label>
                    </div>
                    <alt-input
                        id="name"
                        v-model="formData.name"
                    >
                        <template #prefix>
                            <span class="pt-0.125"><i class="bx bx-user"></i></span>
                        </template>
                    </alt-input>
                </el-form-item>

                <el-form-item prop="login" class="mb-1">
                    <div class="flex justify-content-between align-items-center line-h-1.5 w-100">
                        <label for="login" class="ml-0.5">Почта</label>
                    </div>
                    <alt-input
                        id="login"
                        v-model="formData.login"
                    >
                        <template #prefix>
                            <span class="pt-0.125"><i class="bx bx-envelope"></i></span>
                        </template>
                    </alt-input>
                </el-form-item>

                <el-form-item prop="password" class="mb-1">
                    <div class="flex justify-content-between align-items-center line-h-1.5 w-100">
                        <label for="password" class="ml-0.5">Пароль</label>
                    </div>
                    <alt-input
                        id="password"
                        type="password"
                        show-password
                        v-model="formData.password"
                    >
                        <template #prefix>
                            <span class="pt-0.125"><i class="bx bx-lock-alt"></i></span>
                        </template>
                    </alt-input>
                </el-form-item>

                <el-form-item prop="accept" class="mb-1.5">
                    <el-checkbox v-model="formData.accept" size="large" class="bold-normal white-space-normal">
                        <span class="font-0.75">
                            Принимаю
                            <el-link type="primary" href="#" target="_blank" class="font-0.75">пользовательское соглашение</el-link>
                            и даю согласие на
                            <el-link type="primary" href="#" target="_blank" class="font-0.75">обработку персональных данных</el-link>
                            .
                        </span>
                    </el-checkbox>
                </el-form-item>

                <alt-button
                    class="w-100"
                    type="primary"
                    @click="register"
                >Войти</alt-button>

                <el-link
                    type="primary"
                    class="font-0.75 mt-0.5"
                    @click="$router.push({ name: 'login' })"
                >Уже есть аккаунт</el-link>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts" src="./index.ts" />

<style lang="scss">
.box-card {
    position: relative;
    width: 28rem;
    left: calc(50% - 14rem);
    top: 5rem;

    .card-header {
        display: flex;
        justify-content: center;
        align-items: center;

        .logo {
            height: 3.5rem;
        }
    }

    .el-card__header {
        border: 0;
        padding: 1.5rem;
        padding-bottom: 0.75rem;
    }

    .el-card__body {
        border: 0;
        padding: 1.5rem;
        padding-top: 0.75rem;
    }
}

label {
    font-size: 0.75rem;
}
</style>
