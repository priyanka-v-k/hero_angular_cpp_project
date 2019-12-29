import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as i0 from "@angular/core";
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
            for (var _b = tslib_1.__values(PlotlyService_1.instances), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var obj;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
    PlotlyService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function PlotlyService_Factory() { return new PlotlyService(); }, token: PlotlyService, providedIn: "root" });
    PlotlyService = PlotlyService_1 = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        })
    ], PlotlyService);
    return PlotlyService;
}());
export { PlotlyService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxvdGx5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXBsb3RseS5qcy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL3Bsb3RseS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7QUFRN0Q7SUFBQTtLQXNHQztzQkF0R1ksYUFBYTtJQUtSLDJCQUFhLEdBQTNCLFVBQTRCLFVBQXNCO1FBQzlDLGVBQWEsQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO0lBQzNDLENBQUM7SUFFYSx1QkFBUyxHQUF2QixVQUF3QixNQUFXO1FBQy9CLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE9BQU8sTUFBTSxDQUFDLEtBQUssS0FBSyxVQUFVLEVBQUU7WUFDbEUsTUFBTSxJQUFJLEtBQUssQ0FBQyxpRUFBaUUsQ0FBQyxDQUFDO1NBQ3RGO1FBRUQsZUFBYSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDbkMsQ0FBQztJQUVhLG9CQUFNLEdBQXBCLFVBQXFCLFFBQWtDO1FBQ25ELElBQU0sS0FBSyxHQUFHLGVBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hELElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2QsZUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDMUM7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRWEsb0JBQU0sR0FBcEIsVUFBcUIsR0FBNkI7UUFDOUMsSUFBTSxLQUFLLEdBQUcsZUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkQsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ1osZUFBYSxDQUFDLFNBQVMsQ0FB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aUIsQ0FBQztTQUMxRDtRQUVELE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQWlCLENBQUM7SUFDNUUsQ0FBQztJQUVNLDhCQUFNLEdBQWIsVUFBYyxHQUE2QixFQUFFLElBQW1CLEVBQUUsTUFBK0IsRUFBRSxNQUErQixFQUFFLE1BQWlDO1FBQ2pLLElBQUksTUFBTSxFQUFFO1lBQ1IsSUFBTSxHQUFHLEdBQUcsRUFBQyxJQUFJLE1BQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxNQUFNLFFBQUEsRUFBQyxDQUFDO1lBQzNDLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFpQixDQUFDO1NBQzNEO1FBRUQsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBaUIsQ0FBQztJQUM3RSxDQUFDO0lBQ0QsZ0NBQWdDO0lBRXpCLDhCQUFNLEdBQWIsVUFBYyxHQUE2QjtRQUN2QyxPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlDLENBQUM7O0lBcEdnQix1QkFBUyxHQUErQixFQUFFLENBQUM7SUFDM0MscUJBQU8sR0FBUyxTQUFTLENBQUM7SUFDMUIseUJBQVcsR0FBZ0IsU0FBUyxDQUFDOztJQUg3QyxhQUFhO1FBSHpCLFVBQVUsQ0FBQztZQUNSLFVBQVUsRUFBRSxNQUFNO1NBQ3JCLENBQUM7T0FDVyxhQUFhLENBc0d6Qjt3QkFoSEQ7Q0FnSEMsQUF0R0QsSUFzR0M7U0F0R1ksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBsb3RseSB9IGZyb20gJy4vcGxvdGx5LmludGVyZmFjZSc7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudCc7XG5cbnR5cGUgUGxvdGx5TmFtZSA9ICdQbG90bHknIHwgJ1ZpYUNETicgfCAnVmlhV2luZG93JztcblxuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFBsb3RseVNlcnZpY2Uge1xuICAgIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2VzOiBQbG90bHkuUGxvdGx5SFRNTEVsZW1lbnRbXSA9IFtdO1xuICAgIHByb3RlY3RlZCBzdGF0aWMgX3Bsb3RseT86IGFueSA9IHVuZGVmaW5lZDtcbiAgICBwcm90ZWN0ZWQgc3RhdGljIF9tb2R1bGVOYW1lPzogUGxvdGx5TmFtZSA9IHVuZGVmaW5lZDtcblxuICAgIHB1YmxpYyBzdGF0aWMgc2V0TW9kdWxlTmFtZShtb2R1bGVOYW1lOiBQbG90bHlOYW1lKSB7XG4gICAgICAgIFBsb3RseVNlcnZpY2UuX21vZHVsZU5hbWUgPSBtb2R1bGVOYW1lO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc2V0UGxvdGx5KHBsb3RseTogYW55KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcGxvdGx5ID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgcGxvdGx5LnJlYWN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcGxvdGx5LmpzIHZlcnNpb24uIFBsZWFzZSwgdXNlIGFueSB2ZXJzaW9uIGFib3ZlIDEuNDAuMCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgUGxvdGx5U2VydmljZS5fcGxvdGx5ID0gcGxvdGx5O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaW5zZXJ0KGluc3RhbmNlOiBQbG90bHkuUGxvdGx5SFRNTEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBQbG90bHlTZXJ2aWNlLmluc3RhbmNlcy5pbmRleE9mKGluc3RhbmNlKTtcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgUGxvdGx5U2VydmljZS5pbnN0YW5jZXMucHVzaChpbnN0YW5jZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmVtb3ZlKGRpdjogUGxvdGx5LlBsb3RseUhUTUxFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gUGxvdGx5U2VydmljZS5pbnN0YW5jZXMuaW5kZXhPZihkaXYpO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgUGxvdGx5U2VydmljZS5pbnN0YW5jZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIFBsb3RseVNlcnZpY2UuX3Bsb3RseS5wdXJnZShkaXYpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBkZWJ1ZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGVudmlyb25tZW50LnByb2R1Y3Rpb24gPT09IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJbnN0YW5jZUJ5RGl2SWQoaWQ6IHN0cmluZyk6IFBsb3RseS5QbG90bHlIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGZvciAoY29uc3QgaW5zdGFuY2Ugb2YgUGxvdGx5U2VydmljZS5pbnN0YW5jZXMpIHtcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZSAmJiBpbnN0YW5jZS5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UGxvdGx5KCkge1xuICAgICAgICBpZiAodHlwZW9mIFBsb3RseVNlcnZpY2UuX3Bsb3RseSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IFBsb3RseVNlcnZpY2UuX21vZHVsZU5hbWUgPT09ICdWaWFDRE4nXG4gICAgICAgICAgICAgICAgPyBgRXJyb3IgbG9hZGluZyBQZWVyIGRlcGVuZGVuY3kgcGxvdGx5LmpzIGZyb20gQ0ROIHVybGBcbiAgICAgICAgICAgICAgICA6IGBQZWVyIGRlcGVuZGVuY3kgcGxvdGx5LmpzIGlzbid0IGluc3RhbGxlZGA7XG5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFBsb3RseVNlcnZpY2UuX3Bsb3RseTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgd2FpdEZvcihmbjogKCkgPT4gYm9vbGVhbik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsRm4gPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZm4oKSA/IHJlc29sdmUoKSA6IHNldFRpbWVvdXQobG9jYWxGbiwgMTApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbG9jYWxGbigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZSBtYXgtbGluZS1sZW5ndGhcbiAgICBwdWJsaWMgYXN5bmMgbmV3UGxvdChkaXY6IEhUTUxEaXZFbGVtZW50LCBkYXRhOiBQbG90bHkuRGF0YVtdLCBsYXlvdXQ/OiBQYXJ0aWFsPFBsb3RseS5MYXlvdXQ+LCBjb25maWc/OiBQYXJ0aWFsPFBsb3RseS5Db25maWc+LCBmcmFtZXM/OiBQYXJ0aWFsPFBsb3RseS5Db25maWc+W10pIHtcbiAgICAgICAgYXdhaXQgdGhpcy53YWl0Rm9yKCgpID0+IHRoaXMuZ2V0UGxvdGx5KCkgIT09ICd3YWl0aW5nJyk7XG5cbiAgICAgICAgaWYgKGZyYW1lcykge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0ge2RhdGEsIGxheW91dCwgY29uZmlnLCBmcmFtZXN9O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGxvdGx5KCkubmV3UGxvdChkaXYsIG9iaikudGhlbigoKSA9PiBQbG90bHlTZXJ2aWNlLmluc2VydChkaXYgYXMgYW55KSkgYXMgUHJvbWlzZTxhbnk+O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGxvdGx5KCkubmV3UGxvdChkaXYsIGRhdGEsIGxheW91dCwgY29uZmlnKS50aGVuKCgpID0+IFBsb3RseVNlcnZpY2UuaW5zZXJ0KGRpdiBhcyBhbnkpKSBhcyBQcm9taXNlPGFueT47XG4gICAgfVxuXG4gICAgcHVibGljIHBsb3QoZGl2OiBQbG90bHkuUGxvdGx5SFRNTEVsZW1lbnQsIGRhdGE6IFBsb3RseS5EYXRhW10sIGxheW91dD86IFBhcnRpYWw8UGxvdGx5LkxheW91dD4sIGNvbmZpZz86IFBhcnRpYWw8UGxvdGx5LkNvbmZpZz4sIGZyYW1lcz86IFBhcnRpYWw8UGxvdGx5LkNvbmZpZz5bXSkge1xuICAgICAgICBpZiAoZnJhbWVzKSB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSB7ZGF0YSwgbGF5b3V0LCBjb25maWcsIGZyYW1lc307XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRQbG90bHkoKS5wbG90KGRpdiwgb2JqKSBhcyBQcm9taXNlPGFueT47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRQbG90bHkoKS5wbG90KGRpdiwgZGF0YSwgbGF5b3V0LCBjb25maWcpIGFzIFByb21pc2U8YW55PjtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKGRpdjogUGxvdGx5LlBsb3RseUhUTUxFbGVtZW50LCBkYXRhOiBQbG90bHkuRGF0YVtdLCBsYXlvdXQ/OiBQYXJ0aWFsPFBsb3RseS5MYXlvdXQ+LCBjb25maWc/OiBQYXJ0aWFsPFBsb3RseS5Db25maWc+LCBmcmFtZXM/OiBQYXJ0aWFsPFBsb3RseS5Db25maWc+W10pIHtcbiAgICAgICAgaWYgKGZyYW1lcykge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0ge2RhdGEsIGxheW91dCwgY29uZmlnLCBmcmFtZXN9O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGxvdGx5KCkucmVhY3QoZGl2LCBvYmopIGFzIFByb21pc2U8YW55PjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmdldFBsb3RseSgpLnJlYWN0KGRpdiwgZGF0YSwgbGF5b3V0LCBjb25maWcpIGFzIFByb21pc2U8YW55PjtcbiAgICB9XG4gICAgLy8gdHNsaW50OmVuYWJsZSBtYXgtbGluZS1sZW5ndGhcblxuICAgIHB1YmxpYyByZXNpemUoZGl2OiBQbG90bHkuUGxvdGx5SFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGxvdGx5KCkuUGxvdHMucmVzaXplKGRpdik7XG4gICAgfVxufVxuIl19