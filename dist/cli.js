import { parseName } from "./utils.js";
class Arg {
    constructor(options) {
        Object.assign(this, options);
    }
    run(...args) {
        const { action } = this;
        return action === null || action === void 0 ? void 0 : action.apply(this, args);
    }
}
class SimpleArg extends Arg {
    constructor(options) {
        super(options);
        this.hasValue = false;
    }
}
class ValueArg extends Arg {
    constructor(options) {
        super(options);
        this.hasValue = true;
        Object.assign(this, options);
    }
}
const args = [];
export const showHelp = ({ description, name }) => {
    const { packageName } = parseName(name);
    const describedArgs = args.reduce((acc, { description, long, short }) => `${acc}-${short}, --${long}\t\t${description}\n`, "");
    console.log(`
${description}

Usage: ${packageName} [options]

All Options:
${describedArgs}`);
};
args.push(new SimpleArg({
    short: "h",
    long: "help",
    description: "show command help",
    action: showHelp,
    passed: false,
}));
export const addArg = (long, short, description, { hasValue, defaultValue, action } = {}) => {
    const base = new Arg({
        long,
        short,
        description,
        action,
        passed: false,
    });
    args.push(hasValue
        ? new ValueArg(Object.assign(Object.assign({}, base), { defaultValue, value: defaultValue }))
        : new SimpleArg(base));
};
export const parseArgs = (cliArgs) => {
    const mappedToArgs = args.map((arg) => {
        const { long, short } = arg;
        const cliArgIdx = cliArgs.findIndex((cliArg) => cliArg === `--${long}` || cliArg === `-${short}`);
        const passed = cliArgIdx !== -1;
        const value = passed ? cliArgs[cliArgIdx + 1] : void 0;
        const argVal = arg.hasValue
            ? new ValueArg(Object.assign(Object.assign({}, arg), { passed, value: value || arg.defaultValue || "" }))
            : new SimpleArg(arg);
        return [long, argVal];
    });
    return Object.fromEntries(mappedToArgs);
};
export const getValueArg = (args, key) => {
    const arg = args[key];
    return arg.hasValue ? arg : null;
};
