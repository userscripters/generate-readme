"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatLicense = void 0;
const utils_1 = require("./utils");
const formatLicense = (license) => {
    return license
        ? (0, utils_1.mdLink)(license, `https://spdx.org/licenses/${license}`)
        : `Not adopted (see ${(0, utils_1.mdLink)("GitHub default grant", "https://docs.github.com/en/github/site-policy/github-terms-of-service#5-license-grant-to-other-users")})`;
};
exports.formatLicense = formatLicense;
