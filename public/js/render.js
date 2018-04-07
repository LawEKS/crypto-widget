/* eslint-disable */
function renderSuggestion(obj) {
  var listContainer = document.querySelector('.list-container');
  var oldList = document.querySelector('.list');
  var newList = document.createElement('ul');
  newList.setAttribute('class', 'list');

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var item = document.createElement('li');
      var text = document.createTextNode(key);
      var ticker = obj[key].ticker;
      var rank = obj[key].rank;
      item.setAttribute('data-ticker', ticker);
      item.setAttribute('data-rank', rank);
      item.appendChild(text);
      newList.appendChild(item);
    }
  }

  listContainer.replaceChild(newList, oldList);
  var search = document.querySelector('.search');
}

// use as workaround for parsing dates in d3
// the timestamp will now represent days from now
function resolveDateData(dataset) {
  return dataset.map(function(element, index) {
    var price = element.usd;
    // var daysFromNow = new Date(element.timestamp).getUTCDate() - new Date().getUTCDate();
    var daysFromNow = index + 1;
    console.log(daysFromNow);
    return {
      timestamp: daysFromNow,
      usd: price
    }
  })
}

function renderOverview(data) {
  console.log(data);
  var overviewContainer = document.querySelector('.overview-container');
  overviewContainer.classList.add('overview-container--show');

  // replace old container with and empty container for the visualization
  var oldVisualization = document.querySelector('.visualization');
  var newVisualization = document.createElement('div');
  newVisualization.setAttribute('class', 'visualization');
  overviewContainer.replaceChild(newVisualization, oldVisualization);

  var dataset = resolveDateData(data);

  // setting visualization dimensions and scales
  var w = 900;
  var h = 600;
  var padding = 100;

  // var timeFormat = d3.time.format('%m/%d/%Y');

  var xScale = d3.scale.linear()
    .domain([d3.min(dataset, function (d) {
      return d.timestamp;
    }), d3.max(dataset, function (d) {
      return d.timestamp;
    })])
    .range([padding, w - padding]);

  var yScale = d3.scale.linear()
    .domain([d3.min(dataset, function (d) {
      return d.usd;
    }), d3.max(dataset, function (d) {
      return d.usd;
    })])
    .range([h - padding, padding]);

    var randHue = Math.round(Math.random() * 360);

    var satScale = d3.scale.linear()
        .domain([d3.min(dataset, function (d) {
          return d.usd;
        }), d3.max(dataset, function (d) {
          return d.usd;
        })])
        .rangeRound([40, 90]);

    var lumScale = d3.scale.linear()
        .domain([d3.min(dataset, function (d) {
          return d.timestamp;
        }), d3.max(dataset, function (d) {
          return d.timestamp;
        })])
        .rangeRound([40, 75]);

   


  // create svg to hold the visualization
  var svg = d3.select('.visualization')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

  // create axises for svg and set their scale
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .ticks('30');

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left')
    .ticks('30');

  // create and attach data points to the svg using a svg circle
  var circles = svg.selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('cx', function(d) {
      return xScale(d.timestamp);
    })
    .attr('cy', function(d) {
      return yScale(d.usd);
    })
    .attr('r', '6px');


    // attaching axises to svg
    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0, ' + (h - padding) + ')')
      .call(xAxis)

    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate( ' + (padding) + ', 0)')
      .call(yAxis)

    d3.selectAll('circle')
      .transition()
      .duration(2000)
      .attr('fill', function(d) {
        return 'hsl(' + randHue + ', ' + satScale(d.usd) + '%, ' + lumScale(d.timestamp) + '%)'
      })


}



