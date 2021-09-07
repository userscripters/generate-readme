import { mdLink } from "./utils";

/**
 * @summary formats a license field
 * @param {string} [license] license short code
 * @returns {string}
 */
export const formatLicense = (license?: string) => {
    return license
        ? mdLink(license, `https://spdx.org/licenses/${license}`)
        : `Not adopted (see ${mdLink(
            "GitHub default grant",
            "https://docs.github.com/en/github/site-policy/github-terms-of-service#5-license-grant-to-other-users"
        )})`;
};
