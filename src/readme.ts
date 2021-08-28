import { bgRed } from "chalk";
import { open } from "fs/promises";
import type { PackageInfo } from ".";
import { mdLink, parseAuthor, scase } from "./utils";

const formatEmail = (email?: string) =>
    email ? `<br>email: ${mdLink(email, `mailto:${email}`)}` : "";

const formatUrl = (url?: string) =>
    url ? `<br>website: ${mdLink(url, url)}` : "";

export const generateReadme = ({
    author,
    contributors = [],
    description,
    license,
    name: packageName,
    version,
    bugs,
}: PackageInfo) => {
    const { name, email, url } = parseAuthor(author);

    const aemail = formatEmail(email);
    const alink = formatUrl(url);

    const llink = mdLink(license, `https://spdx.org/licenses/${license}`);

    const content = `
# About

| Author       | ${name}${aemail}${alink} |
| :----------- | :----------------------- |
| Name         | ${scase(packageName)}    |
| Description  | ${description}           |
| License      | ${llink}                 |
| Version      | ${version}               |

# Support

Bug reports for the project should be ${mdLink("submitted here", bugs.url)}.
<br>Before adding a new one, please check if it hasn't been raised before.
  `;

    return content;
};

export const writeReadme = async (path: string, content: string) => {
    try {
        const handle = await open(path, "w+");
        await handle.write(content);
    } catch ({ name, message }) {
        const errorLog = `Failed to generate README:

    ${bgRed(name)}
    ${message}
      `;

        console.log(errorLog);

        process.exitCode = 1;
    }
};
