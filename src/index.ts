import { bgRed } from "chalk";
import { readFile } from "fs/promises";
import { addArg, getValueArg, parseArgs } from "./cli";
import { generateReadme } from "./readme";

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

const getPackage = async (path: string): Promise<PackageInfo | null> => {
  try {
    const contents = await readFile(path, { encoding: "utf-8" });
    return JSON.parse(contents);
  } catch (error) {
    return null;
  }
};

addArg("package", "p", "path to package.json to use", {
  defaultValue: "./package.json",
});

addArg("output", "o", "path to output directory", {
  defaultValue: "./README.md",
});

const run = async () => {
  const {
    argv: [_path, _file, ...cliArgs],
  } = process;

  const args = parseArgs(cliArgs);

  const { passed, action } = args["help"];
  if (passed && action) {
    const ownPackage = await getPackage("./package.json");
    if (!ownPackage) {
      console.log(bgRed`own package.json missing or corrupted`);
      return;
    }

    const { description, name } = ownPackage;
    action(name, description);
    return;
  }

  const { value: packagePath } = getValueArg(args, "package")!;

  const contents = await getPackage(packagePath);
  if (!contents) {
    console.log(bgRed`package.json file not found or corrupted`);
    process.exitCode = 1;
    return;
  }

  const { value: outputPath } = getValueArg(args, "output")!;

  await generateReadme(outputPath, contents);
};

export default run();
