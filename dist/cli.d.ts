import { PackageInfo } from ".";
declare type AnyFunc = (...args: any[]) => any;
declare type BaseArg<A extends AnyFunc | undefined> = {
    short: string;
    long: string;
    description: string;
    action?: A;
    passed: boolean;
};
declare class Arg<A extends AnyFunc | undefined> implements BaseArg<A> {
    short: string;
    long: string;
    description: string;
    action?: A;
    passed: boolean;
    constructor(options: BaseArg<A>);
    run(...args: Parameters<Exclude<A, undefined>>): any;
}
declare class SimpleArg<A extends AnyFunc | undefined> extends Arg<A> {
    hasValue: false;
    constructor(options: BaseArg<A>);
}
declare class ValueArg<A extends AnyFunc | undefined> extends Arg<A> {
    hasValue: true;
    defaultValue?: string;
    value?: string;
    constructor(options: BaseArg<A> & {
        defaultValue?: string;
        value?: string;
    });
}
declare type ArgOptions = {
    hasValue?: boolean;
    defaultValue?: string;
    action?: AnyFunc;
};
export declare type ArgsHash<A extends AnyFunc | undefined = AnyFunc> = {
    [x: string]: SimpleArg<A> | ValueArg<A>;
};
export declare const showHelp: ({ description, name }: PackageInfo) => void;
export declare const addArg: (long: string, short: string, description: string, { hasValue, defaultValue, action }?: ArgOptions) => void;
export declare const parseArgs: (cliArgs: string[]) => ArgsHash;
export declare const getValueArg: <A extends AnyFunc | undefined = AnyFunc>(args: ArgsHash<A>, key: string) => ValueArg<A> | null;
export {};
