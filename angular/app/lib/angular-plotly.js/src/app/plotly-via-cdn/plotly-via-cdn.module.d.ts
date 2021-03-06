import { PlotlyService } from '../shared/plotly.service';
export declare type PlotlyBundleName = 'basic' | 'cartesian' | 'geo' | 'gl3d' | 'gl2d' | 'mapbox' | 'finance';
export declare class PlotlyViaCDNModule {
    plotlyService: PlotlyService;
    private static _plotlyBundle?;
    private static _plotlyVersion;
    static plotlyBundleNames: PlotlyBundleName[];
    constructor(plotlyService: PlotlyService);
    static plotlyVersion: string;
    static plotlyBundle: PlotlyBundleName;
    static loadViaCDN(): void;
    static forRoot(config: Partial<{
        version: string;
    }>): never;
}
