import { __awaiter, __decorate, __metadata } from 'tslib';
import { ɵɵdefineInjectable, Injectable, EventEmitter, ViewChild, ElementRef, Input, Output, Component, IterableDiffers, KeyValueDiffers, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const environment = {
    production: false
};

var PlotlyService_1;
let PlotlyService = PlotlyService_1 = class PlotlyService {
    static setModuleName(moduleName) {
        PlotlyService_1._moduleName = moduleName;
    }
    static setPlotly(plotly) {
        if (typeof plotly === 'object' && typeof plotly.react !== 'function') {
            throw new Error('Invalid plotly.js version. Please, use any version above 1.40.0');
        }
        PlotlyService_1._plotly = plotly;
    }
    static insert(instance) {
        const index = PlotlyService_1.instances.indexOf(instance);
        if (index === -1) {
            PlotlyService_1.instances.push(instance);
        }
        return instance;
    }
    static remove(div) {
        const index = PlotlyService_1.instances.indexOf(div);
        if (index >= 0) {
            PlotlyService_1.instances.splice(index, 1);
            PlotlyService_1._plotly.purge(div);
        }
    }
    get debug() {
        return environment.production === false;
    }
    getInstanceByDivId(id) {
        for (const instance of PlotlyService_1.instances) {
            if (instance && instance.id === id) {
                return instance;
            }
        }
        return undefined;
    }
    getPlotly() {
        if (typeof PlotlyService_1._plotly === 'undefined') {
            const msg = PlotlyService_1._moduleName === 'ViaCDN'
                ? `Error loading Peer dependency plotly.js from CDN url`
                : `Peer dependency plotly.js isn't installed`;
            throw new Error(msg);
        }
        return PlotlyService_1._plotly;
    }
    waitFor(fn) {
        return new Promise((resolve) => {
            const localFn = () => {
                fn() ? resolve() : setTimeout(localFn, 10);
            };
            localFn();
        });
    }
    // tslint:disable max-line-length
    newPlot(div, data, layout, config, frames) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitFor(() => this.getPlotly() !== 'waiting');
            if (frames) {
                const obj = { data, layout, config, frames };
                return this.getPlotly().newPlot(div, obj).then(() => PlotlyService_1.insert(div));
            }
            return this.getPlotly().newPlot(div, data, layout, config).then(() => PlotlyService_1.insert(div));
        });
    }
    plot(div, data, layout, config, frames) {
        if (frames) {
            const obj = { data, layout, config, frames };
            return this.getPlotly().plot(div, obj);
        }
        return this.getPlotly().plot(div, data, layout, config);
    }
    update(div, data, layout, config, frames) {
        if (frames) {
            const obj = { data, layout, config, frames };
            return this.getPlotly().react(div, obj);
        }
        return this.getPlotly().react(div, data, layout, config);
    }
    // tslint:enable max-line-length
    resize(div) {
        return this.getPlotly().Plots.resize(div);
    }
};
PlotlyService.instances = [];
PlotlyService._plotly = undefined;
PlotlyService._moduleName = undefined;
PlotlyService.ngInjectableDef = ɵɵdefineInjectable({ factory: function PlotlyService_Factory() { return new PlotlyService(); }, token: PlotlyService, providedIn: "root" });
PlotlyService = PlotlyService_1 = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PlotlyService);

