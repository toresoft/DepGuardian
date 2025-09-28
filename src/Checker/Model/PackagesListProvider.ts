import type {PackagesList} from "./PackagesList.js";
import * as fs from "node:fs";
import PackageListSchema from "./PackageListSchema.js";
import type {ZodSafeParseResult} from "zod";
import InvalidPackagesListFileError from "../Error/InvalidPackagesListFileError.js";

class PackagesListProvider {
    public static get(path: string): PackagesList {
        const content: string = fs.readFileSync(path, 'utf-8');
        const rawData: any = JSON.parse(content);
        const result: ZodSafeParseResult<PackagesList> = PackageListSchema.safeParse(rawData);
        console.log(result);
        if(!result.success) {
            throw new InvalidPackagesListFileError(path, result.error);
        }
        return rawData as PackagesList;
    }
}

export default PackagesListProvider;