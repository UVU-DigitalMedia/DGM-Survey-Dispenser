angular.module('d3', [])
.factory('d3', function () {
  return window.d3;
})
.directive('pieChart', function (d3, $window) {
  return {
    restrict: 'EA',
    scope: {
      values: '='
    },
    link: function (scope, elem, attrs) {
      scope.$watch('values', function(values) {
				if (!values) { return; }

        console.log(values);

				var height = 300;
				var radius = height / 2;

				var color = d3.scale.category20();

				var arc = d3.svg.arc()
					.outerRadius(radius - 10)
					.innerRadius(0);

				var pie = d3.layout.pie()
					.sort(null)
					.value(function(d) {
						return d.value;
					});

				var svg = d3.select(elem[0]).append('svg')
					.attr('width', '100%')
					.attr('height', height)
					.append('g')
					.attr('transform', 'translate(' + radius + ',' + radius + ')');

				values.forEach(function(d) {
					d.value = +d.value;
				});

				var g = svg.selectAll('.arc')
					.data(pie(values))
					.enter().append('g')
					.attr('class', 'arc');

				g.append('path')
					.attr('d', arc)
					.style('fill', function(d, i) { return color(i); });

				g.append('text')
					.attr('transform', function(d) {
            return 'translate(' + arc.centroid(d) + ')';
          })
					.attr('dy', '.35em')
					.style('text-anchor', 'middle')
					.text(function(d) { return d.data.label; });

			}, true);
    }
  };
});
