angular.module('d3', [])
.factory('d3', function () {
  return window.d3;
})
.directive('pieChart', function (d3, $window) {
  return {
    restrict: 'EA',
    scope: {
      data: '='
    },
    link: function (scope, elem, attrs) {
      var svg = d3.select(elem[0])
        .append('svg')
        .style('width', '100%');

      var margin     = parseInt(attrs.margin) || 20;
      var barHeight  = parseInt(attrs.barHeight) || 20;
      var barPadding = parseInt(attrs.barPadding) || 5;

      var prevResize = window.onresize;
      window.onresize = function () {
        prevResize();
        scope.$apply();
      };

      scope.$watch(function() {
        return angular.element($window)[0].innerWidth;
      }, function() {
        scope.render(scope.data);
      });

      scope.render = function (data) {
        // remove all previous items before render
        svg.selectAll('*').remove();

        // If we don't pass any data, return out of the element
        if (!data) { return };

        // setup variables
        var width = d3.select(elem[0]).node().offsetWidth - margin;
        // calculate the height
        var height = scope.data.length * (barHeight + barPadding);
        // Use the category20() scale function for multicolor support
        var color = d3.scale.category20();
        // our xScale
        var xScale = d3.scale.linear()
          .domain([0, d3.max(data, function(d) {
            return d.score;
          })])
          .range([0, width]);

        // set the height based on the calculations above
        svg.attr('height', height);

        //create the rectangles for the bar chart
        svg.selectAll('rect')
          .data(data).enter()
          .append('rect')
          .attr('height', barHeight)
          .attr('width', 140)
          .attr('x', Math.round(margin/2))
          .attr('y', function(d,i) {
            return i * (barHeight + barPadding);
          })
          .attr('fill', function(d) { return color(d.score); })
          .transition()
          .duration(1000)
          .attr('width', function(d) {
            return xScale(d.score);
          });
      };
    }
  };
});
