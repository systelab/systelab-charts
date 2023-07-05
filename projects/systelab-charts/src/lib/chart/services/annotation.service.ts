import { Injectable } from '@angular/core';
import {
    AnnotationType,
    BoxAnnotation,
    LabelDrawTime,
    LabelPosition,
    LineAnnotation,
    LineAnnotationDefaultConfiguration,
    LineAnnotationOrientation
} from '../interfaces';

const defaultAnnotationColor = 'rgb(229, 60, 41)';
const defaultAnnotationFontColor = 'rgb(255,255,255)';
const defaultLineAnnotationConfiguration: LineAnnotationDefaultConfiguration = {
    axisID: 'y',
    drawTime: LabelDrawTime.afterDatasetsDraw,
    orientation: LineAnnotationOrientation.vertical,
    border: {
        width: 2,
        color: defaultAnnotationColor,
        dash: false,
    },
    label: {
        border: {
            width: 1,
            color: defaultAnnotationColor,
            radius: 3,
        },
        font: {
            color: defaultAnnotationFontColor,
            style: 'normal',
        },
        position: LabelPosition.center,
        backgroundColor: defaultAnnotationColor,
    }
};

@Injectable({
    providedIn: 'root',
})
export class AnnotationService {

    public mapAnnotations(annotations: AnnotationType[]) {
        if (!annotations || annotations.length === 0) {
            return undefined;
        }
        const computedAnnotations = [];
        for( const annotation of annotations) {
            if (this.isBoxAnnotation(annotation)) {
                computedAnnotations.push(this.mapBoxAnnotation(annotation));
            } else if (this.isLineAnnotation(annotation)) {
                computedAnnotations.push(this.mapLineAnnotation({
                    ...defaultLineAnnotationConfiguration,
                    ...annotation,
                    border: {
                        ...defaultLineAnnotationConfiguration.border,
                        ...annotation.border,
                    },
                    label: {
                        ...defaultLineAnnotationConfiguration.label,
                        ...annotation.label ?? undefined,
                        border: {
                            ...defaultLineAnnotationConfiguration.label.border,
                            ...annotation.label?.border ?? undefined,
                        },
                        font: {
                            ...defaultLineAnnotationConfiguration.label.font,
                            ...annotation.label?.font ?? undefined,
                        }
                    }
                }));
            } else {
                // error
            }
        }
        return computedAnnotations;
    }

    private mapBoxAnnotation(annotation: BoxAnnotation) {
        return {
            type: 'box',
            backgroundColor: annotation.backgroundColor,
            borderColor: annotation.border.color,
            borderRadius: annotation.border.radius,
            borderWidth: annotation.border.width,
            xMax: annotation.limits.x.max,
            xMin: annotation.limits.x.min,
            yMax: annotation.limits.y.max,
            yMin: annotation.limits.y.min,
        };
    }

    private mapLineAnnotation(annotation: LineAnnotation) {
        let computedLabel;
        const isVertical = annotation.orientation === LineAnnotationOrientation.vertical;
        const { label } = annotation;
        if (label) {
            computedLabel = {
                display: label.display,
                content: label.text,
                backgroundColor: label.backgroundColor,
                position: label.position,
                borderColor: label.border.color,
                borderWidth: label.border.width,
                borderRadius: label.border.radius,
                fontColor: label.font.color,
                fontStyle: label.font.style,
            };
        }
        return {
            type: 'line',
            scaleID: isVertical ? 'x' : annotation.axisID,
            borderColor: annotation.border?.color ?? undefined,
            borderWidth: annotation.border?.width ?? 2,
            borderDash: annotation.border?.dash ? [5, 15] : undefined,
            value: isVertical ? annotation.value.toString() : Number(annotation.value),
            endValue: annotation.endValue ?? annotation.value,
            label: computedLabel,
        };
    }

    private isBoxAnnotation(object: any): object is BoxAnnotation {
        return 'limits' in object;
    }

    private isLineAnnotation(object: any): object is LineAnnotation {
        return 'type' in object && object.type === 'line';
    }
}
