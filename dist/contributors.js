"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatContributors = void 0;
const formatters_1 = require("./formatters");
const utils_1 = require("./utils");
const formatContributors = (contributors) => {
    return contributors
        .map((c) => {
        const { name, email, url } = (0, utils_1.parseAuthor)(c);
        return `${name}${(0, formatters_1.formatEmail)(email)}${(0, formatters_1.formatUrl)(url)}`;
    })
        .join("<br>");
};
exports.formatContributors = formatContributors;
