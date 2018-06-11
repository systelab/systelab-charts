# systelab-chart

Component to show a Chart

## Using the component

```html
   <systelab-chart [labels]="labels" [data]="data" [legend]="legend" [(itemSelected)]="itemSelected" [typeChart]="typeChart"
                (action)="doAction($event)" [isBackgroundGrid]="isBackgroundGrid" [isHorizontal]="isHorizontal" [lineTension]="lineTension" 
                [yMinValue]="yMinValue" [yMaxValue]="yMaxValue" [chartAnnotations]="chartAnnotationBubbleAnnotation" [xLabelAxis]="xLabelAxis" [yLabelAxis]="yLabelAxis" [chartTooltipSettings]="chartTooltipSettings"></systelab-chart>
```


This component use the **Chart.js** library, and is able to display different chart types in a easy way.

Set **typeChart** with the chart type that you want to display. You can chose between the following charts types

- Bar
- Line
- Pie
- Doughnut
- Bubble
- Radar
- Polar Area

Also you can show together different chart types, for example a Bar chart with Line chart. In order to do this, you should define the chart type in the properties of the data that you provide to the component. (See Data properties)

Set **labels** with the list of labels of the chart.

**action** is going to emit the event when you clicked in a item in the chart.

**itemSelected** is used to notify which item is clicked.

Set **legend** to false, if you want to hide the legend of the chart (by default is defined as true).

Set **isBackgroundGrid** to false, if you want to hide the background grid of the chart (by default is defined as true).

**lineTension** is the tension of the line joining the points, min value is 0.

**yMinValue** is the min value of the axis Y.

**yMaxValue** is the max value of the axis Y.

**xLabelAxis** define the title of the Axis X.

**yLabelAxis** define the title of the Axis Y.

**minValueForRadar** is the min value for the radar.

**maxValueForRadar** is the max value for the radar.

Set **isHorizontal** to true, if you want that display a bar chart in horizontal view (by default is defined as false).

### Data

Is an array with the items of the Chart. Each item has the follow structure:

```javascript
    public label: string,
    public data: Array<any>,
    public borderColor?: string,
    public backgroundColor?: string,
    public fill?:boolean,
    public showLine?:boolean,
    public isGradient?: boolean,
    public borderWidth?:string,
    public chartType?: string,
    public chartTooltipItem?: ChartTooltipItem

```

Here is an example:

```javascript
    this.dataLine.push(new chartItem('Only Line', [13, 20, 21, 15], '', '', false, true, false, 3));
```

Clarification of each attribute:

- **label** is the label name of the item.
- **data** list of values of the item.
- **borderColor** color in Hexadecimal for the border.
- **backgroundColor**  color in Hexadecimal for the background.
- **fill** set to false if you want a transparent background.
- **showLine** set to false if you only want to display the area and not the border.
- **isGradient** set to true if you want to use a gradient colours.
- **borderWidth** define the width of the border.
- **chartType** define different chart type to mix charts.
- **ChartTooltipItem** define what you want to display in the tooltip of this raw data.

```javascript
    this.dataLineBar.push(new chartItem('Line', [13, 20, 21, 15], '', '', false, true, true, 3, 'line'));
	this.dataLineBar.push(new chartItem('Bar', [10, 20, 10, 15], '', '', true, true, false, 3));
```


### Annotations

You can define two types of annotations, line or box type annotations.

**chartAnnotations** is an array of annotations. Depending on the annotations that you want you show, use the **chartBoxAnnotation** structure or **chartLineAnnotation**.

#### chartBoxAnnotation

```javascript
    public drawTime: string,
    public type: string,
    public xMin: number,
    public xMax: number,
    public yMin: number,
    public yMax: number,
    public backgroundColor?:string,
    public borderColor?:string,
    public borderWidth?:string
```

Clarification of each attribute:

- **drawTime** you can set to draw 'afterDatasetsDraw' or 'beforeDatasetsDraw'.
- **type** in this case will be 'box'.
- **xMin** min value in the axis X.
- **xMax**  max value in the axis X.
- **yMin** min value in the axis Y.
- **yMax** max value in the axis Y.
- **backgroundColor** define the color of the box area.
- **borderWidth** define the width of the border.
- **borderColor** define the color of the box.


#### chartLineAnnotation

```javascript
    public label: chartLabelAnnotation,
    public value: number,
    public orientation: string,
    public drawTime: string,
    public type: string,
    public borderDash?:Array<number>,
    public borderColor?:string,
    public borderWidth?:string
```
Clarification of each attribute:

- **drawTime** you can set to draw 'afterDatasetsDraw' or 'beforeDatasetsDraw'.
- **type** in this case will be 'box'.
- **value** is the value where the line is located.
- **orientation**  define the orientation can be 'vertical' or horizontal.
- **borderDash** if you want a dashed line you will establish the dash properties in a number array.
- **borderWidth** define the width of the border.
- **borderColor** define the color of the box.
- **label** you can define a label for the annotation, setting the text, position ('left', 'center', 'right'), backgroundColor, fontStyle and the fontColor.


### Tooltips configuration

You can configure the content of the tooltips and the style.

There are some general configuration, as well as specific ones.

#### General Configuration
The chart have a public attribute **chartTooltipSettings**, where you can setup the following styles:

- **backgroundColor**, is the color of the background of the tooltips.
- **titleFontSize**, is the font size of the title label in the tooltips.
- **titleFontColor**, is the color of the title label in the tooltips.
- **bodyFontColor**, is the color of the body content in the tooltips.
- **bodyFontSize**, is the font size of the body content in the tooltips.
- **borderColor**, is the color of the border in the tooltips.
- **borderWidth**, is the width of the border in the tooltips.

#### Chart Items Tooltips Configuration

For each raw data added into the chart you can setup the tooltip.

The **ChartItem** structure has a **ChartTooltipItem** structure, in which you can setup the tooltip of the chart item.

```javascript
    public title?: string,  // is the content for the title
    public label?: string, // is the content for the body
    public afterLabel?: string, // is the content that you can set after the label
    public valueInAfterLabel?: boolean // you can decide where display the value, next the label (valueInAfterLabel set to false) or after the label (valueInAfterLabel set to true).
```

```javascript
this.dataLine.push(new ChartItem('Only Line', [13, 20, 21, 15], '', '', false, true, false, 3, '',
		new ChartTooltipItem('title', 'label', 'afterlabel', true)));
```

#### Tooltips for the Bubble charts

There is the option to display the label that you want instead of the coordinates (by default defined). Set the variable **t** in the data parameter and the system will consider it as the tooltip label.


```javascript
[{ x: 13, y: 13, r: 4, t: 'Tooltip label' }, { x: 1, y: 2, r: 3 }]
```

### Update the Chart Content

There is a public method 'doUpdate', to reset the chart with the new data.