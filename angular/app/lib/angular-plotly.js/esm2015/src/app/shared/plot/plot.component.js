import * as tslib_1 from "tslib";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, IterableDiffers, KeyValueDiffers, } from '@angular/core';
import { PlotlyService } from '../plotly.service';
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
        template: `<div #plot [attr.id]="divId" [className]="getClassName()" [ngStyle]="style"></div>`,
        providers: [PlotlyService]
    }),
    tslib_1.__metadata("design:paramtypes", [PlotlyService,
        IterableDiffers,
        KeyValueDiffers])
], PlotComponent);
export { PlotComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxvdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXBsb3RseS5qcy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL3Bsb3QvcGxvdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxFQUdOLFNBQVMsRUFHVCxlQUFlLEVBRWYsZUFBZSxHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFHbEQsV0FBVztBQU1YLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUErRHRCLFlBQ1csTUFBcUIsRUFDckIsZUFBZ0MsRUFDaEMsZUFBZ0M7UUFGaEMsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNyQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBakVqQyxxQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQU12QyxpQkFBWSxHQUFXLENBQUMsQ0FBQztRQVd2QixhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBRXJCLFVBQUssR0FBWSxLQUFLLENBQUM7UUFDdkIscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBRWpDLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFDaEQsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBQzNDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUMxQyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVMsQ0FBQztRQUVsQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakMsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0IsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFB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OEI7QUFDN0I7SUFBVCxNQUFNLEVBQUU7OzZDQUE2QjtBQUM1QjtJQUFULE1BQU0sRUFBRTs7K0NBQStCO0FBQzlCO0lBQVQsTUFBTSxFQUFFOztnREFBZ0M7QUFDL0I7SUFBVCxNQUFNLEVBQUU7O21EQUFtQztBQUNsQztJQUFULE1BQU0sRUFBRTs7Z0RBQWdDO0FBQy9CO0lBQVQsTUFBTSxFQUFFOztrREFBa0M7QUFDakM7SUFBVCxNQUFNLEVBQUU7O29EQUFvQztBQUNuQztJQUFULE1BQU0sRUFBRTs7NERBQTRDO0FBQzNDO0lBQVQsTUFBTSxFQUFFOzs4Q0FBOEI7QUFDN0I7SUFBVCxNQUFNLEVBQUU7O2tEQUFrQztBQXhEbEMsYUFBYTtJQUx6QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsYUFBYTtRQUN2QixRQUFRLEVBQUUsb0ZBQW9GO1FBQzlGLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQztLQUM3QixDQUFDOzZDQWlFcUIsYUFBYTtRQUNKLGVBQWU7UUFDZixlQUFlO0dBbEVsQyxhQUFhLENBME96QjtTQTFPWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFNpbXBsZUNoYW5nZSxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFZpZXdDaGlsZCxcbiAgICBEb0NoZWNrLFxuICAgIEl0ZXJhYmxlRGlmZmVyLFxuICAgIEl0ZXJhYmxlRGlmZmVycyxcbiAgICBLZXlWYWx1ZURpZmZlcixcbiAgICBLZXlWYWx1ZURpZmZlcnMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQbG90bHlTZXJ2aWNlIH0gZnJvbSAnLi4vcGxvdGx5LnNlcnZpY2UnO1xuaW1wb3J0IHsgUGxvdGx5IH0gZnJvbSAnLi4vcGxvdGx5LmludGVyZmFjZSc7XG5cbi8vIEBkeW5hbWljXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Bsb3RseS1wbG90JyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgI3Bsb3QgW2F0dHIuaWRdPVwiZGl2SWRcIiBbY2xhc3NOYW1lXT1cImdldENsYXNzTmFtZSgpXCIgW25nU3R5bGVdPVwic3R5bGVcIj48L2Rpdj5gLFxuICAgIHByb3ZpZGVyczogW1Bsb3RseVNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBQbG90Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgRG9DaGVjayB7XG4gICAgcHJvdGVjdGVkIGRlZmF1bHRDbGFzc05hbWUgPSAnanMtcGxvdGx5LXBsb3QnO1xuXG4gICAgcHVibGljIHBsb3RseUluc3RhbmNlOiBQbG90bHkuUGxvdGx5SFRNTEVsZW1lbnQ7XG4gICAgcHVibGljIHJlc2l6ZUhhbmRsZXI/OiAoaW5zdGFuY2U6IFBsb3RseS5QbG90bHlIVE1MRWxlbWVudCkgPT4gdm9pZDtcbiAgICBwdWJsaWMgbGF5b3V0RGlmZmVyOiBLZXlWYWx1ZURpZmZlcjxzdHJpbmcsIGFueT47XG4gICAgcHVibGljIGRhdGFEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPFBsb3RseS5EYXRhPjtcbiAgICBwdWJsaWMgZGF0YXJldmlzaW9uOiBudW1iZXIgPSAwO1xuXG4gICAgQFZpZXdDaGlsZCgncGxvdCcsIHtzdGF0aWM6IHRydWV9KSBwbG90RWw6IEVsZW1lbnRSZWY7XG5cbiAgICBASW5wdXQoKSBkYXRhPzogUGxvdGx5LkRhdGFbXTtcbiAgICBASW5wdXQoKSBsYXlvdXQ/OiBQYXJ0aWFsPFBsb3RseS5MYXlvdXQ+O1xuICAgIEBJbnB1dCgpIGNvbmZpZz86IFBhcnRpYWw8UGxvdGx5LkNvbmZpZz47XG4gICAgQElucHV0KCkgZnJhbWVzPzogUGFydGlhbDxQbG90bHkuQ29uZmlnPltdO1xuICAgIEBJbnB1dCgpIHN0eWxlPzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcblxuICAgIEBJbnB1dCgpIGRpdklkPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHJldmlzaW9uOiBudW1iZXIgPSAwO1xuICAgIEBJbnB1dCgpIGNsYXNzTmFtZT86IHN0cmluZyB8IHN0cmluZ1tdO1xuICAgIEBJbnB1dCgpIGRlYnVnOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgdXNlUmVzaXplSGFuZGxlcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpIGluaXRpYWxpemVkID0gbmV3IEV2ZW50RW1pdHRlcjxQbG90bHkuRmlndXJlPigpO1xuICAgIEBPdXRwdXQoKSB1cGRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPFBsb3RseS5GaWd1cmU+KCk7XG4gICAgQE91dHB1dCgpIHB1cmdlID0gbmV3IEV2ZW50RW1pdHRlcjxQbG90bHkuRmlndXJlPigpO1xuICAgIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8RXJyb3I+KCk7XG5cbiAgICBAT3V0cHV0KCkgYWZ0ZXJFeHBvcnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGFmdGVyUGxvdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgYW5pbWF0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGFuaW1hdGluZ0ZyYW1lID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBhbmltYXRpb25JbnRlcnJ1cHRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgYXV0b1NpemUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGJlZm9yZUV4cG9ydCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgYnV0dG9uQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgY2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHBsb3RseV9jbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgY2xpY2tBbm5vdGF0aW9uID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBkZXNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgZG91YmxlQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGZyYW1ld29yayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgaG92ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGxlZ2VuZENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBsZWdlbmREb3VibGVDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgcmVsYXlvdXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHJlc3R5bGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHJlZHJhdyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgc2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHNlbGVjdGluZyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgc2xpZGVyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBzbGlkZXJFbmQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHNsaWRlclN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSB0cmFuc2l0aW9uaW5nID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSB0cmFuc2l0aW9uSW50ZXJydXB0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHVuaG92ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHJlbGF5b3V0aW5nID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGV2ZW50TmFtZXMgPSBbJ2FmdGVyRXhwb3J0JywgJ2FmdGVyUGxvdCcsICdhbmltYXRlZCcsICdhbmltYXRpbmdGcmFtZScsICdhbmltYXRpb25JbnRlcnJ1cHRlZCcsICdhdXRvU2l6ZScsXG4gICAgICAgICdiZWZvcmVFeHBvcnQnLCAnYnV0dG9uQ2xpY2tlZCcsICdjbGlja0Fubm90YXRpb24nLCAnZGVzZWxlY3QnLCAnZG91YmxlQ2xpY2snLCAnZnJhbWV3b3JrJywgJ2hvdmVyJyxcbiAgICAgICAgJ2xlZ2VuZENsaWNrJywgJ2xlZ2VuZERvdWJsZUNsaWNrJywgJ3JlbGF5b3V0JywgJ3Jlc3R5bGUnLCAncmVkcmF3JywgJ3NlbGVjdGVkJywgJ3NlbGVjdGluZycsICdzbGlkZXJDaGFuZ2UnLFxuICAgICAgICAnc2xpZGVyRW5kJywgJ3NsaWRlclN0YXJ0JywgJ3RyYW5zaXRpb25pbmcnLCAndHJhbnNpdGlvbkludGVycnVwdGVkJywgJ3VuaG92ZXInLCAncmVsYXlvdXRpbmcnXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcGxvdGx5OiBQbG90bHlTZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgaXRlcmFibGVEaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsXG4gICAgICAgIHB1YmxpYyBrZXlWYWx1ZURpZmZlcnM6IEtleVZhbHVlRGlmZmVycyxcbiAgICApIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlUGxvdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlndXJlID0gdGhpcy5jcmVhdGVGaWd1cmUoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQuZW1pdChmaWd1cmUpO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIGlmICh0aGlzLnBsb3RseS5kZWJ1ZyAmJiB0aGlzLmNsaWNrLm9ic2VydmVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSAnREVQUkVDQVRFRDogUmVjb25zaWRlciB1c2luZyBgKHBsb3RseV9jbGljaylgIGluc3RlYWQgb2YgYChjbGljaylgIHRvIGF2b2lkIGV2ZW50IGNvbmZsaWN0LiAnXG4gICAgICAgICAgICAgICAgKyAnUGxlYXNlIGNoZWNrIGh0dHBzOi8vZ2l0aHViLmNvbS9wbG90bHkvYW5ndWxhci1wbG90bHkuanMjRkFRJztcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMucmVzaXplSGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5nZXRXaW5kb3coKS5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUhhbmRsZXIgYXMgYW55KTtcbiAgICAgICAgICAgIHRoaXMucmVzaXplSGFuZGxlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpZ3VyZSA9IHRoaXMuY3JlYXRlRmlndXJlKCk7XG4gICAgICAgIHRoaXMucHVyZ2UuZW1pdChmaWd1cmUpO1xuICAgICAgICBQbG90bHlTZXJ2aWNlLnJlbW92ZSh0aGlzLnBsb3RseUluc3RhbmNlKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGxldCBzaG91bGRVcGRhdGUgPSBmYWxzZTtcblxuICAgICAgICBjb25zdCByZXZpc2lvbjogU2ltcGxlQ2hhbmdlID0gY2hhbmdlcy5yZXZpc2lvbjtcbiAgICAgICAgaWYgKHJldmlzaW9uICYmICFyZXZpc2lvbi5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgICAgICAgIHNob3VsZFVwZGF0ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkZWJ1ZzogU2ltcGxlQ2hhbmdlID0gY2hhbmdlcy5kZWJ1ZztcbiAgICAgICAgaWYgKGRlYnVnICYmICFkZWJ1Zy5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgICAgICAgIHNob3VsZFVwZGF0ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2hvdWxkVXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBsb3QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlV2luZG93UmVzaXplSGFuZGxlcigpO1xuICAgIH1cblxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgbGV0IHNob3VsZFVwZGF0ZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLmxheW91dERpZmZlcikge1xuICAgICAgICAgICAgY29uc3QgbGF5b3V0SGFzRGlmZiA9IHRoaXMubGF5b3V0RGlmZmVyLmRpZmYodGhpcy5sYXlvdXQpO1xuICAgICAgICAgICAgaWYgKGxheW91dEhhc0RpZmYpIHtcbiAgICAgICAgICAgICAgICBzaG91bGRVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubGF5b3V0KSB7XG4gICAgICAgICAgICB0aGlzLmxheW91dERpZmZlciA9IHRoaXMua2V5VmFsdWVEaWZmZXJzLmZpbmQodGhpcy5sYXlvdXQpLmNyZWF0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sYXlvdXREaWZmZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kYXRhRGlmZmVyKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhSGFzRGlmZiA9IHRoaXMuZGF0YURpZmZlci5kaWZmKHRoaXMuZGF0YSk7XG4gICAgICAgICAgICBpZiAoZGF0YUhhc0RpZmYpIHtcbiAgICAgICAgICAgICAgICBzaG91bGRVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5kYXRhKSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhRGlmZmVyID0gdGhpcy5pdGVyYWJsZURpZmZlcnMuZmluZCh0aGlzLmRhdGEpLmNyZWF0ZSh0aGlzLmRhdGFEaWZmZXJUcmFja0J5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YURpZmZlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaG91bGRVcGRhdGUgJiYgdGhpcy5wbG90bHlJbnN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhcmV2aXNpb24gKz0gMTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGxvdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0V2luZG93KCk6IGFueSB7XG4gICAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBjbGFzc2VzID0gW3RoaXMuZGVmYXVsdENsYXNzTmFtZV07XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5jbGFzc05hbWUpKSB7XG4gICAgICAgICAgICBjbGFzc2VzID0gY2xhc3Nlcy5jb25jYXQodGhpcy5jbGFzc05hbWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2godGhpcy5jbGFzc05hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuICAgIH1cblxuICAgIGNyZWF0ZVBsb3QoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBsb3RseS5uZXdQbG90KHRoaXMucGxvdEVsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuZGF0YSwgdGhpcy5sYXlvdXQsIHRoaXMuY29uZmlnLCB0aGlzLmZyYW1lcykudGhlbihwbG90bHlJbnN0YW5jZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsb3RseUluc3RhbmNlID0gcGxvdGx5SW5zdGFuY2U7XG4gICAgICAgICAgICB0aGlzLmdldFdpbmRvdygpLmdkID0gdGhpcy5kZWJ1ZyA/IHBsb3RseUluc3RhbmNlIDogdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICB0aGlzLmV2ZW50TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBldmVudE5hbWUgPSBgcGxvdGx5XyR7bmFtZS50b0xvd2VyQ2FzZSgpfWA7XG4gICAgICAgICAgICAgICAgcGxvdGx5SW5zdGFuY2Uub24oZXZlbnROYW1lLCAoZGF0YTogYW55KSA9PiAodGhpc1tuYW1lXSBhcyBFdmVudEVtaXR0ZXI8dm9pZD4pLmVtaXQoZGF0YSkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHBsb3RseUluc3RhbmNlLm9uKCdwbG90bHlfY2xpY2snLCAoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGljay5lbWl0KGRhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMucGxvdGx5X2NsaWNrLmVtaXQoZGF0YSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVXaW5kb3dSZXNpemVIYW5kbGVyKCk7XG4gICAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciB3aGlsZSBwbG90dGluZzonLCBlcnIpO1xuICAgICAgICAgICAgdGhpcy5lcnJvci5lbWl0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNyZWF0ZUZpZ3VyZSgpOiBQbG90bHkuRmlndXJlIHtcbiAgICAgICAgY29uc3QgcDogYW55ID0gdGhpcy5wbG90bHlJbnN0YW5jZTtcbiAgICAgICAgY29uc3QgZmlndXJlOiBQbG90bHkuRmlndXJlID0ge1xuICAgICAgICAgICAgZGF0YTogcC5kYXRhLFxuICAgICAgICAgICAgbGF5b3V0OiBwLmxheW91dCxcbiAgICAgICAgICAgIGZyYW1lczogcC5fdHJhbnNpdGlvbkRhdGEgPyBwLl90cmFuc2l0aW9uRGF0YS5fZnJhbWVzIDogbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBmaWd1cmU7XG4gICAgfVxuXG4gICAgdXBkYXRlUGxvdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBsb3RseUluc3RhbmNlKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgUGxvdGx5IGNvbXBvbmVudCB3YXNuJ3QgaW5pdGlhbGl6ZWRgKTtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IuZW1pdChlcnJvcik7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxheW91dCA9IHtcbiAgICAgICAgICAgIC4uLntkYXRhcmV2aXNpb246IHRoaXMuZGF0YXJldmlzaW9ufSxcbiAgICAgICAgICAgIC4uLnRoaXMubGF5b3V0LFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aGlzLnBsb3RseS51cGRhdGUodGhpcy5wbG90bHlJbnN0YW5jZSwgdGhpcy5kYXRhLCBsYXlvdXQsIHRoaXMuY29uZmlnLCB0aGlzLmZyYW1lcykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaWd1cmUgPSB0aGlzLmNyZWF0ZUZpZ3VyZSgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGUuZW1pdChmaWd1cmUpO1xuICAgICAgICB9LCBlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igd2hpbGUgdXBkYXRpbmcgcGxvdDonLCBlcnIpO1xuICAgICAgICAgICAgdGhpcy5lcnJvci5lbWl0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZVdpbmRvd1Jlc2l6ZUhhbmRsZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnVzZVJlc2l6ZUhhbmRsZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc2l6ZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzaXplSGFuZGxlciA9ICgpID0+IHRoaXMucGxvdGx5LnJlc2l6ZSh0aGlzLnBsb3RseUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFdpbmRvdygpLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzaXplSGFuZGxlciBhcyBhbnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnJlc2l6ZUhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFdpbmRvdygpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzaXplSGFuZGxlciBhcyBhbnkpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzaXplSGFuZGxlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRhdGFEaWZmZXJUcmFja0J5KF86IG51bWJlciwgaXRlbTogYW55KTogYW55IHtcbiAgICAgICAgY29uc3Qgb2JqID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSwgeyB1aWQ6ICcnIH0pO1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgICB9XG5cbn1cbiJdfQ==