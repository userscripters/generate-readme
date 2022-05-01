import { mdLink, scase } from "./utils";

export const formatEmail = (email?: string) =>
    email ? `<br>${mdLink(email, `mailto:${email}`)}` : "";

export const formatUrl = (url?: string) =>
    url ? `<br>${mdLink(url, url)}` : "";

/**
 * @summary formats and MD table row
 * @param {string} title field title
 * @param {string} value field value
 * @returns {string}
 */
export const formatMdRow = (title: string, value: string): string =>
    `| ${scase(title)} | ${value} |`;

/**
 * @summary formats an image link
 */
export const formatImage = (url: string, alt = url) => `!${mdLink(alt, alt)}`;