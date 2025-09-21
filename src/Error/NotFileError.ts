class NotFileError extends Error {
    constructor(public readonly path: string, options?: { cause?: unknown }) {
        super(`Il path non punta a un file: ${path}`, options);
        this.name = 'NotFileError';
    }
}
export default NotFileError;
