var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/// <reference path="typings/tsd.d.ts" />
var angular = require('angular2/angular2');
var angular2_1 = require('angular2/angular2');
var d3 = require('d3');
var BarGraph = (function () {
    function BarGraph(width, height) {
        this.margin = { top: 20, right: 20, bottom: 30, left: 40 };
        this.width = width - this.margin.left - this.margin.right;
        this.height = height - this.margin.top - this.margin.bottom;
        this.render(this.data);
    }
    BarGraph.prototype.render = function (newValue) {
        if (!newValue)
            return;
        var margin = this.margin;
        var width = this.width;
        var height = this.height;
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
        x.domain(newValue.map(function (d) { return d.letter; }));
        y.domain([0, d3.max(newValue, function (d) { return d.frequency; })]);
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
            .attr("x", function (d) { return x(d.letter); })
            .attr("width", x.rangeBand())
            .attr("y", function (d) { return y(d.frequency); })
            .attr("height", function (d) { return height - y(d.frequency); });
    };
    BarGraph.prototype.onChange = function () {
        this.render(this.data);
    };
    BarGraph = __decorate([
        angular2_1.Directive({
            selector: 'bar-graph',
            lifecycle: [angular2_1.onChange],
            properties: ['data']
        }),
        __param(0, angular2_1.Attribute('width')),
        __param(1, angular2_1.Attribute('height')), 
        __metadata('design:paramtypes', [Number, Number])
    ], BarGraph);
    return BarGraph;
})();
var App = (function () {
    function App() {
        this.graphData = [{ "letter": "A", "frequency": ".08167" },
            { "letter": "B", "frequency": ".01492" },
            { "letter": "C", "frequency": ".02782" },
            { "letter": "D", "frequency": ".04253" },
            { "letter": "E", "frequency": ".12702" },
            { "letter": "F", "frequency": ".02288" },
            { "letter": "G", "frequency": ".06094" },
            { "letter": "H", "frequency": ".08167" },
            { "letter": "I", "frequency": ".06966" },
            { "letter": "J", "frequency": ".00153" },
            { "letter": "K", "frequency": ".00772" },
            { "letter": "M", "frequency": ".02406" },
            { "letter": "N", "frequency": ".06749" },
            { "letter": "O", "frequency": ".07507" },
            { "letter": "P", "frequency": ".01929" },
            { "letter": "R", "frequency": ".05987" },
            { "letter": "S", "frequency": ".06327" },
            { "letter": "T", "frequency": ".09056" },
            { "letter": "U", "frequency": ".02758" },
            { "letter": "V", "frequency": ".00978" },
            { "letter": "W", "frequency": ".02360" }];
    }
    App = __decorate([
        angular2_1.Component({
            selector: 'app'
        }),
        angular2_1.View({
            directives: [BarGraph],
            template: "\n  <div style=\"text-align: center;\">\n  <bar-graph\n    bind-data=\"graphData\"\n    width=\"1000\"\n    height=\"400\"\n  >\n  <svg></svg>\n  </bar-graph>\n  </div>\n\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
})();
angular.bootstrap(App, []);
