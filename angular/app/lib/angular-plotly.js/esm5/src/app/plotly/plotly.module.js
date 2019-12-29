import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotComponent } from '../shared/plot/plot.component';
import { PlotlyService } from '../shared/plotly.service';
import { SharedModule } from '../shared/shared.module';
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
    PlotlyModule = PlotlyModule_1 = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule, SharedModule],
            declarations: [],
            exports: [PlotComponent]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], PlotlyModule);
    return PlotlyModule;
}());
export { PlotlyModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxvdGx5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItcGxvdGx5LmpzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9wbG90bHkvcGxvdGx5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFRdkQ7SUFHSTtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDakIsSUFBTSxHQUFHLEdBQUcsK0ZBQStGO2tCQUMvRiw4Q0FBOEMsQ0FBQztZQUMzRCxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCO1FBRUQsYUFBYSxDQUFDLFNBQVMsQ0FBQyxjQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkQsQ0FBQztxQkFYUSxZQUFZO0lBYWIsOEJBQU8sR0FBZjtRQUNJLE9BQU8sY0FBWSxDQUFDLFFBQVEsS0FBSyxTQUFTO2VBQ25DLE9BQU8sY0FBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDO0lBQzVELENBQUM7O0lBZmEscUJBQVEsR0FBUSxFQUFFLENBQUM7SUFEeEIsWUFBWTtRQUx4QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDO1lBQ3JDLFlBQVksRUFBRSxFQUFFO1lBQ2hCLE9BQU8sRUFBRSxDQUFDLGFBQWEsQ0FBQztTQUMzQixDQUFDOztPQUNXLFlBQVksQ0FpQnhCO0lBQUQsbUJBQUM7Q0FBQSxBQWpCRCxJQWlCQztTQWpCWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFBsb3RDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvcGxvdC9wbG90LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQbG90bHlTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3Bsb3RseS5zZXJ2aWNlJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbXSxcbiAgICBleHBvcnRzOiBbUGxvdENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUGxvdGx5TW9kdWxlIHtcbiAgICBwdWJsaWMgc3RhdGljIHBsb3RseWpzOiBhbnkgPSB7fTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSBcIkludmFsaWQgUGxvdGx5SlMgb2JqZWN0LiBQbGVhc2UgY2hlY2sgaHR0cHM6Ly9naXRodWIuY29tL3Bsb3RseS9hbmd1bGFyLXBsb3RseS5qcyNxdWljay1zdGFydFwiXG4gICAgICAgICAgICAgICAgICAgICAgKyBcIiB0byBzZWUgaG93IHRvIGFkZCBQbG90bHlKUyB0byB5b3VyIHByb2plY3QuXCI7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFBsb3RseVNlcnZpY2Uuc2V0UGxvdGx5KFBsb3RseU1vZHVsZS5wbG90bHlqcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gUGxvdGx5TW9kdWxlLnBsb3RseWpzICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICYmIHR5cGVvZiBQbG90bHlNb2R1bGUucGxvdGx5anMucGxvdCA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9XG59XG4iXX0=