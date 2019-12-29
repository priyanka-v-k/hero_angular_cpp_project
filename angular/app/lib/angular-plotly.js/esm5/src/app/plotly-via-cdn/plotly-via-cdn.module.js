import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotComponent } from '../shared/plot/plot.component';
import { PlotlyService } from '../shared/plotly.service';
import { SharedModule } from '../shared/shared.module';
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
    PlotlyViaCDNModule = PlotlyViaCDNModule_1 = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule, SharedModule],
            declarations: [],
            exports: [PlotComponent]
        }),
        tslib_1.__metadata("design:paramtypes", [PlotlyService])
    ], PlotlyViaCDNModule);
    return PlotlyViaCDNModule;
}());
export { PlotlyViaCDNModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxvdGx5LXZpYS1jZG4ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1wbG90bHkuanMvIiwic291cmNlcyI6WyJzcmMvYXBwL3Bsb3RseS12aWEtY2RuL3Bsb3RseS12aWEtY2RuLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFJdkQsV0FBVztBQU1YO0lBS0ksNEJBQW1CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzNDLGFBQWEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUMsQ0FBQzsyQkFQUSxrQkFBa0I7SUFTM0Isc0JBQVcsbUNBQWE7YUFBeEIsVUFBeUIsT0FBZTtZQUNwQyxJQUFNLElBQUksR0FBRyxPQUFPLEtBQUssUUFBUSxJQUFJLHdCQUF3QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1RSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNQLE1BQU0sSUFBSSxLQUFLLENBQUMsNkVBQTZFLENBQUMsQ0FBQzthQUNsRztZQUVELG9CQUFrQixDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2hDLG9CQUFrQixDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7UUFDaEQsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxrQ0FBWTthQUF2QixVQUF3QixNQUF3QjtZQUM1QyxJQUFNLElBQUksR0FBRyxNQUFNLEtBQUssSUFBSSxJQUFJLG9CQUFrQixDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxNQUFN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b250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBQbG90Q29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL3Bsb3QvcGxvdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGxvdGx5U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9wbG90bHkuc2VydmljZSc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5cbmV4cG9ydCB0eXBlIFBsb3RseUJ1bmRsZU5hbWUgPSAnYmFzaWMnIHwgJ2NhcnRlc2lhbicgfCAnZ2VvJyB8ICdnbDNkJyB8ICdnbDJkJyB8ICdtYXBib3gnIHwgJ2ZpbmFuY2UnO1xuXG4vLyBAZHluYW1pY1xuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW10sXG4gICAgZXhwb3J0czogW1Bsb3RDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFBsb3RseVZpYUNETk1vZHVsZSB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgX3Bsb3RseUJ1bmRsZT86IHN0cmluZyA9IG51bGw7XG4gICAgcHJpdmF0ZSBzdGF0aWMgX3Bsb3RseVZlcnNpb246IHN0cmluZyA9ICdsYXRlc3QnO1xuICAgIHN0YXRpYyBwbG90bHlCdW5kbGVOYW1lczogUGxvdGx5QnVuZGxlTmFtZVtdID0gWydiYXNpYycsICdjYXJ0ZXNpYW4nLCAnZ2VvJywgJ2dsM2QnLCAnZ2wyZCcsICdtYXBib3gnLCAnZmluYW5jZSddO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHBsb3RseVNlcnZpY2U6IFBsb3RseVNlcnZpY2UpIHtcbiAgICAgICAgUGxvdGx5U2VydmljZS5zZXRNb2R1bGVOYW1lKCdWaWFDRE4nKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0IHBsb3RseVZlcnNpb24odmVyc2lvbjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGlzT2sgPSB2ZXJzaW9uID09PSAnbGF0ZXN0JyB8fCAvXlxcZFxcLlxcZHsxLDJ9XFwuXFxkezEsMn0kLy50ZXN0KHZlcnNpb24pO1xuICAgICAgICBpZiAoIWlzT2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwbG90bHkgdmVyc2lvbi4gUGxlYXNlIHNldCAnbGF0ZXN0JyBvciB2ZXJzaW9uIG51bWJlciAoaS5lLjogMS40LjMpYCk7XG4gICAgICAgIH1cblxuICAgICAgICBQbG90bHlWaWFDRE5Nb2R1bGUubG9hZFZpYUNETigpO1xuICAgICAgICBQbG90bHlWaWFDRE5Nb2R1bGUuX3Bsb3RseVZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZXQgcGxvdGx5QnVuZGxlKGJ1bmRsZTogUGxvdGx5QnVuZGxlTmFtZSkge1xuICAgICAgICBjb25zdCBpc09rID0gYnVuZGxlID09PSBudWxsIHx8IFBsb3RseVZpYUNETk1vZHVsZS5wbG90bHlCdW5kbGVOYW1lcy5pbmRleE9mKGJ1bmRsZSkgPj0gMDtcbiAgICAgICAgaWYgKCFpc09rKSB7XG4gICAgICAgICAgICBjb25zdCBuYW1lcyA9IFBsb3RseVZpYUNETk1vZHVsZS5wbG90bHlCdW5kbGVOYW1lcy5tYXAobiA9PiBgXCIke259XCJgKS5qb2luKCcsICcpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBsb3RseSBidW5kbGUuIFBsZWFzZSBzZXQgdG8gbnVsbCBmb3IgZnVsbCBvciAke25hbWVzfSBmb3IgYSBwYXJ0aWFsIGJ1bmRsZS5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFBsb3RseVZpYUNETk1vZHVsZS5fcGxvdGx5QnVuZGxlID0gYnVuZGxlO1xuICAgIH1cblxuICAgIHN0YXRpYyBsb2FkVmlhQ0ROKCkge1xuICAgICAgICBQbG90bHlTZXJ2aWNlLnNldFBsb3RseSgnd2FpdGluZycpO1xuXG4gICAgICAgIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzcmMgPSBQbG90bHlWaWFDRE5Nb2R1bGUuX3Bsb3RseUJ1bmRsZSA9PSBudWxsXG4gICAgICAgICAgICAgICAgPyBgaHR0cHM6Ly9jZG4ucGxvdC5seS9wbG90bHktJHtQbG90bHlWaWFDRE5Nb2R1bGUuX3Bsb3RseVZlcnNpb259Lm1pbi5qc2BcbiAgICAgICAgICAgICAgICA6IGBodHRwczovL2Nkbi5wbG90Lmx5L3Bsb3RseS0ke1Bsb3RseVZpYUNETk1vZHVsZS5fcGxvdGx5QnVuZGxlfS0ke1Bsb3RseVZpYUNETk1vZHVsZS5fcGxvdGx5VmVyc2lvbn0ubWluLmpzYDtcblxuICAgICAgICAgICAgY29uc3Qgc2NyaXB0OiBIVE1MU2NyaXB0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICAgICAgICAgIHNjcmlwdC5zcmMgPSBzcmM7XG4gICAgICAgICAgICBzY3JpcHQub25lcnJvciA9ICgpID0+IGNvbnNvbGUuZXJyb3IoYEVycm9yIGxvYWRpbmcgcGxvdGx5LmpzIGxpYnJhcnkgZnJvbSAke3NyY31gKTtcblxuICAgICAgICAgICAgY29uc3QgaGVhZDogSFRNTEhlYWRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICAgICAgICAgIGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcblxuICAgICAgICAgICAgbGV0IGNvdW50ZXIgPSAyMDA7IC8vIGVxdWl2YWxlbnQgb2YgMTAgc2Vjb25kcy4uLlxuXG4gICAgICAgICAgICBjb25zdCBmbiA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwbG90bHkgPSAod2luZG93IGFzIGFueSkuUGxvdGx5O1xuICAgICAgICAgICAgICAgIGlmIChwbG90bHkpIHtcbiAgICAgICAgICAgICAgICAgICAgUGxvdGx5U2VydmljZS5zZXRQbG90bHkocGxvdGx5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXIgLS07XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZm4sIDUwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIGxvYWRpbmcgcGxvdGx5LmpzIGxpYnJhcnkgZnJvbSAke3NyY30uIFRpbWVvdXQuYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgfTtcblxuICAgICAgICBzZXRUaW1lb3V0KGluaXQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBmb3JSb290KGNvbmZpZzogUGFydGlhbDx7dmVyc2lvbjogc3RyaW5nfT4pOiBuZXZlciB7XG4gICAgICAgIGNvbnN0IHVybCA9IFwiaHR0cHM6Ly9naXRodWIuY29tL3Bsb3RseS9hbmd1bGFyLXBsb3RseS5qcyNjdXN0b21pemluZy10aGUtcGxvdGx5anMtYnVuZGxlXCI7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgW1Bsb3RseVZpYUNETk1vZHVsZV0gZm9yUm9vdCBtZXRob2QgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHNlZTogJHt1cmx9YCk7XG4gICAgfVxufVxuIl19