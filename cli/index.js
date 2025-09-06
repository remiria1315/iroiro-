const readline = require("readline");

class commandManager {
  constructor(prefix) {
    this.prefix = prefix;
    this.commands = {};
  }

  registerCommand(cmd) {
    if (!cmd.name) return console.error("Command must have a name!");
    this.commands[cmd.name] = cmd;
    if (cmd.alias) cmd.alias.forEach((a) => (this.commands[a] = cmd));
  }

  executeCommand(input) {
    const parts = input.trim().split(/\s+/);
    if (parts.length === 0) return;

    const cmdName = parts.shift();
    const cmd = this.commands[cmdName];
    if (!cmd) return console.log(`Command not found: ${cmdName}`);

    const pattern = cmd.args[0] || [];
    const minArgs = pattern.filter((arg) => arg[2] !== false).length;

    if (parts.length < minArgs) {
      const usage = pattern
        .map(([name, type, required]) => (required === false ? `[${name}:${type}]` : `<${name}:${type}>`))
        .join(" ");
      console.log(`Usage: ${this.prefix}${cmdName} ${usage} [otherArgs...]`);
      return;
    }

    const parsedArgs = pattern.map(([name, type, required], i) => {
      let val = parts[i];
      if (val === undefined) return undefined;

      if (cmd.doubles && cmd.doubles.includes(i)) {
        return parseFloat(val);
      }

      switch (type) {
        case "number":
        case "int":
          return parseInt(val);
        case "uint":
          return Math.max(0, parseInt(val));
        case "float":
          return parseFloat(val);
        case "bool":
          return val.toLowerCase() === "true";
        case "string":
        default:
          return val;
      }
    });

    const otherArgs = parts.slice(pattern.length);
    cmd.onExecute(parsedArgs, otherArgs);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const cm = new commandManager("");

cm.registerCommand({
  name: "echo",
  alias: [],
  args: [[["message", "string", false]]],
  doubles: [],
  onExecute: (args, otherArgs) => {
    console.log("args:", args);
    console.log("otherArgs:", otherArgs);
    console.log([...args, ...otherArgs].join(" "));
  },
});

cm.registerCommand({
  name: "calc",
  alias: [],
  args: [
    [
      ["x", "number", false],
      ["y", "number", false],
    ],
  ],
  doubles: [0, 1],
  onExecute: (args, otherArgs) => {
    console.log("args:", args);
    console.log("otherArgs:", otherArgs);
    console.log(
      "sum:",
      args.reduce((a, b) => a + b, 0)
    );
  },
});
cm.registerCommand({
  name: "echo",
  alias: ["print", "log", "console.log", "printl", "printf"],
  args: [[]],
  onExecute: (args, otherArgs) => {
    console.log([...args, ...otherArgs].join(" "));
  },
});
const { exec } = require("child_process");

cm.registerCommand({
  name: "exec",
  alias: ["run"],
  args: [[]],
  onExecute: async (args, otherArgs) => {
    const command = [...args, ...otherArgs].join(" ");
    try {
      const result = await new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) return reject(error);
          resolve({ stdout, stderr });
        });
      });

      console.log("stdout:", result.stdout == "" ? "none" : result.stdout);
      console.log("stderr:", result.stderr == "" ? "none" : result.stderr);
    } catch (err) {
      console.error("Error:", err);
    }
  },
});
class tempVar {
  constructor() {
    this.tempVars = {};
  }
  get(varName) {
    if (this.tempVars[varName]) {
      return this.tempVars[varName];
    } else {
      return undefined;
    }
  }
  set(varname, value = "hello, world") {
    if (!varname) return "varname指定しろカスマジで死ねあほが";
    if (this.tempVars[varname]) {
      this.tempVars[varname] = "";
    } else {
      this.tempVars[varname] = value;
    }
  }
}
tempVar_ = new tempVar();
cm.registerCommand({
  name: "var",
  alias: ["let", "set", "const"],
  args: [
    [
      ["variableName", "string", true],
      ["variavleValue", "any", true],
    ],
  ],
  onExecute: async (args, otherArgs) => {
    tempVar_.set(args[0], args[1]);
  },
});
cm.registerCommand({
  name: "$",
  alias: ["get"],
  args: [[["variableName", "string", true]]],
  onExecute: (args, otherArgs) => {
    console.log(tempVar_.get(args[0]));
  },
});
rl.on("line", (line) => cm.executeCommand(line));
