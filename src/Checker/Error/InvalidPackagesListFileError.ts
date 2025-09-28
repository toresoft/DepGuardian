import type {PackagesList} from "../Model/PackagesList.js";
import type {ZodError} from "zod";

class InvalidPackagesListFileError extends Error {
    constructor(public readonly path: string, public readonly error: ZodError<PackagesList>, options?: { cause?: unknown }) {
        super(``, options);
        this.name = 'InvalidPackagesListFileError';
    }
}
export default InvalidPackagesListFileError;
