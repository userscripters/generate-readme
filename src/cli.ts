import { PackageInfo } from ".";
import { parseName } from "./utils";

type AnyFunc = (...args: any[]) => any;

type BaseArg<A extends AnyFunc | undefined> = {
    short: string;
    long: string;
    description: string;
    action?: A;
    passed: boolean;
};

class Arg<A extends AnyFunc | undefined> implements BaseArg<A> {
    short!: string;
    long!: string;
    description!: string;
    action?: A;
    passed!: boolean;

    constructor(options: BaseArg<A>) {
        Object.assign(this, options);
    }

    run(...args: Parameters<Exclude<A, undefined>>) {
        const { action } = this;
        return action?.apply(this, args);
    }
}

class SimpleArg<A extends AnyFunc | undefined> extends Arg<A> {
    hasValue: false;

    constructor(options: BaseArg<A>) {
        super(options);
        this.hasValue = false;
    }
}

class ValueArg<A extends AnyFunc | undefined> extends Arg<A> {
    hasValue: true;
    defaultValue?: string;
    value!: string;

    constructor(
        options: BaseArg<A> & { defaultValue?: string; value: string }
    ) {
        super(options);
        this.hasValue = true;
        Object.assign(this, options);
    }
}

type Args<A extends AnyFunc | undefined = AnyFunc> = (
    | SimpleArg<A>
    | ValueArg<A>
)[];

type ArgOptions = { defaultValue?: string; action?: AnyFunc };

export type ArgsHash<A extends AnyFunc | undefined = AnyFunc> = {
    [x: string]: SimpleArg<A> | ValueArg<A>;
};

const args: Args = [];

export const showHelp = ({ description, name }: PackageInfo) => {
    const { packageName } = parseName(name);

    const describedArgs = args.reduce(
        (acc, { description, long, short }) =>
            `${acc}-${short}, --${long}\t\t${description}\n`,
        ""
    );

    console.log(`
${description}

Usage: ${packageName} [options]

All Options:
${describedArgs}`);
};

args.push(
    new SimpleArg({
        short: "h",
        long: "help",
        description: "show command help",
        action: showHelp,
        passed: false,
    })
);

export const addArg = (
    long: string,
    short: string,
    description: string,
    { defaultValue, action }: ArgOptions = {}
) => {
    const base = new Arg({
        long,
        short,
        description,
        action,
        passed: false,
    });

    args.push(
        defaultValue !== void 0
            ? new ValueArg({ ...base, defaultValue, value: defaultValue })
            : new SimpleArg(base)
    );
};

export const parseArgs = (cliArgs: string[]): ArgsHash => {
    const mappedToArgs = args.map((arg) => {
        const { long, short } = arg;

        const cliArgIdx = cliArgs.findIndex(
            (cliArg) => cliArg === `--${long}` || cliArg === `-${short}`
        );

        if (cliArgIdx !== -1) arg.passed = true;

        const argVal = arg.hasValue
            ? new ValueArg({
                  ...arg,
                  value: cliArgs[cliArgIdx + 1] || arg.defaultValue || "",
              })
            : new SimpleArg(arg);

        return [long, argVal] as const;
    });

    return Object.fromEntries(mappedToArgs);
};

export const getValueArg = <A extends AnyFunc | undefined = AnyFunc>(
    args: ArgsHash<A>,
    key: string
): ValueArg<A> | null => {
    const arg = args[key];
    return arg.hasValue ? arg : null;
};
