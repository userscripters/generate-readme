var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import chulk from "chalk";
import { open } from "fs/promises";
import { formatContributors } from "./contributors";
import { formatEmail, formatImage, formatMdRow, formatUrl } from "./formatters";
import { formatLicense } from "./license";
import { mdLink, parseAuthor, scase } from "./utils";
export const generateReadme = ({ author, contributors = [], description, license, name: packageName, version, bugs, }, { about, screenshot } = {}) => {
    const { name, email, url } = parseAuthor(author);
    const aemail = formatEmail(email);
    const alink = formatUrl(url);
    const llink = formatLicense(license);
    const contribs = formatContributors(contributors);
    const rows = [
        formatMdRow("name", scase(packageName)),
        formatMdRow("description", description),
        formatMdRow("license", llink),
        formatMdRow("version", version),
    ];
    if (contribs)
        rows.unshift(formatMdRow("contributors", contribs));
    const screenshots = [];
    if (screenshot) {
        screenshots.push(formatImage(screenshot));
    }
    const content = `
# About

| Author       | ${name}${aemail}${alink} |
| :----------- | :----------------------- |
${rows.join("\n")}
${about ? `\n${about}` : ""}
${screenshots.length ? `# Screenshots\n${screenshots.join("\n")}\n` : ""}
# Support

Bug reports for the project should be ${mdLink("submitted here", bugs.url)}.
<br>Before adding a new one, please check if it hasn't been raised before.
  `;
    return content;
};
export const writeReadme = (path, content) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const handle = yield open(path, "w+");
        yield handle.write(content);
    }
    catch (error) {
        if (error instanceof Error) {
            const errorLog = `Failed to generate README:

    ${chulk.bgRed(error === null || error === void 0 ? void 0 : error.name)}
    ${error === null || error === void 0 ? void 0 : error.message}
      `;
            console.log(errorLog);
        }
        else {
            console.log("Unexpected error", error);
        }
        process.exitCode = 1;
    }
});
