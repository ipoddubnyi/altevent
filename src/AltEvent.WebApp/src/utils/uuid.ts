/** Генератор гуидов. */
export abstract class Uuid {
    public static new(): string {
        // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0,
                v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
}
