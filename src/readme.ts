import { bgRed } from "chalk";
import { open } from "fs/promises";
import type { PackageInfo } from ".";
import { mdLink, parseAuthor, scase } from "./utils";

export const generateReadme = async (
  path: string,
  {
    author,
    description,
    license,
    name: packageName,
    version,
    bugs,
  }: PackageInfo
) => {
  try {
    const handle = await open(path, "w+");

    const { name, email, url } = parseAuthor(author);

    const aemail = email ? `<br>email: ${mdLink(email, `mailto:${email}`)}` : "";
    const alink = url ? `<br>website: ${mdLink(url, url)}` : "";

    const llink = mdLink(license, `https://spdx.org/licenses/${license}`);

    const template = `
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

    await handle.write(template);
  } catch ({ name, message }) {
    console.log(`Failed to generate README:

    ${bgRed(name)}
    ${message}
      `);
    process.exitCode = 1;
  }
};
