export type AnnotationTypes = LineAnnotation | BoxAnnotation | PointAnnotation;

interface Annotation {
    type: AnnotationType;
    axisID?: string;
    drawTime?: AnnotationDrawTime;
    backgroundColor?: string;
}

export enum AnnotationType {
    line = 'line',
    box = 'box',
    point = 'point',
}

export enum AnnotationDrawTime {
    afterDraw = 'afterDraw',
    afterDatasetsDraw = 'afterDatasetsDraw',
    beforeDraw = 'beforeDraw',
    beforeDatasetsDraw = 'beforeDatasetsDraw',
}


// Line annotations
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

export enum LineAnnotationOrientation {
    vertical = 'vertical',
    horizontal = 'horizontal',
}

export interface LineAnnotationDefaultConfiguration extends Omit<LineAnnotation, 'value' | 'type' | 'label'> {
    label?: Omit<AnnotationLabel, 'display' | 'text'>;
}

export interface AnnotationLabel {
    display: boolean;
    text: string; // content
    position?: AnnotationLabelLabelPosition;
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

export enum AnnotationLabelLabelPosition {
    start = 'start',
    center = 'center',
    end = 'end',
}


// Box annotations
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
    xAxisID?: string;
    yAxisID?: string;
    border?: {
        width?: number;
        radius?: number;
        color?: string;
    };
}


// Point annotations
export interface PointAnnotation extends Annotation {
    x: number;
    y: number;
    xAxisID?: string;
    yAxisID?: string;
    radius?: number;
    border?: {
        width?: number;
        color?: string;
    };
}




