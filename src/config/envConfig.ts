import * as process from "node:process";
import { config } from 'dotenv';
import { IEnvConfig } from '../bin/interfaces/IEnvConfig';

let cfg: IEnvConfig
let initialized = false;

function initConfig(): IEnvConfig{
  config();
  cfg = process.env as any as IEnvConfig;
  initialized = true;
  return cfg;
}

export const getConfig: (() => IEnvConfig) = () => initialized ? cfg : initConfig();