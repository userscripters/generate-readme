"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeReadme = exports.generateReadme = void 0;
const chalk_1 = require("chalk");
const promises_1 = require("fs/promises");
const contributors_1 = require("./contributors");
const formatters_1 = require("./formatters");
const license_1 = require("./license");
const utils_1 = require("./utils");
const generateReadme = ({ author, contributors = [], description, license, name: packageName, version, bugs, }) => {
    const { name, email, url } = utils_1.parseAuthor(author);
    const aemail = formatters_1.formatEmail(email);
    const alink = formatters_1.formatUrl(url);
    const llink = license_1.formatLicense(license);
    const contribs = contributors_1.formatContributors(contributors);
    const rows = [
        formatters_1.formatMdRow("name", utils_1.scase(packageName)),
        formatters_1.formatMdRow("description", description),
        formatters_1.formatMdRow("license", llink),
        formatters_1.formatMdRow("version", version),
    ];
    if (contribs)
        rows.unshift(formatters_1.formatMdRow("contributors", contribs));
    const content = `
# About

| Author       | ${name}${aemail}${alink} |
| :----------- | :----------------------- |
${rows.join("\n")}

# Support

Bug reports for the project should be ${utils_1.mdLink("submitted here", bugs.url)}.
<br>Before adding a new one, please check if it hasn't been raised before.
  `;
    return content;
};
exports.generateReadme = generateReadme;
const writeReadme = (path, content) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const handle = yield promises_1.open(path, "w+");
        yield handle.write(content);
    }
    catch ({ name, message }) {
        const errorLog = `Failed to generate README:

    ${chalk_1.bgRed(name)}
    ${message}
      `;
        console.log(errorLog);
        process.exitCode = 1;
    }
});
exports.writeReadme = writeReadme;
