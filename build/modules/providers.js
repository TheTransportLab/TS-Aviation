"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeedsBradfordFetchData = exports.EdinburghFetchData = exports.UmbracoFetchData = exports.MAGFetchData = void 0;
var ManchesterAirportGroup_1 = require("@Modules/providers/ManchesterAirportGroup");
Object.defineProperty(exports, "MAGFetchData", { enumerable: true, get: function () { return ManchesterAirportGroup_1.fetchData; } });
var Umbraco_1 = require("@Modules/providers/Umbraco");
Object.defineProperty(exports, "UmbracoFetchData", { enumerable: true, get: function () { return Umbraco_1.fetchData; } });
var Edinburgh_1 = require("@Modules/providers/Edinburgh");
Object.defineProperty(exports, "EdinburghFetchData", { enumerable: true, get: function () { return Edinburgh_1.fetchData; } });
var LeedsBradford_1 = require("@Modules/providers/LeedsBradford");
Object.defineProperty(exports, "LeedsBradfordFetchData", { enumerable: true, get: function () { return LeedsBradford_1.fetchData; } });
//# sourceMappingURL=providers.js.map