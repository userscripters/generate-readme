import { expect } from "chai";
import { formatLicense } from "../../src/license";

describe("License", () => {
    describe("formatLicense", () => {
        it("should correctly format license", () => {
            const formatted = formatLicense("GPL-3.0-or-later");

            expect(formatted).to.match(
                /\[(.+?)\]\(https:\/\/spdx.org\/licenses\/\1\)/
            );
        });

        it("should return info on default grant on no license", () => {
            const defaulted = formatLicense();

            console.log(defaulted)

            expect(defaulted).to.match(/Not adopted \(see \[(.+?)\]\(.+?\)\)/);
        });
    });
});
