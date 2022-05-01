export declare type PackagePerson = string | {
    name: string;
    email?: string;
    url?: string;
};
export declare type PackageInfo = {
    author: PackagePerson;
    contributors?: PackagePerson[];
    license?: string;
    homepage: string;
    name: string;
    version: `${number}.${number}.${number}`;
    description: string;
    bugs: {
        url: string;
    };
    repository: {
        type: "git" | "https";
        url: string;
    };
};
declare type GeneratorOptions = {
    about?: string;
    direct?: boolean;
    output?: string;
    package?: string;
    screenshot?: string;
};
declare const generate: ({ direct, output, package: pkg, about, screenshot }: GeneratorOptions) => Promise<string>;
export { generate };
