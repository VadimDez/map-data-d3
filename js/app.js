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
      popupTemplate: function(geo, data) {
        return '<div class="hoverinfo">' + JSON.stringify(data) + '</div>'
      }
    });
  }

  function drawMap() {
    return new Datamap({
      element: document.getElementById('container'),
      geographyConfig: {
        highlightOnHover: false,
        popupOnHover: false
      }
    });
  }

  function getPoints(data) {
    return data.map(function (object) {
      console.log(object.geometry);

      if (!object.geometry) {
        return false;
      }
      return {
        name: object.properties.name,
        radius: 10,//object.properties.mass,
        //yeild: 15000,
        //significance: 'First dry fusion fuel "staged" thermonuclear weapon; a serious nuclear fallout accident occurred',
        date: object.properties.year,
        latitude: object.geometry.coordinates[0],
        longitude: object.geometry.coordinates[1]
      }
    })
  }
}());