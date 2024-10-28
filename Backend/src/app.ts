import express from 'express';
import dogRoutes from '../routes/dogRoutes';
import { swaggerDocs, swaggerUi } from './swagger';

require('dotenv').config();

const app = express();
const HOST_URL = process.env.HOST_URL || 'http://localhost:3200'

app.use(express.json()); 
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use("/api", dogRoutes)
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(HOST_URL, () => {
    console.log(`Server is running on ${HOST_URL}  `);
});