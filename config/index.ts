import dotenv from "dotenv";
dotenv.config();

enum EnvVarType {
  STRING = "STRING",
  NUMBER = "NUMBER",
  BOOLEAN = "BOOLEAN",
}

interface Config {
  port: number;
  node_env: string;
  timeout: number;
}

// Define a map with validation functions for each type
const typeValidators: Record<EnvVarType, (value: string) => any> = {
  [EnvVarType.NUMBER]: (value: string) => {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) throw new Error(`Expected a number, but got "${value}"`);
    return parsed;
  },
  [EnvVarType.STRING]: (value: string) => value,
  [EnvVarType.BOOLEAN]: (value: string) => {
    if (value.toLowerCase() === "true" || value === "1") return true;
    if (value.toLowerCase() === "false" || value === "0") return false;
    throw new Error(`Expected a boolean, but got "${value}"`);
  },
};

// Environment variables specification with runtime "type" validation
const envSpecs: { [key in keyof Config]: EnvVarType } = {
  port: EnvVarType.NUMBER,
  node_env: EnvVarType.STRING,
  timeout: EnvVarType.NUMBER,
};

function loadConfig(): Config | undefined {
  let config: Partial<Config> = {};

  for (const [key, type] of Object.entries(envSpecs)) {
    const envValue = process.env[key.toUpperCase()];
    if (!envValue)
      throw new Error(`Environment variable ${key.toUpperCase()} is missing`);

    const validator = typeValidators[type];
    if (!validator) throw new Error(`No validator for type "${type}"`);

    config[key as keyof Config] = validator(envValue);
  }

  return config as Config;
}

const config = loadConfig();
export default config;
