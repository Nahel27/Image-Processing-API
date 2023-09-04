"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThumb = void 0;
const fs_1 = require("fs");
const posix_1 = __importDefault(require("path/posix"));
const sharp_1 = __importDefault(require("sharp"));
const getThumb = (req, res) => {
    const { filename, width, height } = req.query;
    const f = filename;
    const w = width;
    const h = height;
    try {
        if (f === undefined) {
            throw new Error('Please input a filename');
        }
    }
    catch (error) {
        res.send(String(error));
        return;
    }
    const [name, extension] = f.split('.');
    const resultName = `${name}-${w}x${h}.${extension}`;
    (0, fs_1.access)(`./assets/thumb/${resultName}`, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            try {
                if (!f) {
                    throw new Error('Please input a filename');
                }
                if (!Number(width) || !Number(height)) {
                    throw new Error('Please input the width and height as integers greater than 0');
                }
                yield (0, sharp_1.default)(`./assets/full/${f}`)
                    .resize(Number(width), Number(height))
                    .toFile(`./assets/thumb/${resultName}`);
                res.sendFile(`./assets/thumb/${resultName}`, {
                    root: 'C:/Users/nahel/Documents/Code/Project 1',
                });
            }
            catch (error) {
                res.send(String(error));
            }
        }
        else {
            res.sendFile(`./assets/thumb/${resultName}`, {
                root: posix_1.default.join(__dirname, '..'),
            });
        }
    }));
};
exports.getThumb = getThumb;
