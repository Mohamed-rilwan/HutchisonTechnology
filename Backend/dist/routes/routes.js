"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dogsData = require('../data/dogs.json');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const router = express_1.default.Router();
let dogList = dogsData;
console.log("doglist", dogList);
router.get("/list", (_, res) => {
    res.json(dogList);
});
router.put('/breed', (req, res) => {
    const index = dogsData.dogs(item => item.findIndex(item));
    if (index == -1) {
        res.status(404).json({ message: ' Dogs not found' });
    }
    else {
        const dogs = req.body;
    }
});
router.post('/:breed/subbreeds', (req, res) => {
    const breed = req.params.breed;
    const subbreed = req.body;
    if (dogList[breed]) {
        // if(!dogList[breed].includes(subbreed)){
        //     dogList[breed].push(subbreed);
        // }
    }
});
exports.default = router;
//# sourceMappingURL=routes.js.map