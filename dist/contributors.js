import { formatEmail, formatUrl } from "./formatters";
import { parseAuthor } from "./utils";
export const formatContributors = (contributors) => {
    return contributors
        .map((c) => {
        const { name, email, url } = parseAuthor(c);
        return `${name}${formatEmail(email)}${formatUrl(url)}`;
    })
        .join("<br>");
};
