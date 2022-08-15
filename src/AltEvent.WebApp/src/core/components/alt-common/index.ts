export type EventHandler<T = any> = (sender: any, e: T) => void | Promise<void>;
export type EventHandlerAsync<T = any> = (sender: any, e: T) => Promise<void>;

export class VisibilityChangedEventArgs {
    visible!: boolean;
}

export class ValidateEventArgs {
    valid!: boolean;
}
