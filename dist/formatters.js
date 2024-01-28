import { mdLink, scase } from "./utils";
export const formatEmail = (email) => email ? `<br>${mdLink(email, `mailto:${email}`)}` : "";
export const formatUrl = (url) => url ? `<br>${mdLink(url, url)}` : "";
export const formatMdRow = (title, value) => `| ${scase(title)} | ${value} |`;
export const formatImage = (url, alt = url) => `!${mdLink(alt, alt)}`;
