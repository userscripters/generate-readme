import { bgRed } from "chalk";
import { open } from "fs/promises";
import type { PackageInfo } from ".";

const scase = (text: string) =>
  `${text[0].toUpperCase()}${text.slice(1).toLowerCase()}`;

const link = (lbl: string, href: string) => `[${lbl}](${href})`;

const parseAuthor = (
  info: PackageInfo["author"]
): Exclude<PackageInfo["author"], string> => {
  if (typeof info === "object") return info;

  const authorRegex = /(\w+\s\w+)(?:\s<(.+?)>)?(?:\s\((.+?)\))?$/i;

  const [_full, name, email, url] = authorRegex.exec(info)!;

  return {
    name,
    email,
    url,
  };
};

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

    const aemail = email ? `<br>email: ${link(email, `mailto:${email}`)}` : "";
    const alink = url ? `<br>website: ${link(url, url)}` : "";

    const llink = link(license, `https://spdx.org/licenses/${license}`);

    const template = `
# About

| Author       | ${name}${aemail}${alink} |
| :----------- | :----------------------- |
| Name         | ${scase(packageName)}    |
| Description  | ${description}           |
| License      | ${llink}                 |
| Version      | ${version}               |

# Support

Bug reports for the project should be ${link("submitted here", bugs.url)}.
Before adding a new one, please check if it hasn't been raised before.
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
