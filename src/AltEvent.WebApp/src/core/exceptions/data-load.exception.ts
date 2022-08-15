export class DataLoadException extends Error {
    public innerException: any | null = null;

    public constructor(error?: any) {
        let message: string | null = null;

        if (error.response && error.response.data)
            message = error.response.data.message;

        if (!message && error.message)
            message = error.message;

        if (!message && typeof message === "string")
            message = error;

        if (!message)
            message = "Unknown error.";

        super(message);
        this.innerException = error;
    }
}
