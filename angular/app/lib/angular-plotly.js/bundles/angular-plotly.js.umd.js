(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('angular-plotly.js', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = global || self, factory((global['angular-plotly'] = global['angular-plotly'] || {}, global['angular-plotly'].js = {}), global.ng.core, global.ng.common));
}(this, function (exports, core, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    // The file contents for the current environment will overwrite these during build.
    // The build system defaults to the dev environment which uses `environment.ts`, but if you do
    // `ng build --env=prod` then `environment.prod.ts` will be used instead.
    // The list of which env maps to which file can be found in `.angular-cli.json`.
    var environment = {
        production: false
    };

    var PlotlyService = /** @class */ (function () {
        function PlotlyService() {
        }
        PlotlyService_1 = PlotlyService;
        PlotlyService.setModuleName = function (moduleName) {
            PlotlyService_1._moduleName = moduleName;
        };
        PlotlyService.setPlotly = function (plotly) {
            if (typeof plotly === 'object' && typeof plotly.react !== 'function') {
                throw new Error('Invalid plotly.js version. Please, use any version above 1.40.0');
            }
            PlotlyService_1._plotly = plotly;
        };
        PlotlyService.insert = function (instance) {
            var index = PlotlyService_1.instances.indexOf(instance);
            if (index === -1) {
                PlotlyService_1.instances.push(instance);
            }
            return instance;
        };
        PlotlyService.remove = function (div) {
            var index = PlotlyService_1.instances.indexOf(div);
            if (index >= 0) {
                PlotlyService_1.instances.splice(index, 1);
                PlotlyService_1._plotly.purge(div);
            }
        };
        Object.defineProperty(PlotlyService.prototype, "debug", {
            get: function () {
                return environment.production === false;
            },
            enumerable: true,
            configurable: true
        });
        PlotlyService.prototype.getInstanceByDivId = function (id) {
            var e_1, _a;
            try {
                for (var _b = __values(PlotlyService_1.instances), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var instance = _c.value;
                    if (instance && instance.id === id) {
                        return instance;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return undefined;
        };
        PlotlyService.prototype.getPlotly = function () {
            if (typeof PlotlyService_1._plotly === 'undefined') {
                var msg = PlotlyService_1._moduleName === 'ViaCDN'
                    ? "Error loading Peer dependency plotly.js from CDN url"
                    : "Peer dependency plotly.js isn't installed";
                throw new Error(msg);
            }
            return PlotlyService_1._plotly;
        };
        PlotlyService.prototype.waitFor = function (fn) {
            return new Promise(function (resolve) {
                var localFn = function () {
                    fn() ? resolve() : setTimeout(localFn, 10);
                };
                localFn();
            });
        };
        // tslint:disable max-line-length
        PlotlyService.prototype.newPlot = function (div, data, layout, config, frames) {
            return __awaiter(this, void 0, void 0, function () {
                var obj;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.waitFor(function () { return _this.getPlotly() !== 'waiting'; })];
                        case 1:
                            _a.sent();
                            if (frames) {
                                obj = { data: data, layout: layout, config: config, frames: frames };
                                return [2 /*return*/, this.getPlotly().newPlot(div, obj).then(function () { return PlotlyService_1.insert(div); })];
                            }
                            return [2 /*return*/, this.getPlotly().newPlot(div, data, layout, config).then(function () { return PlotlyService_1.insert(div); })];
                    }
                });
            });
        };
        PlotlyService.prototype.plot = function (div, data, layout, config, frames) {
            if (frames) {
                var obj = { data: data, layout: layout, config: config, frames: frames };
                return this.getPlotly().plot(div, obj);
            }
            return this.getPlotly().plot(div, data, layout, config);
        };
        PlotlyService.prototype.update = function (div, data, layout, config, frames) {
            if (frames) {
                var obj = { data: data, layout: layout, config: config, frames: frames };
                return this.getPlotly().react(div, obj);
            }
            return this.getPlotly().react(div, data, layout, config);
        };
        // tslint:enable max-line-length
        PlotlyService.prototype.resize = function (div) {
            return this.getPlotly().Plots.resize(div);
        };
        var PlotlyService_1;
        PlotlyService.instances = [];
        PlotlyService._plotly = undefined;
        PlotlyService._moduleName = undefined;
        PlotlyService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function PlotlyService_Factory() { return new PlotlyService(); }, token: PlotlyService, providedIn: "root" });
        PlotlyService = PlotlyService_1 = __decorate([
            core.Injectable({
                providedIn: 'root'
            })
        ], PlotlyService);
        return PlotlyService;
    }());

    // @dynamic
    var PlotComponent = /** @class */ (function () {
        function PlotComponent(plotly, iterableDiffers, keyValueDiffers) {
            this.plotly = plotly;
            this.iterableDiffers = iterableDiffers;
            this.keyValueDiffers = keyValueDiffers;
            this.defaultClassName = 'js-plotly-plot';
            this.datarevision = 0;
            this.revision = 0;
            this.debug = false;
            this.useResizeHandler = false;
            this.initialized = new core.EventEmitter();
            this.update = new core.EventEmitter();
            this.purge = new core.EventEmitter();
            this.error = new core.EventEmitter();
            this.afterExport = new core.EventEmitter();
            this.afterPlot = new core.EventEmitter();
            this.animated = new core.EventEmitter();
            this.animatingFrame = new core.EventEmitter();
            this.animationInterrupted = new core.EventEmitter();
            this.autoSize = new core.EventEmitter();
            this.beforeExport = new core.EventEmitter();
            this.buttonClicked = new core.EventEmitter();
            this.click = new core.EventEmitter();
            this.plotly_click = new core.EventEmitter();
            this.clickAnnotation = new core.EventEmitter();
            this.deselect = new core.EventEmitter();
            this.doubleClick = new core.EventEmitter();
            this.framework = new core.EventEmitter();
            this.hover = new core.EventEmitter();
            this.legendClick = new core.EventEmitter();
            this.legendDoubleClick = new core.EventEmitter();
            this.relayout = new core.EventEmitter();
            this.restyle = new core.EventEmitter();
            this.redraw = new core.EventEmitter();
            this.selected = new core.EventEmitter();
            this.selecting = new core.EventEmitter();
            this.sliderChange = new core.EventEmitter();
            this.sliderEnd = new core.EventEmitter();
            this.sliderStart = new core.EventEmitter();
            this.transitioning = new core.EventEmitter();
            this.transitionInterrupted = new core.EventEmitter();
            this.unhover = new core.EventEmitter();
            this.relayouting = new core.EventEmitter();
            this.eventNames = ['afterExport', 'afterPlot', 'animated', 'animatingFrame', 'animationInterrupted', 'autoSize',
                'beforeExport', 'buttonClicked', 'clickAnnotation', 'deselect', 'doubleClick', 'framework', 'hover',
                'legendClick', 'legendDoubleClick', 'relayout', 'restyle', 'redraw', 'selected', 'selecting', 'sliderChange',
                'sliderEnd', 'sliderStart', 'transitioning', 'transitionInterrupted', 'unhover', 'relayouting'];
        }
        PlotComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.createPlot().then(function () {
                var figure = _this.createFigure();
                _this.initialized.emit(figure);
            });
            if (this.plotly.debug && this.click.observers.length > 0) {
                var msg = 'DEPRECATED: Reconsider using `(plotly_click)` instead of `(click)` to avoid event conflict. '
                    + 'Please check https://github.com/plotly/angular-plotly.js#FAQ';
                console.error(msg);
            }
        };
        PlotComponent.prototype.ngOnDestroy = function () {
            if (typeof this.resizeHandler === 'function') {
                this.getWindow().removeEventListener('resize', this.resizeHandler);
                this.resizeHandler = undefined;
            }
            var figure = this.createFigure();
            this.purge.emit(figure);
            PlotlyService.remove(this.plotlyInstance);
        };
        PlotComponent.prototype.ngOnChanges = function (changes) {
            var shouldUpdate = false;
            var revision = changes.revision;
            if (revision && !revision.isFirstChange()) {
                shouldUpdate = true;
            }
            var debug = changes.debug;
            if (debug && !debug.isFirstChange()) {
                shouldUpdate = true;
            }
            if (shouldUpdate) {
                this.updatePlot();
            }
            this.updateWindowResizeHandler();
        };
        PlotComponent.prototype.ngDoCheck = function () {
            var shouldUpdate = false;
            if (this.layoutDiffer) {
                var layoutHasDiff = this.layoutDiffer.diff(this.layout);
                if (layoutHasDiff) {
                    shouldUpdate = true;
                }
            }
            else if (this.layout) {
                this.layoutDiffer = this.keyValueDiffers.find(this.layout).create();
            }
            else {
                this.layoutDiffer = undefined;
            }
            if (this.dataDiffer) {
                var dataHasDiff = this.dataDiffer.diff(this.data);
                if (dataHasDiff) {
                    shouldUpdate = true;
                }
            }
            else if (Array.isArray(this.data)) {
                this.dataDiffer = this.iterableDiffers.find(this.data).create(this.dataDifferTrackBy);
            }
            else {
                this.dataDiffer = undefined;
            }
            if (shouldUpdate && this.plotlyInstance) {
                this.datarevision += 1;
                this.updatePlot();
            }
        };
        PlotComponent.prototype.getWindow = function () {
            return window;
        };
        PlotComponent.prototype.getClassName = function () {
            var classes = [this.defaultClassName];
            if (Array.isArray(this.className)) {
                classes = classes.concat(this.className);
            }
            else if (this.className) {
                classes.push(this.className);
            }
            return classes.join(' ');
        };
        PlotComponent.prototype.createPlot = function () {
            var _this = this;
            return this.plotly.newPlot(this.plotEl.nativeElement, this.data, this.layout, this.config, this.frames).then(function (plotlyInstance) {
                _this.plotlyInstance = plotlyInstance;
                _this.getWindow().gd = _this.debug ? plotlyInstance : undefined;
                _this.eventNames.forEach(function (name) {
                    var eventName = "plotly_" + name.toLowerCase();
                    plotlyInstance.on(eventName, function (data) { return _this[name].emit(data); });
                });
                plotlyInstance.on('plotly_click', function (data) {
                    _this.click.emit(data);
                    _this.plotly_click.emit(data);
                });
                _this.updateWindowResizeHandler();
            }, function (err) {
                console.error('Error while plotting:', err);
                _this.error.emit(err);
            });
        };
        PlotComponent.prototype.createFigure = function () {
            var p = this.plotlyInstance;
            var figure = {
                data: p.data,
                layout: p.layout,
                frames: p._transitionData ? p._transitionData._frames : null
            };
            return figure;
        };
        PlotComponent.prototype.updatePlot = function () {
            var _this = this;
            if (!this.plotlyInstance) {
                var error = new Error("Plotly component wasn't initialized");
                this.error.emit(error);
                throw error;
            }
            var layout = __assign({ datarevision: this.datarevision }, this.layout);
            return this.plotly.update(this.plotlyInstance, this.data, layout, this.config, this.frames).then(function () {
                var figure = _this.createFigure();
                _this.update.emit(figure);
            }, function (err) {
                console.error('Error while updating plot:', err);
                _this.error.emit(err);
            });
        };
        PlotComponent.prototype.updateWindowResizeHandler = function () {
            var _this = this;
            if (this.useResizeHandler) {
                if (this.resizeHandler === undefined) {
                    this.resizeHandler = function () { return _this.plotly.resize(_this.plotlyInstance); };
                    this.getWindow().addEventListener('resize', this.resizeHandler);
                }
            }
            else {
                if (typeof this.resizeHandler === 'function') {
                    this.getWindow().removeEventListener('resize', this.resizeHandler);
                    this.resizeHandler = undefined;
                }
            }
        };
        PlotComponent.prototype.dataDifferTrackBy = function (_, item) {
            var obj = Object.assign({}, item, { uid: '' });
            return JSON.stringify(obj);
        };
        __decorate([
            core.ViewChild('plot', { static: true }),
            __metadata("design:type", core.ElementRef)
        ], PlotComponent.prototype, "plotEl", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], PlotComponent.prototype, "data", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "layout", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "config", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], PlotComponent.prototype, "frames", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "style", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], PlotComponent.prototype, "divId", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], PlotComponent.prototype, "revision", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "className", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], PlotComponent.prototype, "debug", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], PlotComponent.prototype, "useResizeHandler", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "initialized", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "update", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "purge", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "error", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "afterExport", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "afterPlot", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "animated", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "animatingFrame", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "animationInterrupted", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "autoSize", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "beforeExport", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "buttonClicked", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "click", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "plotly_click", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "clickAnnotation", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "deselect", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "doubleClick", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "framework", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "hover", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "legendClick", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "legendDoubleClick", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "relayout", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "restyle", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "redraw", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "selected", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "selecting", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "sliderChange", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "sliderEnd", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "sliderStart", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "transitioning", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "transitionInterrupted", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "unhover", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], PlotComponent.prototype, "relayouting", void 0);
        PlotComponent = __decorate([
            core.Component({
                selector: 'plotly-plot',
                template: "<div #plot [attr.id]=\"divId\" [className]=\"getClassName()\" [ngStyle]=\"style\"></div>",
                providers: [PlotlyService]
            }),
            __metadata("design:paramtypes", [PlotlyService,
                core.IterableDiffers,
                core.KeyValueDiffers])
        ], PlotComponent);
        return PlotComponent;
    }());

    var SharedModule = /** @class */ (function () {
        function SharedModule() {
        }
        SharedModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                declarations: [PlotComponent],
                providers: [PlotlyService],
                exports: [PlotComponent]
            })
        ], SharedModule);
        return SharedModule;
    }());

    var PlotlyModule = /** @class */ (function () {
        function PlotlyModule() {
            if (!this.isValid()) {
                var msg = "Invalid PlotlyJS object. Please check https://github.com/plotly/angular-plotly.js#quick-start"
                    + " to see how to add PlotlyJS to your project.";
                throw new Error(msg);
            }
            PlotlyService.setPlotly(PlotlyModule_1.plotlyjs);
        }
        PlotlyModule_1 = PlotlyModule;
        PlotlyModule.prototype.isValid = function () {
            return PlotlyModule_1.plotlyjs !== undefined
                && typeof PlotlyModule_1.plotlyjs.plot === 'function';
        };
        var PlotlyModule_1;
        PlotlyModule.plotlyjs = {};
        PlotlyModule = PlotlyModule_1 = __decorate([
            core.NgModule({
                imports: [common.CommonModule, SharedModule],
                declarations: [],
                exports: [PlotComponent]
            }),
            __metadata("design:paramtypes", [])
        ], PlotlyModule);
        return PlotlyModule;
    }());

    // @dynamic
    var PlotlyViaCDNModule = /** @class */ (function () {
        function PlotlyViaCDNModule(plotlyService) {
            this.plotlyService = plotlyService;
            PlotlyService.setModuleName('ViaCDN');
        }
        PlotlyViaCDNModule_1 = PlotlyViaCDNModule;
        Object.defineProperty(PlotlyViaCDNModule, "plotlyVersion", {
            set: function (version) {
                var isOk = version === 'latest' || /^\d\.\d{1,2}\.\d{1,2}$/.test(version);
                if (!isOk) {
                    throw new Error("Invalid plotly version. Please set 'latest' or version number (i.e.: 1.4.3)");
                }
                PlotlyViaCDNModule_1.loadViaCDN();
                PlotlyViaCDNModule_1._plotlyVersion = version;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlotlyViaCDNModule, "plotlyBundle", {
            set: function (bundle) {
                var isOk = bundle === null || PlotlyViaCDNModule_1.plotlyBundleNames.indexOf(bundle) >= 0;
                if (!isOk) {
                    var names = PlotlyViaCDNModule_1.plotlyBundleNames.map(function (n) { return "\"" + n + "\""; }).join(', ');
                    throw new Error("Invalid plotly bundle. Please set to null for full or " + names + " for a partial bundle.");
                }
                PlotlyViaCDNModule_1._plotlyBundle = bundle;
            },
            enumerable: true,
            configurable: true
        });
        PlotlyViaCDNModule.loadViaCDN = function () {
            PlotlyService.setPlotly('waiting');
            var init = function () {
                var src = PlotlyViaCDNModule_1._plotlyBundle == null
                    ? "https://cdn.plot.ly/plotly-" + PlotlyViaCDNModule_1._plotlyVersion + ".min.js"
                    : "https://cdn.plot.ly/plotly-" + PlotlyViaCDNModule_1._plotlyBundle + "-" + PlotlyViaCDNModule_1._plotlyVersion + ".min.js";
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = src;
                script.onerror = function () { return console.error("Error loading plotly.js library from " + src); };
                var head = document.getElementsByTagName('head')[0];
                head.appendChild(script);
                var counter = 200; // equivalent of 10 seconds...
                var fn = function () {
                    var plotly = window.Plotly;
                    if (plotly) {
                        PlotlyService.setPlotly(plotly);
                    }
                    else if (counter > 0) {
                        counter--;
                        setTimeout(fn, 50);
                    }
                    else {
                        throw new Error("Error loading plotly.js library from " + src + ". Timeout.");
                    }
                };
                fn();
            };
            setTimeout(init);
        };
        PlotlyViaCDNModule.forRoot = function (config) {
            var url = "https://github.com/plotly/angular-plotly.js#customizing-the-plotlyjs-bundle";
            throw new Error("[PlotlyViaCDNModule] forRoot method is deprecated. Please see: " + url);
        };
        var PlotlyViaCDNModule_1;
        PlotlyViaCDNModule._plotlyBundle = null;
        PlotlyViaCDNModule._plotlyVersion = 'latest';
        PlotlyViaCDNModule.plotlyBundleNames = ['basic', 'cartesian', 'geo', 'gl3d', 'gl2d', 'mapbox', 'finance'];
        PlotlyViaCDNModule = PlotlyViaCDNModule_1 = __decorate([
            core.NgModule({
                imports: [common.CommonModule, SharedModule],
                declarations: [],
                exports: [PlotComponent]
            }),
            __metadata("design:paramtypes", [PlotlyService])
        ], PlotlyViaCDNModule);
        return PlotlyViaCDNModule;
    }());

    var PlotlyViaWindowModule = /** @class */ (function () {
        function PlotlyViaWindowModule() {
            var plotly = window.Plotly;
            if (typeof plotly === 'undefined') {
                throw new Error("Plotly object not found on window.");
            }
            PlotlyService.setPlotly(plotly);
        }
        PlotlyViaWindowModule.forRoot = function () {
            var url = "https://github.com/plotly/angular-plotly.js#plotly-via-window-module";
            throw new Error("[PlotlyViaWindowModule] forRoot method is deprecated. Please see: " + url);
        };
        PlotlyViaWindowModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, SharedModule],
                declarations: [],
                exports: [PlotComponent]
            }),
            __metadata("design:paramtypes", [])
        ], PlotlyViaWindowModule);
        return PlotlyViaWindowModule;
    }());

    exports.PlotComponent = PlotComponent;
    exports.PlotlyModule = PlotlyModule;
    exports.PlotlyService = PlotlyService;
    exports.PlotlyViaCDNModule = PlotlyViaCDNModule;
    exports.PlotlyViaWindowModule = PlotlyViaWindowModule;
    exports.ɵa = SharedModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=angular-plotly.js.umd.js.map
