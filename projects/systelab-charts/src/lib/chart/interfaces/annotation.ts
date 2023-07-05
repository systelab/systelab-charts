interface Annotation {
    type: AnnotationType;
    axisID?: string;
    drawTime?: LabelDrawTime;
}

export interface LineAnnotation extends Annotation {
    label?: AnnotationLabel;
    value: number | string;
    endValue?: number;
    orientation?: LineAnnotationOrientation;
    border?: {
        width?: number;
        color?: string;
        dash?: boolean;
    };
}

export interface LineAnnotationDefaultConfiguration extends Omit<LineAnnotation, 'value' | 'type' | 'label'> {
    label?: Omit<AnnotationLabel, 'display' | 'text'>;
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
    backgroundColor?: string;
    xAxisID?: string;
    yAxisID?: string;
    border?: {
        width?: number;
        radius?: number;
        color?: string;
    };
}

export interface AnnotationLabel {
    display: boolean;
    text: string; // content
    position?: LabelPosition;
    backgroundColor?: string;
    font?: {
        style: string;
        color: string;
    };
    border?: {
        width?: number;
        color?: string;
        radius?: number;
    };
}

export enum AnnotationType {
    line = 'line',
    box = 'box',
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

export enum LineAnnotationOrientation {
    vertical = 'vertical',
    horizontal = 'horizontal',
}
