"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routerAdmin = express_1.default.Router();
const store_controller_1 = __importDefault(require("./controllers/store.controller"));
const product_controller_1 = __importDefault(require("./controllers/product.controller"));
const uploader_1 = __importDefault(require("./libs/utils/uploader"));
/** Restaurant */
routerAdmin.get("/", store_controller_1.default.goHome);
routerAdmin
    .get("/login", store_controller_1.default.getLogin)
    .post("/login", store_controller_1.default.processLogin);
routerAdmin
    .get("/signup", store_controller_1.default.getSignup)
    .post("/signup", (0, uploader_1.default)("members").single("memberImage"), store_controller_1.default.processSignup);
routerAdmin.get("/logout", store_controller_1.default.logout);
routerAdmin.get("/check-me", store_controller_1.default.checkAuthSession);
/** Product */
routerAdmin.get("/product/all", store_controller_1.default.verifyStore, product_controller_1.default.getAllProducts);
routerAdmin.post("/product/create", store_controller_1.default.verifyStore, 
// uploadProductImage.single('productImage'),
(0, uploader_1.default)("products").array("productImages", 5), product_controller_1.default.createNewProduct);
routerAdmin.post("/product/:id", store_controller_1.default.verifyStore, product_controller_1.default.updateChosenProduct);
/** User */
routerAdmin.get("/user/all", store_controller_1.default.verifyStore, store_controller_1.default.getUsers);
routerAdmin.post("/user/edit", store_controller_1.default.verifyStore, store_controller_1.default.updateChosenUser);
exports.default = routerAdmin;
