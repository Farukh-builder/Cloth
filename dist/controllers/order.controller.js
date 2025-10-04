"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = __importStar(require("../libs/Error"));
const Order_Service_1 = __importDefault(require("../models/Order.Service"));
const orderService = new Order_Service_1.default();
const orderController = {};
orderController.createOrder = async (req, res) => {
    try {
        console.log("createOrder");
        const result = await orderService.createOrder(req.member, req.body);
        res.status(Error_1.HttpCode.CREATED).json(result);
    }
    catch (err) {
        console.log("Error, createOrder:", err);
        if (err instanceof Error_1.default)
            res.status(err.code).json(err);
        else
            res.status(Error_1.default.standard.code).json(Error_1.default.standard);
    }
};
orderController.getMyOrders = async (req, res) => {
    try {
        console.log("getMyOrders");
        const { page, limit, orderStatus } = req.query;
        const inquiry = {
            page: Number(page),
            limit: Number(limit),
            orderStatus: orderStatus,
        };
        const result = await orderService.getMyOrders(req.member, inquiry);
        res.status(Error_1.HttpCode.CREATED).json(result);
    }
    catch (err) {
        console.log("Error, getMyOrders:", err);
        if (err instanceof Error_1.default)
            res.status(err.code).json(err);
        else
            res.status(Error_1.default.standard.code).json(Error_1.default.standard);
    }
};
orderController.updateOrder = async (req, res) => {
    try {
        console.log("updateOrder");
        const input = req.body;
        const result = await orderService.updateOrder(req.member, input);
        res.status(Error_1.HttpCode.CREATED).json(result);
    }
    catch (err) {
        console.log("Error, updateOrder:", err);
        if (err instanceof Error_1.default)
            res.status(err.code).json(err);
        else
            res.status(Error_1.default.standard.code).json(Error_1.default.standard);
    }
};
exports.default = orderController;
