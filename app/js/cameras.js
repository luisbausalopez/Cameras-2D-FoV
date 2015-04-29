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
    if (appContent.console.outputLevel >= 2) { console.log(performance.now() + ", createRequestUrl(), START: " + starttime + '\n'); }
    
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
    
    var endtime = performance.now();
    var totaltime = endtime - starttime;
    
    if (appContent.track.endtime < endtime) {
        appContent.track.endtime = endtime;
        appContent.track.totaltime = appContent.track.endtime - appContent.track.starttime;
    }
    appContent.track.elapsedtime += totaltime;
    
    if (appContent.console.outputLevel >= 3) { console.log("requesturl");console.log(requesturl); }
    if (appContent.console.outputLevel >= 2) { console.log(performance.now() + ", createRequestUrl(), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n'); }
    
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
    if (appContent.console.outputLevel >= 2) { console.log(performance.now() + ", addFov(" + cameraid + "), START: " + starttime + '\n'); }

    // get 2D FoV Service request URL
    var fovreq = createRequestUrl(longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical);
    
    if (appContent.console.outputLevel >= 3) { 
        console.log("cameraid");console.log(cameraid); 
        console.log("fovreq");console.log(fovreq); 
    }
    
    var result = {};
        
    var fovStyles = {
        identification: {
            color: 'red', 
            weight: 7, 
            fillOpacity: 0.05, 
            opacity: 0.6
        },
        recognition: {
            color: 'magenta', 
            weight: 6, 
            fillOpacity: 0.05, 
            opacity: 0.6
        },
        detection: {
            color: 'orange', 
            weight: 5, 
            fillOpacity: 0.05, 
            opacity: 0.6
        },
        monitor: {
//            color: 'yellow', 
            color: '#FFE87C', // Sun Yellow
            weight: 4, 
            fillOpacity: 0.05, 
            opacity: 0.6,
            title: '{fovtype}'
        },
        visible: {
            color: 'green', 
            weight: 1, 
            fillOpacity: 0.3, 
            opacity: 0.1,
            title: 'FoV Visible',
            alt: 'ALT: FoV Visible'
        }
    };
    
    
    function success (data) {
        if (appContent.console.outputLevel >= 4) { console.log("success");console.log(data); }
        
        // get FoV features
        var fovFeatures = [ 
                data.features[0],   // Monitor & Control area
                data.features[1],   // Detection area
                data.features[2],   // Recognition area
                data.features[3]   // Identification area
            ];
        if (data.features[4] != null) { fovFeatures[4] = data.features[4]; }  // Visible area
//        else { fovFeatures[4] = null; }
        
        // Create FoV popups
        var fovpopups = [
            getFovPopup(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical, "Monitor & Control"),
            getFovPopup(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical, "Detection"),
            getFovPopup(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical, "Recognition"),
            getFovPopup(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical, "Identification"),
            getFovPopup(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical, "Visible")
        ];
        var fovpopuptemplate = fovPopupTemplate();
        
        // Enrich FoV features with camera specifications
        for (var i = 0; i < fovFeatures.length; i++) {
            if ( (data.features[i] != null) && (fovFeatures[i] != null) ) { 
//                fovFeatures[i].popupTemplate = fovpopups[i];
                fovFeatures[i].popupTemplate = fovpopuptemplate;
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
//                    case "Visible":
//                        fovFeatures[i].properties.fovtype = "Visible";
//                        break;
                    default:
//                        fovFeatures[i].properties.fovtype = "ERROR";
                        fovFeatures[i].properties.fovtype = "Visible";
                        break;
                }   // END SWITCH
            }   // END IF
        }   // END FOR

        // Create FoV GeoJSON feature layers, bind popups, add FoV features to FoV layers
        result.monitor = L.geoJson.css(fovFeatures[0], fovStyles.monitor);
        result.monitor.addTo(layers.monitor);
        result.detection = L.geoJson.css(fovFeatures[1], fovStyles.detection);
        result.detection.addTo(layers.detection);
        result.recognition = L.geoJson.css(fovFeatures[2], fovStyles.recognition);
        result.recognition.addTo(layers.recognition);
        result.identification = L.geoJson.css(fovFeatures[3], fovStyles.identification);
        result.identification.addTo(layers.identification);
        if ( (data.features[4] != null) && (fovFeatures[4] != null) ) {
            result.visible = L.geoJson.css(fovFeatures[4], fovStyles.visible);
            result.visible.addTo(layers.visible);
        }
        
        appContent.track.fovs[appContent.track.fovs.length] = fovFeatures;
        
        if (appContent.console.outputLevel >= 3) { console.log("fovFeatures");console.log(JSON.stringify(fovFeatures)); }
        
        map.spin(false);    // Stop Spin
        if (appContent.console.outputLevel >= 4) { console.log(performance.now() + ", Stop Spinning"); }
    }
    
        
    map.spin(true);    // Start Spin
    if (appContent.console.outputLevel >= 4) { console.log(performance.now() + ", Start Spinning"); }
    
    $.ajax({
        method: 'GET',
        dataType: "json",
        url: fovreq,
        success: success
    });
    
    
    // some variables for logging, tracking and debug
    var endtime = performance.now();
    var totaltime = endtime - starttime;
    
    if (appContent.track.endtime < endtime) {
        appContent.track.endtime = endtime;
        appContent.track.totaltime = appContent.track.endtime - appContent.track.starttime;
    }
    appContent.track.elapsedtime += totaltime;
    
    if (appContent.console.outputLevel >= 3) { console.log("result");console.log(result); }
    if (appContent.console.outputLevel >= 2) { console.log(performance.now() + ", addFov(" + cameraid + "), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n'); }
    
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
    if (appContent.console.outputLevel >= 2) { console.log(performance.now() + ", getFovPopup(), START: " + starttime + '\n'); }
    
    // Create FoV popup template
    var fovPopup = "<div class='popup'><h3 style='background-color:lightblue; text-align:center;'>" + fovtype + " FoV of <b>" + cameraid + "</b></h3>";    // Popup header
    fovPopup = fovPopup + "<table><tr><td><label>Camera ID: </label></td><td><input value='" + cameraid + "'></input></td></tr>";    // Camera ID
    fovPopup = fovPopup + "<tr><td><label>FoV type: </label></td><td><input value='" + fovtype + "'></input></td></tr>";    // FoV Type
    fovPopup = fovPopup + "<tr><td><label>Latitude: </label></td><td><input value='" + latitude + "'></input></td></tr>";    // Camera location - latitude 
    fovPopup = fovPopup + "<tr><td><label>Longitude: </label></td><td><input value='" + longitude + "'></input></td></tr>";    // Camera location - longitude
    fovPopup = fovPopup + "<tr><td><label>Rotation: </label></td><td><input value='" + rotation + "'>dg</input></td></tr>";    // Camera location - rotation (azimuth)
    fovPopup = fovPopup + "<tr><td><label>Current Focal length: </label></td><td><input value='" + focallength * 1000 + "'>mm</input></td></tr>";    // Current focal length
    fovPopup = fovPopup + "<tr><td><label>Sensor width: </label></td><td><input value='" + sensorwidth * 1000 + "'>mm</input></td></tr>";    // Sensor width
    fovPopup = fovPopup + "<tr><td><label>Vertical resolution: </label></td><td><input value='" + resolutionvertical + "'>px</input></td></tr></table></div>";    // Sensor resolution vertical (rows)
    
    
    // some variables for logging, tracking and debug
    var endtime = performance.now();
    var totaltime = endtime - starttime;
    
    if (appContent.track.endtime < endtime) {
        appContent.track.endtime = endtime;
        appContent.track.totaltime = appContent.track.endtime - appContent.track.starttime;
    }
    appContent.track.elapsedtime += totaltime;
    
    if (appContent.console.outputLevel >= 3) { console.log("fovPopup");console.log(fovPopup); }
    if (appContent.console.outputLevel >= 2) { console.log(performance.now() + ", getFovPopup(), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n'); }
    
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
    if (appContent.console.outputLevel >= 2) { console.log(performance.now() + ", fovPopupTemplate(), START: " + starttime + '\n'); }
    
    var fovPopup = "<div class='popup'><h3 style='background-color:lightblue; text-align:center;'>{fovtype} FoV of <b>{cameraid}</b></h3>";    // Popup header
    fovPopup = fovPopup + "<table><tr><td><label>Camera ID: </label></td><td><input value='{cameraid}' disabled></input></td></tr>";    // Camera ID
    fovPopup = fovPopup + "<tr><td><label>FoV type: </label></td><td><input value='{fovtype}' disabled></input></td></tr>";    // FoV Type
    fovPopup = fovPopup + "<tr><td><label>FoV zone: </label></td><td><input value='{zone}' disabled></input></td></tr>";    // FoV Type
    fovPopup = fovPopup + "<tr><td><label>Latitude: </label></td><td><input value='{latitude}' disabled></input></td></tr>";    // Camera location - latitude 
    fovPopup = fovPopup + "<tr><td><label>Longitude: </label></td><td><input value='{longitude}' disabled></input></td></tr>";    // Camera location - longitude
    fovPopup = fovPopup + "<tr><td><label>Rotation: </label></td><td><input value='{rotation}' disabled>dg</input></td></tr>";    // Camera location - rotation (azimuth)
    fovPopup = fovPopup + "<tr><td><label>Current Focal length: </label></td><td><input value='{focallength}' disabled>m</input></td></tr>";    // Current focal length
    fovPopup = fovPopup + "<tr><td><label>Sensor width: </label></td><td><input value='{sensorwidth}' disabled>m</input></td></tr>";    // Sensor width
    fovPopup = fovPopup + "<tr><td><label>Vertical resolution: </label></td><td><input value='{resolutionvert}' disabled>px</input></td></tr></table></div>";    // Sensor resolution vertical (rows)
    
    // some variables for logging, tracking and debug
    var endtime = performance.now();
    var totaltime = endtime - starttime;
    
    if (appContent.track.endtime < endtime) {
        appContent.track.endtime = endtime;
        appContent.track.totaltime = appContent.track.endtime - appContent.track.starttime;
    }
    appContent.track.elapsedtime += totaltime;
    
    if (appContent.console.outputLevel >= 3) { console.log("fovPopup");console.log(fovPopup); }
    if (appContent.console.outputLevel >= 2) { console.log(performance.now() + ", fovPopupTemplate(), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n'); }
    
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
    if (appContent.console.outputLevel >= 2) { console.log(performance.now() + ", createGeoJsonCamera(" + id + "), START: " + starttime + '\n'); }
    
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
    
    
    var endtime = performance.now();
    var totaltime = endtime - starttime;
    
    if (appContent.track.endtime < endtime) {
        appContent.track.endtime = endtime;
        appContent.track.totaltime = appContent.track.endtime - appContent.track.starttime;
    }
    appContent.track.elapsedtime += totaltime;
    
    if (appContent.console.outputLevel >= 3) {
        console.log("CameraID");console.log(id); 
        console.log("camPopup");console.log(camPopup); 
        console.log("camPopupTemplate");console.log(camPopupTemplate); 
        console.log("gjcam");console.log(gjcam); 
    }
    if (appContent.console.outputLevel >= 2) { console.log(performance.now() + ", createGeoJsonCamera(" + id + "), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n'); }
    
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
    if (appContent.console.outputLevel >= 2) { console.log(performance.now() + ", cameraPopupTemplate(), START: " + starttime + '\n'); }
    
    // Create Camera popup template
    var camPopup = "<div class='popup'><h3 style='background-color:lightblue; text-align:center;'>DITSS Camera <b>{id}</b></h3>";    // Popup header
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
    
    // some variables for logging, tracking and debug
    var endtime = performance.now();
    var totaltime = endtime - starttime;
    
    if (appContent.track.endtime < endtime) {
        appContent.track.endtime = endtime;
        appContent.track.totaltime = appContent.track.endtime - appContent.track.starttime;
    }
    appContent.track.elapsedtime += totaltime;
    
    if (appContent.console.outputLevel >= 3) { console.log("camPopup");console.log(camPopup); }
    if (appContent.console.outputLevel >= 2) { console.log(performance.now() + ", cameraPopupTemplate(), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n'); }
    
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
    if (appContent.console.outputLevel >= 2) { console.log(performance.now() + ", createCameraPopup(" + id + "), START: " + starttime + '\n'); }
    
    // Create Camera popup
    var camPopup = "<div class='popup'><h3 style='background-color:lightblue; text-align:center;'>DITSS Camera <b>" + id + "</b></h3>";    // Popup header
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
    
    // some variables for logging, tracking and debug
    var endtime = performance.now();
    var totaltime = endtime - starttime;
    
    if (appContent.track.endtime < endtime) {
        appContent.track.endtime = endtime;
        appContent.track.totaltime = appContent.track.endtime - appContent.track.starttime;
    }
    appContent.track.elapsedtime += totaltime;
    
    if (appContent.console.outputLevel >= 3) { 
        console.log("CameraID");console.log(id); 
        console.log("camPopup");console.log(camPopup); 
    }
    if (appContent.console.outputLevel >= 2) { console.log(performance.now() + ", createCameraPopup(" + id + "), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n'); }
    
    return camPopup;
}        // END createCameraPopup






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
    if (appContent.console.outputLevel >= 1) { console.log(performance.now() + ", getCams3(" + camsUrl + "), START: " + starttime + '\n'); }
    
    var mycamerasjson = [];
    var mycamerasgeojson = [];
    var myfovs = [];
    
    var camerasLayer = camlay;  // Cameras Layer
    var fovLayers = fovlay;     // FoV layers: identification, recognition, detection, monitor, visible
    
        
    map.spin(true);
    
    // get Cameras
    $.getJSON(camsUrl, function (data) { 
        var starttime = performance.now();
        for (var i = 0; i < data.length; i++) {     // for each camera
            var time0 = performance.now();
            if (appContent.console.outputLevel >= 2) { console.log(performance.now() + ", getCams3(), $.getJSON(), Camera: " + data[i].Camera_ID); }
            
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
            
            // Create GeoJSON Camera feature
            var cameraGeoJSONFeature = createGeoJsonCamera(id, name, camtype, cammodel, cambrand, camregion, camarea, lat, lon, rot, foclen, fldef, flmax, flmin, sh, sw, srv, srh);
            
            // Add Camera to layer
            var cam = L.geoJson.css(cameraGeoJSONFeature);
            cam.addTo(camerasLayer);
            
            // get FoVs GeoJSON
            var fieldsofview = getFovs(id, lon, lat, rot, foclen2, sh, srv, fovLayers);
            
            var mycamerasjsonindex = mycamerasjson.length;
            mycamerasjson[mycamerasjsonindex] = data[i];
            var mycamerasgeojsonindex = mycamerasgeojson.length;
            mycamerasgeojson[mycamerasgeojsonindex] = cameraGeoJSONFeature;
            var myfovsindex = myfovs.length;
            myfovs[myfovsindex] = fieldsofview;
            
            if (appContent.console.outputLevel >= 4) { 
                console.log("mycamerasjson");console.log(JSON.stringify(mycamerasjson)); 
                console.log("mycamerasgeojson");console.log(JSON.stringify(mycamerasgeojson)); 
                console.log("myfovs");console.log(JSON.stringify(myfovs)); 
                console.log("mycamerasjson");console.log(JSON.stringify(mycamerasjson)); 
                console.log("mycamerasjson");console.log(JSON.stringify(mycamerasjson)); 
            }
        }       // END FOR
        
        var endtime = performance.now();
        var totaltime = endtime - starttime;

        if (appContent.track.endtime < endtime) {
            appContent.track.endtime = endtime;
            appContent.track.totaltime = appContent.track.endtime - appContent.track.starttime;
        }
        appContent.track.elapsedtime += totaltime;
        
        if (appContent.console.outputLevel >= 3) { 
            console.log("mycamerasjson");console.log(JSON.stringify(mycamerasjson)); 
            console.log("mycamerasgeojson");console.log(JSON.stringify(mycamerasgeojson)); 
            console.log("myfovs");console.log(JSON.stringify(myfovs)); 
        }
        if (appContent.console.outputLevel >= 2) { console.log(performance.now() + ", getCams3().getJSON(), END FOR: " + endtime + ", Exec time (ms): " + totaltime + '\n'); }
        
        map.spin(false);
        map.spin(false);
    });     // END getJSON
    
    var result = {
        cameras: camerasLayer,
        identification: fovLayers.identification,
        recognition: fovLayers.recognition,
        detection: fovLayers.detection,
        monitor: fovLayers.monitor,
        visible: fovLayers.visible
    };
    
    var endtime = performance.now();
    var totaltime = endtime - starttime;
    
    if (appContent.track.endtime < endtime) {
        appContent.track.endtime = endtime;
        appContent.track.totaltime = appContent.track.endtime - appContent.track.starttime;
    }
    appContent.track.elapsedtime += totaltime;
    
    if (appContent.console.outputLevel >= 3) { console.log("result");console.log(result); }
    if (appContent.console.outputLevel >= 1) { console.log(performance.now() + ", getCams3(), END: " + endtime + ", Exec: " + totaltime + '\n'); }
    
    return result;
}       // END getCams3









/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
////////////////                           //////////////
////////////////      getWFSCameras2()     //////////////
////////////////                           //////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// getWFSCameras2 () - 
function getWFSCameras2 (url, camLayer, fovLayers) {
    var starttime = performance.now();
    if (appContent.console.outputLevel >= 1) { console.log(performance.now() + ", getWFSCameras2(" + url + "), START: " + starttime + '\n'); }
    if (appContent.console.outputLevel >= 3) { 
        console.log('url');console.log(url); 
        console.log('camLayer');console.log(camLayer); 
        console.log('fovLayers');console.log(fovLayers); 
    }
    
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
    var cameras = camLayer;
    var fovs = {
        identification: fovLayers.identification,
        recognition: fovLayers.recognition,
        detection: fovLayers.detection,
        monitor: fovLayers.monitor,
        visible: fovLayers.visible,
    };
    if (appContent.console.outputLevel >= 3) { 
        console.log('wfsrequesturl');console.log(wfsrequesturl); 
        console.log('cameras');console.log(cameras); 
        console.log('fovs');console.log(fovs); 
    }
    
    function loadData(data) {
        var starttime = performance.now();
        if (appContent.console.outputLevel >= 3) { console.log("data");console.log(data); }
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
            if (appContent.console.outputLevel >= 4) { 
                console.log(performance.now() + ', for f in features: ');
                console.log('features: ');console.log(features);
                console.log('f: ');console.log(f);
                console.log('features[f]: ');console.log(features[f]);
                console.log('fobj: ');console.log(fobj);
            }
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
            
            var geoJsonCamera = createGeoJsonCamera (id, name, camtype, cammodel, cambrand, camregion, camarea, lat, lon, rot, foclen, fldef, flmax, flmin, sh, sw, srv, srh);
            geoJsonCamera.properties.objectid = objectid;
            geoJsonCamera.properties.shape = shape;
            geoJsonCamera.properties.canpan = canpan;
            geoJsonCamera.properties.cantilt = cantilt;
            geoJsonCamera.properties.canzoom = canzoom;
            geoJsonCamera.properties.comments = comments;
            geoJsonCamera.properties.createdat = createdat;
            geoJsonCamera.properties.updatedat = updatedat;
            
            var ops = {
                title: geoJsonCamera.name,
                alt: geoJsonCamera.name
            };
            var cameraFeature = L.geoJson.css(geoJsonCamera, ops);
//            var cameraFeature = L.geoJson.css(geoJsonCamera);
            
            var foclen2 = (flmax + flmin*7)/8;
//            var camFovs = setTimeout(getFovs(id, lon, lat, rot, foclen2, sh, srv, fovs), 1500);
            var camFovs = getFovs(id, lon, lat, rot, foclen2, sh, srv, fovs);
//            var camFovs = getFovs2(id, lon, lat, rot, foclen2, sh, srv);
            
//            setTimeout(cameraFeature.addTo(cameras), 1500);
            cameraFeature.addTo(cameras);
//            camFovs.identification.addTo(fovs.identification);
//            camFovs.recognition.addTo(fovs.recognition);
//            camFovs.detection.addTo(fovs.detection);
//            camFovs.monitor.addTo(fovs.monitor);
//            if ( camFovs.visible != null ) { camFovs.visible.addTo(fovs.visible); }
            
            appContent.track.cams[appContent.track.cams.length] = geoJsonCamera;
            
            if (appContent.console.outputLevel >= 4) { 
                console.log(performance.now() + ", Camera details: ");
                console.log("id: ");console.log(id); 
                console.log("objectid: ");console.log(objectid); 
                console.log("shape: ");console.log(shape); 
                console.log("canpan: ");console.log(canpan); 
                console.log("cantilt: ");console.log(cantilt); 
                console.log("canzoom: ");console.log(canzoom); 
                console.log("comments: ");console.log(comments); 
                console.log("createdat: ");console.log(createdat); 
                console.log("updatedat: ");console.log(updatedat); 
                console.log("name: ");console.log(name); 
                console.log("camtype: ");console.log(camtype); 
                console.log("cammodel: ");console.log(cammodel); 
                console.log("cambrand: ");console.log(cambrand); 
                console.log("camregion: ");console.log(camregion); 
                console.log("camarea: ");console.log(camarea); 
                console.log("lat: ");console.log(lat); 
                console.log("lon: ");console.log(lon); 
                console.log("rot: ");console.log(rot); 
                console.log("foclen: ");console.log(foclen); 
                console.log("foclen2: ");console.log(foclen2); 
                console.log("fldef: ");console.log(fldef); 
                console.log("flmax: ");console.log(flmax); 
                console.log("flmin: ");console.log(flmin); 
                console.log("sh: ");console.log(sh); 
                console.log("sw: ");console.log(sw); 
                console.log("srv: ");console.log(srv); 
                console.log("srh: ");console.log(srh); 
            }
            if (appContent.console.outputLevel >= 3) { 
//                console.log("geoJsonCamera");console.log(JSON.stringify(geoJsonCamera)); 
                console.log("geoJsonCamera");console.log(geoJsonCamera); 
//                console.log("cameraFeature");console.log(JSON.stringify(cameraFeature)); 
                console.log("cameraFeature");console.log(cameraFeature); 
//                console.log("camFovs");console.log(JSON.stringify(camFovs)); 
                console.log("camFovs");console.log(camFovs); 
            }
            
        }   // END FOR f in features
        
        var endtime = performance.now();
        var totaltime = endtime - starttime;
        if (appContent.track.endtime < endtime) {
            appContent.track.endtime = endtime;
            appContent.track.totaltime = appContent.track.endtime - appContent.track.starttime;
        }
        appContent.track.elapsedtime += totaltime;
        
        if (appContent.console.outputLevel >= 2) { console.log(performance.now() + ", getWFSCameras2().ajax(), END FOR: " + endtime + ", Exec time (ms): " + totaltime + '\n'); }
        
        map.spin(false);
        map.spin(false);
        
    }   // END Ajax Request - Load Data

        
    map.spin(true);
//    map.fireEvent('dataloading');
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
    
    var endtime = performance.now();
    var totaltime = endtime - starttime;
    
    if (appContent.track.endtime < endtime) {
        appContent.track.endtime = endtime;
        appContent.track.totaltime = appContent.track.endtime - appContent.track.starttime;
    }
    appContent.track.elapsedtime += totaltime;
    
    if (appContent.console.outputLevel >= 3) { console.log("result");console.log(result); }
    if (appContent.console.outputLevel >= 1) { console.log(performance.now() + ", getWFSCameras2(), END: " + endtime + ", Exec: " + totaltime + '\n'); }
    
    return result;
}   // END getWFSCameras2()















/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
////////////////                           //////////////
////////////////      getWFSCameras()      //////////////
////////////////                           //////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//// getWFSCameras() - get cameras from WFS-T and their FoVs from service
//function getWFSCameras (layer) {
//    var starttime = performance.now();
//    console.log(performance.now() + ", getWFSCameras(), START: " + starttime + '\n');
//    
//    var geojsonLayer = layer;
//    var wfsrequesturl = "/service/localhostarcgis/services/Cameras/Cameras_Ekkersrijt_20150319/MapServer/WFSServer?request=getfeature&typename=Cameras_Ekkersrijt_withspecs";   // "http://localhost:6080/arcgis/services/...
//    
////    var currSelectionLayer = 'Cameras_Ekkersrijt_withspecs';
////    var sw_lat = 51.49702;  // lowerCorner = [51.49702, 5.451279];
////    var sw_long = 5.451279;
////    var ne_lat = 51.504995;  // upperCorner = [51.504995, 5.493454];
////    var ne_long = 5.493454;
////    var wfsrequesturl = "http://localhost:6080/arcgis/services/Cameras/Cameras_Ekkersrijt_20150319/MapServer/WFSServer?request=getfeature&typename=Cameras_Ekkersrijt_withspecs";
//    
//    function loadData(data) {
//        console.log(data);
//        function xml2JSON(xml) {
//            var obj = {};
//            if (xml.nodeType == 1) {                
//                if (xml.attributes.length > 0) {
//                    obj["@attributes"] = {};
//                    for (var j = 0; j < xml.attributes.length; j++) {
//                        var attribute = xml.attributes.item(j);
//                        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
//                    }
//                }
//            } else if (xml.nodeType == 3) { 
//                obj = xml.nodeValue;
//            }            
//            if (xml.hasChildNodes()) {
//                for (var i = 0; i < xml.childNodes.length; i++) {
//                    var item = xml.childNodes.item(i);
//                    var nodeName = item.nodeName;
//                    if (typeof (obj[nodeName]) == "undefined") {
//                        obj[nodeName] = xml2JSON(item);
//                    } else {
//                        if (typeof (obj[nodeName].push) == "undefined") {
//                            var old = obj[nodeName];
//                            obj[nodeName] = [];
//                            obj[nodeName].push(old);
//                        }
//                        obj[nodeName].push(xml2JSON(item));
//                    }
//                }
//            }
//            return obj;
//        }
//        var inJSON = xml2JSON(data);
//        console.log(inJSON);
////        var fcoll = inJSON["wfs:FeatureCollection"];
////        console.log(fcoll);
////        var features = fcoll["gml:featureMember"];
//        var features = inJSON["wfs:FeatureCollection"]["gml:featureMember"];
//        console.log(features);
//        for (f in features) {
//            var fobj = features[f]["Cameras_Ekkersrijt_20150319:Cameras_Ekkersrijt_withspecs"];
//            console.log(fobj);
////            Cameras_Ekkersrijt_20150319:Azimuth
////            Cameras_Ekkersrijt_20150319:Brand
////            Cameras_Ekkersrijt_20150319:Camera_ID
////            Cameras_Ekkersrijt_20150319:CanPan
////            Cameras_Ekkersrijt_20150319:CanTilt
////            Cameras_Ekkersrijt_20150319:CanZoom
////            Cameras_Ekkersrijt_20150319:Comments
////            Cameras_Ekkersrijt_20150319:CreatedAt
////            Cameras_Ekkersrijt_20150319:FocalLengthDefault
////            Cameras_Ekkersrijt_20150319:FocalLengthMax
////            Cameras_Ekkersrijt_20150319:FocalLengthMin
////            Cameras_Ekkersrijt_20150319:LastUpdatedAt
////            Cameras_Ekkersrijt_20150319:Lat
////            Cameras_Ekkersrijt_20150319:Lon
////            Cameras_Ekkersrijt_20150319:Model
////            Cameras_Ekkersrijt_20150319:OBJECTID
////            Cameras_Ekkersrijt_20150319:Region
////            Cameras_Ekkersrijt_20150319:SensorResolutionHorizontal
////            Cameras_Ekkersrijt_20150319:SensorResolutionVertical
////            Cameras_Ekkersrijt_20150319:SensorSizeHeight
////            Cameras_Ekkersrijt_20150319:SensorSizeWidth
////            Cameras_Ekkersrijt_20150319:Shape
////            Cameras_Ekkersrijt_20150319:Type
////            Cameras_Ekkersrijt_20150319:mp4managed.sde.Cameras_Ekkersrijt_withspecs.area
//            
//            var id = fobj["Cameras_Ekkersrijt_20150319:Camera_ID"]["#text"], 
//                camtype = fobj["Cameras_Ekkersrijt_20150319:Type"]["#text"], 
//                cammodel = fobj["Cameras_Ekkersrijt_20150319:Model"]["#text"], 
//                cambrand = fobj["Cameras_Ekkersrijt_20150319:Brand"]["#text"], 
//                camregion = fobj["Cameras_Ekkersrijt_20150319:Region"]["#text"], 
//                camarea = fobj["Cameras_Ekkersrijt_20150319:mp4managed.sde.Cameras_Ekkersrijt_withspecs.area"]["#text"], 
//                // lat and lon are switched in the original dataset due to a mistake
//                lat = Number( fobj["Cameras_Ekkersrijt_20150319:Lon"]["#text"] ), 
//                lon = Number( fobj["Cameras_Ekkersrijt_20150319:Lat"]["#text"] ), 
////                lat = Number( fobj["Cameras_Ekkersrijt_20150319:Lat"]["#text"] ), 
////                lon = Number( fobj["Cameras_Ekkersrijt_20150319:Lon"]["#text"] ), 
//                rot = Number( fobj["Cameras_Ekkersrijt_20150319:Azimuth"]["#text"] ), 
//                foclen = Number( fobj["Cameras_Ekkersrijt_20150319:FocalLengthDefault"]["#text"] ), 
//                fldef = Number( fobj["Cameras_Ekkersrijt_20150319:FocalLengthDefault"]["#text"] ), 
//                flmax = Number( fobj["Cameras_Ekkersrijt_20150319:FocalLengthMax"]["#text"] ), 
//                flmin = Number( fobj["Cameras_Ekkersrijt_20150319:FocalLengthMin"]["#text"] ), 
//                sh = Number( fobj["Cameras_Ekkersrijt_20150319:SensorSizeHeight"]["#text"] ), 
//                sw = Number( fobj["Cameras_Ekkersrijt_20150319:SensorSizeWidth"]["#text"] ), 
//                srv = Number( fobj["Cameras_Ekkersrijt_20150319:SensorResolutionVertical"]["#text"] ), 
//                srh = Number( fobj["Cameras_Ekkersrijt_20150319:SensorResolutionHorizontal"]["#text"] ),
//                name = camtype + " - " + id;
//            
//            console.log("id, name, camtype, cammodel, cambrand, camregion, camarea, lat, lon, rot, foclen, fldef, flmax, flmin, sh, sw, srv, srh = " + id + ", " + name + ", " + camtype + ", " + cammodel + ", " + cambrand + ", " + camregion + ", " + camarea + ", " + lat + ", " + lon + ", " + rot + ", " + foclen + ", " + fldef + ", " + flmax + ", " + flmin + ", " + sh + ", " + sw + ", " + srv + ", " + srh);
//            
////            var geoJsonCamera = createGeoJsonCamera (id, name, camtype, cammodel, cambrand, camregion, camarea, lat, lon, rot, foclen, fldef, flmax, flmin, sh, sw, srv, srh);
////            console.log(geoJsonCamera);
////            var cameraFeature = L.geoJson.css(geoJsonCamera);
//            var cameraFeature = L.geoJson.css(createGeoJsonCamera (id, name, camtype, cammodel, cambrand, camregion, camarea, lat, lon, rot, foclen, fldef, flmax, flmin, sh, sw, srv, srh));
//            console.log(cameraFeature);
//            
//            // HERE QUERY AND LOAD THE FoVS OF EACH CAMERA
//
//            cameraFeature.addTo(geojsonLayer);
////            geojsonLayer.addData(cameraFeature);
//        }   // END FOR
////        geojsonLayer.addData(data);
////        geojsonLayer.addTo(map);
//    }   // END Ajax Request - Load Data
//
//    
//    // AJAX request to the WFS-T Service: getFeatures()
//    $.ajax({
//            url: wfsrequesturl,
//            dataType: 'xml',
//            success: loadData
//    });
//
////    $.ajax({
////            url: geoJsonUrl,
////            dataType: 'jsonp',
////            jsonpCallback: 'getJson',
////            contentType: 'application/json',
////            contentType: 'text/xml',
////            success: loadData
////    });
//    
//    
//    
//    var endtime = performance.now();
//    var totaltime = endtime - starttime;
//    console.log(performance.now() + ", getWFSCameras(), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n');
//    
////    return camerasLayer;
//    return geojsonLayer;
//}       //  END getWFSCameras()







/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
////////////////                           //////////////
////////////////        getCams2()         //////////////
////////////////                           //////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//// getCams2() - get cameras and their FoVs and adds them to the map
//function getCams2(camsUrl, camlay, fovlay) {
//    // some variables for logging, tracking and debug
//    var starttime = performance.now();
//    console.log(performance.now() + ", getCams2(" + camsUrl + "), START: " + starttime + '\n');
//    var mycamerasjson = [];
//    var mycamerasgeojson = [];
//    var myfovs = [];
//    
//    var camerasLayerClustered = camlay;  // Cameras Layer
//    var fovLayers = fovlay;     // FoV layers: identification, recognition, detection, monitor, visible
//    
//    // get Cameras
//    $.getJSON(camsUrl, function (data) { 
//        for (var i = 0; i < data.length; i++) {     // for each camera
//            var time0 = performance.now();
//            console.log(performance.now() + ", getCams2(), $.getJSON(), Camera: " + data[i].Camera_ID);
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
//                foclen2 = (flmax + flmin*7)/8, // smaller random focal length
//                sh = data[i].SensorSizeHeight,
//                sw = data[i].SensorSizeWidth,
//                srv = data[i].SensorResolutionVertical,
//                srh = data[i].SensorResolutionHorizontal,
//                cambrand = data[i].Brand,
//                cammodel = data[i].Model,
//                camarea = data[i].Area,
//                camregion = data[i].Region,
//                camerastyle = {
//                    "icon": {
//                        "iconUrl": 'img/camera.png',
//                        "iconSize": [18, 18],
//                        "iconAnchor": [9, 9]
//                    }
//                };
////            var campopuptemplate = "{popupContent}";
////            var campopuptemplate = "{camtype} - <strong>{id}</strong>";
////            var campopuptemplate = cameraPopupTemplate();
//            
//            // Create GeoJSON Camera feature
//            var cameraGeoJSONFeature = createGeoJsonCamera(id, name, camtype, cammodel, cambrand, camregion, camarea, lat, lon, rot, foclen, fldef, flmax, flmin, sh, sw, srv, srh);
//            
//            var time1 = performance.now();
//            
//            // Add Camera to layer
//            var cam = L.geoJson.css(cameraGeoJSONFeature);
//            cam.addTo(camerasLayerClustered);
////            cam.addTo(camlay);
//            
//            var time2 = performance.now();
//            
//            // get FoVs GeoJSON
////            var fieldsofview = getFovs(id, lon, lat, rot, foclen2, sh, srv, fovlay);
//            var fieldsofview = getFovs(id, lon, lat, rot, foclen2, sh, srv, fovLayers);
//            
//            mycamerasjson[mycamerasjson.length] = data[i];
//            mycamerasgeojson[mycamerasgeojson.length] = cameraGeoJSONFeature;
//            myfovs[myfovs.length] = fieldsofview;
//            
//            var time3 = performance.now();
//            var time01 = time1 - time0;
//            console.log(performance.now() + ", Cam: " + data[i].Camera_ID + ", T01: " + time01 + '\n');
//            var time12 = time2 - time1;
//            console.log(performance.now() + ", Cam: " + data[i].Camera_ID + ", T12: " + time12 + '\n');
//            var time23 = time3 - time2;
//            console.log(performance.now() + ", Cam: " + data[i].Camera_ID + ", T23: " + time23 + '\n');
//            var time13 = time3 - time1;
//            console.log(performance.now() + ", Cam: " + data[i].Camera_ID + ", T13: " + time13 + '\n');
//            var time03 = time3 - time0;
//            console.log(performance.now() + ", Cam: " + data[i].Camera_ID + ", T03: " + time03 + '\n');
//            console.log(performance.now() + ", data[i]" + '\n');
//            console.log(data[i]);
//            console.log(performance.now() + ", mycamerasjson[mycamerasjson.length-1]" + '\n');
//            console.log(mycamerasjson[mycamerasjson.length-1]);
//            console.log(performance.now() + ", cameraGeoJSONFeature" + '\n');
//            console.log(cameraGeoJSONFeature);
//            console.log(performance.now() + ", mycamerasgeojson[mycamerasgeojson.length-1]" + '\n');
//            console.log(mycamerasgeojson[mycamerasgeojson.length-1]);
//            console.log(performance.now() + ", mycamerasjson" + '\n');
//            console.log(mycamerasjson);
//            console.log(performance.now() + ", mycamerasgeojson" + '\n');
//            console.log(mycamerasgeojson);
//            console.log(performance.now() + ", cam" + '\n');
//            console.log(cam);
//            console.log(performance.now() + ", camerasLayerClustered" + '\n');
//            console.log(camerasLayerClustered);
//            console.log(performance.now() + ", fieldsofview" + '\n');
//            console.log(fieldsofview);
//            console.log(performance.now() + ", myfovs[myfovs.length-1]" + '\n');
//            console.log(myfovs[myfovs.length-1]);
//            console.log(performance.now() + ", myfovs" + '\n');
//            console.log(myfovs);
//            
//            console.log(JSON.stringify(data[i]));
//            console.log(JSON.stringify(mycamerasjson[mycamerasjson.length-1]));
//            console.log(JSON.stringify(cameraGeoJSONFeature));
//            console.log(JSON.stringify(mycamerasgeojson[mycamerasgeojson.length-1]));
//            console.log(JSON.stringify(mycamerasjson));
//            console.log(JSON.stringify(cam));
//            console.log(JSON.stringify(camerasLayerClustered));
//            console.log(JSON.stringify(fieldsofview));
//            console.log(JSON.stringify(myfovs[myfovs.length-1]));
//            console.log(JSON.stringify(myfovs));
//            
//        }       // END FOR
//        console.log("END FOR \n\n\n\n\n\n camerasLayerClustered \n mycamerasjson \n mycamerasgeojson \n");
//        console.log(camerasLayerClustered);
//        console.log(mycamerasjson);
//        console.log(mycamerasgeojson);
//    });     // END getJSON
//    console.log("END getJSON\n\n\n\n\n\n\n");
//    console.log("camerasLayerClustered");
//    console.log(camerasLayerClustered);
//    console.log("mycamerasjson");
//    console.log(mycamerasjson);
//    console.log("mycamerasgeojson");
//    console.log(mycamerasgeojson);
//    console.log("fovlay");
//    console.log(fovlay);
//    
//    console.log(JSON.stringify(camerasLayerClustered));
//    console.log(JSON.stringify(mycamerasjson));
//    console.log(JSON.stringify(mycamerasgeojson));
//    console.log(JSON.stringify(fovlay));
//    
//    var endtime = performance.now();
//    var totaltime = endtime - starttime;
//    console.log(performance.now() + ", getCams2(" + camsUrl + "), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n');
//}       // END getCams2







/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
////////////////                           //////////////
////////////////         getFovs2()        //////////////
////////////////                           //////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
////  getFovs2() - performs a request to the 2D FoV service and adds the response FoV polygons to the map
//function getFovs2(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical) {
//    var starttime = performance.now();
//    console.log(performance.now() + ", addFov(" + cameraid + "), START: " + starttime + '\n');
//
//    // get 2D FoV Service request URL
//    var fovreq = createRequestUrl(longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical);
//    console.log(performance.now() + ", addFov(" + cameraid + "), Request URL: " + fovreq + '\n');
//    
//    var result = {};
//        
//    var fovStyles = {
//        identification: {
//            color: 'red', 
//            weight: 5, 
//            fillOpacity: 0.7, 
//            opacity: 0.1
//        },
//        recognition: {
//            color: 'pink', 
//            weight: 4, 
//            fillOpacity: 0.6, 
//            opacity: 0.1
//        },
//        detection: {
//            color: 'orange', 
//            weight: 3, 
//            fillOpacity: 0.5, 
//            opacity: 0.1
//        },
//        monitor: {
//            color: 'yellow', 
//            weight: 2, 
//            fillOpacity: 0.4, 
//            opacity: 0.1
//        },
//        visible: {
//            color: 'green', 
//            weight: 1, 
//            fillOpacity: 0.3, 
//            opacity: 0.1
//        }
//    };
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
//        if (data.features[4] != null) { fovFeatures[4] = data.features[4]; }   // Visible area
//        
//        // Create FoV popups
//        var fovpopups = [
//            getFovPopup(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical, "Monitor & Control"),
//            getFovPopup(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical, "Detection"),
//            getFovPopup(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical, "Recognition"),
//            getFovPopup(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical, "Identification"),
//            getFovPopup(cameraid, longitude, latitude, rotation, focallength, sensorwidth, resolutionvertical, "Visible")
//        ];
//        
//        // Enrich FoV features with camera specifications
//        for (var i = 0; i < fovFeatures.length; i++) {
//            if ( (data.features[i] != null) && (fovFeatures[i] != null) ) { 
//                fovFeatures[i].popupTemplate = fovpopups[i];
//                fovFeatures[i].properties.popupContent = fovpopups[i]; 
//                fovFeatures[i].crs = 4326;
//                fovFeatures[i].geometry.crs = 4326;
//                fovFeatures[i].properties.crs = 4326;
//                fovFeatures[i].properties.cameraid = cameraid;
//                fovFeatures[i].properties.latitude = latitude;
//                fovFeatures[i].properties.longitude = longitude;
//                fovFeatures[i].properties.rotation = rotation;
//                fovFeatures[i].properties.focallength = focallength;
//                fovFeatures[i].properties.resolutionvert = resolutionvertical;
//                fovFeatures[i].properties.sensorwidth = sensorwidth;
//                fovFeatures[i].properties.featuretype = "FoV";
//                
//                switch (fovFeatures[i].properties.zone) {
//                    case "Monitoring":
//                        fovFeatures[i].properties.fovtype = "Monitor & Control";
//                        break;
//                    case "Detection":
//                        fovFeatures[i].properties.fovtype = "Detection";
//                        break;
//                    case "Recognition":
//                        fovFeatures[i].properties.fovtype = "Recognition";
//                        break;
//                    case "Identification":
//                        fovFeatures[i].properties.fovtype = "Identification";
//                        break;
//                    case "Visible":
//                        fovFeatures[i].properties.fovtype = "Visible";
//                        break;
//                    default:
//                        fovFeatures[i].properties.fovtype = "ERROR";
//                        break;
//                }   // END SWITCH
//                
//            }   // END IF
//            
//        }   // END FOR
//
//        // Create GeoJSON FoV layer features, bind popups and add them to FoV layers
//        // monitor
//        result.monitor = L.geoJson.css(fovFeatures[0], fovStyles.monitor);
//        result.monitor.bindPopup(fovFeatures[0].properties.popupContent);
////        result.monitor.addTo(layers.monitor);
//        // detection
//        result.detection = L.geoJson.css(fovFeatures[1], fovStyles.detection);
//        result.detection.bindPopup(fovFeatures[1].properties.popupContent);
////        result.detection.addTo(layers.detection);
//        // recognition
//        result.recognition = L.geoJson.css(fovFeatures[2], fovStyles.recognition);
//        result.recognition.bindPopup(fovFeatures[2].properties.popupContent);
////        result.recognition.addTo(layers.recognition);
//        // identification
//        result.identification = L.geoJson.css(fovFeatures[3], fovStyles.identification);
//        result.identification.bindPopup(fovFeatures[3].properties.popupContent);
////        result.identification.addTo(layers.identification);
//        // visible
//        if (data.features[4] != null) {
//            result.visible = L.geoJson.css(fovFeatures[4], fovStyles.visible);
//            result.visible.bindPopup(fovFeatures[4].properties.popupContent);
////            result.visible.addTo(layers.visible);
//        } else { result.visible = null; }
//        
//        // some variables for logging, tracking and debug
//            console.log(fovpopups);
//            console.log(fovFeatures);
//            console.log(performance.now() + ", addFov() " + cameraid + " M&C: " + fovFeatures[0] + ", Popup: " + fovpopups[0] +'\n');
//            console.log(fovFeatures[0]);
//            console.log(result.monitor);
//            console.log(performance.now() + ", addFov() " + cameraid + " Detec: " + fovFeatures[1] + ", Popup: " + fovpopups[1] +'\n');
//            console.log(fovFeatures[1]);
//            console.log(result.detection);
//            console.log(performance.now() + ", addFov() " + cameraid + " Recog: " + fovFeatures[2] + ", Popup: " + fovpopups[2] +'\n');
//            console.log(fovFeatures[2]);
//            console.log(result.recognition);
//            console.log(performance.now() + ", addFov() " + cameraid + " Ident: " + fovFeatures[3] + ", Popup: " + fovpopups[3] +'\n');
//            console.log(fovFeatures[3]);
//            console.log(result.identification);
//        if (data.features[4] != null) { 
//            console.log(performance.now() + ", addFov() " + cameraid + " Visib: " + fovFeatures[4] + ", Popup: " + fovpopups[4] +'\n');
//            console.log(fovFeatures[4]);
//            console.log(result.visible);
//        }
//        
//    }); // END $.GetJSON
//    
//    // some variables for logging, tracking and debug
//    console.log(result);
//    var endtime = performance.now();
//    var totaltime = endtime - starttime;
//    console.log(performance.now() + ", addFov(" + cameraid + "), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n');
//    
//    return result;
//}       // END getFovs2()





                                              





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

