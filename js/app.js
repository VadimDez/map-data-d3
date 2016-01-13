/**
 * Created by vadimdez on 13/01/16.
 */
(function () {

  getData(drawMap);

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

  function drawMap(data) {

  }
}());