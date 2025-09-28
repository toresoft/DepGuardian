import path from "node:path";
import PathHelper from "../PathHelper.js";
import PackagesListProvider from "./Model/PackagesListProvider.js";
import * as LockfileParser from 'snyk-nodejs-lockfile-parser';
import * as fs from "node:fs";
import type {PackagesList} from "./Model/PackagesList.js";
import type {PkgTree} from "snyk-nodejs-lockfile-parser";

class PackageChecker {
    private basePath: string;

    constructor(basePath: string) {
        this.basePath = basePath;
    }

    public async check(packageLockDirPath: string, packagesListPath: string): Promise<void> {
        const normalizedPackageLockPath = path.join(PathHelper.normalize(packageLockDirPath, this.basePath), 'package-lock.json');
        const normalizedPackagePath = path.join(PathHelper.normalize(packageLockDirPath, this.basePath), 'package.json');
        const normalizedPackagesListPath = PathHelper.normalize(packagesListPath, this.basePath);
        await Promise.all([
            PathHelper.check(normalizedPackageLockPath),
            PathHelper.check(normalizedPackagePath),
            PathHelper.check(normalizedPackagesListPath)
        ]);
        const packagesList: PackagesList = PackagesListProvider.get(normalizedPackagesListPath);
        const packageJsonContent: string = fs.readFileSync(normalizedPackagePath, 'utf-8');
        const packageLockContent: string = fs.readFileSync(normalizedPackageLockPath, 'utf-8');

        const depTree: PkgTree = await LockfileParser.buildDepTree(
            packageJsonContent,
            packageLockContent,
            true,
            LockfileParser.LockfileType.npm,
            false
        );

        for (const item of packagesList) {
            for (const version of item.versions) {
                const result: boolean = this.findPackageInDepTree(depTree.dependencies, item.name, version);
                console.log(result);
            }
        }

    }

    private findPackageInDepTree(dependencies: Record<string, any>,
                                 packageName: string,
                                 packageVersion: string): boolean {
        for (const [name, dep] of Object.entries(dependencies)) {
            if (name === packageName) {
                if (!packageVersion || dep.version === packageVersion) {
                    return true;
                }
            }

            // Se ha sotto-dipendenze, scendi ricorsivamente
            if (dep.dependencies) {
                if (this.findPackageInDepTree(dep.dependencies, packageName, packageVersion)) {
                    return true;
                }
            }
        }
        return false;
    }
}
export default PackageChecker;