// @dynamic
let PlotComponent = class PlotComponent {
    constructor(plotly, iterableDiffers, keyValueDiffers) {
        this.plotly = plotly;
        this.iterableDiffers = iterableDiffers;
        this.keyValueDiffers = keyValueDiffers;
        this.defaultClassName = 'js-plotly-plot';
        this.datarevision = 0;
        this.revision = 0;
        this.debug = false;
        this.useResizeHandler = false;
        this.initialized = new EventEmitter();
        this.update = new EventEmitter();
        this.purge = new EventEmitter();
        this.error = new EventEmitter();
        this.afterExport = new EventEmitter();
        this.afterPlot = new EventEmitter();
        this.animated = new EventEmitter();
        this.animatingFrame = new EventEmitter();
        this.animationInterrupted = new EventEmitter();
        this.autoSize = new EventEmitter();
        this.beforeExport = new EventEmitter();
        this.buttonClicked = new EventEmitter();
        this.click = new EventEmitter();
        this.plotly_click = new EventEmitter();
        this.clickAnnotation = new EventEmitter();
        this.deselect = new EventEmitter();
        this.doubleClick = new EventEmitter();
        this.framework = new EventEmitter();
        this.hover = new EventEmitter();
        this.legendClick = new EventEmitter();
        this.legendDoubleClick = new EventEmitter();
        this.relayout = new EventEmitter();
        this.restyle = new EventEmitter();
        this.redraw = new EventEmitter();
        this.selected = new EventEmitter();
        this.selecting = new EventEmitter();
        this.sliderChange = new EventEmitter();
        this.sliderEnd = new EventEmitter();
        this.sliderStart = new EventEmitter();
        this.transitioning = new EventEmitter();
        this.transitionInterrupted = new EventEmitter();
        this.unhover = new EventEmitter();
        this.relayouting = new EventEmitter();
        this.eventNames = ['afterExport', 'afterPlot', 'animated', 'animatingFrame', 'animationInterrupted', 'autoSize',
            'beforeExport', 'buttonClicked', 'clickAnnotation', 'deselect', 'doubleClick', 'framework', 'hover',
            'legendClick', 'legendDoubleClick', 'relayout', 'restyle', 'redraw', 'selected', 'selecting', 'sliderChange',
            'sliderEnd', 'sliderStart', 'transitioning', 'transitionInterrupted', 'unhover', 'relayouting'];
    }
    ngOnInit() {
        this.createPlot().then(() => {
            const figure = this.createFigure();
            this.initialized.emit(figure);
        });
        if (this.plotly.debug && this.click.observers.length > 0) {
            const msg = 'DEPRECATED: Reconsider using `(plotly_click)` instead of `(click)` to avoid event conflict. '
                + 'Please check https://github.com/plotly/angular-plotly.js#FAQ';
            console.error(msg);
        }
    }
    ngOnDestroy() {
        if (typeof this.resizeHandler === 'function') {
            this.getWindow().removeEventListener('resize', this.resizeHandler);
            this.resizeHandler = undefined;
        }
        const figure = this.createFigure();
        this.purge.emit(figure);
        PlotlyService.remove(this.plotlyInstance);
    }
    ngOnChanges(changes) {
        let shouldUpdate = false;
        const revision = changes.revision;
        if (revision && !revision.isFirstChange()) {
            shouldUpdate = true;
        }
        const debug = changes.debug;
        if (debug && !debug.isFirstChange()) {
            shouldUpdate = true;
        }
        if (shouldUpdate) {
            this.updatePlot();
        }
        this.updateWindowResizeHandler();
    }
    ngDoCheck() {
        let shouldUpdate = false;
        if (this.layoutDiffer) {
            const layoutHasDiff = this.layoutDiffer.diff(this.layout);
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
            const dataHasDiff = this.dataDiffer.diff(this.data);
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
    }
    getWindow() {
        return window;
    }
    getClassName() {
        let classes = [this.defaultClassName];
        if (Array.isArray(this.className)) {
            classes = classes.concat(this.className);
        }
        else if (this.className) {
            classes.push(this.className);
        }
        return classes.join(' ');
    }
    createPlot() {
        return this.plotly.newPlot(this.plotEl.nativeElement, this.data, this.layout, this.config, this.frames).then(plotlyInstance => {
            this.plotlyInstance = plotlyInstance;
            this.getWindow().gd = this.debug ? plotlyInstance : undefined;
            this.eventNames.forEach(name => {
                const eventName = `plotly_${name.toLowerCase()}`;
                plotlyInstance.on(eventName, (data) => this[name].emit(data));
            });
            plotlyInstance.on('plotly_click', (data) => {
                this.click.emit(data);
                this.plotly_click.emit(data);
            });
            this.updateWindowResizeHandler();
        }, err => {
            console.error('Error while plotting:', err);
            this.error.emit(err);
        });
    }
    createFigure() {
        const p = this.plotlyInstance;
        const figure = {
            data: p.data,
            layout: p.layout,
            frames: p._transitionData ? p._transitionData._frames : null
        };
        return figure;
    }
    updatePlot() {
        if (!this.plotlyInstance) {
            const error = new Error(`Plotly component wasn't initialized`);
            this.error.emit(error);
            throw error;
        }
        const layout = Object.assign({ datarevision: this.datarevision }, this.layout);
        return this.plotly.update(this.plotlyInstance, this.data, layout, this.config, this.frames).then(() => {
            const figure = this.createFigure();
            this.update.emit(figure);
        }, err => {
            console.error('Error while updating plot:', err);
            this.error.emit(err);
        });
    }
    updateWindowResizeHandler() {
        if (this.useResizeHandler) {
            if (this.resizeHandler === undefined) {
                this.resizeHandler = () => this.plotly.resize(this.plotlyInstance);
                this.getWindow().addEventListener('resize', this.resizeHandler);
            }
        }
        else {
            if (typeof this.resizeHandler === 'function') {
                this.getWindow().removeEventListener('resize', this.resizeHandler);
                this.resizeHandler = undefined;
            }
        }
    }
    dataDifferTrackBy(_, item) {
        const obj = Object.assign({}, item, { uid: '' });
        return JSON.stringify(obj);
    }
};
__decorate([
    ViewChild('plot', { static: true }),
    __metadata("design:type", ElementRef)
], PlotComponent.prototype, "plotEl", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], PlotComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "layout", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "config", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], PlotComponent.prototype, "frames", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "style", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], PlotComponent.prototype, "divId", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], PlotComponent.prototype, "revision", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "className", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], PlotComponent.prototype, "debug", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], PlotComponent.prototype, "useResizeHandler", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "initialized", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "update", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "purge", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "error", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "afterExport", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "afterPlot", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "animated", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "animatingFrame", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "animationInterrupted", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "autoSize", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "beforeExport", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "buttonClicked", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "click", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "plotly_click", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "clickAnnotation", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "deselect", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "doubleClick", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "framework", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "hover", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "legendClick", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "legendDoubleClick", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "relayout", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "restyle", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "redraw", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "selected", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "selecting", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "sliderChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "sliderEnd", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "sliderStart", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "transitioning", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "transitionInterrupted", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "unhover", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PlotComponent.prototype, "relayouting", void 0);
PlotComponent = __decorate([
    Component({
        selector: 'plotly-plot',
        template: `<div #plot [attr.id]="divId" [className]="getClassName()" [ngStyle]="style"></div>`,
        providers: [PlotlyService]
    }),
    __metadata("design:paramtypes", [PlotlyService,
        IterableDiffers,
        KeyValueDiffers])
], PlotComponent);

