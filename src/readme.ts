import { bgRed } from "chalk";
import { open } from "fs/promises";
import { PackageInfo } from ".";
import { formatContributors } from "./contributors";
import { formatEmail, formatImage, formatMdRow, formatUrl } from "./formatters";
import { formatLicense } from "./license";
import { mdLink, parseAuthor, scase } from "./utils";

type GenerateReadmeOptions = {
    about?: string;
    screenshot?: string;
};

export const generateReadme = ({
    author,
    contributors = [],
    description,
    license,
    name: packageName,
    version,
    bugs,
}: PackageInfo, {
    about,
    screenshot
}: GenerateReadmeOptions = {}) => {
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

    const screenshots: string[] = [];
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

export const writeReadme = async (path: string, content: string) => {
    try {
        const handle = await open(path, "w+");
        await handle.write(content);
    } catch (error) {
        if (error instanceof Error) {
            const errorLog = `Failed to generate README:

    ${bgRed(error?.name)}
    ${error?.message}
      `;

            console.log(errorLog);
        } else {
            console.log("Unexpected error", error);
        }

        process.exitCode = 1;
    }
};
