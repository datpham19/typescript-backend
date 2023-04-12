import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Request, Response } from 'express';
import app from '../app';

// Define options for swagger-jsdoc
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TypeScript Boilerplate API',
      version: '1.0.0',
      description: 'Your API description',
    },
    servers: [
      {
        url: 'http://localhost:3030',
        description: 'Development server',
      },
    ],
  },
  apis: ["**/*.{ts,js"]
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Serve swagger docs using swagger-ui-express
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Optional route to test the swagger docs
app.get('/api-docs-json', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

export default app;