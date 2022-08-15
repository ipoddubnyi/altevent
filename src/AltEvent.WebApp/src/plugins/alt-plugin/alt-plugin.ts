import { Vue } from "vue-class-component";
import { AltLoader } from "./alt-loader";
import { AltMessage } from "./alt-message";
import { AltToast } from "./alt-toast";
//import { AltSystem } from "./alt-system";

export class AltPlugin {
    private _context: Vue | undefined;
    //private readonly _system = new AltSystem();
    private readonly _loader = new AltLoader();
    private readonly _toast = new AltToast();
    private readonly _message = new AltMessage();

    /** Текущий контекст. */
    public set context(context: Vue) {
        this._context = context;
    }

    /** Глобальные объекты системы. */
    // public get system(): AltSystem {
    //     return this._system;
    // }

    /** Крутилка загрузки. */
    public get loader(): AltLoader {
        return this._loader;
    }

    /** Всплывающее сообщение. */
    public get toast(): AltToast {
        return this._toast;
    }

    /** Сообщение. */
    public get message(): AltMessage {
        return this._message;
    }

    /** Изменить заголовок окна. */
    public set title(title: string | undefined) {
        document.title = title && title.length > 0
            ? `${title} | ${process.env.VUE_APP_NAME}`
            : process.env.VUE_APP_NAME as string;
    }

    /** Клонировать объект. */
    public clone(obj: any): any {
        if (!obj) {
            return obj;
        }

        const clone = JSON.parse(JSON.stringify(obj));

        if (typeof obj === "object") {
            for (const field of Object.keys(obj)) {
                if (typeof obj[field] === "function") {
                    clone[field] = obj[field];
                }
            }

            clone.__proto__ = obj.__proto__;
        }

        return clone;
    }

    // /** Добавить параметр к запросу. */
    // public queryAdd(name: string, value: any): void {
    //     const query: any = JSON.parse(JSON.stringify(this._context?.$route.query));
    //     query[name] = value;
    //     this._context?.$router.replace({ query }).catch(() => {});
    // }

    // /** Удалить параметр из запроса. */
    // public queryRemove(name: string): void {
    //     if (this._context?.$route.query[name]) {
    //         const query: any = JSON.parse(JSON.stringify(this._context?.$route.query));
    //         delete query[name];
    //         this._context?.$router.replace({ query }).catch(() => {});
    //     }
    // }
}
