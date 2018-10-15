# systelab-chart

Component to show a Chart

## Using the component

```html
   <systelab-chart [labels]="labels" [data]="data" [showLegend]="legend" [(itemSelected)]="itemSelected" [type]="type"
                (action)="doAction($event)" [isBackgroundGrid]="isBackgroundGrid" [isHorizontal]="isHorizontal" [lineTension]="lineTension" 
                [yMinValue]="yMinValue" [yMaxValue]="yMaxValue" [annotations]="annotations" [xLabelAxis]="xLabelAxis" [yLabelAxis]="yLabelAxis" [tooltipSettings]="tooltipSettings" [isStacked]="isStacked"></systelab-chart>
```


This component use the **Chart.js** library, and is able to display different chart types in a easy way.

Set **type** with the chart type that you want to display. You can chose between the following charts types

- Bar
- Line
- Pie
- Doughnut
- Bubble
- Radar
- Polar Area

Also you can show together different chart types, for example a Bar chart with Line chart. In order to do this, you should define the chart type in the properties of the data that you provide to the component. 

Single example:
```javascript
    this.dataLine.push(new chartItem('Only Line', [13, 20, 21, 15], '', '', false, true, false, 3));
```

Multiple charts example:
```javascript
    this.dataLineBar.push(new chartItem('Line', [13, 20, 21, 15], '', '', false, true, true, 3, 'line'));
```

## Properties

| Name | Type | Default | Description |
| ---- |:----:|:-------:| ----------- |
| labels | Array<string> | | list of labels of the chart |
| **itemSelected** | any | | is used to notify which item is clicked |
| showLegend | boolean | true | Define the visibility of the legend |
| isBackgroundGrid | boolean | true | Define if you want a grid backgropund or not |
| lineTension | number | 0 | Define the tension of the line |
| yMinValue | any | 0 | Min value of the axis Y |
| yMaxValue | any | 0 | Max value of the axis Y |
| xMinValue | any | 0 | Min value of the axis X |
| xMaxValue | any | 0 | Max value of the axis X |
| xLabelAxis | string | 0 | Define the title of the Axis X |
| yLabelAxis | string | 0 | Define the title of the Axis Y |
| minValueForRadar | number | 0 | Min value for the radar |
| maxValueForRadar | number | 0 | Max value for the radar |
| isHorizontal | boolean | false | Set to true, if you want that display a bar chart in horizontal view |
| isStacked | boolean | false | Set to true, if you want that display a bar chart with stacked columns |

#### Data

| Name | Type | Default | Description |
| ---- |:----:|:-------:| ----------- |
| label | string| | Label name of the item |
| data | Array<any> | | List of values of the item |
| borderColor | string |  | Color in Hexadecimal for the border |
| backgroundColor | string |  | Color in Hexadecimal for the background |
| fill | boolean | true | Set to false if you want a transparent background |
| showLine | boolean | true | Set to false if you only want to display the area and not the border |
| isGradient | boolean | false | Set to true if you want to use a gradient colours |
| borderWidth | string |  | Define the width of the border |
| chartType | string |  | Define different chart type to mix charts |
| chartTooltipItem | ChartTooltipItem |  | Define what you want to display in the tooltip of this raw data |

### Annotations

You can define two types of annotations, line or box type annotations.

**annotations** is an array of annotations. Depending on the annotations that you want you show, use the **chartBoxAnnotation** structure or **chartLineAnnotation**.

#### chartBoxAnnotation
| Name | Type | Default | Description |
| ---- |:----:|:-------:| ----------- |
| drawTime | string| | Set to draw 'afterDatasetsDraw' or 'beforeDatasetsDraw' |
| type | string | | In this case will be 'box' |
| xMin | number |  | Min value in the axis X |
| xMax | number |  | Max value in the axis X |
| yMin | number |  | Min value in the axis Y |
| yMax | number |  | Max value in the axis Y |
| backgroundColor | string | | Define the color of the box area |
| borderColor | string |  | Define the width of the border |
| borderWidth | string |  | Define the color of the box |


#### chartLineAnnotation

| Name | Type | Default | Description |
| ---- |:----:|:-------:| ----------- |
| label | chartLabelAnnotation| | Set to draw 'afterDatasetsDraw' or 'beforeDatasetsDraw' |
| type | string | | In this case will be 'box' |
| xMin | number |  | Min value in the axis X |
| xMax | number |  | Max value in the axis X |
| yMin | number |  | Min value in the axis Y |
| yMax | number |  | Max value in the axis Y |
| backgroundColor | string | | Define the color of the box area |
| borderColor | string |  | Define the width of the border |
| borderWidth | string |  | Define the color of the box |

```javascript
    public label: chartLabelAnnotation,
    public value: number,
    public orientation: string,
    public drawTime: string,
    public type: string,
    public borderDash?:Array<number>,
    public borderColor?:string,
    public borderWidth?:string
    public endValue?:number
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
- **endValue** you can define a end value of the line, drawing a diagonal line.


### Tooltips configuration

You can configure the content of the tooltips and the style.

There are some general configuration, as well as specific ones.

#### General Configuration
The chart have a public attribute **tooltipSettings**, where you can setup the following styles:

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

## Events

| Name | Parameters | Description |
| ---- |:----------:| ------------|
| doUpdate || Reset the chart with the new data.|
|action|Is going to emit the event when you clicked in a item in the chart|
