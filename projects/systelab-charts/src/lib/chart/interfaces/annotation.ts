interface Annotation {
    axisID: string; // default yAxis
    type: string;
    drawTime: LabelDrawTime; // default afterDatasetsDraw
}

export interface LineAnnotation extends Annotation {
    label: AnnotationLabel;
    value: number;
    endValue?: number;
    orientation: string; // enum
    border?: {
        width?: number;
        color?: string;
    };
}

export interface BoxAnnotation extends Annotation {
    limits: {
        x: {
            min: number;
            max: number;
        };
        y: {
            min: number;
            max: number;
        };
    };
    backgroundColor: string;
    xAxisID: string;
    yAxisID: string;
    border?: {
        width?: number;
        radius?: number;
        color?: string;
    };
}

export interface AnnotationLabel {
    display: boolean;
    text: string; // content
    position: LabelPosition;
    backgroundColor: string;
    font: {
        style: string;
        color: string;
    };
}

export enum LabelPosition {
    start = 'start',
    center = 'center',
    end = 'end',
}

export enum LabelDrawTime {
    afterDraw = 'afterDraw',
    afterDatasetsDraw = 'afterDatasetsDraw',
    beforeDraw = 'beforeDraw',
    beforeDatasetsDraw = 'beforeDatasetsDraw',
}
