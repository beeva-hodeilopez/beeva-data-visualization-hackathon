/// <reference path="typings/tsd.d.ts" />
import * as angular from 'angular2/angular2';
import {Component, Directive, View, Attribute, onChange} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import * as d3 from 'd3';

@Directive({
  selector:   'bar-graph',
  lifecycle:  [ onChange ],
  properties: [ 'data' ]
})
class BarGraph {
  data    :Array<any>;
  x       :any;
  y       :any;
  svg     :any;
  xAxis   :any;
  yAxis   :any;
  width   :number;
  height  :number;
  margin  :any;
  constructor(
      @Attribute('width') width: number,
      @Attribute('height') height: number) {

      this.margin = {top: 20, right: 20, bottom: 30, left: 40};
      this.width = width - this.margin.left - this.margin.right;
      this.height = height - this.margin.top - this.margin.bottom;

      this.render(this.data);
  }

  render(newValue){
    if (!newValue) return;

    var margin  = this.margin;
    var width   = this.width;
    var height  = this.height;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10, "%");

    var svg = d3.select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(newValue.map(function(d) { return d.letter; }));
    y.domain([0, d3.max(newValue, function(d) { return d.frequency; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");

    svg.selectAll(".bar")
        .data(newValue)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) {return x(d.letter); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.frequency); })
        .attr("height", function(d) { return height - y(d.frequency); });
  }

  onChange() {
    this.render(this.data);
  }
}


@Component({
  selector: 'app'
})
@View({
  directives: [ BarGraph ],
  template: `
  <div style="text-align: center;">
  <bar-graph
    bind-data="graphData"
    width="1000"
    height="400"
  >
  <svg></svg>
  </bar-graph>
  </div>

  `
})
class App {
  graphData: Array<number>;
  constructor() {
      this.graphData = [{"letter":"A" , "frequency": ".08167"},
                        {"letter":"B" , "frequency": ".01492"},
                        {"letter":"C" , "frequency": ".02782"},
                        {"letter":"D" , "frequency": ".04253"},
                        {"letter":"E" , "frequency": ".12702"},
                        {"letter":"F" , "frequency": ".02288"},
                        {"letter":"G" , "frequency": ".06094"},
                        {"letter":"H" , "frequency": ".08167"},
                        {"letter":"I" , "frequency": ".06966"},
                        {"letter":"J" , "frequency": ".00153"},
                        {"letter":"K" , "frequency": ".00772"},
                        {"letter":"M" , "frequency": ".02406"},
                        {"letter":"N" , "frequency": ".06749"},
                        {"letter":"O" , "frequency": ".07507"},
                        {"letter":"P" , "frequency": ".01929"},
                        {"letter":"R" , "frequency": ".05987"},
                        {"letter":"S" , "frequency": ".06327"},
                        {"letter":"T" , "frequency": ".09056"},
                        {"letter":"U" , "frequency": ".02758"},
                        {"letter":"V" , "frequency": ".00978"},
                        {"letter":"W" , "frequency": ".02360"}]
  }
}

angular.bootstrap(App, [/* AppInjector */]);
