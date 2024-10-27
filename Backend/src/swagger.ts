import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Dog Listing Application API',
            version: '1.0.0',
            description: 'API to list and manage dog breeds',
        },
        servers: [
            {
                url: 'http://localhost:3200/',
            },
        ],
    },
    apis: ['./routes/*.ts'],

};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerDocs, swaggerUi };
