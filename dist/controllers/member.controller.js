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
const Member_service_1 = __importDefault(require("../models/Member.service"));
const Error_1 = __importStar(require("../libs/Error"));
const Auth_service_1 = __importDefault(require("../models/Auth.service"));
const config_1 = require("../libs/config");
const memberService = new Member_service_1.default();
const authService = new Auth_service_1.default();
const memberController = {};
memberController.getStore = async (req, res) => {
    try {
        console.log("getRestaurant");
        const result = await memberService.getStore();
        res.status(Error_1.HttpCode.OK).json(result);
    }
    catch (err) {
        console.log('Error,  getRestaurant:', err);
        if (err instanceof Error_1.default)
            res.status(err.code).json(err);
        else
            res.status(Error_1.default.standard.code).json(Error_1.default.standard);
    }
};
memberController.signup = async (req, res) => {
    try {
        console.log("signup");
        const input = req.body, result = await memberService.signup(input);
        const token = await authService.createToken(result);
        res.cookie("accessToken", token, {
            maxAge: config_1.AUTH_TIMER * 3600 * 1000,
            httpOnly: false
        });
        res.status(Error_1.HttpCode.CREATED).json({ member: result, accessToken: token });
    }
    catch (err) {
        console.log('Error,  signup:', err);
        if (err instanceof Error_1.default)
            res.status(err.code).json(err);
        else
            res.status(Error_1.default.standard.code).json(Error_1.default.standard);
    }
};
memberController.login = async (req, res) => {
    try {
        console.log("login");
        const input = req.body, result = await memberService.login(input), token = await authService.createToken(result);
        res.cookie("accessToken", token, {
            maxAge: config_1.AUTH_TIMER * 3600 * 1000, httpOnly: false
        });
        res.status(Error_1.HttpCode.OK).json({ member: result, accessToken: token });
    }
    catch (err) {
        console.log('Error, login:', err);
        if (err instanceof Error_1.default)
            res.status(err.code).json(err);
        else
            res.status(Error_1.default.standard.code).json(Error_1.default.standard);
    }
};
memberController.logout = (req, res) => {
    try {
        console.log("logout:");
        res.cookie("accessToken", null, { maxAge: 0, httpOnly: true });
        res.status(Error_1.HttpCode.OK).json({ logout: true });
    }
    catch (err) {
        console.log('Error, logout:', err);
        if (err instanceof Error_1.default)
            res.status(err.code).json(err);
        else
            res.status(Error_1.default.standard.code).json(Error_1.default.standard);
    }
};
memberController.getMemberDetail = async (req, res) => {
    try {
        console.log("getMemberDetail");
        const result = await memberService.getMemberDetail(req.member);
        res.status(Error_1.HttpCode.OK).json(result);
    }
    catch (err) {
        console.log("Error, getMemberDetail:", err);
        if (err instanceof Error_1.default)
            res.status(err.code).json(err);
        else
            res.status(Error_1.default.standard.code).json(Error_1.default.standard);
    }
};
memberController.updateMember = async (req, res) => {
    try {
        console.log("updateMember");
        const input = req.body;
        if (req.file)
            input.memberImage = req.file.path.replace(/\\/g, "/");
        const result = await memberService.updateMember(req.member, input);
        res.status(Error_1.HttpCode.OK).json(result);
    }
    catch (err) {
        console.log("Error, updateMember:", err);
        if (err instanceof Error_1.default)
            res.status(err.code).json(err);
        else
            res.status(Error_1.default.standard.code).json(Error_1.default.standard);
    }
};
memberController.getTopUsers = async (req, res) => {
    try {
        console.log("getTopUsers");
        const result = await memberService.getTopUsers();
        res.status(Error_1.HttpCode.OK).json(result);
    }
    catch (err) {
        console.log("Error, getTopUsers:", err);
        if (err instanceof Error_1.default)
            res.status(err.code).json(err);
        else
            res.status(Error_1.default.standard.code).json(Error_1.default.standard);
    }
};
memberController.verifyAuth = async (req, res, next) => {
    try {
        const token = req.cookies["accessToken"];
        if (token)
            req.member = await authService.checkAuth(token);
        if (!req.member)
            throw new Error_1.default(Error_1.HttpCode.UNAUTHORIZED, Error_1.Message.NOT_AUTHENTICATED);
        next();
    }
    catch (err) {
        console.log("Error, verifyAuth:", err);
        if (err instanceof Error_1.default)
            res.status(err.code).json(err);
        else
            res.status(Error_1.default.standard.code).json(Error_1.default.standard);
    }
};
memberController.retrieveAuth = async (req, res, next) => {
    try {
        const token = req.cookies["accessToken"];
        if (token)
            req.member = await authService.checkAuth(token);
        next();
    }
    catch (err) {
        console.log("Error, retrieveAuth :", err);
        next();
    }
};
exports.default = memberController;
