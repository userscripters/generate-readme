import { PackageInfo } from ".";
export declare const getPackage: (path: string) => Promise<PackageInfo | null>;
export declare const scase: (text: string) => string;
export declare const mdLink: (lbl: string, href: string) => string;
export declare const parseAuthor: (info: PackageInfo["author"]) => Exclude<PackageInfo["author"], string>;
export declare const parseName: (name: string) => {
    scope: string;
    packageName: string;
};
