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
        recclass: object.properties.recclass,
        reclat: object.properties.reclat,
        nametype: object.properties.nametype,
        radius: 10,
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
}());