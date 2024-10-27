// Ambient Logic noise score web_widget
// Copyright Ambient Logic, 2018
// Bruce J. Ikelheimer
// Bruce@Ambient-Logic.com
// Version 0.98
// This version is designed to work better on mobile
// 8/2/2018

(function(global) {

  //  var mapOptions = {};  //This moves these options global to the function
  var AmbientLogic = function(options) {
    return new AmbientLogic.init(options);
  }

  ////////////////////////////////////////////////////////////////////////////////
  //This function builds the map with the various mapOptions
  ////////////////////////////////////////////////////////////////////////////////
  function buildMap(mapOptions, JSON_return) {

    //Get the data from the API JSON return
    var score = JSON_return.met;
    if (!isNaN(score)) {
      score = Math.max(score, 5);
      score = Math.min(score, 100);
    }
    var lat = Number(JSON_return.lat);
    var lng = Number(JSON_return.lng);
    //Check about the key
    if (!JSON_return.goodKey) { //A bad key was used - don't show the score or the arrow.
      mapOptions.showScore = false; //Don't show the score if the key is bad
      mapOptions.showArrow = false; //Dont' show the arrow if the key is bad
    }
    if(mapOptions.showMap){
    insertDivs(score, mapOptions);
    loadOL(lat, lng, score, mapOptions);
    }
    // console.log('JSON_return:', JSON_return);
    return JSON_return;
  }

  //////////////////////////////////////////////////////////////////////////////
  //This is the code that adds in necessary CSS items - called by insertDivs
  //////////////////////////////////////////////////////////////////////////////
  function insertCss(mapOptions) {
    //  This function updates the CSS to allow the map to work properly
    var OLlink = document.createElement("link");
    OLlink.href = "http://openlayers.org/en/v3.20.1/css/ol.css";
    OLlink.type = "text/css";
    OLlink.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(OLlink);
    //Set the legend offset based on the options

    //Add the CSS
    var style = document.createElement('style');
    style.innerHTML =
      //mapStyle is the enclosing DIV - it must be identified in the calling HTTP
      '.' + mapOptions.mapID + '{position: relative;' +
      'border-style: solid;' +
      'border-width: 2px}' +
      //For the legend DIV
      '.' + mapOptions.mapID + ' #AL-legend {' +
      'position: absolute;}' +
      //For the logo DIV
      '.' + mapOptions.mapID + ' #Ambient-Logic-Logo {' +
      'position: absolute;' +
      'top: -38px;' +
      'right: -25px;' +
      'z-index: 1;' +
      '}' +
      //Number at the top of the legend

      //Top num specifics
      '.' + mapOptions.mapID + ' #AL-topNum{' +
      'position:absolute;' +
      'font-family: "Open Sans";' +
      'font-size: 15px;' +
      'color: white;' +
      'text-align: center;' +
      'width: 29px;' +
      //    'top: 5px;' +
      '}' +
      //Bottom num specifics
      '.' + mapOptions.mapID + ' #AL-bottomNum{' +
      'position:absolute;' +
      'font-family: "Open Sans";' +
      'font-size: 15px;' +
      'color: white;' +
      'text-align: center;' +
      'width: 30px;' +
      //      'bottom: 5px;' +
      '}' +
      //Legend text
      '.' + mapOptions.mapID + ' .AL-legendText{' +
      'position:absolute;' +
      'font-family: "Open Sans";' +
      'font-size: 15px;' +
      'color: #767777;' +
      'text-align: center;' +
      'width: 50px}';

    var ref = document.querySelector('script');
    // Insert our new styles before the first script tag
    ref.parentNode.insertBefore(style, ref);
  };

  ////////////////////////////////////////////////////////////////////////////////
  //  This function will insert the necessary divs to get the map looking right
  ////////////////////////////////////////////////////////////////////////////////
  function insertDivs(score, mapOptions) {
    //Create or find the main map DIV.
    var mapStyle= document.getElementById(mapOptions.mapID);

      // Throw an error if there is no element with id of mapOptions.mapID.
      if (mapStyle === undefined || mapStyle === null) {
        throw 'Could not find element with an id of: ' + mapOptions.mapID;
      }
  //  } else {
  //    mapStyle = document.createElement("div");
  //  }

    mapStyle.className = mapOptions.mapID;
    mapOptions.w = Math.min(mapStyle.offsetWidth, mapOptions.w);
    mapStyle.style.width = mapOptions.w.toString() + "px";
    mapStyle.style.height = mapOptions.h.toString() + "px";

    if (screen.width <= 420) { //We have a small screen - force the horizontal bar and make the map square
//      if (mapStyle.offsetWidth <= 420) { //We have a small screen - force the horizontal bar and make the map square
        mapOptions.horizontal = true;  //Set horizontal true
        mapOptions.h = Math.min(mapStyle.offsetHeight, mapOptions.w);  //Make it square
        mapStyle.style.height = mapOptions.h.toString() + "px"; //Reset the height
      }
    //Inset the css

    insertCss(mapOptions);
    // Adjust the offsets depending on the options
    var legendOffset = 0;
    if (!mapOptions.horizontal) {
      legendOffset = 34;
      if (mapOptions.textOn) {
        legendOffset = legendOffset + 61;
      }
      if (mapOptions.showArrow) {
        legendOffset = legendOffset + 18;
      }
    }
    //Set the size and position of the main DIV
    mapStyle.style.left = legendOffset + "px";


    if (mapOptions.mapID === 'ambientLogic-89178' || mapOptions.mapID === null || mapOptions.mapID === undefined) {
      var ref = document.querySelector('body');
      // Insert our new styles before the first script tag
      ref.parentNode.appendChild(mapStyle, ref);
    }

    //Create the logo div
    var logoDiv = document.createElement("div");
    logoDiv.id = "Ambient-Logic-Logo";
    mapStyle.appendChild(logoDiv);

    //Add the image
    var logo = document.createElement("img");
    logo.src = 'http://s3.amazonaws.com/ambient-logic/images/Ambient-Logic_Logo.png';
    logo.width = 140;
    logo.height = 140;
    logoDiv.appendChild(logo);

    //Create the legend div
    var legend = document.createElement("div");
    mapStyle.appendChild(legend);
    legend.id = "AL-legend";

    //Legend bar
    var thinScore = document.createElement("img");
    legend.appendChild(thinScore);
    var topNum = document.createElement("div");
    var topNumText = document.createTextNode("100");
    topNum.setAttribute("id", "AL-topNum");
    topNum.appendChild(topNumText);
    legend.appendChild(topNum);

    //Create the bottomNum div
    var bottomNum = document.createElement("div");
    var bottomNumText = document.createTextNode("5");
    bottomNum.setAttribute("id", "AL-bottomNum")
    bottomNum.appendChild(bottomNumText);
    legend.appendChild(bottomNum);

    //Add numbers to the color bar
    //Create the topNum div

    if (mapOptions.horizontal) {
      thinScore.src = 'http://s3.amazonaws.com/ambient-logic/images/thinScore_horizontal.png';
      thinScore.setAttribute('style', "height: 20px; width: " + mapOptions.w.toString() + 'px');
      legend.setAttribute("style", "bottom:-30px");
      topNum.setAttribute("style", "left: 5px; bottom: 5px");
      bottomNum.setAttribute("style", "right: 0px; bottom: 5px");

    } else {
      thinScore.src = 'http://s3.amazonaws.com/ambient-logic/images/thinScore.png';
      thinScore.setAttribute('style', "width: 30px; height: " + mapOptions.h.toString() + 'px');
      legend.setAttribute("style", "left:-50px; top: -2px");
      topNum.setAttribute("style", "top: 0px");
      bottomNum.setAttribute("style", "bottom: 4px");
    }

    if (mapOptions.textOn) { //Add the text to the left of the color bar
      //Vibrant Noise div
      var vibrantNoisy = document.createElement("div");
      var vibrant = document.createTextNode("Vibrant,");
      var noisy = document.createTextNode("Noisy");
      var linebreak1 = document.createElement("br");
      vibrantNoisy.id = "AL-vibrantNoisy";
      vibrantNoisy.className = "AL-legendText";
      vibrantNoisy.appendChild(vibrant);
      vibrantNoisy.appendChild(linebreak1);
      vibrantNoisy.appendChild(noisy);
      legend.appendChild(vibrantNoisy);
      //Active Busy div
      var activeBusy = document.createElement("div");
      var active = document.createTextNode("Active,");
      var busy = document.createTextNode("Busy");
      var linebreak2 = document.createElement("br");
      activeBusy.id = "AL-activeBusy";
      activeBusy.className = "AL-legendText";
      activeBusy.appendChild(active);
      activeBusy.appendChild(linebreak2);
      activeBusy.appendChild(busy);
      legend.appendChild(activeBusy);
      //Quiet Calm div
      var quietCalm = document.createElement("div");
      var quiet = document.createTextNode("Quiet,");
      var calm = document.createTextNode("Calm");
      var linebreak3 = document.createElement("br");
      quietCalm.id = "AL-quietCalm";
      quietCalm.className = "AL-legendText";
      quietCalm.appendChild(quiet);
      quietCalm.appendChild(linebreak3);
      quietCalm.appendChild(calm);
      legend.appendChild(quietCalm);
      //Very Quiet div
      var veryQuiet = document.createElement("div");
      var very = document.createTextNode("Very");
      var quiet2 = document.createTextNode("Quiet");
      var linebreak4 = document.createElement("br");
      veryQuiet.id = "AL-veryQuiet";
      veryQuiet.className = "AL-legendText";
      veryQuiet.appendChild(very);
      veryQuiet.appendChild(linebreak4);
      veryQuiet.appendChild(quiet2);
      legend.appendChild(veryQuiet);

      //Adjust the text location based on horizontal
      if (mapOptions.horizontal) {
        vibrantNoisy.setAttribute('style', 'left: 0px; top: 28px');
        activeBusy.setAttribute('style', 'left: 30%; top: 28px');
        veryQuiet.setAttribute('style', 'right: -10px; top: 28px');
        quietCalm.setAttribute('style', 'left: 60%; top: 28px');
      } else {
        vibrantNoisy.setAttribute('style', 'left: -60px; top: 5px');
        activeBusy.setAttribute('style', 'top: 25%; left: -52px');
        veryQuiet.setAttribute('style', 'bottom: 5px; left: -50px');
        quietCalm.setAttribute('style', 'top: 55%; left: -50px');
      }
    }

    //Create the SVG element if you want the arrow;
    if (mapOptions.showArrow) {
      //Move the legend over to fit the arrow
      //Create the svg element
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.id = "AL-ArrowSVG";
      svg.width = 25;
      svg.height = 20;
      svg.setAttribute('stroke', '#000000');
      //Place the arrow on the scale
      //Set the score intervals
      var score_limits = [5, 7.8, 11, 14.1, 17.3, 20.4, 23.5, 26.7, 29.8, 32.5, 35.3, 38.4, 41.2, 45.1, 48.2, 51.3, 54.5, 57.6, 60.8, 63.9, 67.1, 70.2, 73.3, 76.5, 79.6, 82.7, 85.5, 87.8, 90.2, 92.2, 100.01];
      //Find where on the interval we are
      function getIndex(num) {
        return num > score;
      }
      var scoreIndex = score_limits.findIndex(getIndex)

      //Put the arrow in the right place based on the index
      var percent = scoreIndex / 30;
      var pix = 0;
      var arrowOffset = 0;

      //Create the polygon
      var scoreArrow = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      scoreArrow.id = "AL-scoreArrow";

      if (mapOptions.horizontal) {
        scoreArrow.setAttribute("points", "0,12 7,10 7,21 13,21 13,10 19,12 10,0");
        pix = Math.round(mapOptions.w * (1 - percent)) - 8;
        pix = Math.min(pix, mapOptions.w - 9);
        pix = Math.max(pix, -8);
        arrowOffset = "position: absolute; top: 10px; left:" + pix + "px;";
      } else {
        scoreArrow.setAttribute("points", "0,10 12,20 10,13 24,13 24,7 10,7 12,1");
        pix = Math.round(mapOptions.h * (1 - percent));
        pix = Math.min(pix, mapOptions.h + 9);
        pix = Math.max(pix, 0);
        arrowOffset = "position: absolute; top:" + pix + "px; left:23;";
      }

      svg.setAttribute('style', arrowOffset);
      legend.appendChild(svg);
      scoreArrow.setAttribute("style", "stroke-width:1");
      svg.appendChild(scoreArrow);
    } else { //No arrow - change the attributes accordingly
      if (!mapOptions.horizontal) legend.setAttribute("style", "left:-35px; top:-2px");
    }
  };

  ////////////////////////////////////////////////////////////////////////////////
  //This loads in OpenLayers, makes sure it is ready, and the loads in the map
  ////////////////////////////////////////////////////////////////////////////////
  function loadOL(lat, lng, score, mapOptions) {

    var done = false; //Flag to see if the js is loaded yet
    //Add the OL JS to the body
    var olScript = document.createElement('script');
    olScript.type = "text/javascript";
    olScript.src = "http://openlayers.org/en/v3.20.1/build/ol.js";
    olScript.onload = handleLoad;
    olScript.onreadystatechange = handleReadyStateChange;
    olScript.onerror = handleError;
    document.body.appendChild(olScript);

    //Wait until the JS has been loaded before building the map
    function handleLoad() {
      if (!done) {
        done = true;
        initMap(lat, lng, score, mapOptions);
      }
    }

    function handleReadyStateChange() {
      var state;
      if (!done) {
        state = olScript.readyState;
        if (state === "complete") {
          handleLoad();
        }
      }
    }

    function handleError() {
      if (!done) {
        done = true;
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  //This creates the map once OL has been loaded
  ////////////////////////////////////////////////////////////////////////////////
  function initMap(lat, lng, score, mapOptions) {

    var mapCenter = [lng, lat];

    var pos = ol.proj.fromLonLat(mapCenter);

    var extent = ol.proj.transformExtent([-131.209336, 20.542813, -63.084946, 53.592268], 'EPSG:4326', 'EPSG:3857');
    var center = ol.proj.transform(mapCenter, 'EPSG:4326', 'EPSG:3857');

    var overlay = new ol.layer.Tile({
      opacity: mapOptions.alpha,
      source: new ol.source.XYZ({
        urls: [
          'http://s3.amazonaws.com/16oct2017/ALmetric_20171015_rgb/{z}/{x}/{y}.png'
        ],
        extent: extent,
        minZoom: 2,
        maxZoom: 12,
        tilePixelRatio: 1
      })
    });

    var stamen = new ol.layer.Tile({
      source: new ol.source.Stamen({
        layer: 'toner-lite'
      })
    });

    var osm = new ol.layer.Tile({
      source: new ol.source.OSM()
    });

    var iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(pos)
    });

    if (mapOptions.showArrow) {
      var colors = ['004CA8', '1650AB', '2254AD', '2858B0', '325DB3', '3A61B5', '4267B8', '5070BD', '5D7AC2', '6D85C9', '7C91CF', '8C9CD4', '9EABDB', 'AFB9E0', 'BFC5E3', 'D1D5E8', 'E1E3ED', 'F5F4F2', 'FAF3DC', 'FAECB4', 'F7E68F', 'F2DE6B', 'EDD747', 'E8D41E', 'E0B61A', 'D99522', 'CF7425', 'C75828', 'BA3327', 'B00028'];
      var score_limits = [5, 7.8, 11, 14.1, 17.3, 20.4, 23.5, 26.7, 29.8, 32.5, 35.3, 38.4, 41.2, 45.1, 48.2, 51.3, 54.5, 57.6, 60.8, 63.9, 67.1, 70.2, 73.3, 76.5, 79.6, 82.7, 85.5, 87.8, 90.2, 92.2, 100.01];

      function getIndex(num) {
        return num > score;
      }

      var scoreIndex = score_limits.findIndex(getIndex) - 1
      var arrowColor = colors[Math.round(score_limits.findIndex(getIndex) - 1)];
      document.getElementById("AL-scoreArrow").setAttribute("fill", "#" + arrowColor);
    }
    var marker = "";
    if (mapOptions.showScore) {
      marker = "http://chart.apis.google.com/chart?chst=d_map_spin&chld=.67|0|eeeeee|14|b|" + Math.round(score);
    } else {
      marker = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    }

    var iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 30],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: marker
      })
    });

    iconFeature.setStyle(iconStyle);

    var vectorSource = new ol.source.Vector({
      features: [iconFeature]
    });

    var vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });

    var scaleWidth = 0;
    if (mapOptions.showScaleline) scaleWidth = Math.round(mapOptions.w * 0.25); //Turn on the scale line

    var scaleLineControl = new ol.control.ScaleLine({
      minWidth: scaleWidth,
      units: 'us'
    });

    var view = new ol.View({
      center: ol.proj.fromLonLat(mapCenter),
      minZoom: 10,
      maxZoom: 16,
      zoom: mapOptions.zoom,
    });

    var osmGroup = new ol.layer.Group({
      layers: [osm, overlay, vectorLayer]
    });

    var stamenGroup = new ol.layer.Group({
      layers: [stamen, overlay, vectorLayer]
    });

    var map = new ol.Map({
      //    layers: [osmGroup],
      target: document.getElementsByClassName(mapOptions.mapID)[0],
      controls: [scaleLineControl],
      view: view
    });

    if (mapOptions.bwMap) { //They want the simple stamen map
      map.setLayerGroup(stamenGroup);
    } else {
      map.setLayerGroup(osmGroup);
    }
  };

  function apiReq(url, callback) {
    // Create a XMLHttpRequest and execute callback returning error first and JSON data.
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.onload = function () {
      // If HTTP GET status OK or redirect.
      if (this.status >= 200 && this.status < 300) {
        // resolve(JSON.parse(xhr.responseText));
        callback(null, JSON.parse(xhr.responseText));
      } else {
        callback({
          status: this.status,
          statusText: xhr.statusText
        }, null);
      }
    };

    // Send error.
    xhr.onerror = function () {
      callback({
        status: this.status,
        statusText: xhr.statusText
      }, null);
    };

    xhr.send();
  }

  AmbientLogic.prototype = {
    details: {},

    build: function(callback) {
      var self = this;
      //Start by checking the default map options
      var mapOptions = {
        mapID: 'ambientLogic-89178', //Default map DIV ID
        h: 500, //Default height
        w: 500, //Default width
        textOn: true, //Default for text on legend
        showArrow: false, //Default for showing the score arrow
        showScore: true, //Default for showing the score in the marker
        showScaleline: true, //Default for showing the scale line
        showMap: true, //Default is to always show the map
        bwMap: false, //What map to show - options are OSM or stamen (black and white)
        zoom: 14, //Zoom level from 10(county scale), to 16 (address level)
        key: null, //No valid key is assumed
        address: null,  //No default address
        hotizontal: false,  //Default to a verticle color scale
        env: 'production',  //Default to production environment
        alpha: 0.5  //Default to a map alpha channel of 0.5
      };

      //Deal with the defaults here
      if (typeof(this.options) != 'undefined') {
        if (typeof(this.options.h) != 'undefined') mapOptions.h = this.options.h;
        if (typeof(this.options.w) != 'undefined') mapOptions.w = this.options.w;
        if (typeof(this.options.zoom) != 'undefined') mapOptions.zoom = this.options.zoom;
        if (typeof(this.options.bwMap) != 'undefined') mapOptions.bwMap = this.options.bwMap;
        if (typeof(this.options.textOn) != 'undefined') mapOptions.textOn = this.options.textOn;
        if (typeof(this.options.showArrow) != 'undefined') mapOptions.showArrow = this.options.showArrow;
        if (typeof(this.options.showScore) != 'undefined') mapOptions.showScore = this.options.showScore;
        if (typeof(this.options.showScaleline) != 'undefined') mapOptions.showScaleline = this.options.showScaleline;
        if (typeof(this.options.showMap) != 'undefined') mapOptions.showMap = this.options.showMap;
        if (typeof(this.options.mapID) != 'undefined') mapOptions.mapID = this.options.mapID;
        if (typeof(this.options.key) != 'undefined') mapOptions.key = this.options.key;
        if (typeof(this.options.address) != 'undefined') mapOptions.address = this.options.address;
        if (typeof(this.options.horizontal) != 'undefined') mapOptions.horizontal = this.options.horizontal;
        if (typeof(this.options.env) != 'undefined') mapOptions.env = this.options.env;
        if (typeof(this.options.alpha) != 'undefined') mapOptions.alpha = this.options.alpha;
      }

      //Hit up the node server for the key check and the rest

      //Build the API URL
      //var url = "http://geo.ambient-logic.com/address?key=" + mapOptions.key + "&address=" + mapOptions.address;
      var url;
      if (mapOptions.env == 'dev') {
        url = "http://localhost:3000/address?key=" + mapOptions.key + "&address=" + mapOptions.address;
      } else {
//        url = "http://ec2-54-237-228-147.compute-1.amazonaws.com:3000/address?key=" + mapOptions.key + "&address=" + mapOptions.address;
        url = "http://geo.ambient-logic.com/address?key=" + mapOptions.key + "&address=" + mapOptions.address;
      }


      // Use apiReq function to grab the data.
      apiReq(url, function(error, JSON_return) {
        if (error) {
          console.log('error:', error)
          callback(error, null);
        } else {
          self.details = buildMap(mapOptions, JSON_return)
                console.log(self.details);
          callback(null, self.details);
        }
      });
    },
  };

  AmbientLogic.init = function(options) {
    // Self points to the object created from calling "new AmbientLogic.init(options)".
    var self = this;
    self.options = options || {};
  }

  AmbientLogic.init.prototype = AmbientLogic.prototype;

  global.AmbientLogic = AmbientLogic;


  // Array pollyfil to allow findIndex to work in IE 11.
  // https://stackoverflow.com/questions/41938036/object-doesnt-support-property-or-method-findindex-ie11-javascript-issue
  if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
      value: function(predicate) {
       // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }

        var o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;

        // 3. If IsCallable(predicate) is false, throw a TypeError exception.
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }

        // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
        var thisArg = arguments[1];

        // 5. Let k be 0.
        var k = 0;

        // 6. Repeat, while k < len
        while (k < len) {
          // a. Let Pk be ! ToString(k).
          // b. Let kValue be ? Get(O, Pk).
          // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
          // d. If testResult is true, return k.
          var kValue = o[k];
          if (predicate.call(thisArg, kValue, k, o)) {
            return k;
          }
          // e. Increase k by 1.
          k++;
        }

        // 7. Return -1.
        return -1;
      }
    });
  }

}(window));
