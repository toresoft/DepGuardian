export type PackageItem = {
    readonly name: string;
    readonly versions: string[];
};

export type PackagesList = readonly Readonly<PackageItem>[];
