import { PackageInfo } from ".";
declare type GenerateReadmeOptions = {
    screenshot?: string;
};
export declare const generateReadme: ({ author, contributors, description, license, name: packageName, version, bugs, }: PackageInfo, { screenshot }?: GenerateReadmeOptions) => string;
export declare const writeReadme: (path: string, content: string) => Promise<void>;
export {};
