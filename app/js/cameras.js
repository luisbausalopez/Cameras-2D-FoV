//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
////////////                                                                        //////////////////
////////////                              CAMERAS JS                                //////////////////
////////////                                                                        //////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////






///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////     createRequestUrl()    //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//  createRequestUrl() - creates the URL of the request to the 2D FoV service
function createRequestUrl(longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical) {
    var starttime = performance.now();
    console.log(performance.now() + ", createRequestUrl(), START: " + starttime + '\n');
    
    // var baseurl = "api/camera/fieldofviewactual?";
    var baseurl = "/service/cams/camera/fieldofviewactual?";
    var requesturl = baseurl + "terrainheight=" + "0";  // Terrain height from sea level (meters)
    requesturl = requesturl + "&sensorwidth=" + sensorwidth;    // Sensor width (meters)
    requesturl = requesturl + "&verticalresolution=" + resolutionvertical;  // Vertical resolution (pixels)
    requesturl = requesturl + "&focallength=" + focallength;    // Focal length (meters)
    requesturl = requesturl + "&longitude=" + longitude;    // Longitude of the camera (decimal coordinates)
    requesturl = requesturl + "&latitude=" + latitude;  // Latitude of the camera (decimal coordinates)
    requesturl = requesturl + "&cameraheight=" + "3";   // Height of the camera from ground (meters)
    requesturl = requesturl + "&insrs=" + "4326";   // Input reference system. Default 4326
    requesturl = requesturl + "&outsrs=" + "4326";  // Output reference system. Default 4326
    requesturl = requesturl + "&zoned=" + "true";   // Bool, true returns FoV divided in I, R, D, M&C and visible, false returns M&C & visible
    requesturl = requesturl + "&rotation=" + rotation;  // Azimuth: Rotation angle from north (degrees)
    console.log(performance.now() + ", createRequestUrl(), Request URL: " + requesturl + '\n');
    
    var endtime = performance.now();
    var totaltime = endtime - starttime;
    console.log(performance.now() + ", createRequestUrl(), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n');
    
    return requesturl;
}



///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////         getFovs()         //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//  getFovs - performs a request to the 2D FoV service and adds the response FoV polygons to the map
function getFovs(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical, layers) {
    var starttime = performance.now();
    console.log(performance.now() + ", addFov(" + cameraid + "), START: " + starttime + '\n');

    // get 2D FoV Service request URL
    var fovreq = createRequestUrl(longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical);
    console.log(performance.now() + ", addFov(" + cameraid + "), Request URL: " + fovreq + '\n');
    
    var result = {};
        
    var fovStyles = {
        identification: {
            color: 'red', 
            weight: 5, 
            fillOpacity: 0.7, 
            opacity: 0.1
        },
        recognition: {
            color: 'pink', 
            weight: 4, 
            fillOpacity: 0.6, 
            opacity: 0.1
        },
        detection: {
            color: 'orange', 
            weight: 3, 
            fillOpacity: 0.5, 
            opacity: 0.1
        },
        monitor: {
            color: 'yellow', 
            weight: 2, 
            fillOpacity: 0.4, 
            opacity: 0.1
        },
        visible: {
            color: 'green', 
            weight: 1, 
            fillOpacity: 0.3, 
            opacity: 0.1
        }
    };
    
    // Perform request to 2D FoV Service
    $.getJSON(fovreq, function (data) {
        // get FoV features
        var fovFeatures = [ 
                data.features[0],   // Monitor & Control area
                data.features[1],   // Detection area
                data.features[2],   // Recognition area
                data.features[3]   // Identification area
            ];
        if (data.features[4] != null) { fovFeatures[4] = data.features[4]; }   // Visible area
        
        // Create FoV popups
        var fovpopups = [
            getFovPopup(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical, "Monitor & Control"),
            getFovPopup(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical, "Detection"),
            getFovPopup(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical, "Recognition"),
            getFovPopup(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical, "Identification"),
            getFovPopup(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical, "Visible")
        ];
//        var fovpopups = getFovPopups(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical);
//        var fovpopups = getFovPopups(camera);
//        var fovpopups = fovPopupTemplate();
        
        // Enrich FoV features with camera specifications
//        for (var i = 0; i < data.features.length; i++) {
        for (var i = 0; i < fovFeatures.length; i++) {
            if ( (data.features[i] != null) && (fovFeatures[i] != null) ) { 
                fovFeatures[i].popupTemplate = fovpopups[i];
                fovFeatures[i].properties.popupContent = fovpopups[i]; 
                fovFeatures[i].crs = 4326;
                fovFeatures[i].geometry.crs = 4326;
                fovFeatures[i].properties.crs = 4326;
                fovFeatures[i].properties.cameraid = cameraid;
                fovFeatures[i].properties.latitude = latitude;
                fovFeatures[i].properties.longitude = longitude;
                fovFeatures[i].properties.rotation = rotation;
                fovFeatures[i].properties.focallength = focallength;
                fovFeatures[i].properties.resolutionvert = resolutionvertical;
                fovFeatures[i].properties.sensorwidth = sensorwidth;
                fovFeatures[i].properties.featuretype = "FoV";
                
                switch (fovFeatures[i].properties.zone) {
                    case "Monitoring":
                        fovFeatures[i].properties.fovtype = "Monitor & Control";
                        break;
                    case "Detection":
                        fovFeatures[i].properties.fovtype = "Detection";
                        break;
                    case "Recognition":
                        fovFeatures[i].properties.fovtype = "Recognition";
                        break;
                    case "Identification":
                        fovFeatures[i].properties.fovtype = "Identification";
                        break;
                    case "Visible":
                        fovFeatures[i].properties.fovtype = "Visible";
                        break;
                    default:
                        fovFeatures[i].properties.fovtype = "ERROR";
                        break;
                }   // END SWITCH
                
            }   // END IF
            
        }   // END FOR

        // Create GeoJSON FoV layer features, bind popups and add them to FoV layers
        // monitor
//        result.monitor = L.geoJson.css(fovFeatures[0], { color: 'yellow', weight: 2, fillOpacity: 0.4, opacity: 0.1 });
        result.monitor = L.geoJson.css(fovFeatures[0], fovStyles.monitor);
        result.monitor.bindPopup(fovFeatures[0].properties.popupContent);
        result.monitor.addTo(layers.monitor);
        // detection
//        result.detection = L.geoJson.css(fovFeatures[1], { color: 'orange', weight: 3, fillOpacity: 0.5, opacity: 0.1 });
        result.detection = L.geoJson.css(fovFeatures[1], fovStyles.detection);
        result.detection.bindPopup(fovFeatures[1].properties.popupContent);
        result.detection.addTo(layers.detection);
        // recognition
//        result.recognition = L.geoJson.css(fovFeatures[2], { color: 'pink', weight: 4, fillOpacity: 0.6, opacity: 0.1 });
        result.recognition = L.geoJson.css(fovFeatures[2], fovStyles.recognition);
        result.recognition.bindPopup(fovFeatures[2].properties.popupContent);
        result.recognition.addTo(layers.recognition);
        // identification
//        result.identification = L.geoJson.css(fovFeatures[3], { color: 'red', weight: 5, fillOpacity: 0.7, opacity: 0.1 });
        result.identification = L.geoJson.css(fovFeatures[3], fovStyles.identification);
        result.identification.bindPopup(fovFeatures[3].properties.popupContent);
        result.identification.addTo(layers.identification);
        // visible
        if (data.features[4] != null) {
//            result.visible = L.geoJson.css(fovFeatures[4], { color: 'green', weight: 1, fillOpacity: 0.3, opacity: 0.1 });
            result.visible = L.geoJson.css(fovFeatures[4], fovStyles.visible);
            result.visible.bindPopup(fovFeatures[4].properties.popupContent);
            result.visible.addTo(layers.visible);
        }
        
        // some variables for logging, tracking and debug
            console.log(performance.now() + ", addFov() " + cameraid + " M&C: " + fovFeatures[0] + ", Popup: " + fovpopups[0] +'\n');
            console.log(fovFeatures[0]);
            console.log(result.monitor);
            console.log(performance.now() + ", addFov() " + cameraid + " Detec: " + fovFeatures[1] + ", Popup: " + fovpopups[1] +'\n');
            console.log(fovFeatures[1]);
            console.log(result.detection);
            console.log(performance.now() + ", addFov() " + cameraid + " Recog: " + fovFeatures[2] + ", Popup: " + fovpopups[2] +'\n');
            console.log(fovFeatures[2]);
            console.log(result.recognition);
            console.log(performance.now() + ", addFov() " + cameraid + " Ident: " + fovFeatures[3] + ", Popup: " + fovpopups[3] +'\n');
            console.log(fovFeatures[3]);
            console.log(result.identification);
        if (data.features[4] != null) { 
            console.log(performance.now() + ", addFov() " + cameraid + " Visib: " + fovFeatures[4] + ", Popup: " + fovpopups[4] +'\n');
            console.log(fovFeatures[4]);
            console.log(result.visible);
        }
        
    }); // END $.GetJSON
    
    // some variables for logging, tracking and debug
    console.log(result);
    var endtime = performance.now();
    var totaltime = endtime - starttime;
    console.log(performance.now() + ", addFov(" + cameraid + "), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n');
    
    return result;
}       // END getFovs()



///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////       getFovPopup()       //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//  getFovPopup() - Returns a popup with the camera attributes 
function getFovPopup (cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical, fovtype) {
    // some variables for logging, tracking and debug
    var starttime = performance.now();
    console.log(performance.now() + ", fovPopupTemplate(), START: " + starttime + '\n');
    
    // Create Camera popup template
//    var fovPopup = "<h3 style='background-color:lightblue; text-align:center;'>{fovtype} FoV of <b>{cameraid}</b></h3><ln><table><tr><td><label>Camera ID: </label></td><td><input value='{cameraid}'></input></td></tr><tr><td><label>FoV type: </label></td><td><input value='{fovtype}'></input></td></tr><tr><td><label>Latitude: </label></td><td><input value='{latitude}'></input></td></tr><tr><td><label>Longitude: </label></td><td><input value='{longitude}'></input></td></tr><tr><td><label>Rotation: </label></td><td><input value='{rotation}'>dg</input></td></tr><tr><td><label>Current Focal length: </label></td><td><input value='{focallength}'>m</input></td></tr><tr><td><label>Sensor width: </label></td><td><input value='{sensorwidth}'>m</input></td></tr><tr><td><label>Vertical resolution: </label></td><td><input value='{resolutionvert}'>px</input></td></tr></table>";
    
    var fovPopup = "<div class='popup'><h3 style='background-color:lightblue; text-align:center;'>" + fovtype + " FoV of <b>" + cameraid + "</b></h3><ln>";    // Popup header
    fovPopup = fovPopup + "<table><tr><td><label>Camera ID: </label></td><td><input value='" + cameraid + "'></input></td></tr>";    // Camera ID
    fovPopup = fovPopup + "<tr><td><label>FoV type: </label></td><td><input value='" + fovtype + "'></input></td></tr>";    // FoV Type
    fovPopup = fovPopup + "<tr><td><label>Latitude: </label></td><td><input value='" + latitude + "'></input></td></tr>";    // Camera location - latitude 
    fovPopup = fovPopup + "<tr><td><label>Longitude: </label></td><td><input value='" + longitude + "'></input></td></tr>";    // Camera location - longitude
    fovPopup = fovPopup + "<tr><td><label>Rotation: </label></td><td><input value='" + rotation + "'>dg</input></td></tr>";    // Camera location - rotation (azimuth)
    fovPopup = fovPopup + "<tr><td><label>Current Focal length: </label></td><td><input value='" + focallength * 1000 + "'>mm</input></td></tr>";    // Current focal length
    fovPopup = fovPopup + "<tr><td><label>Sensor width: </label></td><td><input value='" + sensorwidth * 1000 + "'>mm</input></td></tr>";    // Sensor width
    fovPopup = fovPopup + "<tr><td><label>Vertical resolution: </label></td><td><input value='" + resolutionvertical + "'>px</input></td></tr></table></div>";    // Sensor resolution vertical (rows)
    
    console.log(performance.now() + ", fovPopupTemplate(), Popup: " + fovPopup);
    
    // some variables for logging, tracking and debug
    var endtime = performance.now();
    var totaltime = endtime - starttime;
    console.log(performance.now() + ", fovPopupTemplate(), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n');
    
    return fovPopup;
}        // END getFovPopup()



///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////    fovPopupTemplate()     //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//  fovPopupTemplate() - Returns a popup with the camera attributes 
function fovPopupTemplate () {
    // some variables for logging, tracking and debug
    var starttime = performance.now();
    console.log(performance.now() + ", fovPopupTemplate(), START: " + starttime + '\n');
    
    // Create Camera popup template
//    var fovPopup = "<div class='popup'><h3 style='background-color:lightblue; text-align:center;'>{fovtype} FoV of <b>{cameraid}</b></h3><ln><table><tr><td><label>Camera ID: </label></td><td><input value='{cameraid}'></input></td></tr><tr><td><label>FoV type: </label></td><td><input value='{fovtype}'></input></td></tr><tr><td><label>Latitude: </label></td><td><input value='{latitude}'></input></td></tr><tr><td><label>Longitude: </label></td><td><input value='{longitude}'></input></td></tr><tr><td><label>Rotation: </label></td><td><input value='{rotation}'>dg</input></td></tr><tr><td><label>Current Focal length: </label></td><td><input value='{focallength}'>m</input></td></tr><tr><td><label>Sensor width: </label></td><td><input value='{sensorwidth}'>m</input></td></tr><tr><td><label>Vertical resolution: </label></td><td><input value='{resolutionvert}'>px</input></td></tr></table></div>";
    var fovPopup = "<div class='popup'><h3 style='background-color:lightblue; text-align:center;'>{fovtype} FoV of <b>{cameraid}</b></h3><ln>";    // Popup header
    fovPopup = fovPopup + "<table><tr><td><label>Camera ID: </label></td><td><input value='{cameraid}'></input></td></tr>";    // Camera ID
    fovPopup = fovPopup + "<tr><td><label>FoV type: </label></td><td><input value='{fovtype}'></input></td></tr>";    // FoV Type
    fovPopup = fovPopup + "<tr><td><label>Latitude: </label></td><td><input value='{latitude}'></input></td></tr>";    // Camera location - latitude 
    fovPopup = fovPopup + "<tr><td><label>Longitude: </label></td><td><input value='{longitude}'></input></td></tr>";    // Camera location - longitude
    fovPopup = fovPopup + "<tr><td><label>Rotation: </label></td><td><input value='{rotation}'>dg</input></td></tr>";    // Camera location - rotation (azimuth)
    fovPopup = fovPopup + "<tr><td><label>Current Focal length: </label></td><td><input value='{focallength}'>m</input></td></tr>";    // Current focal length
    fovPopup = fovPopup + "<tr><td><label>Sensor width: </label></td><td><input value='{sensorwidth}'>m</input></td></tr>";    // Sensor width
    fovPopup = fovPopup + "<tr><td><label>Vertical resolution: </label></td><td><input value='{resolutionvert}'>px</input></td></tr></table></div>";    // Sensor resolution vertical (rows)
    console.log(performance.now() + ", fovPopupTemplate(), Popup: " + fovPopup);
    
    // some variables for logging, tracking and debug
    var endtime = performance.now();
    var totaltime = endtime - starttime;
    console.log(performance.now() + ", fovPopupTemplate(), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n');
    
    return fovPopup;
}        // END fovPopupTemplate()



///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////   createGeoJsonCamera()   //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//  createGeoJsonCamera() - Returns a GeoJSON Point Feature created from the camera attributes 
function createGeoJsonCamera (id, name, camtype, cammodel, cambrand, camregion, camarea, lat, lon, rot, foclen, fldef, flmax, flmin, sh, sw, srv, srh) {
    // some variables for logging, tracking and debug
    var starttime = performance.now();
    console.log(performance.now() + ", createGeoJsonCamera(" + id + "), START: " + starttime + '\n');
    
    // Camera popup
    var camPopup = createCameraPopup (id, name, camtype, cammodel, cambrand, camregion, camarea, lat, lon, rot, foclen, fldef, flmax, flmin, sh, sw, srv, srh);
    var camPopupTemplate = cameraPopupTemplate();
    var camTitle = "<div class='hovertitle'>"+"<strong>"+id+"</strong> ("+camtype+")"+"</div>";
    
    // Camera GeoJSON
    var gjcam = {
        "type": "Feature",
        "properties": {
            "featuretype": "Camera",
            "name": name,
            "id": id,
            "camtype": camtype,
            "brand": cambrand,
            "model": cammodel,
            "region": camregion,
            "area": camarea,
            "latitude": lat,
            "longitude": lon,
            "rotation": rot,
            "focallength": foclen,
            "fldef": fldef,
            "flmax": flmax,
            "flmin": flmin,
            "sensorheight": sh,
            "sensorwidth": sw,
            "resvert": srv,
            "reshor": srh,
            "popupContent": camPopup
        },
        "geometry": {
            "type": "Point",
            "crs": 4326,
            "coordinates": [lon, lat]
        },
        style: {
            "icon": {
                "iconUrl": 'img/camera.png',
                "iconSize": [18, 18],
                "iconAnchor": [9, 9]
            }
        },
        title: camTitle,
        popupTemplate: camPopupTemplate
    };
    
    // some variables for logging, tracking and debug
    console.log(performance.now() + ", createGeoJsonCamera(" + id + "), Popup: " + camPopup);
    console.log(performance.now() + ", createGeoJsonCamera(" + id + "), Popup Template: " + camPopupTemplate);
    
    console.log('gjcam');console.log(gjcam);
    
    var endtime = performance.now();
    var totaltime = endtime - starttime;
    console.log(performance.now() + ", createGeoJsonCamera(" + id + "), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n');
    
    return gjcam;
}        // END createGeoJsonCamera



///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////   cameraPopupTemplate()   //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//  cameraPopupTemplate() - Returns a popup with the camera attributes 
function cameraPopupTemplate () {
    // some variables for logging, tracking and debug
    var starttime = performance.now();
    console.log(performance.now() + ", cameraPopupTemplate(), START: " + starttime + '\n');
    
    // Create Camera popup template
    var camPopup = "<div class='popup'><h3 style='background-color:lightblue; text-align:center;'>DITSS Camera <b>{id}</b></h3><ln><br>";    // Popup header
    camPopup = camPopup + "<table><tr><td><label>ID: </label></td><td><input value='{id}'></input></td></tr>";    // Camera ID
    camPopup = camPopup + "<tr><td><label>Camera type: </label></td><td><input value='{camtype}'></input></td></tr>";    // Camera Type
    camPopup = camPopup + "<tr><td><label>Brand: </label></td><td><input value='{brand}'></input></td></tr>";    // Camera Brand
    camPopup = camPopup + "<tr><td><label>Model: </label></td><td><input value='{model}'></input></td></tr>";    // Camera Model
    camPopup = camPopup + "<tr><td><label>Region: </label></td><td><input value='{region}'></input></td></tr>";    // Camera Region
    camPopup = camPopup + "<tr><td><label>Area: </label></td><td><input value='{area}'></input></td></tr>";    // Camera Area
    camPopup = camPopup + "<tr><td><label>Latitude: </label></td><td><input value='{latitude}'></input></td></tr>";    // Camera location - latitude 
    camPopup = camPopup + "<tr><td><label>Longitude: </label></td><td><input value='{longitude}'></input></td></tr>";    // Camera location - longitude
    camPopup = camPopup + "<tr><td><label>Rotation: </label></td><td><input value='{rotation}'>dg</input></td></tr>";    // Camera location - rotation (azimuth)
    camPopup = camPopup + "<tr><td><label>Focal length (now): </label></td><td><input value='{focallength}'>m</input></td></tr>";    // Camera specs - focal length (current)
    camPopup = camPopup + "<tr><td><label>Focal length (max): </label></td><td><input value='{flmax}'>m</input></td></tr>";    // Camera specs - focal length (max)
    camPopup = camPopup + "<tr><td><label>Focal length (min): </label></td><td><input value='{flmin}'>m</input></td></tr>";    // Camera specs - focal length (min)
    camPopup = camPopup + "<tr><td><label>Focal length (def): </label></td><td><input value='{fldef}'>m</input></td></tr>";    // Camera specs - focal length (default)
    camPopup = camPopup + "<tr><td><label>Sensor height: </label></td><td><input value='{sensorheight}'>m</input></td></tr>";    // Camera specs - sensor dimensions - height
    camPopup = camPopup + "<tr><td><label>Sensor width: </label></td><td><input value='{sensorwidth}'>m</input></td></tr>";    // Camera specs - sensor dimensions - width
    camPopup = camPopup + "<tr><td><label>Horizontal resolution: </label></td><td><input value='{reshor}'>px</input></td></tr>";    // Camera specs - sensor resolution - horizontal (columns)
    camPopup = camPopup + "<tr><td><label>Vertical resolution: </label></td><td><input value='{resvert}'>px</input></td></tr></table></div>";    // Camera specs - sensor resolution - vertical (rows)
    console.log(performance.now() + ", cameraPopupTemplate(), Popup: " + camPopup);
    
    // some variables for logging, tracking and debug
    var endtime = performance.now();
    var totaltime = endtime - starttime;
    console.log(performance.now() + ", cameraPopupTemplate(), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n');
    
    return camPopup;
}        // END cameraPopupTemplate()



///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////    createCameraPopup()    //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//  createCameraPopup() - Returns a popup with the camera attributes 
function createCameraPopup (id, name, camtype, cammodel, cambrand, camregion, camarea, lat, lon, rot, foclen, fldef, flmax, flmin, sh, sw, srv, srh) {
    // some variables for logging, tracking and debug
    var starttime = performance.now();
    console.log(performance.now() + ", createCameraPopup(" + id + "), START: " + starttime + '\n');
    
    // Create Camera popup
    var camPopup = "<div class='popup'><h3 style='background-color:lightblue; text-align:center;'>DITSS Camera <b>" + id + "</b></h3><ln>";    // Popup header
    camPopup = camPopup + "<table><tr><td><label>ID: </label></td><td><input value='" + id + "'></input></td></tr>";    // Camera ID
    camPopup = camPopup + "<tr><td><label>Camera type: </label></td><td><input value='" + camtype + "'></input></td></tr>";    // Camera Type
    camPopup = camPopup + "<tr><td><label>Brand: </label></td><td><input value='" + cambrand + "'></input></td></tr>";    // Camera Brand
    camPopup = camPopup + "<tr><td><label>Model: </label></td><td><input value='" + cammodel + "'></input></td></tr>";    // Camera Model
    camPopup = camPopup + "<tr><td><label>Region: </label></td><td><input value='" + camregion + "'></input></td></tr>";    // Camera Region
    camPopup = camPopup + "<tr><td><label>Area: </label></td><td><input value='" + camarea + "'></input></td></tr>";    // Camera Area
    camPopup = camPopup + "<tr><td><label>Latitude: </label></td><td><input value='" + lat + "'></input></td></tr>";    // Camera location - latitude 
    camPopup = camPopup + "<tr><td><label>Longitude: </label></td><td><input value='" + lon + "'></input></td></tr>";    // Camera location - longitude
    camPopup = camPopup + "<tr><td><label>Rotation: </label></td><td><input value='" + rot + "'>dg</input></td></tr>";    // Camera location - rotation (azimuth)
    camPopup = camPopup + "<tr><td><label>Focal length (now): </label></td><td><input value='" + foclen * 1000 + "'>mm</input></td></tr>";    // Camera specs - focal length (current)
    camPopup = camPopup + "<tr><td><label>Focal length (max): </label></td><td><input value='" + flmax * 1000 + "'>mm</input></td></tr>";    // Camera specs - focal length (max)
    camPopup = camPopup + "<tr><td><label>Focal length (min): </label></td><td><input value='" + flmin * 1000 + "'>mm</input></td></tr>";    // Camera specs - focal length (min)
//    camPopup = camPopup + "<tr><td><label>Focal length (def): </label></td><td><input value='" + fldef * 1000 + "'>mm</input></td></tr>";    // Camera specs - focal length (default)
    camPopup = camPopup + "<tr><td><label>Sensor height: </label></td><td><input value='" + sh * 1000 + "'>mm</input></td></tr>";    // Camera specs - sensor dimensions - height
    camPopup = camPopup + "<tr><td><label>Sensor width: </label></td><td><input value='" + sw * 1000 + "'>mm</input></td></tr>";    // Camera specs - sensor dimensions - width
    camPopup = camPopup + "<tr><td><label>Horizontal resolution: </label></td><td><input value='" + srh + "'>px</input></td></tr>";    // Camera specs - sensor resolution - horizontal (columns)
    camPopup = camPopup + "<tr><td><label>Vertical resolution: </label></td><td><input value='" + srv + "'>px</input></td></tr></table></div>";    // Camera specs - sensor resolution - vertical (rows)
    console.log(performance.now() + ", createCameraPopup(" + id + "), Popup: " + camPopup);
    
    // some variables for logging, tracking and debug
    var endtime = performance.now();
    var totaltime = endtime - starttime;
    console.log(performance.now() + ", createCameraPopup(" + id + "), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n');
    
    return camPopup;
}        // END createCameraPopup




///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////        getCams2()         //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
// getCams2() - get cameras and their FoVs and adds them to the map
function getCams2(camsUrl, camlay, fovlay) {
    // some variables for logging, tracking and debug
    var starttime = performance.now();
    console.log(performance.now() + ", getCams2(" + camsUrl + "), START: " + starttime + '\n');
    var mycamerasjson = [];
    var mycamerasgeojson = [];
    var myfovs = [];
    
    var camerasLayerClustered = camlay;  // Cameras Layer
    var fovLayers = fovlay;     // FoV layers: identification, recognition, detection, monitor, visible
    
    // get Cameras
    $.getJSON(camsUrl, function (data) { 
        for (var i = 0; i < data.length; i++) {     // for each camera
            var time0 = performance.now();
            console.log(performance.now() + ", getCams2(), $.getJSON(), Camera: " + data[i].Camera_ID);
            
            // Get Camera Attributes
            var lon = data[i].Longitude,
                lat = data[i].Latitude,
                id = data[i].Camera_ID,
                name = data[i].Camera_Type + " - " + id,
                camtype = data[i].Camera_Type,
                rot = Math.floor(Math.random() * (360 - 0)) + 0, //random rotation 0-360
                fldef = data[i].FocalLengthDefault,
                flmin = data[i].FocalLengthMin,
                flmax = data[i].FocalLengthMax,
                foclen = Math.random() * (flmax - flmin) + flmin, // random focal length
                foclen2 = (flmax + flmin*7)/8, // smaller random focal length
                sh = data[i].SensorSizeHeight,
                sw = data[i].SensorSizeWidth,
                srv = data[i].SensorResolutionVertical,
                srh = data[i].SensorResolutionHorizontal,
                cambrand = data[i].Brand,
                cammodel = data[i].Model,
                camarea = data[i].Area,
                camregion = data[i].Region,
                camerastyle = {
                    "icon": {
                        "iconUrl": 'img/camera.png',
                        "iconSize": [18, 18],
                        "iconAnchor": [9, 9]
                    }
                };
//            var campopuptemplate = "{popupContent}";
//            var campopuptemplate = "{camtype} - <strong>{id}</strong>";
//            var campopuptemplate = cameraPopupTemplate();
            
            // Create GeoJSON Camera feature
            var cameraGeoJSONFeature = createGeoJsonCamera(id, name, camtype, cammodel, cambrand, camregion, camarea, lat, lon, rot, foclen, fldef, flmax, flmin, sh, sw, srv, srh);
            
            var time1 = performance.now();
            
            // Add Camera to layer
            var cam = L.geoJson.css(cameraGeoJSONFeature);
            cam.addTo(camerasLayerClustered);
//            cam.addTo(camlay);
            
            var time2 = performance.now();
            
            // get FoVs GeoJSON
//            var fieldsofview = getFovs(id, lon, lat, rot, foclen2, sh, srv, fovlay);
            var fieldsofview = getFovs(id, lon, lat, rot, foclen2, sh, srv, fovLayers);
            
            mycamerasjson[mycamerasjson.length] = data[i];
            mycamerasgeojson[mycamerasgeojson.length] = cameraGeoJSONFeature;
            myfovs[myfovs.length] = fieldsofview;
            
            var time3 = performance.now();
            var time01 = time1 - time0;
            console.log(performance.now() + ", Cam: " + data[i].Camera_ID + ", T01: " + time01 + '\n');
            var time12 = time2 - time1;
            console.log(performance.now() + ", Cam: " + data[i].Camera_ID + ", T12: " + time12 + '\n');
            var time23 = time3 - time2;
            console.log(performance.now() + ", Cam: " + data[i].Camera_ID + ", T23: " + time23 + '\n');
            var time13 = time3 - time1;
            console.log(performance.now() + ", Cam: " + data[i].Camera_ID + ", T13: " + time13 + '\n');
            var time03 = time3 - time0;
            console.log(performance.now() + ", Cam: " + data[i].Camera_ID + ", T03: " + time03 + '\n');
            console.log(performance.now() + ", data[i]" + '\n');
            console.log(data[i]);
            console.log(performance.now() + ", mycamerasjson[mycamerasjson.length-1]" + '\n');
            console.log(mycamerasjson[mycamerasjson.length-1]);
            console.log(performance.now() + ", cameraGeoJSONFeature" + '\n');
            console.log(cameraGeoJSONFeature);
            console.log(performance.now() + ", mycamerasgeojson[mycamerasgeojson.length-1]" + '\n');
            console.log(mycamerasgeojson[mycamerasgeojson.length-1]);
            console.log(performance.now() + ", mycamerasjson" + '\n');
            console.log(mycamerasjson);
            console.log(performance.now() + ", mycamerasgeojson" + '\n');
            console.log(mycamerasgeojson);
            console.log(performance.now() + ", cam" + '\n');
            console.log(cam);
            console.log(performance.now() + ", camerasLayerClustered" + '\n');
            console.log(camerasLayerClustered);
            console.log(performance.now() + ", fieldsofview" + '\n');
            console.log(fieldsofview);
            console.log(performance.now() + ", myfovs[myfovs.length-1]" + '\n');
            console.log(myfovs[myfovs.length-1]);
            console.log(performance.now() + ", myfovs" + '\n');
            console.log(myfovs);
        }       // END FOR
        console.log("END FOR \n\n\n\n\n\n camerasLayerClustered \n mycamerasjson \n mycamerasgeojson \n");
        console.log(camerasLayerClustered);
        console.log(mycamerasjson);
        console.log(mycamerasgeojson);
    });     // END getJSON
    console.log("END getJSON\n\n\n\n\n\n\n");
    console.log("camerasLayerClustered");
    console.log(camerasLayerClustered);
    console.log("mycamerasjson");
    console.log(mycamerasjson);
    console.log("mycamerasgeojson");
    console.log(mycamerasgeojson);
    console.log("fovlay");
    console.log(fovlay);
    
    var endtime = performance.now();
    var totaltime = endtime - starttime;
    console.log(performance.now() + ", getCams2(" + camsUrl + "), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n');
}       // END getCams2





///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////        getCams3()         //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
// getCams3() - get cameras and their FoVs and adds them to the map
function getCams3(camsUrl, camlay, fovlay) {
    // some variables for logging, tracking and debug
    var starttime = performance.now();
    console.log(performance.now() + ", getCams3(" + camsUrl + "), START: " + starttime + '\n');
    var mycamerasjson = [];
    var mycamerasgeojson = [];
    var myfovs = [];
    
    var camerasLayer = camlay;  // Cameras Layer
    var fovLayers = fovlay;     // FoV layers: identification, recognition, detection, monitor, visible
    
//    camerasLayer.on('layeradd', function(e) {
//        
////        alert(e.layer);
//        console.log("\n\n\ LAYERADD n\n\n\n camerasLayer \n\n\n\n\n\n");
//        console.log(e.layer);
//        var caml = e.layer;
//        console.log(caml);
//        
//    });
    
    // get Cameras
    $.getJSON(camsUrl, function (data) { 
        for (var i = 0; i < data.length; i++) {     // for each camera
            var time0 = performance.now();
            console.log(performance.now() + ", getCams3(), $.getJSON(), Camera: " + data[i].Camera_ID);
            
            // Get Camera Attributes
            var lon = data[i].Longitude,
                lat = data[i].Latitude,
                id = data[i].Camera_ID,
                name = data[i].Camera_Type + " - " + id,
                camtype = data[i].Camera_Type,
                rot = Math.floor(Math.random() * (360 - 0)) + 0, //random rotation 0-360
                fldef = data[i].FocalLengthDefault,
                flmin = data[i].FocalLengthMin,
                flmax = data[i].FocalLengthMax,
                foclen = Math.random() * (flmax - flmin) + flmin, // random focal length
                foclen2 = (flmax + flmin*7)/8, // smaller random focal length
                sh = data[i].SensorSizeHeight,
                sw = data[i].SensorSizeWidth,
                srv = data[i].SensorResolutionVertical,
                srh = data[i].SensorResolutionHorizontal,
                cambrand = data[i].Brand,
                cammodel = data[i].Model,
                camarea = data[i].Area,
                camregion = data[i].Region,
                camerastyle = {
                    "icon": {
                        "iconUrl": 'img/camera.png',
                        "iconSize": [18, 18],
                        "iconAnchor": [9, 9]
                    }
                };
//            var campopuptemplate = "{popupContent}";
            
            // Create GeoJSON Camera feature
            var cameraGeoJSONFeature = createGeoJsonCamera(id, name, camtype, cammodel, cambrand, camregion, camarea, lat, lon, rot, foclen, fldef, flmax, flmin, sh, sw, srv, srh);
            
            var time1 = performance.now();
            
            // Add Camera to map
            var cam = L.geoJson.css(cameraGeoJSONFeature);
            cam.addTo(camerasLayer);
//            cam.addTo(camlay);
            
            var time2 = performance.now();
            
            // get FoVs GeoJSON
//            var fieldsofview = getFovs(id, lon, lat, rot, foclen2, sh, srv, fovlay);
            var fieldsofview = getFovs(id, lon, lat, rot, foclen2, sh, srv, fovLayers);
            
            var mycamerasjsonindex = mycamerasjson.length;
            mycamerasjson[mycamerasjsonindex] = data[i];
//            mycamerasjson[mycamerasjson.length] = data[i];
            var mycamerasgeojsonindex = mycamerasgeojson.length;
            mycamerasgeojson[mycamerasgeojsonindex] = cameraGeoJSONFeature;
//            mycamerasgeojson[mycamerasgeojson.length] = cameraGeoJSONFeature;
            var myfovsindex = myfovs.length;
            myfovs[myfovsindex] = fieldsofview;
//            myfovs[myfovs.length] = fieldsofview;
            
            var time3 = performance.now();
            var time01 = time1 - time0;
            console.log(performance.now() + ", Cam: " + data[i].Camera_ID + ", T01: " + time01 + '\n');
            var time12 = time2 - time1;
            console.log(performance.now() + ", Cam: " + data[i].Camera_ID + ", T12: " + time12 + '\n');
            var time23 = time3 - time2;
            console.log(performance.now() + ", Cam: " + data[i].Camera_ID + ", T23: " + time23 + '\n');
            var time13 = time3 - time1;
            console.log(performance.now() + ", Cam: " + data[i].Camera_ID + ", T13: " + time13 + '\n');
            var time03 = time3 - time0;
            console.log(performance.now() + ", Cam: " + data[i].Camera_ID + ", T03: " + time03 + '\n');
            
            console.log(performance.now() + ", data[i]" + '\n');console.log(data[i]);
            console.log(performance.now() + ", mycamerasjson[mycamerasjsonindex]" + '\n');console.log(mycamerasjson[mycamerasjsonindex]);
            console.log(performance.now() + ", cameraGeoJSONFeature" + '\n');console.log(cameraGeoJSONFeature);
            console.log(performance.now() + ", mycamerasgeojson[mycamerasgeojsonindex]" + '\n');console.log(mycamerasgeojson[mycamerasgeojsonindex]);
            console.log(performance.now() + ", mycamerasjson" + '\n');console.log(mycamerasjson);
            console.log(performance.now() + ", mycamerasgeojson" + '\n');console.log(mycamerasgeojson);
            console.log(performance.now() + ", cam" + '\n');console.log(cam);
            console.log(performance.now() + ", camerasLayer" + '\n');console.log(camerasLayer);
            console.log(performance.now() + ", fieldsofview" + '\n');console.log(fieldsofview);
            console.log(performance.now() + ", myfovs[myfovsindex]" + '\n');console.log(myfovs[myfovsindex]);
            console.log(performance.now() + ", myfovs" + '\n');console.log(myfovs);
            
        }       // END FOR
        console.log("END FOR \n\n\n\n\n\n\n");
        console.log("camerasLayer");console.log(camerasLayer);
        console.log("mycamerasjson");console.log(mycamerasjson);
        console.log("mycamerasgeojson");console.log(mycamerasgeojson);
        
    });     // END getJSON
    console.log("END getJSON \n\n\n\n\n\n\n");
    console.log("camerasLayer");console.log(camerasLayer);
    console.log("mycamerasjson");console.log(mycamerasjson);
    console.log("mycamerasgeojson");console.log(mycamerasgeojson);
    console.log("fovlay");console.log(fovlay);
    
    
    var result = {
        cameras: camerasLayer,
        identification: fovLayers.identification,
        recognition: fovLayers.recognition,
        detection: fovLayers.detection,
        monitor: fovLayers.monitor,
        visible: fovLayers.visible
    };
    console.log("result");console.log(result);
    
    
    var endtime = performance.now();
    var totaltime = endtime - starttime;
    console.log(performance.now() + ", getCams3(), END: " + endtime + ", Exec: " + totaltime + '\n');
    
    return result;
}       // END getCams3













































//function getWFSCameras (camerasLayer) {
function getWFSCameras (layer) {
    
    
//    var geojsonLayer = new L.GeoJSON();
//    var currSelectionLayer = 'DRCOGPUB:rea_drcog_jurisdiction_county';
//    var sw_lat = 39.93290692296977;
//    var sw_long = -105.39459228515624;
//    var ne_lat = 40.094882122321174;
//    var ne_long = -105.150146484375;
//    var geoJsonUrl = "http://gis.drcog.org/geoserver/DRCOGPUB/ows?service=WFS&version=1.0.0&request=GetFeature&typeName="+ currSelectionLayer +"&srsName=EPSG:4326&maxFeatures=10000&outputFormat=json&format_options=callback:getJson&cql_filter=BBOX(the_geom," + ne_long + "," + ne_lat + "," + sw_long + "," + sw_lat + ")"; 

//    function loadGeoJson(data) {
//            console.log(data);
//            geojsonLayer.addData(data);
//    }
    
    var geojsonLayer = layer;
//    var currSelectionLayer = 'Cameras_Ekkersrijt_withspecs';
//    var sw_lat = 51.497020000000248;
//    var sw_long = 5.4512790000001132;
//    var ne_lat = 51.504995000000008;
//    var ne_long = 5.4934539999999856;
//    var lowerCorner = [51.497020000000248, 5.4512790000001132];
//    var upperCorner = [51.504995000000008, 5.4934539999999856];
//    var wfsrequesturl = "http://localhost:6080/arcgis/services/Cameras/Cameras_Ekkersrijt_20150319/MapServer/WFSServer?request=getfeature&typename=Cameras_Ekkersrijt_withspecs";
    var wfsrequesturl = "/service/localhostarcgis/services/Cameras/Cameras_Ekkersrijt_20150319/MapServer/WFSServer?request=getfeature&typename=Cameras_Ekkersrijt_withspecs";
    
    function loadData(data) {
        console.log(data);
        function xml2JSON(xml) {
            var obj = {};
            if (xml.nodeType == 1) {                
                if (xml.attributes.length > 0) {
                    obj["@attributes"] = {};
                    for (var j = 0; j < xml.attributes.length; j++) {
                        var attribute = xml.attributes.item(j);
                        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                    }
                }
            } else if (xml.nodeType == 3) { 
                obj = xml.nodeValue;
            }            
            if (xml.hasChildNodes()) {
                for (var i = 0; i < xml.childNodes.length; i++) {
                    var item = xml.childNodes.item(i);
                    var nodeName = item.nodeName;
                    if (typeof (obj[nodeName]) == "undefined") {
                        obj[nodeName] = xml2JSON(item);
                    } else {
                        if (typeof (obj[nodeName].push) == "undefined") {
                            var old = obj[nodeName];
                            obj[nodeName] = [];
                            obj[nodeName].push(old);
                        }
                        obj[nodeName].push(xml2JSON(item));
                    }
                }
            }
            return obj;
        }
        var inJSON = xml2JSON(data);
        console.log(inJSON);
//        var fcoll = inJSON["wfs:FeatureCollection"];
//        console.log(fcoll);
//        var features = fcoll["gml:featureMember"];
        var features = inJSON["wfs:FeatureCollection"]["gml:featureMember"];
        console.log(features);
        for (f in features) {
            var fobj = features[f]["Cameras_Ekkersrijt_20150319:Cameras_Ekkersrijt_withspecs"];
            console.log(fobj);
//            Cameras_Ekkersrijt_20150319:Azimuth
//            Cameras_Ekkersrijt_20150319:Brand
//            Cameras_Ekkersrijt_20150319:Camera_ID
//            Cameras_Ekkersrijt_20150319:CanPan
//            Cameras_Ekkersrijt_20150319:CanTilt
//            Cameras_Ekkersrijt_20150319:CanZoom
//            Cameras_Ekkersrijt_20150319:Comments
//            Cameras_Ekkersrijt_20150319:CreatedAt
//            Cameras_Ekkersrijt_20150319:FocalLengthDefault
//            Cameras_Ekkersrijt_20150319:FocalLengthMax
//            Cameras_Ekkersrijt_20150319:FocalLengthMin
//            Cameras_Ekkersrijt_20150319:LastUpdatedAt
//            Cameras_Ekkersrijt_20150319:Lat
//            Cameras_Ekkersrijt_20150319:Lon
//            Cameras_Ekkersrijt_20150319:Model
//            Cameras_Ekkersrijt_20150319:OBJECTID
//            Cameras_Ekkersrijt_20150319:Region
//            Cameras_Ekkersrijt_20150319:SensorResolutionHorizontal
//            Cameras_Ekkersrijt_20150319:SensorResolutionVertical
//            Cameras_Ekkersrijt_20150319:SensorSizeHeight
//            Cameras_Ekkersrijt_20150319:SensorSizeWidth
//            Cameras_Ekkersrijt_20150319:Shape
//            Cameras_Ekkersrijt_20150319:Type
//            Cameras_Ekkersrijt_20150319:mp4managed.sde.Cameras_Ekkersrijt_withspecs.area
            
            var id = fobj["Cameras_Ekkersrijt_20150319:Camera_ID"]["#text"], 
                camtype = fobj["Cameras_Ekkersrijt_20150319:Type"]["#text"], 
                cammodel = fobj["Cameras_Ekkersrijt_20150319:Model"]["#text"], 
                cambrand = fobj["Cameras_Ekkersrijt_20150319:Brand"]["#text"], 
                camregion = fobj["Cameras_Ekkersrijt_20150319:Region"]["#text"], 
                camarea = fobj["Cameras_Ekkersrijt_20150319:mp4managed.sde.Cameras_Ekkersrijt_withspecs.area"]["#text"], 
                // lat and lon are switched in the original dataset due to a mistake
                lat = Number( fobj["Cameras_Ekkersrijt_20150319:Lon"]["#text"] ), 
                lon = Number( fobj["Cameras_Ekkersrijt_20150319:Lat"]["#text"] ), 
//                lat = Number( fobj["Cameras_Ekkersrijt_20150319:Lat"]["#text"] ), 
//                lon = Number( fobj["Cameras_Ekkersrijt_20150319:Lon"]["#text"] ), 
                rot = Number( fobj["Cameras_Ekkersrijt_20150319:Azimuth"]["#text"] ), 
                foclen = Number( fobj["Cameras_Ekkersrijt_20150319:FocalLengthDefault"]["#text"] ), 
                fldef = Number( fobj["Cameras_Ekkersrijt_20150319:FocalLengthDefault"]["#text"] ), 
                flmax = Number( fobj["Cameras_Ekkersrijt_20150319:FocalLengthMax"]["#text"] ), 
                flmin = Number( fobj["Cameras_Ekkersrijt_20150319:FocalLengthMin"]["#text"] ), 
                sh = Number( fobj["Cameras_Ekkersrijt_20150319:SensorSizeHeight"]["#text"] ), 
                sw = Number( fobj["Cameras_Ekkersrijt_20150319:SensorSizeWidth"]["#text"] ), 
                srv = Number( fobj["Cameras_Ekkersrijt_20150319:SensorResolutionVertical"]["#text"] ), 
                srh = Number( fobj["Cameras_Ekkersrijt_20150319:SensorResolutionHorizontal"]["#text"] ),
                name = camtype + " - " + id;
            
            console.log("id, name, camtype, cammodel, cambrand, camregion, camarea, lat, lon, rot, foclen, fldef, flmax, flmin, sh, sw, srv, srh = " + id + ", " + name + ", " + camtype + ", " + cammodel + ", " + cambrand + ", " + camregion + ", " + camarea + ", " + lat + ", " + lon + ", " + rot + ", " + foclen + ", " + fldef + ", " + flmax + ", " + flmin + ", " + sh + ", " + sw + ", " + srv + ", " + srh);
            
//            var geoJsonCamera = createGeoJsonCamera (id, name, camtype, cammodel, cambrand, camregion, camarea, lat, lon, rot, foclen, fldef, flmax, flmin, sh, sw, srv, srh);
//            console.log(geoJsonCamera);
//            var cameraFeature = L.geoJson.css(geoJsonCamera);
            var cameraFeature = L.geoJson.css(createGeoJsonCamera (id, name, camtype, cammodel, cambrand, camregion, camarea, lat, lon, rot, foclen, fldef, flmax, flmin, sh, sw, srv, srh));
            console.log(cameraFeature);
            
            // HERE WE CAN QUERY AND LOAD THE FoVS OF EACH CAMERA

            cameraFeature.addTo(geojsonLayer);
//            geojsonLayer.addData(cameraFeature);
        }   // END FOR
//        geojsonLayer.addData(data);
//        geojsonLayer.addTo(map);
    }   // END Ajax Request - Load Data

    $.ajax({
//            url: geoJsonUrl,
            url: wfsrequesturl,
//            dataType: 'jsonp',
            dataType: 'xml',
//            jsonpCallback: 'getJson',
//            jsonpCallback: 'getJson',
//            contentType: 'application/json',
//            contentType: 'text/xml',
            success: loadData
    });
    
    
    
//    return camerasLayer;
    return geojsonLayer;
}







///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////         getFovs2()         //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//  getFovs2() - performs a request to the 2D FoV service and adds the response FoV polygons to the map
function getFovs2(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical) {
    var starttime = performance.now();
    console.log(performance.now() + ", addFov(" + cameraid + "), START: " + starttime + '\n');

    // get 2D FoV Service request URL
    var fovreq = createRequestUrl(longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical);
    console.log(performance.now() + ", addFov(" + cameraid + "), Request URL: " + fovreq + '\n');
    
    var result = {};
        
    var fovStyles = {
        identification: {
            color: 'red', 
            weight: 5, 
            fillOpacity: 0.7, 
            opacity: 0.1
        },
        recognition: {
            color: 'pink', 
            weight: 4, 
            fillOpacity: 0.6, 
            opacity: 0.1
        },
        detection: {
            color: 'orange', 
            weight: 3, 
            fillOpacity: 0.5, 
            opacity: 0.1
        },
        monitor: {
            color: 'yellow', 
            weight: 2, 
            fillOpacity: 0.4, 
            opacity: 0.1
        },
        visible: {
            color: 'green', 
            weight: 1, 
            fillOpacity: 0.3, 
            opacity: 0.1
        }
    };
    
    // Perform request to 2D FoV Service
    $.getJSON(fovreq, function (data) {
        // get FoV features
        var fovFeatures = [ 
                data.features[0],   // Monitor & Control area
                data.features[1],   // Detection area
                data.features[2],   // Recognition area
                data.features[3]   // Identification area
            ];
        if (data.features[4] != null) { fovFeatures[4] = data.features[4]; }   // Visible area
        
        // Create FoV popups
        var fovpopups = [
            getFovPopup(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical, "Monitor & Control"),
            getFovPopup(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical, "Detection"),
            getFovPopup(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical, "Recognition"),
            getFovPopup(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical, "Identification"),
            getFovPopup(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical, "Visible")
        ];
//        var fovpopups = getFovPopups(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical);
//        var fovpopups = getFovPopups(camera);
//        var fovpopups = fovPopupTemplate();
        
        // Enrich FoV features with camera specifications
//        for (var i = 0; i < data.features.length; i++) {
        for (var i = 0; i < fovFeatures.length; i++) {
            if ( (data.features[i] != null) && (fovFeatures[i] != null) ) { 
                fovFeatures[i].popupTemplate = fovpopups[i];
                fovFeatures[i].properties.popupContent = fovpopups[i]; 
                fovFeatures[i].crs = 4326;
                fovFeatures[i].geometry.crs = 4326;
                fovFeatures[i].properties.crs = 4326;
                fovFeatures[i].properties.cameraid = cameraid;
                fovFeatures[i].properties.latitude = latitude;
                fovFeatures[i].properties.longitude = longitude;
                fovFeatures[i].properties.rotation = rotation;
                fovFeatures[i].properties.focallength = focallength;
                fovFeatures[i].properties.resolutionvert = resolutionvertical;
                fovFeatures[i].properties.sensorwidth = sensorwidth;
                fovFeatures[i].properties.featuretype = "FoV";
                
                switch (fovFeatures[i].properties.zone) {
                    case "Monitoring":
                        fovFeatures[i].properties.fovtype = "Monitor & Control";
                        break;
                    case "Detection":
                        fovFeatures[i].properties.fovtype = "Detection";
                        break;
                    case "Recognition":
                        fovFeatures[i].properties.fovtype = "Recognition";
                        break;
                    case "Identification":
                        fovFeatures[i].properties.fovtype = "Identification";
                        break;
                    case "Visible":
                        fovFeatures[i].properties.fovtype = "Visible";
                        break;
                    default:
                        fovFeatures[i].properties.fovtype = "ERROR";
                        break;
                }   // END SWITCH
                
            }   // END IF
            
        }   // END FOR

        // Create GeoJSON FoV layer features, bind popups and add them to FoV layers
        // monitor
//        result.monitor = L.geoJson.css(fovFeatures[0], { color: 'yellow', weight: 2, fillOpacity: 0.4, opacity: 0.1 });
        result.monitor = L.geoJson.css(fovFeatures[0], fovStyles.monitor);
        result.monitor.bindPopup(fovFeatures[0].properties.popupContent);
//        result.monitor.addTo(layers.monitor);
        // detection
//        result.detection = L.geoJson.css(fovFeatures[1], { color: 'orange', weight: 3, fillOpacity: 0.5, opacity: 0.1 });
        result.detection = L.geoJson.css(fovFeatures[1], fovStyles.detection);
        result.detection.bindPopup(fovFeatures[1].properties.popupContent);
//        result.detection.addTo(layers.detection);
        // recognition
//        result.recognition = L.geoJson.css(fovFeatures[2], { color: 'pink', weight: 4, fillOpacity: 0.6, opacity: 0.1 });
        result.recognition = L.geoJson.css(fovFeatures[2], fovStyles.recognition);
        result.recognition.bindPopup(fovFeatures[2].properties.popupContent);
        result.recognition.addTo(layers.recognition);
        // identification
//        result.identification = L.geoJson.css(fovFeatures[3], { color: 'red', weight: 5, fillOpacity: 0.7, opacity: 0.1 });
        result.identification = L.geoJson.css(fovFeatures[3], fovStyles.identification);
        result.identification.bindPopup(fovFeatures[3].properties.popupContent);
//        result.identification.addTo(layers.identification);
        // visible
        if (data.features[4] != null) {
//            result.visible = L.geoJson.css(fovFeatures[4], { color: 'green', weight: 1, fillOpacity: 0.3, opacity: 0.1 });
            result.visible = L.geoJson.css(fovFeatures[4], fovStyles.visible);
            result.visible.bindPopup(fovFeatures[4].properties.popupContent);
//            result.visible.addTo(layers.visible);
        } else { result.visible = null; }
        
        // some variables for logging, tracking and debug
            console.log(performance.now() + ", addFov() " + cameraid + " M&C: " + fovFeatures[0] + ", Popup: " + fovpopups[0] +'\n');
            console.log(fovFeatures[0]);
            console.log(result.monitor);
            console.log(performance.now() + ", addFov() " + cameraid + " Detec: " + fovFeatures[1] + ", Popup: " + fovpopups[1] +'\n');
            console.log(fovFeatures[1]);
            console.log(result.detection);
            console.log(performance.now() + ", addFov() " + cameraid + " Recog: " + fovFeatures[2] + ", Popup: " + fovpopups[2] +'\n');
            console.log(fovFeatures[2]);
            console.log(result.recognition);
            console.log(performance.now() + ", addFov() " + cameraid + " Ident: " + fovFeatures[3] + ", Popup: " + fovpopups[3] +'\n');
            console.log(fovFeatures[3]);
            console.log(result.identification);
        if (data.features[4] != null) { 
            console.log(performance.now() + ", addFov() " + cameraid + " Visib: " + fovFeatures[4] + ", Popup: " + fovpopups[4] +'\n');
            console.log(fovFeatures[4]);
            console.log(result.visible);
        }
        
    }); // END $.GetJSON
    
    // some variables for logging, tracking and debug
    console.log(result);
    var endtime = performance.now();
    var totaltime = endtime - starttime;
    console.log(performance.now() + ", addFov(" + cameraid + "), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n');
    
    return result;
}       // END getFovs2()







// getWFSCameras2() {
function getWFSCameras2 (url, camLayer, fovLayers) {
    
    var cameras = camLayer;
    var fovs = {
        identification: fovLayers.identification,
        recognition: fovLayers.recognition,
        detection: fovLayers.detection,
        monitor: fovLayers.monitor,
        visible: fovLayers.visible,
    };
    
//    var currSelectionLayer = 'Cameras_Ekkersrijt_withspecs';
//    var sw_lat = 51.497020000000248;
//    var sw_long = 5.4512790000001132;
//    var ne_lat = 51.504995000000008;
//    var ne_long = 5.4934539999999856;
//    var lowerCorner = [51.497020000000248, 5.4512790000001132];
//    var upperCorner = [51.504995000000008, 5.4934539999999856];
//    var wfsrequesturl = "http://localhost:6080/arcgis/services/Cameras/Cameras_Ekkersrijt_20150319/MapServer/WFSServer?request=getfeature&typename=Cameras_Ekkersrijt_withspecs";
//    var wfsrequesturl = "/service/localhostarcgis/services/Cameras/Cameras_Ekkersrijt_20150319/MapServer/WFSServer?request=getfeature&typename=Cameras_Ekkersrijt_withspecs";
    var wfsrequesturl = url;
    
    function loadData(data) {
        console.log(data);
        function xml2JSON(xml) {
            var obj = {};
            if (xml.nodeType == 1) {
                if (xml.attributes.length > 0) {
                    obj["@attributes"] = {};
                    for (var j = 0; j < xml.attributes.length; j++) {
                        var attribute = xml.attributes.item(j);
                        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                    }
                }
            } else if (xml.nodeType == 3) {
                obj = xml.nodeValue;
            }
            if (xml.hasChildNodes()) {
                for (var i = 0; i < xml.childNodes.length; i++) {
                    var item = xml.childNodes.item(i);
                    var nodeName = item.nodeName;
                    if (typeof (obj[nodeName]) == "undefined") {
                        obj[nodeName] = xml2JSON(item);
                    } else {
                        if (typeof (obj[nodeName].push) == "undefined") {
                            var old = obj[nodeName];
                            obj[nodeName] = [];
                            obj[nodeName].push(old);
                        }
                        obj[nodeName].push(xml2JSON(item));
                    }
                }
            }
            return obj;
        }
        
        var inJSON = xml2JSON(data);
        var features = inJSON["wfs:FeatureCollection"]["gml:featureMember"];
        
        for (f in features) {
            var fobj = features[f]["Cameras_Ekkersrijt_20150319:Cameras_Ekkersrijt_withspecs"];
            console.log(fobj);
//            Cameras_Ekkersrijt_20150319:Azimuth
//            Cameras_Ekkersrijt_20150319:Brand
//            Cameras_Ekkersrijt_20150319:Camera_ID
//            Cameras_Ekkersrijt_20150319:CanPan
//            Cameras_Ekkersrijt_20150319:CanTilt
//            Cameras_Ekkersrijt_20150319:CanZoom
//            Cameras_Ekkersrijt_20150319:Comments
//            Cameras_Ekkersrijt_20150319:CreatedAt
//            Cameras_Ekkersrijt_20150319:FocalLengthDefault
//            Cameras_Ekkersrijt_20150319:FocalLengthMax
//            Cameras_Ekkersrijt_20150319:FocalLengthMin
//            Cameras_Ekkersrijt_20150319:LastUpdatedAt
//            Cameras_Ekkersrijt_20150319:Lat
//            Cameras_Ekkersrijt_20150319:Lon
//            Cameras_Ekkersrijt_20150319:Model
//            Cameras_Ekkersrijt_20150319:OBJECTID
//            Cameras_Ekkersrijt_20150319:Region
//            Cameras_Ekkersrijt_20150319:SensorResolutionHorizontal
//            Cameras_Ekkersrijt_20150319:SensorResolutionVertical
//            Cameras_Ekkersrijt_20150319:SensorSizeHeight
//            Cameras_Ekkersrijt_20150319:SensorSizeWidth
//            Cameras_Ekkersrijt_20150319:Shape
//            Cameras_Ekkersrijt_20150319:Type
//            Cameras_Ekkersrijt_20150319:mp4managed.sde.Cameras_Ekkersrijt_withspecs.area
            
            var id = fobj["Cameras_Ekkersrijt_20150319:Camera_ID"]["#text"], 
                objectid = fobj["Cameras_Ekkersrijt_20150319:OBJECTID"]["#text"],
                shape = fobj["Cameras_Ekkersrijt_20150319:Shape"]["gml:Point"]["gml:pos"]["#text"],
                canpan = fobj["Cameras_Ekkersrijt_20150319:CanPan"]["#text"], 
                cantilt = fobj["Cameras_Ekkersrijt_20150319:CanTilt"]["#text"], 
                canzoom = fobj["Cameras_Ekkersrijt_20150319:CanZoom"]["#text"], 
                comments = fobj["Cameras_Ekkersrijt_20150319:Comments"]["#text"], 
                createdat = fobj["Cameras_Ekkersrijt_20150319:CreatedAt"]["#text"], 
                updatedat = fobj["Cameras_Ekkersrijt_20150319:LastUpdatedAt"]["#text"], 
                camtype = fobj["Cameras_Ekkersrijt_20150319:Type"]["#text"], 
                cammodel = fobj["Cameras_Ekkersrijt_20150319:Model"]["#text"], 
                cambrand = fobj["Cameras_Ekkersrijt_20150319:Brand"]["#text"], 
                camregion = fobj["Cameras_Ekkersrijt_20150319:Region"]["#text"], 
                camarea = fobj["Cameras_Ekkersrijt_20150319:mp4managed.sde.Cameras_Ekkersrijt_withspecs.area"]["#text"], 
                // lat and lon are switched in the original dataset due to a mistake, fix here
                lat = Number( fobj["Cameras_Ekkersrijt_20150319:Lon"]["#text"] ), 
                lon = Number( fobj["Cameras_Ekkersrijt_20150319:Lat"]["#text"] ), 
//                lat = Number( fobj["Cameras_Ekkersrijt_20150319:Lat"]["#text"] ), 
//                lon = Number( fobj["Cameras_Ekkersrijt_20150319:Lon"]["#text"] ), 
                rot = Number( fobj["Cameras_Ekkersrijt_20150319:Azimuth"]["#text"] ), 
                foclen = Number( fobj["Cameras_Ekkersrijt_20150319:FocalLengthDefault"]["#text"] ), 
                fldef = Number( fobj["Cameras_Ekkersrijt_20150319:FocalLengthDefault"]["#text"] ), 
                flmax = Number( fobj["Cameras_Ekkersrijt_20150319:FocalLengthMax"]["#text"] ), 
                flmin = Number( fobj["Cameras_Ekkersrijt_20150319:FocalLengthMin"]["#text"] ), 
                sh = Number( fobj["Cameras_Ekkersrijt_20150319:SensorSizeHeight"]["#text"] ), 
                sw = Number( fobj["Cameras_Ekkersrijt_20150319:SensorSizeWidth"]["#text"] ), 
                srv = Number( fobj["Cameras_Ekkersrijt_20150319:SensorResolutionVertical"]["#text"] ), 
                srh = Number( fobj["Cameras_Ekkersrijt_20150319:SensorResolutionHorizontal"]["#text"] ),
                name = camtype + " - " + id;
            
            console.log("id, objectid, shape, canpan, cantilt, canzoom, comments, createdat, updatedat, name, camtype, cammodel, cambrand, camregion, camarea, lat, lon, rot, foclen, fldef, flmax, flmin, sh, sw, srv, srh = " + id + ", " + objectid + ", " + shape + ", " + canpan + ", " + cantilt + ", " + canzoom + ", " + comments + ", " + createdat + ", " + updatedat + ", " + name + ", " + camtype + ", " + cammodel + ", " + cambrand + ", " + camregion + ", " + camarea + ", " + lat + ", " + lon + ", " + rot + ", " + foclen + ", " + fldef + ", " + flmax + ", " + flmin + ", " + sh + ", " + sw + ", " + srv + ", " + srh);
            
            var geoJsonCamera = createGeoJsonCamera (id, name, camtype, cammodel, cambrand, camregion, camarea, lat, lon, rot, foclen, fldef, flmax, flmin, sh, sw, srv, srh);
            console.log(geoJsonCamera);
            geoJsonCamera.properties.objectid = objectid;
            geoJsonCamera.properties.shape = shape;
            geoJsonCamera.properties.canpan = canpan;
            geoJsonCamera.properties.cantilt = cantilt;
            geoJsonCamera.properties.canzoom = canzoom;
            geoJsonCamera.properties.comments = comments;
            geoJsonCamera.properties.createdat = createdat;
            geoJsonCamera.properties.updatedat = updatedat;
            console.log(geoJsonCamera);
            var cameraFeature = L.geoJson.css(geoJsonCamera);
//            var cameraFeature = L.geoJson.css(createGeoJsonCamera (id, name, camtype, cammodel, cambrand, camregion, camarea, lat, lon, rot, foclen, fldef, flmax, flmin, sh, sw, srv, srh));
            console.log(cameraFeature);
            
            // HERE WE CAN QUERY AND LOAD THE FoVS OF EACH CAMERA
            var foclen2 = (flmax + flmin*7)/8;
            var camFovs = getFovs(id, lon, lat, rot, foclen2, sh, srv, fovs);
//            var camFovs = getFovs2(id, lon, lat, rot, foclen2, sh, srv);

            cameraFeature.addTo(cameras);
//            camFovs.identification.addTo(fovs.identification);
//            camFovs.recognition.addTo(fovs.recognition);
//            camFovs.detection.addTo(fovs.detection);
//            camFovs.monitor.addTo(fovs.monitor);
//            if ( camFovs.visible != null ) { camFovs.visible.addTo(fovs.visible); }
            
//            cameras.addData(cameraFeature);
        }   // END FOR f in features
//        geojsonLayer.addData(data);
//        geojsonLayer.addTo(map);
    }   // END Ajax Request - Load Data

    // REQUEST
    $.ajax({
        url: wfsrequesturl,
        dataType: 'xml',
        success: loadData
    });
    
    var result = {
        cameras: cameras,
        identification: fovs.identification,
        recognition: fovs.recognition,
        detection: fovs.detection,
        monitor: fovs.monitor,
        visible: fovs.visible
    };
    
    return result;
}







/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
////////////////                           //////////////
////////////////       addGJCamera()       //////////////
////////////////                           //////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
////  addGJCamera() - Adds a camera to the map as a GeoJSON object
//function addGJCamera(gjcam) {
//    var starttime = performance.now();
//    console.log(performance.now() + ", addGJCamera(" + gjcam.properties.id + "), START: " + starttime + '\n');
//    console.log(gjcam);
//   
//    var cam = gjcam;
//    cam.style = {
//        "icon": {
//            "iconUrl": 'img/camera.png',
//            "iconSize": [18, 18],
//            "iconAnchor": [9, 9]
//        }
//    };
//    var camPopup = gjcam.properties.popupContent;
//    
//    var geojsoncamera = L.geoJson.css(cam).addTo(map).bindPopup(camPopup);
//    console.log(geojsoncamera);
//    
//    var endtime = performance.now();
//    var totaltime = endtime - starttime;
//    console.log(performance.now() + ", addGJCamera(" + gjcam.properties.id + "), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n');
//    
//    return geojsoncamera;
//}
//    
//    
//    
//    
//// add cameras
//function getCams(camsUrl) {
////function getCams(camsUrl, camsLayer) {
//    var starttime = performance.now();
//    console.log(performance.now() + ", getCams(" + camsUrl + "), START: " + starttime + '\n');
//    
////    var markerClusterOptions = { 
////        spiderfyOnMaxZoom: true, 
////        showCoverageOnHover: true, 
////        zoomToBoundsOnClick: true,
////        spiderfyOnMaxZoom: false, 
////        showCoverageOnHover: false, 
////        zoomToBoundsOnClick: false,
////        removeOutsideVisibleBounds: true,   // enhance ferformance
////        animateAddingMarkers: true,
////        disableClusteringAtZoom: 15,
////        maxClusterRadius: 100,
////        polygonOptions: {},
////        singleMarkerMode: false,
////        spiderfyDistanceMultiplier: 3,  // Default 1. Use for big marker icons
////        iconCreateFunction: function(cluster) {
////            return new L.DivIcon({ html: '<b>' + cluster.getChildCount() + '</b>' });
////        }
////    }    
////    var markerClusterOptions = { 
////        spiderfyOnMaxZoom: false, 
////        showCoverageOnHover: false, 
////        zoomToBoundsOnClick: false
////    }
////    var camerasLayerClustered = L.MarkerClusterGroup(markerClusterOptions);
//    
//    // get Cameras
//    $.getJSON(camsUrl, function (data) {
//        for (var i = 0; i < data.length; i++) {     // for each camera
//            var time0 = performance.now();
//            console.log(performance.now() + ", getCams(), $.getJSON(), Camera: " + data[i].Camera_ID);
//            
//            // Get Camera Attributes
//            var lon = data[i].Longitude,
//                lat = data[i].Latitude,
//                id = data[i].Camera_ID,
//                name = data[i].Camera_Type + " - " + id,
//                camtype = data[i].Camera_Type,
//                rot = Math.floor(Math.random() * (360 - 0)) + 0, //random rotation 0-360
//                fldef = data[i].FocalLengthDefault,
//                flmin = data[i].FocalLengthMin,
//                flmax = data[i].FocalLengthMax,
//                foclen = Math.random() * (flmax - flmin) + flmin, // random focal length
//                foclen2 = (flmax + flmin*4)/5, // random focal length
//                sh = data[i].SensorSizeHeight,
//                sw = data[i].SensorSizeWidth,
//                srv = data[i].SensorResolutionVertical,
//                srh = data[i].SensorResolutionHorizontal,
//                cambrand = data[i].Brand,
//                cammodel = data[i].Model,
//                camarea = data[i].Area,
//                camregion = data[i].Region;
//            
//            // Create GeoJSON Camera feature
//            var cameraGeoJSONFeature = createGeoJsonCamera(id, name, camtype, cammodel, cambrand, camregion, camarea, lat, lon, rot, foclen, fldef, flmax, flmin, sh, sw, srv, srh);
//            var time1 = performance.now();
//            
//            // Add Camera to map
//            addGJCamera(cameraGeoJSONFeature);
////            camerasLayerClustered.addLayer(addGJCamera(cameraGeoJSONFeature));
//            var time2 = performance.now();
//            
//            // Add FoV to map
////            addFov(id, lon, lat, rot, foclen, sw, srv);  // random focal length and sensor width
////            addFov(id, lon, lat, rot, foclen, sh, srv);  // random focal length and sensor height
////            addFov(id, lon, lat, rot, foclen2, sw, srv);  // random focal length 2 and sensor width
//            addFov(id, lon, lat, rot, foclen2, sh, srv);  // random focal length 2 and sensor height
////            addFov(id, lon, lat, rot, fldef, sw, srv);  // default focal length and sensor width
////            addFov(id, lon, lat, rot, fldef, sh, srv);  // default focal length and sensor height
//            var time3 = performance.now();
//            
//            var time01 = time1 - time0;
//            console.log(performance.now() + ", Camera: " + data[i].Camera_ID + ", Time01 (ms): " + time01 + '\n');
//            var time12 = time2 - time1;
//            console.log(performance.now() + ", Camera: " + data[i].Camera_ID + ", Time12 (ms): " + time12 + '\n');
//            var time23 = time3 - time2;
//            console.log(performance.now() + ", Camera: " + data[i].Camera_ID + ", Time23 (ms): " + time23 + '\n');
//            var time13 = time3 - time1;
//            console.log(performance.now() + ", Camera: " + data[i].Camera_ID + ", Time13 (ms): " + time13 + '\n');
//            var time03 = time3 - time0;
//            console.log(performance.now() + ", Camera: " + data[i].Camera_ID + ", Time03 (ms): " + time03 + '\n');
//        }
//    });     // END getJSON
//    
//    var endtime = performance.now();
//    var totaltime = endtime - starttime;
//    console.log(performance.now() + ", getCams(" + camsUrl + "), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n');
//    
////    return camerasLayerClustered;
//}       // END getCams


////  addFov - performs a request to the 2D FoV service and adds the response polygons to the map
//function addFov(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical) {
//    var starttime = performance.now();
//    console.log(performance.now() + ", addFov(" + cameraid + "), START: " + starttime + '\n');
//
//    // get 2D FoV Service request URL
//    var fovreq = createRequestUrl(longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical);
//    console.log(performance.now() + ", addFov(" + cameraid + "), Request URL: " + fovreq + '\n');
//    
//    // Perform request to 2D FoV Service
//    $.getJSON(fovreq, function (data) {
//        // get FoV features
//        var fovFeatures = [ 
//                data.features[0],   // Monitor & Control area
//                data.features[1],   // Detection area
//                data.features[2],   // Recognition area
//                data.features[3]   // Identification area
//            ];
//        if (data.features[4] != null) {
//            fovFeatures[4] = data.features[4];    // Visible area
//        }
//        
//        // Enrich FoV features with camera specifications
//        for (var i = 0; i < fovFeatures.length; i++) {            
//            fovFeatures[i].crs = 4326;
//            fovFeatures[i].geometry.crs = 4326;
//            fovFeatures[i].properties.crs = 4326;
//            fovFeatures[i].properties.cameraid = cameraid;
//            fovFeatures[i].properties.latitude = latitude;
//            fovFeatures[i].properties.longitude = longitude;
//            fovFeatures[i].properties.rotation = rotation;
//            fovFeatures[i].properties.focallength = focallength;
//            fovFeatures[i].properties.resolutionvert = resolutionvertical;
//            fovFeatures[i].properties.sensorwidth = sensorwidth;
//            fovFeatures[i].properties.featuretype = "FoV";
//            switch (i) {
//                case 0:
//                    fovFeatures[i].properties.fovtype = "Monitor & Control";
//                    break;
//                case 1:
//                    fovFeatures[i].properties.fovtype = "Detection";
//                    break;
//                case 2:
//                    fovFeatures[i].properties.fovtype = "Recognition";
//                    break;
//                case 3:
//                    fovFeatures[i].properties.fovtype = "Identification";
//                    break;
//                case 4:
//                    fovFeatures[i].properties.fovtype = "Visible";
//                    break;
//                default:
//                    fovFeatures[i].properties.fovtype = "ERROR";
//                    break;
//            }
//        }
//        
//        // Create popups
//        var partialpopup = "<label>Camera ID: </label><input value='" + cameraid + "'></input><br><label>Latitude: </label><input value='" + latitude + "'></input><br><label>Longitude: </label><input value='" + longitude + "'></input><br><label>Focal length: </label><input value='" + focallength + "'>m</input><br><label>Sensor width: </label><input value='" + sensorwidth + "'>m</input><br><label>Vertical resolution: </label><input value='" + resolutionvertical + "'>px</input><br><label>Rotation: </label><input value='" + rotation + "'>dg</input><br><label>FoV type: </label><input value='";
//        var fovpopups = [];
//        fovpopups[0] = partialpopup + "Monitor & Control'></input>";
//        fovpopups[1] = partialpopup + "Detection'></input>";
//        fovpopups[2] = partialpopup + "Recognition'></input>";
//        fovpopups[3] = partialpopup + "Identification'></input>";
//        fovpopups[4] = partialpopup + "Visible'></input>";
//        
//        // add popups to features
//        fovFeatures[0].properties.popupContent = fovpopups[0];
//        fovFeatures[1].properties.popupContent = fovpopups[1];
//        fovFeatures[2].properties.popupContent = fovpopups[2];
//        fovFeatures[3].properties.popupContent = fovpopups[3];
//        if (data.features[4] != null) {
//            fovFeatures[4].properties.popupContent = fovpopups[4];
//        }
//
//        // Add FoV Features to map
//        L.geoJson(fovFeatures[0], { color: 'yellow', weight: 2, fillOpacity: 0.4, opacity: 0.1 }).addTo(map).bindPopup(fovFeatures[0].properties.popupContent);
//        console.log(performance.now() + ", addFov() " + cameraid + " M&C: " + fovFeatures[0] + ", Popup: " + fovpopups[0] +'\n');
//            console.log(fovFeatures[0]);
//        L.geoJson(fovFeatures[1], { color: 'orange', weight: 3, fillOpacity: 0.5, opacity: 0.1 }).addTo(map).bindPopup(fovFeatures[1].properties.popupContent);
//        console.log(performance.now() + ", addFov() " + cameraid + " Detec: " + fovFeatures[1] + ", Popup: " + fovpopups[1] +'\n');
//            console.log(fovFeatures[1]);
//        L.geoJson(fovFeatures[2], { color: 'pink', weight: 4, fillOpacity: 0.6, opacity: 0.1 }).addTo(map).bindPopup(fovFeatures[2].properties.popupContent);
//        console.log(performance.now() + ", addFov() " + cameraid + " Recog: " + fovFeatures[2] + ", Popup: " + fovpopups[2] +'\n');
//            console.log(fovFeatures[2]);
//        L.geoJson(fovFeatures[3], { color: 'red', weight: 5, fillOpacity: 0.7, opacity: 0.1 }).addTo(map).bindPopup(fovFeatures[3].properties.popupContent);
//        console.log(performance.now() + ", addFov() " + cameraid + " Ident: " + fovFeatures[3] + ", Popup: " + fovpopups[3] +'\n');
//            console.log(fovFeatures[3]);
//        if (data.features[4] != null) {
//            L.geoJson(fovFeatures[4], { color: 'green', weight: 1, fillOpacity: 0.3, opacity: 0.1 }).addTo(map).bindPopup(fovFeatures[4].properties.popupContent);
//        console.log(performance.now() + ", addFov() " + cameraid + " Visib: " + fovFeatures[4] + ", Popup: " + fovpopups[4] +'\n');
//            console.log(fovFeatures[4]);
//        }
//    });
//    
//    var endtime = performance.now();
//    var totaltime = endtime - starttime;
//    console.log(performance.now() + ", addFov(" + cameraid + "), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n');
//}       // END addFov



////  addCamera() - Adds a Camera to the map as a marker
//function addCamera(camid, camtype, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical, camerapopup) {
//    var starttime = performance.now();
//    console.log(performance.now() + ", addCamera(" + camid + "), START: " + starttime + '\n');
//    
//    // Create camera Icon
//    var CameraIconTemplate = L.Icon.extend({
//        options: {
//            iconUrl: 'img/camera.png',
//            iconSize: [18, 18]
//        }
//    });
//    var cameraIcon = new CameraIconTemplate();
//    var camIcon = {
//        "icon": cameraIcon
//    };
//    var camPopup = camerapopup;
//    
//    // Add Camera to map
////    L.marker([latitude, longitude], { icon: cameraIcon }).addTo(map).bindPopup(camPopup);
//    L.marker([latitude, longitude], camIcon).addTo(map).bindPopup(camPopup);
//    
//    var endtime = performance.now();
//    var totaltime = endtime - starttime;
//    console.log(performance.now() + ", addCamera(" + camid + "), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n');
//}

