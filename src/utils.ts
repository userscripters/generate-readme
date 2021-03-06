import { readFile } from "fs/promises";
import { PackageInfo } from ".";

export const mapObject = <
    T extends { [x: string]: any },
    U extends (key: keyof T, val: T[keyof T]) => any
>(
        obj: T,
        cbk: U
    ) => {
    const output = <{ [P in keyof T]: ReturnType<U> }>{};
    Object.entries(obj).forEach(([k, v]) => (output[k as keyof T] = cbk(k, v)));
    return output;
};

export const getPackage = async (path: string): Promise<PackageInfo | null> => {
    try {
        const contents = await readFile(path, { encoding: "utf-8" });
        return JSON.parse(contents);
    } catch (error) {
        return null;
    }
};

export const scase = (text: string) =>
    `${text[0].toUpperCase()}${text.slice(1).toLowerCase()}`;

export const mdLink = (lbl: string, href: string) => `[${lbl}](${href})`;

export const parseAuthor = (
    info: PackageInfo["author"]
): Exclude<PackageInfo["author"], string> => {
    if (typeof info === "object") return info;

    const authorRegex = /(\w+\s\w+)(?:\s<(.+?)>)?(?:\s\((.+?)\))?$/i;

    const [_full, name, email, url] = authorRegex.exec(info)!;

    return {
        name,
        email,
        url,
    };
};

export const parseName = (name: string) => {
    const [, scope, packageName] = name.match(/(?:@([\w-]+)\/)?([\w-]+)/) || [];
    return { scope, packageName };
};
