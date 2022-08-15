import { App, Plugin } from "vue";
import { AltPlugin } from "./alt-plugin";
import { AltStorePlugin } from "./alt-store-plugin";

// See also:
// https://q-now.de/2021/10/lets-write-a-vue-js-3-plugin-with-typescript-from-scratch-part-1/
// https://stackoverflow.com/questions/64118679/question-about-vue-3-typescript-and-augmenting-types-for-use-with-plugins

export const AltPluginSet: Plugin = {
    install(app: App, options: any) {
        app.config.globalProperties.$alt = new AltPlugin();
        app.config.globalProperties.$store = new AltStorePlugin();
        // app.config.globalProperties.$secure = new SecurePlugin();
    }
}

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        /** Дополнительные удобные функции. */
        $alt: AltPlugin;

        /** Хранилище данных. */
        $store: AltStorePlugin;

        // /** Права доступа. */
        // $secure: SecurePlugin;
    }
}
