import { Plotly } from './plotly.interface';
declare type PlotlyName = 'Plotly' | 'ViaCDN' | 'ViaWindow';
export declare class PlotlyService {
    protected static instances: Plotly.PlotlyHTMLElement[];
    protected static _plotly?: any;
    protected static _moduleName?: PlotlyName;
    static setModuleName(moduleName: PlotlyName): void;
    static setPlotly(plotly: any): void;
    static insert(instance: Plotly.PlotlyHTMLElement): Plotly.PlotlyHTMLElement;
    static remove(div: Plotly.PlotlyHTMLElement): void;
    readonly debug: boolean;
    getInstanceByDivId(id: string): Plotly.PlotlyHTMLElement | undefined;
    getPlotly(): any;
    protected waitFor(fn: () => boolean): Promise<void>;
    newPlot(div: HTMLDivElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>, frames?: Partial<Plotly.Config>[]): Promise<any>;
    plot(div: Plotly.PlotlyHTMLElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>, frames?: Partial<Plotly.Config>[]): Promise<any>;
    update(div: Plotly.PlotlyHTMLElement, data: Plotly.Data[], layout?: Partial<Plotly.Layout>, config?: Partial<Plotly.Config>, frames?: Partial<Plotly.Config>[]): Promise<any>;
    resize(div: Plotly.PlotlyHTMLElement): void;
}
export {};
