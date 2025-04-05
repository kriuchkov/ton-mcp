import { Logger } from 'tslog';

const logger = new Logger({
  type: "pretty",
  minLevel: Bun.env.LOG_LEVEL ? Number(Bun.env.LOG_LEVEL) || 3 : 3,
});
export default logger; 