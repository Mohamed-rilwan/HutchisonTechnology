import express from 'express';
import dogRoutes from '../routes/dogRoutes';
import { swaggerDocs, swaggerUi } from './swagger';

const app = express();
const PORT = process.env.PORT || 3200;

app.use(express.json()); 
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use("/api", dogRoutes)
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});