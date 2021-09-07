import { mdLink } from "./utils";

export const formatEmail = (email?: string) =>
    email ? `<br>${mdLink(email, `mailto:${email}`)}` : "";

export const formatUrl = (url?: string) =>
    url ? `<br>${mdLink(url, url)}` : "";
