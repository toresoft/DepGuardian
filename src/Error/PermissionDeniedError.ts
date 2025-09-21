class PermissionDeniedError extends Error {
    constructor(public readonly path: string, options?: { cause?: unknown }) {
        super(`Permesso negato: ${path}`, options);
        this.name = 'PermissionDeniedError';
    }
}
export default PermissionDeniedError;