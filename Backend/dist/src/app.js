"use strict";
// src/app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("../routes/routes"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.get("/", (req, res) => { console.log("new ijwfwn"); });
// Routes
app.use('/api/dogs', routes_1.default);
// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map