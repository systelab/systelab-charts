import { Injectable } from '@angular/core';
import { Axis, AxisWithFitHook, ChartConfiguration, FinalTickScale, TickItem } from '../interfaces';
import { LinearScale, LogarithmicScale, TimeScale } from 'chart.js';

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

        this.applyFinalTick(scales);

        return scales as unknown as (LinearScale | LogarithmicScale | TimeScale | undefined);
    }

    private applyFinalTick(scales: Axis): void {
        Object.keys(scales).forEach((axisId) => {
            const axis = scales[axisId] as AxisWithFitHook;
            if (axis?.ticks?.finalTick !== true) {
                return;
            }
            const labeledTicksLimit = axis.ticks.maxTicksLimit;
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
                this.pinLastTickToScaleMax(scale);
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

    private pinLastTickToScaleMax(scale: FinalTickScale): void {
        const ticks = scale?.ticks;
        const reversed = scale.options?.reverse === true;

        if (!ticks?.length) return;

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
