import { PackageInfo } from ".";
export declare const generateReadme: ({ author, contributors, description, license, name: packageName, version, bugs, }: PackageInfo) => string;
export declare const writeReadme: (path: string, content: string) => Promise<void>;
