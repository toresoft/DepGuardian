#!/usr/bin/env node
import { Command } from 'commander';
import PackageChecker from "./Checker/PackageChecker.js";

const program:Command = new Command();
program.command('check-package-lock')
    .argument('<packageLockDirPath>', '')
    .argument('<packagesListPath>', '')
    .description('')
    .action(async (packageLockDirPath: string, packagesListPath: string) => {
        try {
            const checker: PackageChecker = new PackageChecker(process.cwd())
            await checker.check(packageLockDirPath, packagesListPath);
        } catch (e) {
            if(e instanceof Error) {
                console.error(e.message);
            }
            process.exit(1);
        }
    });

program.parse();