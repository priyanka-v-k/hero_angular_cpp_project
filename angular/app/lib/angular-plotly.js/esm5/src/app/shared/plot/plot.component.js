import * as tslib_1 from "tslib";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, IterableDiffers, KeyValueDiffers, } from '@angular/core';
import { PlotlyService } from '../plotly.service';
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
        var layout = tslib_1.__assign({ datarevision: this.datarevision }, this.layout);
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
    tslib_1.__decorate([
        ViewChild('plot', { static: true }),
        tslib_1.__metadata("design:type", ElementRef)
    ], PlotComponent.prototype, "plotEl", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], PlotComponent.prototype, "data", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "layout", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "config", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], PlotComponent.prototype, "frames", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "style", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], PlotComponent.prototype, "divId", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], PlotComponent.prototype, "revision", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "className", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], PlotComponent.prototype, "debug", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], PlotComponent.prototype, "useResizeHandler", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "initialized", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "update", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "purge", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "error", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "afterExport", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "afterPlot", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "animated", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "animatingFrame", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "animationInterrupted", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "autoSize", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "beforeExport", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "buttonClicked", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "click", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "plotly_click", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "clickAnnotation", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "deselect", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "doubleClick", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "framework", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "hover", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "legendClick", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "legendDoubleClick", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "relayout", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "restyle", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "redraw", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "selected", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "selecting", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "sliderChange", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "sliderEnd", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "sliderStart", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "transitioning", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "transitionInterrupted", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "unhover", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PlotComponent.prototype, "relayouting", void 0);
    PlotComponent = tslib_1.__decorate([
        Component({
            selector: 'plotly-plot',
            template: "<div #plot [attr.id]=\"divId\" [className]=\"getClassName()\" [ngStyle]=\"style\"></div>",
            providers: [PlotlyService]
        }),
        tslib_1.__metadata("design:paramtypes", [PlotlyService,
            IterableDiffers,
            KeyValueDiffers])
    ], PlotComponent);
    return PlotComponent;
}());
export { PlotComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxvdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXBsb3RseS5qcy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL3Bsb3QvcGxvdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxFQUdOLFNBQVMsRUFHVCxlQUFlLEVBRWYsZUFBZSxHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFHbEQsV0FBVztBQU1YO0lBK0RJLHVCQUNXLE1BQXFCLEVBQ3JCLGVBQWdDLEVBQ2hDLGVBQWdDO1FBRmhDLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDckIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQWpFakMscUJBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFNdkMsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFXdkIsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUVyQixVQUFLLEdBQVksS0FBSyxDQUFDO1FBQ3ZCLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUVqQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBQ2hELFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUMzQyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFDMUMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFTLENBQUM7UUFFbEMsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pDLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9CLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNwQyx5QkFBb0IsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzFDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNsQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbkMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDM0IsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2xDLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyQyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakMsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0IsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDM0IsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pDLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdkMsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDN0IsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0IsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2xDLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9CLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbkMsMEJBQXFCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMzQyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3QixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFcEMsZUFBVSxHQUFHLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsc0JBQXNCLEVBQUUsVUFBVTtZQUM3RyxjQUFjLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLE9BQU87WUFDbkcsYUFBYSxFQUFFLG1CQUFtQixFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsY0FBYztZQUM1RyxXQUFXLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFNaEcsQ0FBQztJQUVMLGdDQUFRLEdBQVI7UUFBQSxpQkFZQztRQVhHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDbkIsSUFBTSxNQUFNLEdBQUcsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ25DLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBR0gsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3RELElBQU0sR0FBRyxHQUFHLDhGQUE4RjtrQkFDcEcsOERBQThELENBQUM7WUFDckUsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFRCxtQ0FBVyxHQUFYO1FBQ0ksSUFBSSxPQUFPLElBQUksQ0FBQyxhQUFhLEtBQUssVUFBVSxFQUFFO1lBQzFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQW9CLENBQUMsQ0FBQztZQUMxRSxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztTQUNsQztRQUVELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QixhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsbUNBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQzlCLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztRQUV6QixJQUFNLFFBQVEsR0FBaUIsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNoRCxJQUFJLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUN2QyxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO1FBRUQsSUFBTSxLQUFLLEdBQWlCLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDMUMsSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDakMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUN2QjtRQUVELElBQUksWUFBWSxFQUFFO1lBQ2QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO1FBRUQsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELGlDQUFTLEdBQVQ7UUFDSSxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7UUFFekIsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxRCxJQUFJLGFBQWEsRUFBRTtnQkFDZixZQUFZLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO1NBQ0o7YUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDdkU7YUFBTTtZQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO1NBQ2pDO1FBRUQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwRCxJQUFJLFdBQVcsRUFBRTtnQkFDYixZQUFZLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO1NBQ0o7YUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUN6RjthQUFNO1lBQ0gsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7U0FDL0I7UUFFRCxJQUFJLFlBQVksSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjtJQUNMLENBQUM7SUFFRCxpQ0FBUyxHQUFUO1FBQ0ksT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELG9DQUFZLEdBQVo7UUFDSSxJQUFJLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXRDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDL0IsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzVDO2FBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ2hDO1FBRUQsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxrQ0FBVSxHQUFWO1FBQUEsaUJBb0JDO1FBbkJHLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLGNBQWM7WUFDdkgsS0FBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7WUFDckMsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUU5RCxLQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7Z0JBQ3hCLElBQU0sU0FBUyxHQUFHLFlBQVUsSUFBSSxDQUFDLFdBQVcsRUFBSSxDQUFDO2dCQUNqRCxjQUFjLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFDLElBQVMsSUFBSyxPQUFDLEtBQUksQ0FBQyxJQUFJLENBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUE3QyxDQUE2QyxDQUFDLENBQUM7WUFDL0YsQ0FBQyxDQUFDLENBQUM7WUFFSCxjQUFjLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxVQUFDLElBQVM7Z0JBQ3hDLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0QixLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxDQUFDLENBQUMsQ0FBQztZQUVILEtBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBQ3JDLENBQUMsRUFBRSxVQUFBLEdBQUc7WUFDRixPQUFPLENBQUMsS0FBSyxDQUFDLHVCQUF1QixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG9DQUFZLEdBQVo7UUFDSSxJQUFNLENBQUMsR0FBUSxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQ25DLElBQU0sTUFBTSxHQUFrQjtZQUMxQixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7WUFDWixNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU07WUFDaEIsTUFBTSxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJO1NBQy9ELENBQUM7UUFFRixPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsa0NBQVUsR0FBVjtRQUFBLGlCQW1CQztRQWxCRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN0QixJQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sS0FBSyxDQUFDO1NBQ2Y7UUFFRCxJQUFNLE1BQU0sb0JBQ0wsRUFBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBQyxFQUNqQyxJQUFJLENBQUMsTUFBTSxDQUNqQixDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQztZQUM3RixJQUFNLE1BQU0sR0FBRyxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDbkMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxFQUFFLFVBQUEsR0FBRztZQUNGLE9BQU8sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDakQsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsaURBQXlCLEdBQXpCO1FBQUEsaUJBWUM7UUFYRyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFFO2dCQUNsQyxJQUFJLENBQUMsYUFBYSxHQUFHLGNBQU0sT0FBQSxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLEVBQXZDLENBQXVDLENBQUM7Z0JBQ25FLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQW9CLENBQUMsQ0FBQzthQUMxRTtTQUNKO2FBQU07WUFDSCxJQUFJLE9BQU8sSUFBSSxDQUFDLGFBQWEsS0FBSyxVQUFVLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQW9CLENBQUMsQ0FBQztnQkFDMUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7YUFDbEM7U0FDSjtJQUNMLENBQUM7SUFFRCx5Q0FBaUIsR0FBakIsVUFBa0IsQ0FBUyxFQUFFLElBQVM7UUFDbEMsSUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUEvTmtDO1FBQWxDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUM7MENBQVMsVUFBVTtpREFBQztJQUU3QztRQUFSLEtBQUssRUFBRTs7K0NBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFOztpREFBaUM7SUFDaEM7UUFBUixLQUFLLEVBQUU7O2lEQUFpQztJQUNoQztRQUFSLEtBQUssRUFBRTs7aURBQW1DO0lBQ2xDO1FBQVIsS0FBSyxFQUFFOztnREFBbUM7SUFFbEM7UUFBUixLQUFLLEVBQUU7O2dEQUFnQjtJQUNmO1FBQVIsS0FBSyxFQUFFOzttREFBc0I7SUFDckI7UUFBUixLQUFLLEVBQUU7O29EQUErQjtJQUM5QjtRQUFSLEtBQUssRUFBRTs7Z0RBQXdCO0lBQ3ZCO1FBQVIsS0FBSyxFQUFFOzsyREFBbUM7SUFFakM7UUFBVCxNQUFNLEVBQUU7O3NEQUFpRDtJQUNoRDtRQUFULE1BQU0sRUFBRTs7aURBQTRDO0lBQzNDO1FBQVQsTUFBTSxFQUFFOztnREFBMkM7SUFDMUM7UUFBVCxNQUFNLEVBQUU7O2dEQUFtQztJQUVsQztRQUFULE1BQU0sRUFBRTs7c0RBQWtDO0lBQ2pDO1FBQVQsTUFBTSxFQUFFOztvREFBZ0M7SUFDL0I7UUFBVCxNQUFNLEVBQUU7O21EQUErQjtJQUM5QjtRQUFULE1BQU0sRUFBRTs7eURBQXFDO0lBQ3BDO1FBQVQsTUFBTSxFQUFFOzsrREFBMkM7SUFDMUM7UUFBVCxNQUFNLEVBQUU7O21EQUErQjtJQUM5QjtRQUFULE1BQU0sRUFBRTs7dURBQW1DO0lBQ2xDO1FBQVQsTUFBTSxFQUFFOzt3REFBb0M7SUFDbkM7UUFBVCxNQUFNLEVBQUU7O2dEQUE0QjtJQUMzQjtRQUFULE1BQU0sRUFBRTs7dURBQW1DO0lBQ2xDO1FBQVQsTUFBTSxFQUFFOzswREFBc0M7SUFDckM7UUFBVCxNQUFNLEVBQUU7O21EQUErQjtJQUM5QjtRQUFULE1BQU0sRUFBRTs7c0RBQWtDO0lBQ2pDO1FBQVQsTUFBTSxFQUFFOztvREFBZ0M7SUFDL0I7UUFBVCxNQUFNLEVBQUU7O2dEQUE0QjtJQUMzQjtRQUFULE1BQU0sRUFBRTs7c0RBQWtDO0lBQ2pDO1FBQVQsTUFBTSxFQUFFOzs0REFBd0M7SUFDdkM7UUFBVCxNQUFNLEVBQUU7O21EQUErQjtJQUM5QjtRQUFULE1BQU0sRUFBRTs7a0RBQThCO0lBQzdCO1FBQVQsTUFBTSxFQUFFOztpREFBNkI7SUFDNUI7UUFBVCxNQUFNLEVBQUU7O21EQUErQjtJQUM5QjtRQUFULE1BQU0sRUFBRTs7b0RBQWdDO0lBQy9CO1FBQVQsTUFBTSxFQUFFOzt1REFBbUM7SUFDbEM7UUFBVCxNQUFNLEVBQUU7O29EQUFnQztJQUMvQjtRQUFULE1BQU0sRUFBRTs7c0RBQWtDO0lBQ2pDO1FBQVQsTUFBTSxFQUFFOzt3REFBb0M7SUFDbkM7UUFBVCxNQUFNLEVBQUU7O2dFQUE0QztJQUMzQztRQUFULE1BQU0sRUFBRTs7a0RBQThCO0lBQzdCO1FBQVQsTUFBTSxFQUFFOztzREFBa0M7SUF4RGxDLGFBQWE7UUFMekIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7WUFDdkIsUUFBUSxFQUFFLDBGQUFvRjtZQUM5RixTQUFTLEVBQUUsQ0FBQyxhQUFhLENBQUM7U0FDN0IsQ0FBQztpREFpRXFCLGFBQWE7WUFDSixlQUFlO1lBQ2YsZUFBZTtPQWxFbEMsYUFBYSxDQTBPekI7SUFBRCxvQkFBQztDQUFBLEFBMU9ELElBME9DO1NBMU9ZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgU2ltcGxlQ2hhbmdlLFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVmlld0NoaWxkLFxuICAgIERvQ2hlY2ssXG4gICAgSXRlcmFibGVEaWZmZXIsXG4gICAgSXRlcmFibGVEaWZmZXJzLFxuICAgIEtleVZhbHVlRGlmZmVyLFxuICAgIEtleVZhbHVlRGlmZmVycyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBsb3RseVNlcnZpY2UgfSBmcm9tICcuLi9wbG90bHkuc2VydmljZSc7XG5pbXBvcnQgeyBQbG90bHkgfSBmcm9tICcuLi9wbG90bHkuaW50ZXJmYWNlJztcblxuLy8gQGR5bmFtaWNcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncGxvdGx5LXBsb3QnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiAjcGxvdCBbYXR0ci5pZF09XCJkaXZJZFwiIFtjbGFzc05hbWVdPVwiZ2V0Q2xhc3NOYW1lKClcIiBbbmdTdHlsZV09XCJzdHlsZVwiPjwvZGl2PmAsXG4gICAgcHJvdmlkZXJzOiBbUGxvdGx5U2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIFBsb3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBEb0NoZWNrIHtcbiAgICBwcm90ZWN0ZWQgZGVmYXVsdENsYXNzTmFtZSA9ICdqcy1wbG90bHktcGxvdCc7XG5cbiAgICBwdWJsaWMgcGxvdGx5SW5zdGFuY2U6IFBsb3RseS5QbG90bHlIVE1MRWxlbWVudDtcbiAgICBwdWJsaWMgcmVzaXplSGFuZGxlcj86IChpbnN0YW5jZTogUGxvdGx5LlBsb3RseUhUTUxFbGVtZW50KSA9PiB2b2lkO1xuICAgIHB1YmxpYyBsYXlvdXREaWZmZXI6IEtleVZhbHVlRGlmZmVyPHN0cmluZywgYW55PjtcbiAgICBwdWJsaWMgZGF0YURpZmZlcjogSXRlcmFibGVEaWZmZXI8UGxvdGx5LkRhdGE+O1xuICAgIHB1YmxpYyBkYXRhcmV2aXNpb246IG51bWJlciA9IDA7XG5cbiAgICBAVmlld0NoaWxkKCdwbG90Jywge3N0YXRpYzogdHJ1ZX0pIHBsb3RFbDogRWxlbWVudFJlZjtcblxuICAgIEBJbnB1dCgpIGRhdGE/OiBQbG90bHkuRGF0YVtdO1xuICAgIEBJbnB1dCgpIGxheW91dD86IFBhcnRpYWw8UGxvdGx5LkxheW91dD47XG4gICAgQElucHV0KCkgY29uZmlnPzogUGFydGlhbDxQbG90bHkuQ29uZmlnPjtcbiAgICBASW5wdXQoKSBmcmFtZXM/OiBQYXJ0aWFsPFBsb3RseS5Db25maWc+W107XG4gICAgQElucHV0KCkgc3R5bGU/OiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xuXG4gICAgQElucHV0KCkgZGl2SWQ/OiBzdHJpbmc7XG4gICAgQElucHV0KCkgcmV2aXNpb246IG51bWJlciA9IDA7XG4gICAgQElucHV0KCkgY2xhc3NOYW1lPzogc3RyaW5nIHwgc3RyaW5nW107XG4gICAgQElucHV0KCkgZGVidWc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSB1c2VSZXNpemVIYW5kbGVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgaW5pdGlhbGl6ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFBsb3RseS5GaWd1cmU+KCk7XG4gICAgQE91dHB1dCgpIHVwZGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8UGxvdGx5LkZpZ3VyZT4oKTtcbiAgICBAT3V0cHV0KCkgcHVyZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFBsb3RseS5GaWd1cmU+KCk7XG4gICAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxFcnJvcj4oKTtcblxuICAgIEBPdXRwdXQoKSBhZnRlckV4cG9ydCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgYWZ0ZXJQbG90ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBhbmltYXRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgYW5pbWF0aW5nRnJhbWUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGFuaW1hdGlvbkludGVycnVwdGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBhdXRvU2l6ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgYmVmb3JlRXhwb3J0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBidXR0b25DbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBjbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgcGxvdGx5X2NsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBjbGlja0Fubm90YXRpb24gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGRlc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBkb3VibGVDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgZnJhbWV3b3JrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBob3ZlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgbGVnZW5kQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGxlZ2VuZERvdWJsZUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSByZWxheW91dCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgcmVzdHlsZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgcmVkcmF3ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBzZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgc2VsZWN0aW5nID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBzbGlkZXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHNsaWRlckVuZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgc2xpZGVyU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHRyYW5zaXRpb25pbmcgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHRyYW5zaXRpb25JbnRlcnJ1cHRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgdW5ob3ZlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgcmVsYXlvdXRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgZXZlbnROYW1lcyA9IFsnYWZ0ZXJFeHBvcnQnLCAnYWZ0ZXJQbG90JywgJ2FuaW1hdGVkJywgJ2FuaW1hdGluZ0ZyYW1lJywgJ2FuaW1hdGlvbkludGVycnVwdGVkJywgJ2F1dG9TaXplJyxcbiAgICAgICAgJ2JlZm9yZUV4cG9ydCcsICdidXR0b25DbGlja2VkJywgJ2NsaWNrQW5ub3RhdGlvbicsICdkZXNlbGVjdCcsICdkb3VibGVDbGljaycsICdmcmFtZXdvcmsnLCAnaG92ZXInLFxuICAgICAgICAnbGVnZW5kQ2xpY2snLCAnbGVnZW5kRG91YmxlQ2xpY2snLCAncmVsYXlvdXQnLCAncmVzdHlsZScsICdyZWRyYXcnLCAnc2VsZWN0ZWQnLCAnc2VsZWN0aW5nJywgJ3NsaWRlckNoYW5nZScsXG4gICAgICAgICdzbGlkZXJFbmQnLCAnc2xpZGVyU3RhcnQnLCAndHJhbnNpdGlvbmluZycsICd0cmFuc2l0aW9uSW50ZXJydXB0ZWQnLCAndW5ob3ZlcicsICdyZWxheW91dGluZyddO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBwbG90bHk6IFBsb3RseVNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyBpdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICAgICAgcHVibGljIGtleVZhbHVlRGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxuICAgICkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVQbG90KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaWd1cmUgPSB0aGlzLmNyZWF0ZUZpZ3VyZSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZC5lbWl0KGZpZ3VyZSk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgaWYgKHRoaXMucGxvdGx5LmRlYnVnICYmIHRoaXMuY2xpY2sub2JzZXJ2ZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9ICdERVBSRUNBVEVEOiBSZWNvbnNpZGVyIHVzaW5nIGAocGxvdGx5X2NsaWNrKWAgaW5zdGVhZCBvZiBgKGNsaWNrKWAgdG8gYXZvaWQgZXZlbnQgY29uZmxpY3QuICdcbiAgICAgICAgICAgICAgICArICdQbGVhc2UgY2hlY2sgaHR0cHM6Ly9naXRodWIuY29tL3Bsb3RseS9hbmd1bGFyLXBsb3RseS5qcyNGQVEnO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5yZXNpemVIYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLmdldFdpbmRvdygpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzaXplSGFuZGxlciBhcyBhbnkpO1xuICAgICAgICAgICAgdGhpcy5yZXNpemVIYW5kbGVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmlndXJlID0gdGhpcy5jcmVhdGVGaWd1cmUoKTtcbiAgICAgICAgdGhpcy5wdXJnZS5lbWl0KGZpZ3VyZSk7XG4gICAgICAgIFBsb3RseVNlcnZpY2UucmVtb3ZlKHRoaXMucGxvdGx5SW5zdGFuY2UpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgbGV0IHNob3VsZFVwZGF0ZSA9IGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IHJldmlzaW9uOiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzLnJldmlzaW9uO1xuICAgICAgICBpZiAocmV2aXNpb24gJiYgIXJldmlzaW9uLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgICAgICAgc2hvdWxkVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRlYnVnOiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzLmRlYnVnO1xuICAgICAgICBpZiAoZGVidWcgJiYgIWRlYnVnLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgICAgICAgc2hvdWxkVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaG91bGRVcGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGxvdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVXaW5kb3dSZXNpemVIYW5kbGVyKCk7XG4gICAgfVxuXG4gICAgbmdEb0NoZWNrKCkge1xuICAgICAgICBsZXQgc2hvdWxkVXBkYXRlID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMubGF5b3V0RGlmZmVyKSB7XG4gICAgICAgICAgICBjb25zdCBsYXlvdXRIYXNEaWZmID0gdGhpcy5sYXlvdXREaWZmZXIuZGlmZih0aGlzLmxheW91dCk7XG4gICAgICAgICAgICBpZiAobGF5b3V0SGFzRGlmZikge1xuICAgICAgICAgICAgICAgIHNob3VsZFVwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5sYXlvdXQpIHtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0RGlmZmVyID0gdGhpcy5rZXlWYWx1ZURpZmZlcnMuZmluZCh0aGlzLmxheW91dCkuY3JlYXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxheW91dERpZmZlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRhdGFEaWZmZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFIYXNEaWZmID0gdGhpcy5kYXRhRGlmZmVyLmRpZmYodGhpcy5kYXRhKTtcbiAgICAgICAgICAgIGlmIChkYXRhSGFzRGlmZikge1xuICAgICAgICAgICAgICAgIHNob3VsZFVwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmRhdGEpKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFEaWZmZXIgPSB0aGlzLml0ZXJhYmxlRGlmZmVycy5maW5kKHRoaXMuZGF0YSkuY3JlYXRlKHRoaXMuZGF0YURpZmZlclRyYWNrQnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kYXRhRGlmZmVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNob3VsZFVwZGF0ZSAmJiB0aGlzLnBsb3RseUluc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFyZXZpc2lvbiArPSAxO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQbG90KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRXaW5kb3coKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdztcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGNsYXNzZXMgPSBbdGhpcy5kZWZhdWx0Q2xhc3NOYW1lXTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzLmNvbmNhdCh0aGlzLmNsYXNzTmFtZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaCh0aGlzLmNsYXNzTmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG4gICAgfVxuXG4gICAgY3JlYXRlUGxvdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGxvdGx5Lm5ld1Bsb3QodGhpcy5wbG90RWwubmF0aXZlRWxlbWVudCwgdGhpcy5kYXRhLCB0aGlzLmxheW91dCwgdGhpcy5jb25maWcsIHRoaXMuZnJhbWVzKS50aGVuKHBsb3RseUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgIHRoaXMucGxvdGx5SW5zdGFuY2UgPSBwbG90bHlJbnN0YW5jZTtcbiAgICAgICAgICAgIHRoaXMuZ2V0V2luZG93KCkuZ2QgPSB0aGlzLmRlYnVnID8gcGxvdGx5SW5zdGFuY2UgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnROYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IGBwbG90bHlfJHtuYW1lLnRvTG93ZXJDYXNlKCl9YDtcbiAgICAgICAgICAgICAgICBwbG90bHlJbnN0YW5jZS5vbihldmVudE5hbWUsIChkYXRhOiBhbnkpID0+ICh0aGlzW25hbWVdIGFzIEV2ZW50RW1pdHRlcjx2b2lkPikuZW1pdChkYXRhKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcGxvdGx5SW5zdGFuY2Uub24oJ3Bsb3RseV9jbGljaycsIChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrLmVtaXQoZGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wbG90bHlfY2xpY2suZW1pdChkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVdpbmRvd1Jlc2l6ZUhhbmRsZXIoKTtcbiAgICAgICAgfSwgZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHdoaWxlIHBsb3R0aW5nOicsIGVycik7XG4gICAgICAgICAgICB0aGlzLmVycm9yLmVtaXQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY3JlYXRlRmlndXJlKCk6IFBsb3RseS5GaWd1cmUge1xuICAgICAgICBjb25zdCBwOiBhbnkgPSB0aGlzLnBsb3RseUluc3RhbmNlO1xuICAgICAgICBjb25zdCBmaWd1cmU6IFBsb3RseS5GaWd1cmUgPSB7XG4gICAgICAgICAgICBkYXRhOiBwLmRhdGEsXG4gICAgICAgICAgICBsYXlvdXQ6IHAubGF5b3V0LFxuICAgICAgICAgICAgZnJhbWVzOiBwLl90cmFuc2l0aW9uRGF0YSA/IHAuX3RyYW5zaXRpb25EYXRhLl9mcmFtZXMgOiBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGZpZ3VyZTtcbiAgICB9XG5cbiAgICB1cGRhdGVQbG90KCkge1xuICAgICAgICBpZiAoIXRoaXMucGxvdGx5SW5zdGFuY2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBQbG90bHkgY29tcG9uZW50IHdhc24ndCBpbml0aWFsaXplZGApO1xuICAgICAgICAgICAgdGhpcy5lcnJvci5lbWl0KGVycm9yKTtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbGF5b3V0ID0ge1xuICAgICAgICAgICAgLi4ue2RhdGFyZXZpc2lvbjogdGhpcy5kYXRhcmV2aXNpb259LFxuICAgICAgICAgICAgLi4udGhpcy5sYXlvdXQsXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucGxvdGx5LnVwZGF0ZSh0aGlzLnBsb3RseUluc3RhbmNlLCB0aGlzLmRhdGEsIGxheW91dCwgdGhpcy5jb25maWcsIHRoaXMuZnJhbWVzKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpZ3VyZSA9IHRoaXMuY3JlYXRlRmlndXJlKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZS5lbWl0KGZpZ3VyZSk7XG4gICAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciB3aGlsZSB1cGRhdGluZyBwbG90OicsIGVycik7XG4gICAgICAgICAgICB0aGlzLmVycm9yLmVtaXQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlV2luZG93UmVzaXplSGFuZGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMudXNlUmVzaXplSGFuZGxlcikge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVzaXplSGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemVIYW5kbGVyID0gKCkgPT4gdGhpcy5wbG90bHkucmVzaXplKHRoaXMucGxvdGx5SW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0V2luZG93KCkuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemVIYW5kbGVyIGFzIGFueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucmVzaXplSGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0V2luZG93KCkucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemVIYW5kbGVyIGFzIGFueSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemVIYW5kbGVyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGF0YURpZmZlclRyYWNrQnkoXzogbnVtYmVyLCBpdGVtOiBhbnkpOiBhbnkge1xuICAgICAgICBjb25zdCBvYmogPSBPYmplY3QuYXNzaWduKHt9LCBpdGVtLCB7IHVpZDogJycgfSk7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xuICAgIH1cblxufVxuIl19