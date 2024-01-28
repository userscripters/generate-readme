import { formatEmail, formatUrl } from "./formatters.js";
import { parseAuthor } from "./utils.js";
export const formatContributors = (contributors) => {
    return contributors
        .map((c) => {
        const { name, email, url } = parseAuthor(c);
        return `${name}${formatEmail(email)}${formatUrl(url)}`;
    })
        .join("<br>");
};
