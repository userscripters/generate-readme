import { mdLink } from "./utils";
export const formatLicense = (license) => {
    return license
        ? mdLink(license, `https://spdx.org/licenses/${license}`)
        : `Not adopted (see ${mdLink("GitHub default grant", "https://docs.github.com/en/github/site-policy/github-terms-of-service#5-license-grant-to-other-users")})`;
};
