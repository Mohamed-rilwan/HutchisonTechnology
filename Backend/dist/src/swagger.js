"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerUi = exports.swaggerDocs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
exports.swaggerUi = swagger_ui_express_1.default;
require('dotenv').config();
const cors = require('cors');
const HOST_URL = process.env.HOST_URL || 'http://localhost:3200';
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
                url: `${HOST_URL}`
            },
        ],
    },
    apis: ['./routes/*.ts'],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
exports.swaggerDocs = swaggerDocs;
//# sourceMappingURL=swagger.js.map