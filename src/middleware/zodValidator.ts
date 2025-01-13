import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';

interface ZodValidatorParams {
  querySchema?: ZodSchema<any>;
  bodySchema?: ZodSchema<any>;
  paramsSchema?: ZodSchema<any>;  
}

export const zodValidator =
  ({ querySchema, bodySchema, paramsSchema }: ZodValidatorParams) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (paramsSchema) paramsSchema.parse(req.params);
      if (querySchema) querySchema.parse(req.query); 
      if (bodySchema) bodySchema.parse(req.body); 
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        res.status(400).json({
          message: 'Validation Error',
          errors: formattedErrors,
        });
        return;
      }

      next(error);
    }
  };
