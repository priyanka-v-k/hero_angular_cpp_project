import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotComponent } from './plot/plot.component';
import { PlotlyService } from './plotly.service';
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [PlotComponent],
            providers: [PlotlyService],
            exports: [PlotComponent]
        })
    ], SharedModule);
    return SharedModule;
}());
export { SharedModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItcGxvdGx5LmpzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zaGFyZWQvc2hhcmVkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQVFqRDtJQUFBO0lBQTRCLENBQUM7SUFBaEIsWUFBWTtRQU54QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsWUFBWSxFQUFFLENBQUMsYUFBYSxDQUFDO1lBQzdCLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQztZQUMxQixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7U0FDM0IsQ0FBQztPQUNXLFlBQVksQ0FBSTtJQUFELG1CQUFDO0NBQUEsQUFBN0IsSUFBNkI7U0FBaEIsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBQbG90Q29tcG9uZW50IH0gZnJvbSAnLi9wbG90L3Bsb3QuY29tcG9uZW50JztcbmltcG9ydCB7IFBsb3RseVNlcnZpY2UgfSBmcm9tICcuL3Bsb3RseS5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtQbG90Q29tcG9uZW50XSxcbiAgICBwcm92aWRlcnM6IFtQbG90bHlTZXJ2aWNlXSxcbiAgICBleHBvcnRzOiBbUGxvdENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgU2hhcmVkTW9kdWxlIHsgfVxuIl19