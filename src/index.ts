import { createRequire } from "module";
import { fileURLToPath } from "url";
import chulk from "chalk";
import { addArg, parseArgs } from "./cli.js";
import { generateReadme, writeReadme } from "./readme.js";
import { getPackage, mapObject } from "./utils.js";

export type PackagePerson =
    | string
    | {
          name: string;
          email?: string;
          url?: string;
      };

export type PackageInfo = {
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

type GeneratorOptions = {
    about?: string;
    direct?: boolean;
    output?: string;
    package?: string;
    screenshot?: string;
};

const generate = async ({
    direct = false,
    output = "./README.md",
    package: pkg = "./package.json",
    about,
    screenshot
}: GeneratorOptions) => {
    const packageInfo = await getPackage(pkg);

    if (!packageInfo) {
        console.log(chulk.bgRed`package.json file not found or corrupted`);
        process.exitCode = 1;
        return "";
    }

    const content = generateReadme(packageInfo, {
        about,
        screenshot
    });

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
            console.log(chulk.bgRed`own package.json missing or corrupted`);
            return;
        }

        help.run(ownPackage);
        return;
    }

    const options = mapObject(
        rest,
        (_, v) => v.hasValue && (v.value || v.defaultValue)
    );

    const content = await generate(options);

    return content;
};

const scriptPath = createRequire(import.meta.url).resolve(process.argv[1]);
const modulePath = fileURLToPath(import.meta.url);
if (modulePath === scriptPath) run(process.argv);

export { generate };
