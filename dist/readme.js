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
const utils_1 = require("./utils");
const generateReadme = ({ author, description, license, name: packageName, version, bugs, }) => {
    const { name, email, url } = utils_1.parseAuthor(author);
    const aemail = email
        ? `<br>email: ${utils_1.mdLink(email, `mailto:${email}`)}`
        : "";
    const alink = url ? `<br>website: ${utils_1.mdLink(url, url)}` : "";
    const llink = utils_1.mdLink(license, `https://spdx.org/licenses/${license}`);
    const content = `
# About

| Author       | ${name}${aemail}${alink} |
| :----------- | :----------------------- |
| Name         | ${utils_1.scase(packageName)}    |
| Description  | ${description}           |
| License      | ${llink}                 |
| Version      | ${version}               |

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
