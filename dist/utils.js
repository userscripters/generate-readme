var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readFile } from "fs/promises";
export const mapObject = (obj, cbk) => {
    const output = {};
    Object.entries(obj).forEach(([k, v]) => (output[k] = cbk(k, v)));
    return output;
};
export const getPackage = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contents = yield readFile(path, { encoding: "utf-8" });
        return JSON.parse(contents);
    }
    catch (error) {
        return null;
    }
});
export const scase = (text) => `${text[0].toUpperCase()}${text.slice(1).toLowerCase()}`;
export const mdLink = (lbl, href) => `[${lbl}](${href})`;
export const parseAuthor = (info) => {
    if (typeof info === "object")
        return info;
    const authorRegex = /(\w+\s\w+)(?:\s<(.+?)>)?(?:\s\((.+?)\))?$/i;
    const [_full, name, email, url] = authorRegex.exec(info);
    return {
        name,
        email,
        url,
    };
};
export const parseName = (name) => {
    const [, scope, packageName] = name.match(/(?:@([\w-]+)\/)?([\w-]+)/) || [];
    return { scope, packageName };
};
