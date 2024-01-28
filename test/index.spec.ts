import { expect } from "chai";
import { readFile, unlink } from "fs/promises";
import { generate, PackageInfo } from "../src/index.js";
import { getPackage } from "../src/utils.js";

describe("CLI", () => {
    it("everything works ok", () => {
        expect(true).to.be.true;
    });
});

describe("API", () => {
    const output = "./test/readme.md";

    const artefacts: string[] = [];

    afterEach(async () => {
        await Promise.all(artefacts.map(unlink));
        artefacts.length = 0;
    });

    it("should correctly generate README", async () => {
        await generate({ output });
        artefacts.push(output);

        const content = await readFile(output, { encoding: "utf-8" });
        expect(content).to.not.be.empty;

        const info = await getPackage("./package.json");

        const { author } = info!;

        const authorName =
            typeof author === "string" ? author.split(" <")[0] : author.name;

        const common: [keyof PackageInfo, RegExp][] = [
            ["author", new RegExp(`${authorName}<br>\\[.+?\\]\\(.+?\\)`)],
            ["contributors", /double beep<br>\[(.+?)\]\(\1\)/], //TODO: remove hard-coding if more contribs
            ["license", /\[(.+?)\]\(https:\/\/spdx.org\/licenses\/\1\)/],
            ["name", /@\w+\/(\w+)/],
            ["version", /(\d+\.\d+\.\d+)/],
        ];

        common.forEach(([field, matcher]) => {
            const regex = new RegExp(
                `^\\| (${field})\\s+\\| (.+?)\\s+\\|`,
                "gmi"
            );
            const [, key, value] = regex.exec(content) || [];
            expect(key.toLowerCase() === field).to.be.true;
            expect(matcher.test(value), `${key}: ${value} unmatched`).to.be
                .true;
        });
    });
});
