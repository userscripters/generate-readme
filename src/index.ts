import { bgRed } from "chalk";
import { addArg, parseArgs } from "./cli";
import { generateReadme, writeReadme } from "./readme";
import { getPackage, mapObject } from "./utils";

export type PackageInfo = {
    author:
        | string
        | {
              name: string;
              email?: string;
              url?: string;
          };
    license: string;
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

addArg("package", "p", "path to package.json to use", {
    defaultValue: "./package.json",
});

addArg("output", "o", "path to output directory", {
    defaultValue: "./README.md",
});

type GeneratorOptions = {
    direct?: boolean;
    output?: string;
    package?: string;
};

const generate = async ({
    direct = false,
    output = "./README.md",
    package: pkg = "./package.json",
}: GeneratorOptions) => {
    const packageInfo = await getPackage(pkg);

    if (!packageInfo) {
        console.log(bgRed`package.json file not found or corrupted`);
        process.exitCode = 1;
        return "";
    }

    const content = generateReadme(packageInfo);

    if (direct) return content;

    await writeReadme(output, content);

    return content;
};

const run = async (args: typeof process.argv) => {
    const { help, ...rest } = parseArgs(args.slice(2));

    if (help.passed) {
        const { passed, action } = help;
        if (!passed || !action) return;

        const ownPackage = await getPackage("./package.json");
        if (!ownPackage) {
            console.log(bgRed`own package.json missing or corrupted`);
            return;
        }

        help.run(ownPackage);
        return;
    }

    const options = mapObject(rest, (_,v) =>v.hasValue && (v.value || v.defaultValue)  );

    const content = await generate(options);

    return content;
};

if (require.main === module) run(process.argv);

export { generate };
