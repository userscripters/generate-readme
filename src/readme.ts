import { bgRed } from "chalk";
import { open } from "fs/promises";
import { PackageInfo } from ".";
import { mdLink, parseAuthor, scase } from "./utils";

const formatEmail = (email?: string) =>
    email ? `<br>${mdLink(email, `mailto:${email}`)}` : "";

const formatUrl = (url?: string) => (url ? `<br>${mdLink(url, url)}` : "");

/**
 * @summary formats a license field
 * @param {string} [license] license short code
 * @returns {string}
 */
const formatLicense = (license?: string) => {
    return license
        ? mdLink(license, `https://spdx.org/licenses/${license}`)
        : `Not adopted (see ${mdLink(
              "GitHub default grant",
              "https://docs.github.com/en/github/site-policy/github-terms-of-service#5-license-grant-to-other-users"
          )})`;
};

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

    const llink = formatLicense(license);

    const contribs = contributors
        .map((c) => {
            const { name, email, url } = parseAuthor(c);
            return `${name}${formatEmail(email)}${formatUrl(url)}`;
        })
        .join("<br>");

    const content = `
# About

| Author       | ${name}${aemail}${alink} |
| :----------- | :----------------------- |
| Contributors | ${contribs}              |
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
