"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCollection = exports.ProductStatus = exports.ProductSize = void 0;
var ProductSize;
(function (ProductSize) {
    ProductSize["XXL"] = "XXL";
    ProductSize["XL"] = "XL";
    ProductSize["M"] = "M";
    ProductSize["S"] = "S";
})(ProductSize || (exports.ProductSize = ProductSize = {}));
var ProductStatus;
(function (ProductStatus) {
    ProductStatus["PAUSE"] = "PAUSE";
    ProductStatus["PROCESS"] = "PROCESS";
    ProductStatus["DELETE"] = "DELETE";
})(ProductStatus || (exports.ProductStatus = ProductStatus = {}));
var ProductCollection;
(function (ProductCollection) {
    ProductCollection["CLOTHS"] = "CLOTHS";
    ProductCollection["SNEAKERS"] = "SNEAKERS";
    ProductCollection["T_SHIRT"] = "T_SHIRT";
    ProductCollection["PANTS"] = "PANTS";
    ProductCollection["GLOVES"] = "GLOVES";
})(ProductCollection || (exports.ProductCollection = ProductCollection = {}));
