export interface Zoom {
    zoom?: {
        wheel: {
            enabled: boolean;
        };
        pinch: {
            enabled: boolean;
        };
        mode: 'x' | 'y' | 'xy';
        scaleMode?: 'x' | 'y' | 'xy';
        overScaleMode?: 'x' | 'y' | 'xy';
    }
    pan?: {
        enabled: boolean;
        mode: 'x' | 'y' | 'xy';
        scaleMode?: 'x' | 'y' | 'xy';
        overScaleMode?: 'x' | 'y' | 'xy';
    },
    limits?: {
        x: {
            min: number;
            max: number;
        };
        y: {
            min: number;
            max: number;
        };
    }
}

