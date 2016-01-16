/**
 * Created by vadimdez on 13/01/16.
 */
(function () {

  getData(draw);

  /**
   * Get data
   * @param fn
   */
  function getData(fn) {
    var url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json';
    d3.json(url, function (err, data) {
      if (err) {
        console.warn(err);
        return;
      }

      fn(data.features);
    });
  }

  function draw(data) {
    var map = drawMap();
    map.bubbles(getPoints(data), {
      popupTemplate: getTooltip
    });
  }

  function drawMap() {
    return new Datamap({
      element: document.getElementById('container'),
      geographyConfig: {
        highlightOnHover: false,
        popupOnHover: false
      },
      bubblesConfig: {
        fillOpacity: 0.7
      },
      fills: {
        defaultFill: '#00A896',
        1: '#000000'
      }
    });
  }

  function getPoints(data) {
    return data.map(function (object) {
      if (!object.geometry) {
        return false;
      }
      return {
        name: object.properties.name,
        fall: object.properties.fall,
        mass: object.properties.mass,
        recclass: object.properties.recclass,
        reclat: object.properties.reclat,
        nametype: object.properties.nametype,
        radius: getRadius(object.properties.mass), //object.properties.mass / 200000,
        fillKey: '1',
        date: object.properties.year,
        latitude: object.geometry.coordinates[1],
        longitude: object.geometry.coordinates[0]
      }
    })
  }

  function getTooltip(geo, data) {
    var info = '';
    for (var key in data) {
      info += '<div>' + key + ': ' + data[key] + '</div>';
    }

    return '<div class="hoverinfo">' + info + '</div>'
  }

  function getRadius(mass) {
    // to make it more or less similar to requested...
    if (mass < 100000) {
      return 2;
    }
    if (mass < 500000) {
      return 10;
    }
    if (mass < 4000000) {
      return 30;
    }
    if (mass < 20000000) {
      return 40;
    }
    return 50;
  }
}());