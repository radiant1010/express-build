import winston from 'winston';
const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(info => { return `[ ${info.level} ] ${info.timestamp} : ${info.message}` });

const logger = winston.createLogger({
    format:
        combine(
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            logFormat,
        ),
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: combine(
            colorize({ all: true }),
            logFormat,
        )
    }));
}

export default logger;