"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dogRoutes_1 = __importDefault(require("../routes/dogRoutes"));
const swagger_1 = require("./swagger");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3200;
app.use(express_1.default.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use("/api", dogRoutes_1.default);
app.use('/', swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.swaggerDocs));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map