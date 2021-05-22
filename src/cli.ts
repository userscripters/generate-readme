type BaseArg = {
  short: string;
  long: string;
  description: string;
  action?: (...args: any[]) => any;
  passed: boolean;
};

type ValueArg = BaseArg & {
  hasValue: true;
  defaultValue?: string;
  value: string;
};

type SimpleArg = BaseArg & {
  hasValue: false;
};

type Arg = ValueArg | SimpleArg;

type Args = Arg[];

type ArgOptions = { defaultValue?: string; action?: (...args: any[]) => any };

type ArgsHash = { [x: string]: Arg };

const args: Args = [];

export const showHelp = (packageName: string, description: string) => {
  const describedArgs = args.reduce(
    (acc, { description, long, short }) =>
      `${acc}-${short}, --${long}\t\t${description}\n`,
    ""
  );

  console.log(`
${description}

Usage: ${packageName} [options]

All Options:

${describedArgs}
`);
};

args.push({
  short: "h",
  long: "help",
  description: "show command help",
  action: showHelp,
  hasValue: false,
  passed: false,
});

export const addArg = (
  long: string,
  short: string,
  description: string,
  { defaultValue, action }: ArgOptions = {}
) => {
  const base: BaseArg = {
    long,
    short,
    description,
    action,
    passed: false,
  };

  args.push(
    defaultValue !== void 0
      ? { ...base, hasValue: true, defaultValue, value: defaultValue }
      : { ...base, hasValue: false }
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
      ? { ...arg, value: cliArgs[cliArgIdx + 1] || arg.defaultValue || "" }
      : arg;

    return [long, argVal] as const;
  });

  return Object.fromEntries(mappedToArgs);
};

export const getValueArg = (args: ArgsHash, key: string): ValueArg | null => {
  const arg = args[key];
  return arg.hasValue ? arg : null;
};
