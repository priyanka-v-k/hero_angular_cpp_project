var PlotlyService_1;
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as i0 from "@angular/core";
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
PlotlyService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function PlotlyService_Factory() { return new PlotlyService(); }, token: PlotlyService, providedIn: "root" });
PlotlyService = PlotlyService_1 = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], PlotlyService);
export { PlotlyService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxvdGx5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXBsb3RseS5qcy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL3Bsb3RseS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7O0FBUTdELElBQWEsYUFBYSxxQkFBMUIsTUFBYSxhQUFhO0lBS2YsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFzQjtRQUM5QyxlQUFhLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztJQUMzQyxDQUFDO0lBRU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFXO1FBQy9CLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE9BQU8sTUFBTSxDQUFDLEtBQUssS0FBSyxVQUFVLEVBQUU7WUFDbEUsTUFBTSxJQUFJLEtBQUssQ0FBQyxpRUFBaUUsQ0FBQyxDQUFDO1NBQ3RGO1FBRUQsZUFBYSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDbkMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBa0M7UUFDbkQsTUFBTSxLQUFLLEdBQUcsZUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEQsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDZCxlQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMxQztRQUNELE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFTSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQTZCO1FBQzlDLE1BQU0sS0FBSyxHQUFHLGVBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25ELElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtZQUNaLGVBQWEs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QUFtQixFQUFFLE1BQStCLEVBQUUsTUFBK0IsRUFBRSxNQUFpQztRQUNqSyxJQUFJLE1BQU0sRUFBRTtZQUNSLE1BQU0sR0FBRyxHQUFHLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLENBQUM7WUFDM0MsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQWlCLENBQUM7U0FDM0Q7UUFFRCxPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFpQixDQUFDO0lBQzdFLENBQUM7SUFDRCxnQ0FBZ0M7SUFFekIsTUFBTSxDQUFDLEdBQTZCO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUMsQ0FBQztDQUNKLENBQUE7QUFyR29CLHVCQUFTLEdBQStCLEVBQUUsQ0FBQztBQUMzQyxxQkFBTyxHQUFTLFNBQVMsQ0FBQztBQUMxQix5QkFBVyxHQUFnQixTQUFTLENBQUM7O0FBSDdDLGFBQWE7SUFIekIsVUFBVSxDQUFDO1FBQ1IsVUFBVSxFQUFFLE1BQU07S0FDckIsQ0FBQztHQUNXLGFBQWEsQ0FzR3pCO1NBdEdZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQbG90bHkgfSBmcm9tICcuL3Bsb3RseS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQnO1xuXG50eXBlIFBsb3RseU5hbWUgPSAnUGxvdGx5JyB8ICdWaWFDRE4nIHwgJ1ZpYVdpbmRvdyc7XG5cblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBQbG90bHlTZXJ2aWNlIHtcbiAgICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlczogUGxvdGx5LlBsb3RseUhUTUxFbGVtZW50W10gPSBbXTtcbiAgICBwcm90ZWN0ZWQgc3RhdGljIF9wbG90bHk/OiBhbnkgPSB1bmRlZmluZWQ7XG4gICAgcHJvdGVjdGVkIHN0YXRpYyBfbW9kdWxlTmFtZT86IFBsb3RseU5hbWUgPSB1bmRlZmluZWQ7XG5cbiAgICBwdWJsaWMgc3RhdGljIHNldE1vZHVsZU5hbWUobW9kdWxlTmFtZTogUGxvdGx5TmFtZSkge1xuICAgICAgICBQbG90bHlTZXJ2aWNlLl9tb2R1bGVOYW1lID0gbW9kdWxlTmFtZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHNldFBsb3RseShwbG90bHk6IGFueSkge1xuICAgICAgICBpZiAodHlwZW9mIHBsb3RseSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHBsb3RseS5yZWFjdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHBsb3RseS5qcyB2ZXJzaW9uLiBQbGVhc2UsIHVzZSBhbnkgdmVyc2lvbiBhYm92ZSAxLjQwLjAnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFBsb3RseVNlcnZpY2UuX3Bsb3RseSA9IHBsb3RseTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGluc2VydChpbnN0YW5jZTogUGxvdGx5LlBsb3RseUhUTUxFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gUGxvdGx5U2VydmljZS5pbnN0YW5jZXMuaW5kZXhPZihpbnN0YW5jZSk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIFBsb3RseVNlcnZpY2UuaW5zdGFuY2VzLnB1c2goaW5zdGFuY2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZShkaXY6IFBsb3RseS5QbG90bHlIVE1MRWxlbWVudCkge1xuICAgICAgICBjb25zdCBpbmRleCA9IFBsb3RseVNlcnZpY2UuaW5zdGFuY2VzLmluZGV4T2YoZGl2KTtcbiAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIFBsb3RseVNlcnZpY2UuaW5zdGFuY2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICBQbG90bHlTZXJ2aWNlLl9wbG90bHkucHVyZ2UoZGl2KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZGVidWcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBlbnZpcm9ubWVudC5wcm9kdWN0aW9uID09PSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SW5zdGFuY2VCeURpdklkKGlkOiBzdHJpbmcpOiBQbG90bHkuUGxvdGx5SFRNTEVsZW1lbnQgfCB1bmRlZmluZWQge1xuICAgICAgICBmb3IgKGNvbnN0IGluc3RhbmNlIG9mIFBsb3RseVNlcnZpY2UuaW5zdGFuY2VzKSB7XG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UgJiYgaW5zdGFuY2UuaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFBsb3RseSgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBQbG90bHlTZXJ2aWNlLl9wbG90bHkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSBQbG90bHlTZXJ2aWNlLl9tb2R1bGVOYW1lID09PSAnVmlhQ0ROJ1xuICAgICAgICAgICAgICAgID8gYEVycm9yIGxvYWRpbmcgUGVlciBkZXBlbmRlbmN5IHBsb3RseS5qcyBmcm9tIENETiB1cmxgXG4gICAgICAgICAgICAgICAgOiBgUGVlciBkZXBlbmRlbmN5IHBsb3RseS5qcyBpc24ndCBpbnN0YWxsZWRgO1xuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQbG90bHlTZXJ2aWNlLl9wbG90bHk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHdhaXRGb3IoZm46ICgpID0+IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsb2NhbEZuID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGZuKCkgPyByZXNvbHZlKCkgOiBzZXRUaW1lb3V0KGxvY2FsRm4sIDEwKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGxvY2FsRm4oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUgbWF4LWxpbmUtbGVuZ3RoXG4gICAgcHVibGljIGFzeW5jIG5ld1Bsb3QoZGl2OiBIVE1MRGl2RWxlbWVudCwgZGF0YTogUGxvdGx5LkRhdGFbXSwgbGF5b3V0PzogUGFydGlhbDxQbG90bHkuTGF5b3V0PiwgY29uZmlnPzogUGFydGlhbDxQbG90bHkuQ29uZmlnPiwgZnJhbWVzPzogUGFydGlhbDxQbG90bHkuQ29uZmlnPltdKSB7XG4gICAgICAgIGF3YWl0IHRoaXMud2FpdEZvcigoKSA9PiB0aGlzLmdldFBsb3RseSgpICE9PSAnd2FpdGluZycpO1xuXG4gICAgICAgIGlmIChmcmFtZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IHtkYXRhLCBsYXlvdXQsIGNvbmZpZywgZnJhbWVzfTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFBsb3RseSgpLm5ld1Bsb3QoZGl2LCBvYmopLnRoZW4oKCkgPT4gUGxvdGx5U2VydmljZS5pbnNlcnQoZGl2IGFzIGFueSkpIGFzIFByb21pc2U8YW55PjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmdldFBsb3RseSgpLm5ld1Bsb3QoZGl2LCBkYXRhLCBsYXlvdXQsIGNvbmZpZykudGhlbigoKSA9PiBQbG90bHlTZXJ2aWNlLmluc2VydChkaXYgYXMgYW55KSkgYXMgUHJvbWlzZTxhbnk+O1xuICAgIH1cblxuICAgIHB1YmxpYyBwbG90KGRpdjogUGxvdGx5LlBsb3RseUhUTUxFbGVtZW50LCBkYXRhOiBQbG90bHkuRGF0YVtdLCBsYXlvdXQ/OiBQYXJ0aWFsPFBsb3RseS5MYXlvdXQ+LCBjb25maWc/OiBQYXJ0aWFsPFBsb3RseS5Db25maWc+LCBmcmFtZXM/OiBQYXJ0aWFsPFBsb3RseS5Db25maWc+W10pIHtcbiAgICAgICAgaWYgKGZyYW1lcykge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0ge2RhdGEsIGxheW91dCwgY29uZmlnLCBmcmFtZXN9O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGxvdGx5KCkucGxvdChkaXYsIG9iaikgYXMgUHJvbWlzZTxhbnk+O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGxvdGx5KCkucGxvdChkaXYsIGRhdGEsIGxheW91dCwgY29uZmlnKSBhcyBQcm9taXNlPGFueT47XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZShkaXY6IFBsb3RseS5QbG90bHlIVE1MRWxlbWVudCwgZGF0YTogUGxvdGx5LkRhdGFbXSwgbGF5b3V0PzogUGFydGlhbDxQbG90bHkuTGF5b3V0PiwgY29uZmlnPzogUGFydGlhbDxQbG90bHkuQ29uZmlnPiwgZnJhbWVzPzogUGFydGlhbDxQbG90bHkuQ29uZmlnPltdKSB7XG4gICAgICAgIGlmIChmcmFtZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IHtkYXRhLCBsYXlvdXQsIGNvbmZpZywgZnJhbWVzfTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFBsb3RseSgpLnJlYWN0KGRpdiwgb2JqKSBhcyBQcm9taXNlPGFueT47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRQbG90bHkoKS5yZWFjdChkaXYsIGRhdGEsIGxheW91dCwgY29uZmlnKSBhcyBQcm9taXNlPGFueT47XG4gICAgfVxuICAgIC8vIHRzbGludDplbmFibGUgbWF4LWxpbmUtbGVuZ3RoXG5cbiAgICBwdWJsaWMgcmVzaXplKGRpdjogUGxvdGx5LlBsb3RseUhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBsb3RseSgpLlBsb3RzLnJlc2l6ZShkaXYpO1xuICAgIH1cbn1cbiJdfQ==