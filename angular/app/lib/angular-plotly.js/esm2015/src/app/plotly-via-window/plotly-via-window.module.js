import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotComponent } from '../shared/plot/plot.component';
import { PlotlyService } from '../shared/plotly.service';
import { SharedModule } from '../shared/shared.module';
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
PlotlyViaWindowModule = tslib_1.__decorate([
    NgModule({
        imports: [CommonModule, SharedModule],
        declarations: [],
        exports: [PlotComponent]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], PlotlyViaWindowModule);
export { PlotlyViaWindowModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxvdGx5LXZpYS13aW5kb3cubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1wbG90bHkuanMvIiwic291cmNlcyI6WyJzcmMvYXBwL3Bsb3RseS12aWEtd2luZG93L3Bsb3RseS12aWEtd2luZG93Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFRdkQsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFDOUI7UUFDSSxNQUFNLE1BQU0sR0FBSSxNQUFjLENBQUMsTUFBTSxDQUFDO1FBRXRDLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO1lBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztTQUN6RDtRQUVELGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFPO1FBQ1YsTUFBTSxHQUFHLEdBQUcsc0VBQXNFLENBQUM7UUFDbkYsTUFBTSxJQUFJLEtBQUssQ0FBQyxxRUFBcUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNoRyxDQUFDO0NBQ0osQ0FBQTtBQWZZLHFCQUFxQjtJQUxqQyxRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDO1FBQ3JDLFlBQVksRUFBRSxFQUFFO1FBQ2hCLE9BQU8sRUFBRSxDQUFDLGFBQWEsQ0FBQztLQUMzQixDQUFDOztHQUNXLHFCQUFxQixDQWVqQztTQWZZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBQbG90Q29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL3Bsb3QvcGxvdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGxvdGx5U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9wbG90bHkuc2VydmljZSc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW10sXG4gICAgZXhwb3J0czogW1Bsb3RDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFBsb3RseVZpYVdpbmRvd01vZHVsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGNvbnN0IHBsb3RseSA9ICh3aW5kb3cgYXMgYW55KS5QbG90bHk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBwbG90bHkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBsb3RseSBvYmplY3Qgbm90IGZvdW5kIG9uIHdpbmRvdy5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFBsb3RseVNlcnZpY2Uuc2V0UGxvdGx5KHBsb3RseSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZvclJvb3QoKTogbmV2ZXIge1xuICAgICAgICBjb25zdCB1cmwgPSBcImh0dHBzOi8vZ2l0aHViLmNvbS9wbG90bHkvYW5ndWxhci1wbG90bHkuanMjcGxvdGx5LXZpYS13aW5kb3ctbW9kdWxlXCI7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgW1Bsb3RseVZpYVdpbmRvd01vZHVsZV0gZm9yUm9vdCBtZXRob2QgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHNlZTogJHt1cmx9YCk7XG4gICAgfVxufVxuIl19