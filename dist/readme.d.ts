import { PackageInfo } from ".";
type GenerateReadmeOptions = {
    about?: string;
    screenshot?: string;
};
export declare const generateReadme: ({ author, contributors, description, license, name: packageName, version, bugs, }: PackageInfo, { about, screenshot }?: GenerateReadmeOptions) => string;
export declare const writeReadme: (path: string, content: string) => Promise<void>;
export {};
