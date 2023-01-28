import morgan, { StreamOptions } from "morgan";
import logger from "./winston";

const combined = ':method :url :status'
const morganFormat = process.env.NODE_ENV !== "production" ? 'dev' : combined;

const stream: StreamOptions = {
    write: (message) => logger.info(message),
};

const morganLog = morgan(morganFormat, { stream });

export default morganLog;