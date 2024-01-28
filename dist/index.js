#!/usr/bin/env node
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
import { createRequire } from "module";
import { fileURLToPath } from "url";
import chulk from "chalk";
import { addArg, parseArgs } from "./cli.js";
import { generateReadme, writeReadme } from "./readme.js";
import { getPackage, mapObject } from "./utils.js";
addArg("about", "a", "custom about text", {
    hasValue: true
});
addArg("package", "p", "path to package.json to use", {
    defaultValue: "./package.json",
    hasValue: true
});
addArg("output", "o", "path to output directory", {
    defaultValue: "./README.md",
    hasValue: true
});
addArg("screenshot", "s", "add a screenshot", { hasValue: true });
const generate = ({ direct = false, output = "./README.md", package: pkg = "./package.json", about, screenshot }) => __awaiter(void 0, void 0, void 0, function* () {
    const packageInfo = yield getPackage(pkg);
    if (!packageInfo) {
        console.log(chulk.bgRed `package.json file not found or corrupted`);
        process.exitCode = 1;
        return "";
    }
    const content = generateReadme(packageInfo, {
        about,
        screenshot
    });
    if (direct)
        return content;
    yield writeReadme(output, content);
    return content;
});
const run = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = parseArgs(args.slice(2)), { help } = _a, rest = __rest(_a, ["help"]);
    if (help.passed) {
        const { passed, action } = help;
        if (!passed || !action)
            return;
        const ownPackage = yield getPackage("./package.json");
        if (!ownPackage) {
            console.log(chulk.bgRed `own package.json missing or corrupted`);
            return;
        }
        help.run(ownPackage);
        return;
    }
    const options = mapObject(rest, (_, v) => v.hasValue && (v.value || v.defaultValue));
    const content = yield generate(options);
    return content;
});
const scriptPath = createRequire(import.meta.url).resolve(process.argv[1]);
const modulePath = fileURLToPath(import.meta.url);
if (modulePath === scriptPath)
    run(process.argv);
export { generate };
