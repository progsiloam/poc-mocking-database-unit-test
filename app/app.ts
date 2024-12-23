import { handleError, setupLogger } from '@siloamhospitals/erp-template-expressjs-library';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import createHttpError from 'http-errors';
import 'reflect-metadata';
import swaggerUi, { type SwaggerOptions } from 'swagger-ui-express';
import { AllowedOrigins } from './cors.json';
import { RegisterRoutes } from './routes';
import swaggerDocument from './swagger.json';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: AllowedOrigins, // can be change to callback function: (requestOrigin, callback)
    exposedHeaders: ['content-disposition'],
    credentials: true,
  }),
);
app.use(express.json());
app.disable('x-powered-by');
app.use(cookieParser());

app.use(setupLogger);

// Setup Swagger
const swaggerOptions: SwaggerOptions = {
  swaggerOptions: {
    url: '/swagger/swagger.json',
    tagsSorter: 'alpha',
    apisSorter: 'alpha',
  },
};

app.get('/swagger/swagger.json', (req, res) => res.json(swaggerDocument));
app.use('/swagger', swaggerUi.serveFiles(undefined, swaggerOptions), swaggerUi.setup(undefined, swaggerOptions));

// Setup routes
RegisterRoutes(app);

// Handling non matching request
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(createHttpError.NotFound());
});

// error handler
app.use(handleError);

export default app;
