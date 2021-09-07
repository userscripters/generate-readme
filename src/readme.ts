import { bgRed } from "chalk";
import { open } from "fs/promises";
import { PackageInfo } from ".";
import { formatContributors } from "./contributors";
import { formatEmail, formatMdRow, formatUrl } from "./formatters";
import { formatLicense } from "./license";
import { mdLink, parseAuthor, scase } from "./utils";

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
    const contribs = formatContributors(contributors);

    const rows: string[] = [
        formatMdRow("name", scase(packageName)),
        formatMdRow("description", description),
        formatMdRow("license", llink),
        formatMdRow("version", version),
    ];

    if (contribs) rows.unshift(formatMdRow("contributors", contribs));

    const content = `
# About

| Author       | ${name}${aemail}${alink} |
| :----------- | :----------------------- |
${rows.join("\n")}

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
