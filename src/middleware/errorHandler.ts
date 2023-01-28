import { Request, Response, NextFunction } from 'express';
import { CustomError } from './error/customError';

export const handleError = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let customError = err;
    
    //Default Message
    if (!(err instanceof CustomError)) {
        customError = new CustomError(
            500,
            'Internal server error',
            'Internal server error'
        );
    }
    //에러 결과 응답
    res.status((customError as CustomError).statusCode).send(customError);
};
