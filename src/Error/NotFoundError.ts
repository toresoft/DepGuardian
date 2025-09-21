class NotFoundError extends Error {
    constructor(public readonly path: string, options?: { cause?: unknown }) {
        super(`Percorso inesistente: ${path}`, options);
        this.name = 'NotFoundError';
    }
}
export default NotFoundError;