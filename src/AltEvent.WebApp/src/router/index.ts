import { App } from "vue";
import { createRouter, createWebHistory, Router, RouteRecordRaw } from "vue-router";
import { AltPlugin } from "@/plugins/alt-plugin";
import { AltStorePlugin } from "@/plugins/alt-store-plugin";

enum AuthType {
    Public = "public",
    Unauth = "unauth",
    Company = "company",
}

const routes: Array<RouteRecordRaw> = [
    {
        path: "",
        component: () => import("@/core/layout/empty.vue"),
        children: [
            {
                path: "",
                name: "home",
                component: () => import("@/views/public/home/index.vue"),
                meta: {
                    auth: AuthType.Public,
                },
            },
            {
                path: "/e/:companyId",
                name: "events",
                component: () => import("@/views/public/events/index.vue"),
                meta: {
                    title: "События",
                    auth: AuthType.Public,
                },
            },
            {
                path: "/r/:reservationId",
                name: "reservation",
                component: () => import("@/views/public/reservation/index.vue"),
                meta: {
                    title: "Резервация",
                    auth: AuthType.Public,
                },
            },
        ],
    },
    {
        path: "",
        component: () => import("@/core/layout/main.vue"),
        children: [
            {
                path: "/calendar",
                name: "calendar",
                component: () => import("@/views/main/calendar/index.vue"),
                meta: {
                    title: "Календарь",
                    auth: AuthType.Company,
                },
            },
            {
                path: "/employees",
                name: "employees",
                component: () => import("@/views/main/employees/index.vue"),
                meta: {
                    title: "Сотрудники",
                    auth: AuthType.Company,
                },
            },
            {
                path: "/settings/profile",
                name: "settings-profile",
                component: () => import("@/views/main/settings-profile/index.vue"),
                meta: {
                    title: "Профиль",
                    auth: AuthType.Company,
                },
            },
            {
                path: "/settings/company",
                name: "settings-company",
                component: () => import("@/views/main/settings-company/index.vue"),
                meta: {
                    title: "Компания",
                    auth: AuthType.Company,
                },
            },
        ],
    },
    {
        path: "",
        component: () => import("@/core/layout/empty.vue"),
        children: [
            {
                path: "/registration",
                name: "registration",
                component: () => import("@/views/auth/registration/index.vue"),
                meta: {
                    title: "Регистрация",
                    auth: AuthType.Unauth,
                },
            },
            {
                path: "/login",
                name: "login",
                component: () => import("@/views/auth/login/index.vue"),
                meta: {
                    title: "Вход",
                    auth: AuthType.Unauth,
                },
            },
        ],
    },
    {
        path: "/404",
        name: "error-404",
        component: () => import("@/views/errors/error-404.vue"),
    },

    // redirect to 404 page, if no match found
    {
        path: "/:pathMatch(.*)*",
        redirect: "/404",
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

function getAltPlugin(app: App): AltPlugin {
    return app.config.globalProperties.$alt;
}

function getStorePlugin(app: App): AltStorePlugin {
    return app.config.globalProperties.$store;
}

function initRouter(router: Router, app: App): void {
    // router.afterEach(() => {
    //     // Remove initial loading
    //     const appLoading = document.getElementById("loading-bg");
    //     if (appLoading) {
    //         appLoading.style.display = "none";
    //     }
    // });

    router.beforeEach(async (to: any, from: any, next: any) => {
        // const partnerId = to.query.partner;
        // if (partnerId && !router.app.getStorePlugin().token.hasAccessToken()) {
        //     store.dispatch("updateReferralPartnerId", partnerId);
        // }

        if (to.meta?.auth === AuthType.Company && !getStorePlugin(app).token.hasAnyToken()) {
            await router.push({ name: "login" }).catch(() => {});
            // TODO: russian text
            getAltPlugin(app).toast.error("Доступ запрещён.");
            return;
        }

        if (to.meta?.auth === AuthType.Unauth && getStorePlugin(app).token.hasCompanyToken()) {
            await router.push({ name: "calendar" }).catch(() => {});
            return;
        }

        getAltPlugin(app).title = to.meta?.title;

        return next();
    });
}

export default {
    // https://stackoverflow.com/questions/67889690/vue-3-accessing-vue-instance-in-vue-router-outside-a-vue-file
    install(app: App, options: any) {
        (router as any).app = app;
        initRouter(router, app);
        router.install(app);
    },

    router: router,
};
