#!/usr/bin/env node
import { Command } from 'commander';
import PathHelper from "./PathHelper.js";
import path from "node:path";

const program:Command = new Command();
program.command('check-package-lock')
    .argument('<packageLockDirPath>', '')
    .argument('<packagesListPath>', '')
    .description('')
    .action(async (packageLockDirPath: string, packagesListPath: string) => {
        const normalizedPackageLockPath = path.join(PathHelper.normalize(packageLockDirPath), 'package-lock.json');
        const normalizedPackagePath = path.join(PathHelper.normalize(packageLockDirPath), 'package.json');
        const normalizedPackagesListPath = PathHelper.normalize(packagesListPath);
        await Promise.all([
            PathHelper.check(normalizedPackageLockPath),
            PathHelper.check(normalizedPackagePath),
            PathHelper.check(normalizedPackagesListPath)
        ]);

    });

program.parse();