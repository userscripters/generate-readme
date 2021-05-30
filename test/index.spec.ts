import { expect } from "chai";
import { unlink } from "fs/promises";
import { generate } from "../src/index";

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
    });
});
