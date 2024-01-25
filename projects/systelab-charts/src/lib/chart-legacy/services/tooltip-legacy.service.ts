import { DecimalFormatService } from './decimal-format.service';
import { format } from 'date-fns/esm';
import { Injectable } from '@angular/core';

export class ChartTooltipItem {
    constructor(public title?: string, public label?: string, public afterLabel?: string, public valueInAfterLabel?: boolean,
                public numberFormat?: string) {
    }
}

export class ChartTooltipSettings {
    constructor(public backgroundColor?: string, public borderColor?: string, public borderWidth?: number, public bodyFontColor?: string,
                public bodyFontSize?: number, public titleFontSize?: number, public titleFontColor?: string) {
        this.bodyFontColor = '#ffffff';
        this.borderColor = 'rgba(0,0,0,0)';
        this.borderWidth = 0;
        this.bodyFontSize = 12;
        this.titleFontSize = 12;
        this.titleFontColor = '#ffffff';
        this.backgroundColor = 'rgba(0,0,0,0.8)';
    }
}

@Injectable({
    providedIn: 'root',
})
export class TooltipLegacyService {
    constructor(private readonly decimalFormatService: DecimalFormatService) {
    }

    public title(tooltipItems) {
        const item = tooltipItems[0].dataset;

        if (item.chartTooltipItem) {
            const chartTooltipItem = item.chartTooltipItem instanceof Array ?
                item.chartTooltipItem[tooltipItems[0].index] : item.chartTooltipItem;
            if (chartTooltipItem.title) {
                return chartTooltipItem.title;
            }
        }
    }

    public tooltipLabel(tooltipItem, tooltipTimeFormatConstant) {
        const item = tooltipItem.dataset;
        let label = item.label;
        // if (!label) {
        //     label = data.labels[tooltipItem.index];
        // }
        const val = item.data[tooltipItem.dataIndex];
        let rt;
        let rtVal: number;
        if (val instanceof Object) {
            if (val.t) {
                if(val.t instanceof Date){
                    const dataValue = '(' + (val.x ? val.x + ',' : '') + val.y + ')';
                    rt = format(val.t , tooltipTimeFormatConstant) + dataValue;
                } else {
                    rt = val.t;
                }

            } else {
                rt = '(' + val.x + ',' + val.y + ')';
            }
        } else {
            rt = val;
            rtVal = val;
        }
        if (item.chartTooltipItem) {
            const chartTooltipItem = item.chartTooltipItem instanceof Array ?
                item.chartTooltipItem[tooltipItem.dataIndex] : item.chartTooltipItem;

            if (!isNaN(rtVal) && chartTooltipItem.numberFormat) {
                rt = this.decimalFormatService.execute(val, chartTooltipItem.numberFormat);
            }

            if (chartTooltipItem.label) {
                label = chartTooltipItem.label;
            }
            if (!chartTooltipItem.valueInAfterLabel) {
                label += ': ' + rt;
            }
        } else {
            label += ': ' + rt;
        }
        return label;
    }

    public tooltipAfterLabel(tooltipItem) {
        const item = tooltipItem.dataset;
        let afterLabel = '';

        if (item.chartTooltipItem) {
            const chartTooltipItem = item.chartTooltipItem instanceof Array ?
                item.chartTooltipItem[tooltipItem.dataIndex] : item.chartTooltipItem;
            if (chartTooltipItem.afterLabel) {
                afterLabel = chartTooltipItem.afterLabel;
            }
            if (chartTooltipItem.valueInAfterLabel) {
                const val = item.data[tooltipItem.dataIndex];
                let rt;
                if (val instanceof Object) {
                    if (val.t) {
                        rt = val.t;
                    } else {
                        rt = '(' + val.x + ',' + val.y + ')';
                    }
                } else {
                    if (!isNaN(val) && chartTooltipItem.numberFormat) {
                        rt = this.decimalFormatService.execute(val, chartTooltipItem.numberFormat);
                    } else {
                        rt = val;
                    }
                }
                afterLabel += ' (' + rt + ')';
            }
        }
        return afterLabel;
    }
}