let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    NgModule({
        imports: [CommonModule],
        declarations: [PlotComponent],
        providers: [PlotlyService],
        exports: [PlotComponent]
    })
], SharedModule);

var PlotlyModule_1;
let PlotlyModule = PlotlyModule_1 = class PlotlyModule {
    constructor() {
        if (!this.isValid()) {
            const msg = "Invalid PlotlyJS object. Please check https://github.com/plotly/angular-plotly.js#quick-start"
                + " to see how to add PlotlyJS to your project.";
            throw new Error(msg);
        }
        PlotlyService.setPlotly(PlotlyModule_1.plotlyjs);
    }
    isValid() {
        return PlotlyModule_1.plotlyjs !== undefined
            && typeof PlotlyModule_1.plotlyjs.plot === 'function';
    }
};
PlotlyModule.plotlyjs = {};
PlotlyModule = PlotlyModule_1 = __decorate([
    NgModule({
        imports: [CommonModule, SharedModule],
        declarations: [],
        exports: [PlotComponent]
    }),
    __metadata("design:paramtypes", [])
], PlotlyModule);

var PlotlyViaCDNModule_1;
// @dynamic
let PlotlyViaCDNModule = PlotlyViaCDNModule_1 = class PlotlyViaCDNModule {
    constructor(plotlyService) {
        this.plotlyService = plotlyService;
        PlotlyService.setModuleName('ViaCDN');
    }
    static set plotlyVersion(version) {
        const isOk = version === 'latest' || /^\d\.\d{1,2}\.\d{1,2}$/.test(version);
        if (!isOk) {
            throw new Error(`Invalid plotly version. Please set 'latest' or version number (i.e.: 1.4.3)`);
        }
        PlotlyViaCDNModule_1.loadViaCDN();
        PlotlyViaCDNModule_1._plotlyVersion = version;
    }
    static set plotlyBundle(bundle) {
        const isOk = bundle === null || PlotlyViaCDNModule_1.plotlyBundleNames.indexOf(bundle) >= 0;
        if (!isOk) {
            const names = PlotlyViaCDNModule_1.plotlyBundleNames.map(n => `"${n}"`).join(', ');
            throw new Error(`Invalid plotly bundle. Please set to null for full or ${names} for a partial bundle.`);
        }
        PlotlyViaCDNModule_1._plotlyBundle = bundle;
    }
    static loadViaCDN() {
        PlotlyService.setPlotly('waiting');
        const init = () => {
            const src = PlotlyViaCDNModule_1._plotlyBundle == null
                ? `https://cdn.plot.ly/plotly-${PlotlyViaCDNModule_1._plotlyVersion}.min.js`
                : `https://cdn.plot.ly/plotly-${PlotlyViaCDNModule_1._plotlyBundle}-${PlotlyViaCDNModule_1._plotlyVersion}.min.js`;
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = src;
            script.onerror = () => console.error(`Error loading plotly.js library from ${src}`);
            const head = document.getElementsByTagName('head')[0];
            head.appendChild(script);
            let counter = 200; // equivalent of 10 seconds...
            const fn = () => {
                const plotly = window.Plotly;
                if (plotly) {
                    PlotlyService.setPlotly(plotly);
                }
                else if (counter > 0) {
                    counter--;
                    setTimeout(fn, 50);
                }
                else {
                    throw new Error(`Error loading plotly.js library from ${src}. Timeout.`);
                }
            };
            fn();
        };
        setTimeout(init);
    }
    static forRoot(config) {
        const url = "https://github.com/plotly/angular-plotly.js#customizing-the-plotlyjs-bundle";
        throw new Error(`[PlotlyViaCDNModule] forRoot method is deprecated. Please see: ${url}`);
    }
};
PlotlyViaCDNModule._plotlyBundle = null;
PlotlyViaCDNModule._plotlyVersion = 'latest';
PlotlyViaCDNModule.plotlyBundleNames = ['basic', 'cartesian', 'geo', 'gl3d', 'gl2d', 'mapbox', 'finance'];
PlotlyViaCDNModule = PlotlyViaCDNModule_1 = __decorate([
    NgModule({
        imports: [CommonModule, SharedModule],
        declarations: [],
        exports: [PlotComponent]
    }),
    __metadata("design:paramtypes", [PlotlyService])
], PlotlyViaCDNModule);

let PlotlyViaWindowModule = class PlotlyViaWindowModule {
    constructor() {
        const plotly = window.Plotly;
        if (typeof plotly === 'undefined') {
            throw new Error(`Plotly object not found on window.`);
        }
        PlotlyService.setPlotly(plotly);
    }
    static forRoot() {
        const url = "https://github.com/plotly/angular-plotly.js#plotly-via-window-module";
        throw new Error(`[PlotlyViaWindowModule] forRoot method is deprecated. Please see: ${url}`);
    }
};
PlotlyViaWindowModule = __decorate([
    NgModule({
        imports: [CommonModule, SharedModule],
        declarations: [],
        exports: [PlotComponent]
    }),
    __metadata("design:paramtypes", [])
], PlotlyViaWindowModule);

/**
 * Generated bundle index. Do not edit.
 */

export { PlotComponent, PlotlyModule, PlotlyService, PlotlyViaCDNModule, PlotlyViaWindowModule, SharedModule as ɵa };
//# sourceMappingURL=angular-plotly.js.js.map
