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
exports.loadInitialData = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Missile_1 = __importDefault(require("../models/Missile"));
const Organizasion_1 = __importDefault(require("../models/Organizasion"));
const loadInitialData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // קריאת קובצי JSON
        const missilesData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, '../../data/missiles.json'), 'utf-8'));
        const organizationsData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, '../../data/organizations.json'), 'utf-8'));
        // מחיקת נתונים קיימים כדי להימנע משכפולים
        yield Missile_1.default.deleteMany({});
        yield Organizasion_1.default.deleteMany({});
        // הכנסת הנתונים למסד הנתונים
        yield Missile_1.default.insertMany(missilesData);
        yield Organizasion_1.default.insertMany(organizationsData);
        console.log('Initial data loaded successfully');
    }
    catch (error) {
        console.error('Error loading initial data:', error);
    }
});
exports.loadInitialData = loadInitialData;
