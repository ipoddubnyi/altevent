import axios, { AxiosInstance } from "axios";
import r from "@/router";
import { AuthUseCase } from "./auth.usecase";
import { AltPlugin } from "@/plugins/alt-plugin";
import { AltStorePlugin } from "@/plugins/alt-store-plugin";

const TokenType = "Bearer";

function makeAxios(authRequests = false): AxiosInstance {
    const api = axios.create({
        withCredentials: true, // чтобы передавать куки
        baseURL: process.env.NODE_ENV === "production"
            ? process.env.VUE_APP_API_BASEURL
            : process.env.VUE_APP_API_BASEURL_DEV,

        // headers
    });

    if (authRequests) {
        addResponseInterceptorAuth(api);
    } else {
        addRequestInterceptor(api);
        addResponseInterceptor(api);
    }

    return api;
}

function getAltPlugin(): AltPlugin {
    return (r.router as any).app.config.globalProperties.$alt;
}

function getStorePlugin(): AltStorePlugin {
    return (r.router as any).app.config.globalProperties.$store;
}

function addRequestInterceptor(api: AxiosInstance): void {
    api.interceptors.request.use(
        config => {
            const companyToken = getStorePlugin().token.getCompanyToken();
            if (companyToken) {
                config.headers!.Authorization = `${TokenType} ${companyToken}`;
                return config;
            }

            // const userOnlyToken = getStorePlugin().token.getUserOnlyToken();
            // if (userOnlyToken) {
            //     config.headers!.Authorization = `${TokenType} ${userOnlyToken}`;
            //     return config;
            // }

            return config;
        },
        error => Promise.reject(error),
    );
}

function addResponseInterceptor(api: AxiosInstance): void {
    api.interceptors.response.use(
        response => response,
        async error => {
            const response = error.response;
            const originalRequest = error.config;

            if (response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true; // повторить refresh только 1 раз

                if (getStorePlugin().token.hasCompanyToken()) {
                    // const result = await new AuthUseCase().refreshCompanyToken();
                    // getStorePlugin().token.setCompanyToken(result.accessToken);
                // } else if (getStorePlugin().token.hasUserOnlyToken()) {
                //     const result = await new AuthUseCase().refreshUserOnlyToken();
                //     getStorePlugin().token.setUserOnlyToken(result.accessToken);
                // } else if (getStorePlugin().token.hasAdminToken()) {
                //     const result = await getAltPlugin().system.usecase.createAdminAuthUseCase().refresh();
                //     getStorePlugin().token.setAdminToken(result.accessToken);
                }
                
                return api.request(originalRequest);
            } else if (response?.status === 401) {
                getStorePlugin().token.cleanData();
                await r.router.push({ name: "home" }).catch(() => {});
            }
            return Promise.reject(error);
        },
    );
}

function addResponseInterceptorAuth(api: AxiosInstance): void {
    api.interceptors.response.use(
        response => response,
        async error => {
            if (error.response?.status === 401) {
                getStorePlugin().token.cleanData();
                await r.router.push({ name: "login" }).catch(() => {});
            }
            return Promise.reject(error);
        },
    );
}

/** Для обычных вызовов API. */
export const Api = makeAxios();

/** Для вызовов API, связанных с авторизацией. */
export const ApiAuth = makeAxios(true);
