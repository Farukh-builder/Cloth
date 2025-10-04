"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCollection = exports.ProductStatus = exports.ProductVolume = exports.ProductSize = void 0;
var ProductSize;
(function (ProductSize) {
    ProductSize["XXl"] = "XXL";
    ProductSize["Xl"] = "XL";
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
    ProductCollection["SNEKEARS"] = "SNEKEARS";
    ProductCollection["T_SHIRT"] = "T_SHIRT";
    ProductCollection["PANTS"] = "PANTS";
    ProductCollection["SHOES"] = "SHOES";
})(ProductCollection || (exports.ProductCollection = ProductCollection = {}));
