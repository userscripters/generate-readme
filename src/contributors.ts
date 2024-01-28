import { PackagePerson } from ".";
import { formatEmail, formatUrl } from "./formatters.js";
import { parseAuthor } from "./utils.js";

/**
 * @summary formats a 'contributors' field
 * @param {PackagePerson[]} contributors package contributors
 * @returns {string}
 */
export const formatContributors = (contributors: PackagePerson[]): string => {
    return contributors
        .map((c) => {
            const { name, email, url } = parseAuthor(c);
            return `${name}${formatEmail(email)}${formatUrl(url)}`;
        })
        .join("<br>");
};
