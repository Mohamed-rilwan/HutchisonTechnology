import express from 'express';
import dogRoutes from '../routes/dogRoutes';
import { swaggerDocs, swaggerUi } from './swagger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 
app.use("/api", dogRoutes)
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});