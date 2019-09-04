# systelab-chart

Component to show a Chart

## Using the component

```html
   <systelab-chart [labels]="labels" [data]="data" [showLegend]="legend" [(itemSelected)]="itemSelected" [type]="type"
                (action)="doAction($event)" [isBackgroundGrid]="isBackgroundGrid" [isHorizontal]="isHorizontal" [lineTension]="lineTension" 
                [yMinValue]="yMinValue" [yMaxValue]="yMaxValue" [annotations]="annotations" [xLabelAxis]="xLabelAxis" [yLabelAxis]="yLabelAxis" [tooltipSettings]="tooltipSettings" [isStacked]="isStacked" [customLegend]="customLegend"></systelab-chart>
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
| legendPosition | string | 'top' | Define the position of the legend |
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
| data | Array<ChartItem> |  | List of data |
| multipleYAxisScales | Array<ChartMultipleYAxisScales> |  | List of Y axis scales |
| customLegend | boolean | false | Define if you want a custom Legend (remember set legendType in chartItem) |

#### ChartItem

| Name | Type | Default | Description |
| ---- |:----:|:-------:| ----------- |
| label | string | | Label name of the item |
| data | Array<any> | | List of values of the item |
| borderColor | string |  | Color in Hexadecimal for the border |
| backgroundColor | string |  | Color in Hexadecimal for the background |
| fill | boolean | true | Set to false if you want a transparent background |
| showLine | boolean | true | Set to false if you only want to display the area and not the border |
| isGradient | boolean | false | Set to true if you want to use a gradient colours |
| borderWidth | string |  | Define the width of the border |
| chartType | string |  | Define different chart type to mix charts |
| chartTooltipItem | ChartTooltipItem |  | Define what you want to display in the tooltip of this raw data |
| pointRadius | number | 3 | The radius of the point shape. If set to 0, the point is not rendered. |
| yAxisID | string |  | Define the ID of the y axis to plot this dataset on. |
| legendType | string |  | Define legend type, it can be 'bar,' 'line' or 'dots'. It is only used if the [customLegend] property is true |
| labelBorderColors | Array<number[]> |  | If the ChartItem belongs to a Doughnut, Pie or Polar Area chart, this property contains a list of colors in RGB for the border of every value and every RGB color is expressed as an array of three numbers. If not defined, a default set of colors will be used instead|
| labelBackgroundColors | Array<number[]> |  | As the [labelBorderColors] property, but it refers to the background color of every value. Like [labelBorderColors], if not defined a default set of colors will be used instead|

#### ChartMultipleYAxisScales

| Name | Type | Default | Description |
| ---- |:----:|:-------:| ----------- |
| id | string| | Y axis ID |
| position | string | left | Axis position |
| type | string |  | Chart type |
| gridLines | GridLine |  | Display the grid lines |
| scaleLabel | ScaleLabel | | Show an axis label |
| ticks | Ticks | | Define the values and steps for the axis |

### GridLine
| Name | Type | Default | Description | 
| ---- |:----:|:------: | --------- |
| display | boolean | true | Set true if you want to see the grid lines |
| drawBorder | boolean | true | Set true if you want to see a border around the grid| 

### ScaleLabel
| Name | Type | Default | Description | 
| ---- |:----:|:------: | --------- |
| display | boolean | true | Show the label |
| labelString | string | | Set a text to be shown in the axis | 
 
### Ticks
| Name | Type | Default | Description | 
| ---- |:----:|:------: | --------- |
| min | number | | Min value for the axis |
| max | number | | Max value for the axis | 
| stepSize | number | | Set the steps between axis values | 
| display | boolean | true | Set to false if you do not want to see the ticks on the axis | 
 
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
| label | chartLabelAnnotation| | chartLabelAnnotation are the properties of the tooltip label |
| value | number | | In this case will be 'box' |
| orientation | string |  | Define the orientation can be 'vertical' or horizontal |
| drawTime | string |  | Set to draw 'afterDatasetsDraw' or 'beforeDatasetsDraw' |
| type | string |  | In this case will be 'line' |
| borderDash | Array<number> |  | If you want a dashed line you will establish the dash properties in a number array |
| borderColor | string | | Define the color of the box |
| borderWidth | string |  | Define the width of the border |
| endValue | number |  | Define a end value of the line, drawing a diagonal line |


#### chartLabelAnnotation

| Name | Type | Default | Description |
| ---- |:----:|:-------:| ----------- |
| text | string| | Text of the label in the tooltip |
| position | string | | 'center', 'left' or 'right'|
| backgroundColor | string |  | Define the color of the background |
| fontStyle | string |  | Define the styles of the text |
| fontColor | string |  | Define the color of the label |


### Tooltips

You can configure the content of the tooltips and the style.

| Name | Type | Default | Description |
| ---- |:----:|:-------:| ----------- |
| backgroundColor | string|'rgba(0,0,0,0.8)' | Tooltip background color|
| titleFontSize | number |12 | Title font size |
| titleFontColor | string | '#ffffff' | Title font color |
| bodyFontColor | string | '#ffffff' | Tooltip body font color |
| bodyFontSize | number | 12 | Tooltip body font size |
| borderColor | string | 'rgba(0,0,0,0)' | Tooltip border color |
| borderWidth | number | 0 | Tooltip border width |


#### ChartTooltipItem


| Name | Type | Default | Description |
| ---- |:----:|:-------:| ----------- |
| title | string| | The content for the title|
| label | number | | The content for the body |
| afterLabel | string | | The content that you can set after the label |
| valueInAfterLabel | boolean | true | you can decide where display the value, next the label (valueInAfterLabel set to false) or after the label (valueInAfterLabel set to true)|

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
|action||Is going to emit the event when you clicked in a item in the chart|
