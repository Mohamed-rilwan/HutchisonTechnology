import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
require('dotenv').config();

const HOST_URL = process.env.HOST_URL
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
                url: {HOST_URL},
            },
        ],
    },
    apis: ['./routes/*.ts'],

};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerDocs, swaggerUi };
