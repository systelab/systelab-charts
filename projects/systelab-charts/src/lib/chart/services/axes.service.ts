import { Injectable } from '@angular/core';
import { Axis, AxisWithFitHook, ChartConfiguration, FinalTickScale, TickItem } from '../interfaces';
import { LinearScale, LogarithmicScale, TimeScale } from 'chart.js';

const INITIAL_TICK_REPLACE_THRESHOLD = 0.08;

@Injectable({
    providedIn: 'root',
})
export class AxesService {

    public mapConfiguration(configuration: ChartConfiguration): (LinearScale | LogarithmicScale | TimeScale | undefined) {
        const { labels, axes } = configuration;
        const scales = axes?.dataAxes ?? {};

        if (scales && !('x' in scales)) {
            scales.x = {};
        }
        if (scales && !('ticks' in scales.x)) {
            scales.x.ticks = {};
        }
        if (scales && labels?.skipItems) {
            let count = 0;
            scales.x.ticks.callback = (value, index): string => {
                const skipItems = labels.skipItems ?? 0;
                const labelValue = configuration.labels.data[index] ? configuration.labels.data[index] : value;
                count = index % skipItems;
                return skipItems ? (count === 0) ? labelValue : null : labelValue;
            };
        }

        this.applyTickConfigurations(scales);

        return scales as unknown as (LinearScale | LogarithmicScale | TimeScale | undefined);
    }

    private applyTickConfigurations(scales: Axis): void {
        Object.keys(scales).forEach((axisId) => {
            const axis = scales[axisId] as AxisWithFitHook;
            const initialTick: boolean = axis?.ticks?.initialTick === true;
            const finalTick: boolean = axis?.ticks?.finalTick === true;

            if (!initialTick && !finalTick) {
                return;
            }
            const labeledTicksLimit = axis?.ticks?.maxTicksLimit;
            const previousAfterFit = axis.afterFit;
            const previousBeforeBuildTicks = axis.beforeBuildTicks;

            axis.beforeBuildTicks = (scale: FinalTickScale) => {
                previousBeforeBuildTicks?.(scale);
                if (labeledTicksLimit != null && scale.options?.ticks) {
                    scale.options.ticks.maxTicksLimit = labeledTicksLimit;
                }
            };

            axis.afterFit = (scale: FinalTickScale) => {
                previousAfterFit?.(scale);
                if (initialTick) {
                    this.pinFirstTickToScaleMin(scale);
                }

                if (finalTick) {
                    this.pinLastTickToScaleMax(scale);
                }

                if (
                    labeledTicksLimit != null &&
                    scale.options?.ticks &&
                    scale.ticks?.length
                ) {
                    scale.options.ticks.maxTicksLimit = scale.ticks.length;
                }
                scale._gridLineItems = undefined;
            };
        });
    }

    private pinFirstTickToScaleMin(scale: FinalTickScale): void {
        const ticks = scale?.ticks;
        if (!ticks?.length) {
            return;
        }
        const reversed = scale.options?.reverse === true;
        const edgeIndex = reversed ? ticks.length - 1 : 0;
        const range = scale.max - scale.min;
        const gapToMin = Math.abs(ticks[edgeIndex].value - scale.min);
        const shouldReplace =
            ticks[edgeIndex].value === scale.min ||
            (range > 0 && gapToMin / range < INITIAL_TICK_REPLACE_THRESHOLD);

        if (shouldReplace) {
            ticks[edgeIndex].value = scale.min;
            ticks[edgeIndex].label = this.formatInitialTickLabel(
                scale,
                scale.min,
                edgeIndex,
                ticks,
            );
            return;
        }

        const labeledTick: TickItem = {
            value: scale.min,
            label: this.formatInitialTickLabel(
                scale,
                scale.min,
                reversed ? ticks.length : 0,
                ticks,
            ),
        };

        if (reversed) {
            ticks.push(labeledTick);
        } else {
            ticks.unshift(labeledTick);
        }
    }

    private formatInitialTickLabel(
        scale: FinalTickScale,
        value: number,
        index: number,
        ticks: TickItem[],
    ): string {
        if (typeof scale._tickFormatFunction === "function") {
            const formatted = scale._tickFormatFunction(value, index, ticks);
            return Array.isArray(formatted) ? formatted.join("\n") : formatted;
        }
        if (typeof scale.format === "function") {
            return scale.format(value);
        }
        return String(value);
    }

    private pinLastTickToScaleMax(scale: FinalTickScale): void {
        const ticks = scale?.ticks;
        if (!ticks?.length) return;

        const reversed = scale.options?.reverse === true;
        const edgeIndex = reversed ? 0 : ticks.length - 1;

        if (ticks[edgeIndex].value === scale.max) return;

        const unlabeledTick: TickItem = {
            value: scale.max,
            label: '',
        };

        if (reversed) {
            ticks.unshift(unlabeledTick);
        } else {
            ticks.push(unlabeledTick);
        }
    }
}
