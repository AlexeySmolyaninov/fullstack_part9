"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = require("../services/patientService");
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send(patientService_1.getPatients());
});
router.post("/", (req, res) => {
    try {
        const newPatient = utils_1.default(req.body);
        const savedNewPatient = patientService_1.addPatient(newPatient);
        res.send(savedNewPatient);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(400).send({ error: e.message });
        }
    }
});
exports.default = router;
