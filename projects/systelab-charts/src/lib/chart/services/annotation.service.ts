import { Injectable } from '@angular/core';
import {
    AnnotationDrawTime,
    AnnotationLabelLabelPosition,
    AnnotationType,
    AnnotationTypes,
    BoxAnnotation,
    EllipseAnnotation,
    LineAnnotation,
    LineAnnotationDefaultConfiguration,
    LineAnnotationOrientation,
    PointAnnotation
} from '../interfaces';

const defaultAnnotationColor = 'rgb(229, 60, 41)';
const defaultAnnotationFontColor = 'rgb(255,255,255)';
const defaultLineAnnotationConfiguration: LineAnnotationDefaultConfiguration = {
    axisID: 'y',
    drawTime: AnnotationDrawTime.afterDatasetsDraw,
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
        position: AnnotationLabelLabelPosition.center,
        backgroundColor: defaultAnnotationColor,
    }
};

@Injectable({
    providedIn: 'root',
})
export class AnnotationService {

    public mapAnnotations(annotations: AnnotationTypes[]) {
        if (!annotations || annotations.length === 0) {
            return undefined;
        }

        const computedAnnotations = [];
        for (const annotation of annotations) {
            if (this.isBoxAnnotation(annotation)) {
                computedAnnotations.push(this.mapBoxAnnotation(annotation));
            } else if(this.isPointAnnotation(annotation)) {
                computedAnnotations.push(this.mapPointAnnotation(annotation));
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
            } else if (this.isEllipseAnnotation(annotation)) {
                computedAnnotations.push(this.mapEllipseAnnotation(annotation));
            } else {
                // error
            }
        }

        return computedAnnotations;
    }

    private mapBoxAnnotation(annotation: BoxAnnotation) {
        return {
            type: AnnotationType.box,
            backgroundColor: annotation.backgroundColor ?? 'transparent',
            borderColor: annotation.border?.color ?? undefined,
            borderRadius: annotation.border?.radius ?? undefined,
            borderWidth: annotation.border?.width ?? 2,
            xMax: annotation.limits.x.max,
            xMin: annotation.limits.x.min,
            yMax: annotation.limits.y.max,
            yMin: annotation.limits.y.min,
            drawTime: annotation.drawTime ?? AnnotationDrawTime.afterDatasetsDraw,
        };
    }

    private mapPointAnnotation(annotation: PointAnnotation) {
        return {
            type: AnnotationType.point,
            xValue: annotation.x,
            yValue: annotation.y,
            xScaleID: annotation.xAxisID,
            yScaleID: annotation.yAxisID,
            radius: annotation.radius ?? 2,
            backgroundColor: annotation.backgroundColor ?? 'transparent',
            borderWidth: annotation.border?.width ?? 2,
            borderColor: annotation.border?.color ?? undefined,
            drawTime: annotation.drawTime ?? AnnotationDrawTime.afterDatasetsDraw,
        };
    }

    private mapLineAnnotation(annotation: LineAnnotation) {
        let computedLabel;
        const isVertical = annotation.orientation === LineAnnotationOrientation.vertical;
        const endValue = annotation.endValue ?? annotation.value;
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
            type: AnnotationType.line,
            scaleID: isVertical ? 'x' : annotation.axisID,
            backgroundColor: annotation.backgroundColor ?? undefined,
            borderColor: annotation.border?.color ?? undefined,
            borderWidth: annotation.border?.width ?? 2,
            borderDash: annotation.border?.dash ? [5, 15] : undefined,
            value: annotation.value,
            endValue: endValue,
            label: computedLabel,
            drawTime: annotation.drawTime ?? AnnotationDrawTime.afterDatasetsDraw,
        };
    }

    private mapEllipseAnnotation(annotation: EllipseAnnotation) {
        return {
            type: AnnotationType.ellipse,
            xMin: annotation.xMin,
            xMax: annotation.xMax,
            yMin: annotation.yMin,
            yMax: annotation.yMax,
            xScaleID: annotation.xAxisID,
            yScaleID: annotation.yAxisID,
            rotation: annotation.rotation ?? 0,
            backgroundColor: annotation.backgroundColor ?? 'transparent',
            borderWidth: annotation.border?.width ?? 2,
            borderColor: annotation.border?.color ?? undefined,
            drawTime: annotation.drawTime ?? AnnotationDrawTime.afterDatasetsDraw,
        };
    }

    private isBoxAnnotation(annotation: AnnotationTypes): annotation is BoxAnnotation {
        return 'limits' in annotation;
    }

    private isPointAnnotation(annotation: AnnotationTypes): annotation is PointAnnotation {
        return 'type' in annotation && annotation.type === AnnotationType.point;
    }

    private isLineAnnotation(annotation: AnnotationTypes): annotation is LineAnnotation {
        return 'type' in annotation && annotation.type === AnnotationType.line;
    }

    private isEllipseAnnotation(annotation: AnnotationTypes): annotation is EllipseAnnotation {
        return 'type' in annotation && annotation.type === AnnotationType.ellipse;
    }
}
