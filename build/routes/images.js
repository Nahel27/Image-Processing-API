"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images_1 = require("../controllers/images");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send('View README');
});
router.get('/images', images_1.getThumb);
exports.default = router;
