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

        var width  = 500;
				var height = 300;
				var radius = Math.min(width, height) / 2;
        var padding = {
          vert: 30,
          hori: 200
        };

				var color = d3.scale.category20();

				var arc = d3.svg.arc()
					.outerRadius(radius - 10)
					.innerRadius(0);

				var pie = d3.layout.pie()
					.sort(null)
					.value(function(d) {
						return d.value;
					});

        d3.select(elem[0]).selectAll('*').remove();

				var svg = d3.select(elem[0]).append('svg')
					.attr('width', width + padding.hori)
					.attr('height', height + padding.vert)
					.append('g')
					.attr('transform', 'translate(' + (radius + (padding.hori / 2)) + ',' + (radius + (padding.vert / 2)) + ')');

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
					// .attr('transform', function(d) {
          //   return 'translate(' + arc.centroid(d) + ')';
          // })
          .attr('transform', function(d) {
            var c = arc.centroid(d),
                x = c[0],
                y = c[1],
                // pythagorean theorem for hypotenuse
                h = Math.sqrt(x*x + y*y);
            return 'translate(' + (x/h * radius) +  ',' +
               (y/h * radius) +  ')';
          })
          .attr('text-anchor', function(d) {
            // are we past the center?
            return (d.endAngle + d.startAngle)/2 > Math.PI ?
              'end' : 'start';
          })
					.attr('dy', '.35em')
					//.style('text-anchor', 'middle')
					.text(function(d) {
            return d.data.label + ' (' + d.data.value + ')';
          });

			}, true);
    }
  };
});
