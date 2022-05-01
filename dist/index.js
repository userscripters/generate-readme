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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const chalk_1 = require("chalk");
const cli_1 = require("./cli");
const readme_1 = require("./readme");
const utils_1 = require("./utils");
(0, cli_1.addArg)("about", "a", "custom about text", {
    hasValue: true
});
(0, cli_1.addArg)("package", "p", "path to package.json to use", {
    defaultValue: "./package.json",
    hasValue: true
});
(0, cli_1.addArg)("output", "o", "path to output directory", {
    defaultValue: "./README.md",
    hasValue: true
});
(0, cli_1.addArg)("screenshot", "s", "add a screenshot", { hasValue: true });
const generate = ({ direct = false, output = "./README.md", package: pkg = "./package.json", about, screenshot }) => __awaiter(void 0, void 0, void 0, function* () {
    const packageInfo = yield (0, utils_1.getPackage)(pkg);
    if (!packageInfo) {
        console.log((0, chalk_1.bgRed) `package.json file not found or corrupted`);
        process.exitCode = 1;
        return "";
    }
    const content = (0, readme_1.generateReadme)(packageInfo, {
        about,
        screenshot
    });
    if (direct)
        return content;
    yield (0, readme_1.writeReadme)(output, content);
    return content;
});
exports.generate = generate;
const run = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = (0, cli_1.parseArgs)(args.slice(2)), { help } = _a, rest = __rest(_a, ["help"]);
    if (help.passed) {
        const { passed, action } = help;
        if (!passed || !action)
            return;
        const ownPackage = yield (0, utils_1.getPackage)("./package.json");
        if (!ownPackage) {
            console.log((0, chalk_1.bgRed) `own package.json missing or corrupted`);
            return;
        }
        help.run(ownPackage);
        return;
    }
    const options = (0, utils_1.mapObject)(rest, (_, v) => v.hasValue && (v.value || v.defaultValue));
    const content = yield generate(options);
    return content;
});
if (require.main === module)
    run(process.argv);
