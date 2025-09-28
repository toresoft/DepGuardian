import path from 'node:path';
import * as fs from "node:fs";
import NotFoundError from "./Error/NotFoundError.js";
import PermissionDeniedError from "./Error/PermissionDeniedError.js";

class PathHelper {
    static normalize(filePath: string, basePath: string): string {
        if(path.isAbsolute(filePath)) {
            return path.normalize(filePath);
        }
        return path.join(basePath, filePath).normalize();
    }

    static async check(filePath: string): Promise<void>
    {
        try {
            await fs.promises.access(filePath, fs.constants.F_OK);
        } catch (err) {
            throw new NotFoundError(filePath);
        }
        try {
            await fs.promises.access(filePath, fs.constants.R_OK);
        } catch (err) {
            const e = err as NodeJS.ErrnoException;
            if (e && (e.code === 'EACCES' || e.code === 'EPERM' || e.code === 'EROFS')) {
                throw new PermissionDeniedError(filePath);
            }
            throw err;
        }
        const st = await fs.promises.stat(filePath);
        if (!st.isFile()) {
            throw new NotFoundError(filePath);
        }
    }
}

export default PathHelper;