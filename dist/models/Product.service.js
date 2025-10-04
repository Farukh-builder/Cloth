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
const product_enum_1 = require("../libs/enums/product.enum");
const config_1 = require("../libs/config");
const Error_1 = __importStar(require("../libs/Error"));
const Product_model_1 = __importDefault(require("../schema/Product.model"));
const View_service_1 = __importDefault(require("./View.service"));
const view_enum_1 = require("../libs/enums/view.enum");
class ProductService {
    constructor() {
        this.productModel = Product_model_1.default;
        this.viewService = new View_service_1.default();
    }
    /** SPA */
    async getProducts(inquiry) {
        const match = { productStatus: product_enum_1.ProductStatus.PROCESS };
        if (inquiry.productCollection)
            match.productCollection = inquiry.productCollection;
        if (inquiry.search)
            match.productName = {
                $regex: new RegExp(inquiry.search, "i")
            };
        const sort = inquiry.order === "productPrice"
            ? { [inquiry.order]: 1 }
            : { [inquiry.order]: -1 };
        const result = await this.productModel
            .aggregate([
            { $match: match },
            { $sort: sort },
            { $skip: (inquiry.page * 1 - 1) * inquiry.limit },
            { $limit: inquiry.limit * 1 },
        ])
            .exec();
        if (!result)
            throw new Error_1.default(Error_1.HttpCode.NOT_FOUND, Error_1.Message.NO_DATA_FOUND);
        return result;
    }
    async getProduct(memberId, id) {
        const productId = (0, config_1.shapeIntoMongooseObjectId)(id);
        let result = await this.productModel.findOne({
            _id: productId,
            productStatus: product_enum_1.ProductStatus.PROCESS
        }).exec();
        if (!result)
            throw new Error_1.default(Error_1.HttpCode.NOT_FOUND, Error_1.Message.NO_DATA_FOUND);
        if (memberId) {
            // Chek Existence
            const input = {
                memberId: memberId,
                viewRefId: productId,
                viewGroup: view_enum_1.ViewGroup.PRODUCT,
            };
            const existView = await this.viewService.checkViewExistence(input);
            console.log("existView:", !!existView);
            if (!existView) {
                // Insert View
                await this.viewService.insertMemberView(input);
                // Increase Counts
                const result = await this.productModel
                    .findByIdAndUpdate(productId, { $inc: { productViews: +1 } }, { new: true })
                    .exec();
            }
        }
        return result;
    }
    /** SSR */
    async getAllProducts() {
        const result = await this.productModel.find().exec();
        if (!result)
            throw new Error_1.default(Error_1.HttpCode.NOT_FOUND, Error_1.Message.NO_DATA_FOUND);
        return result;
    }
    async createNewProduct(input) {
        try {
            return await this.productModel.create(input);
        }
        catch (err) {
            console.error("Error, model:createNewProduct:", err);
            throw new Error_1.default(Error_1.HttpCode.BAD_REQUEST, Error_1.Message.CREATE_FAILED);
        }
    }
    async updateChosenProduct(id, input) {
        id = (0, config_1.shapeIntoMongooseObjectId)(id);
        const result = await this.productModel.
            findOneAndUpdate({ _id: id }, input, { new: true })
            .exec();
        if (!result)
            throw new Error_1.default(Error_1.HttpCode.NOT_MODIFIED, Error_1.Message.UPDATE_FAILED);
        return result;
    }
}
exports.default = ProductService;
