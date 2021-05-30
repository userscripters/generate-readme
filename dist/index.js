#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const chalk_1 = require("chalk");
const cli_1 = require("./cli");
const readme_1 = require("./readme");
const utils_1 = require("./utils");
cli_1.addArg("package", "p", "path to package.json to use", {
    defaultValue: "./package.json",
});
cli_1.addArg("output", "o", "path to output directory", {
    defaultValue: "./README.md",
});
const generate = ({ direct = false, output = "./README.md", package: pkg = "./package.json", }) => __awaiter(void 0, void 0, void 0, function* () {
    const packageInfo = yield utils_1.getPackage(pkg);
    if (!packageInfo) {
        console.log(chalk_1.bgRed `package.json file not found or corrupted`);
        process.exitCode = 1;
        return;
    }
    const content = readme_1.generateReadme(packageInfo);
    if (direct)
        return content;
    yield readme_1.writeReadme(output, content);
    return content;
});
exports.generate = generate;
const run = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const { help } = cli_1.parseArgs(args.slice(2));
    if (help.passed) {
        const { passed, action } = help;
        if (!passed || !action)
            return;
        const ownPackage = yield utils_1.getPackage("./package.json");
        if (!ownPackage) {
            console.log(chalk_1.bgRed `own package.json missing or corrupted`);
            return;
        }
        help.run(ownPackage);
        return;
    }
});
if (require.main === module)
    run(process.argv);
