/////////////////////////////////////////////////////////////////////////////
// 
// 
//              CAMERAS WFS-T SERVICE PERFORMANCE TEST
// 
// 
/////////////////////////////////////////////////////////////////////////////
// 
//      Luis Bausá López
// 
//      Amsterdam, 2015
// 
//      * Spinlab, FEWEB-RE, VU Amsterdam
//      * Geodan
// 
//      Funded by EU Marie Curie Multi-Pos Project (www.multi-pos.eu)
//      under grant Nr. xxxxxxxxx
// 
/////////////////////////////////////////////////////////////////////////////
// 
//      This test will create a predefined number of camera features and,
//      for each camera created, it will perform a series of requests to the
//      WFS-T service to insert, edit and delete the cameras. 
//      Whenever a camera is to be updated or deleted it must be locked first,
//      and the returned lock Id provided to the update/delete request.
//      As a result the test will perform the following requests:
//          Create      N       cameras 
//          Perform     N       Insert requests 
//          Perform     N       Update requests 
//          Perform     N       Delete requests 
//          Perform     2 * N   Lock requests 
//          
//      Example: for 10 cameras, the test will perform a total of 50 requests: 
//          10 Insert, 10 Update, 10 Delete and 20 Lock requests.
//          
//      The number of cameras N is specified by the nCameras variable below.
//      The URL of the Cameras WFS-T service is defined by serviceUrl.
// 
/////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////
// 
// General Settings
// 

// Cameras WFS-T Service URL
var serviceUrl = '/service/geodanarcgis/services/multipos/Cameras_Ekkersrijt_20150511/MapServer/WFSServer';

// N - Number of cameras to create for the test. Default 100.
var nCameras = 100; 


//$('#nCameras').val() = nCameras;


///////////////////////////////////////////////////////////////////////
// 
// Track and control variables
// 

var cameras = [],  // Stores cameras
    locks = [],    // Stores locks
    inserts = [],  // Stores inserts
    deletes = [],  // Stores deletes
    updates = [],  // Stores updates
    requests = [], // Stores requests data
    count = 0;     // General Counter


///////////////////////////////////////////////////////////////////////
// 
// General Purpose Helper Functions
// 

// Convert XML to JSON objects
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
    } else if (xml.nodeType == 3) { obj = xml.nodeValue; }
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
// Returns a string with the current date
function getCurrentDateString () {
    function AddZero(num) { return (num >= 0 && num < 10) ? "0" + num : num + ""; }
    var d = new Date(),
        year = d.getFullYear(), 
        month = AddZero(d.getMonth()+1), 
        day = AddZero(d.getDate()), 
        hours = AddZero(d.getHours()), 
        minutes = AddZero(d.getMinutes()), 
        seconds = AddZero(d.getSeconds()),    
        date = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds;
    return date;
}


///////////////////////////////////////////////////////////////////////
// 
// Cameras Helper Functions
// 

// Creates a camera object
function createCameraData () {
    var date = getCurrentDateString() ,
        idnum =  Math.floor(Math.random() * 999999), 
        latmax = 51.52, 
        latmin = 51.48, 
        latitude =  (Math.random() * (latmax - latmin)) + latmin, 
        lonmax = 5.51, 
        lonmin = 5.43, 
        longitude =  (Math.random() * (lonmax - lonmin)) + lonmin, 
        flmax = 0.1224, 
        flmin = 0.0034, 
        focallength =  (Math.random() * (flmax - flmin)) + flmin, 
        rotation =  Math.floor(Math.random() * (360 - 0)), 
        createdat = date, 
        updatedat = date, 
        shape = latitude + ' ' + longitude;
    latitude = latitude.toFixed(6);
    longitude = longitude.toFixed(6);
    focallength = focallength.toFixed(4);
    
    var camera = {
        id: 'Test Camera #' + idnum, 
        objectid: '', 
        gmlid: 'GML_ID0', 
        region: 'Eindhoven', 
        area: 'Ekkersrijt', 
        camtype: 'PTZ', 
        brand: 'Axis', 
        model: '232+', 
        latitude: latitude, 
        longitude: longitude, 
        rotation: rotation, 
        height: 3, 
        tilt: 0, 
        comments: 'Test Camera #' + idnum + ' was created for service testing purposes on ' + date, 
        sensorheight: 0.00369, 
        sensorwidth: 0.00443, 
        resvert: 582, 
        reshor: 752, 
        fldef: 0.0082, 
        flmax: flmax, 
        flmin: flmin, 
        focallength: focallength, 
        canpan: 1, 
        cantilt: 1, 
        canzoom: 1, 
        createdat: createdat, 
        updatedat: updatedat, 
        shape: shape
    }
    
//    console.log(performance.now().toFixed(2) + ", cam_WFS-T_test_1.js - createCameraData() - camera:"); console.log(camera);
    cameras[cameras.length] = camera;
    
    return camera;
}

// Prepares the camera data for the requests
function prepareCamData (camera) {
    var date = getCurrentDateString();
    var cam = {
        camid: {
            value: camera.id,
            name: 'Camera_ID'
        }, objectid: {
            value: camera.objectid,
            name: 'OBJECTID'
        }, gmlid: {
            value: camera.gmlid,
            name: 'gml:id'
        }, region: {
            value: camera.region,
            name: 'location_region'
        }, area: {
            value: camera.area,
            name: 'location_area'
        }, type: {
            value: camera.camtype,
            name: 'camera_type'
        }, brand: {
            value: camera.brand,
            name: 'brand'
        }, model: {
            value: camera.model,
            name: 'model'
        }, lat: {
            value: camera.latitude + '',
            name: 'location_latitude'
        }, lon: {
            value: camera.longitude + '',
            name: 'location_longitude'
        }, azimuth: {
            value: camera.rotation,
            name: 'orientation_pan'
        }, height: {
            value: camera.height,
            name: 'location_height'
        }, tilt: {
            value: camera.tilt,
            name: 'orientation_tilt'
        }, comments: {
            value: camera.comments,
            name: 'Comments'
        }, ssh: {
            value: camera.sensorheight,
            name: 'SensorSizeHeight'
        }, ssw: {
            value: camera.sensorwidth,
            name: 'SensorSizeWidth'
        }, srv: {
            value: camera.resvert,
            name: 'SensorResolutionVertical'
        }, srh: {
            value: camera.reshor,
            name: 'SensorResolutionHorizontal'
        }, fld: {
            value: camera.fldef,
            name: 'FocalLengthDefault'
        }, flmax: {
            value: camera.flmax,
            name: 'FocalLengthMax'
        }, flmin: {
            value: camera.flmin,
            name: 'FocalLengthMin'
        }, flc: {
            value: camera.focallength,
            name: 'FocalLengthCurrent'
        }, canpan: {
            value: camera.canpan,
            name: 'CanPan'
        }, cantilt: {
            value: camera.cantilt,
            name: 'CanTilt'
        }, canzoom: {
            value: camera.canzoom,
            name: 'CanZoom'
        }, createdat: {
            value: camera.createdat,
//                value: date,
            name: 'CreatedAt'
        }, updatedat: {
                value: camera.updatedat,
//            value: date,
            name: 'LastUpdatedAt'
        }, shape: {
            value: camera.shape,
//                value: camera.latitude + ' ' + camera.longitude,
            name: 'Shape'
        }      
    };
    switch (cam.type.value) {
        case "PTZ":     // PTZ (Pan Tilt Zoom) Camera
            cam.canpan.value = 1;   // can rotate
            cam.cantilt.value = 1;  // can inclinate
            cam.canzoom.value = 1;  // can zoom
            break;
        case "Fixed Zoom":      // Fixed camera with zoom
            cam.canpan.value = 0;
            cam.cantilt.value = 0;
            cam.canzoom.value = 1;  // can zoom (in/out)
            break;
        case "Fixed":   // Fixed camera
            cam.canpan.value = 0;
            cam.cantilt.value = 0;
            cam.canzoom.value = 0;
            cam.flc.value = cam.flmax.value = cam.flmin.value = cam.fld.value; // all focal lengths are the same when zoom is unavailable
            break;
        case "PNR":     // PNR (plate number recognition) fixed camera
            cam.canpan.value = 0;
            cam.cantilt.value = 0;
            cam.canzoom.value = 0;
            cam.flc.value = cam.flmax.value = cam.flmin.value = cam.fld.value; // all focal lengths are the same when zoom is unavailable
        case "":
            cam.type.value = "Fixed";   // Default is a Fixed camera
            cam.canpan.value = 0;
            cam.cantilt.value = 0;
            cam.canzoom.value = 0;
            cam.flc.value = cam.flmax.value = cam.flmin.value = cam.fld.value; // all focal lengths are the same when zoom is unavailable
            break;
        default:
            cam.canpan.value = 0;
            cam.cantilt.value = 0;
            cam.canzoom.value = 0;
            break;
    }

//    console.log(performance.now().toFixed(2) + ", cam_WFS-T_test_1.js - prepareCamData() - camera:"); console.log(camera);
//    console.log(performance.now().toFixed(2) + ", cam_WFS-T_test_1.js - prepareCamData() - cam:"); console.log(cam);

    return cam;
}

// Modify some attributes of the camera
function insertEdits (cam) {
    var newcam = cam, 
        date = getCurrentDateString(), 
        latmax = 51.52, 
        latmin = 51.48, 
        latitude =  (Math.random() * (latmax - latmin)) + latmin, 
        lonmax = 5.51, 
        lonmin = 5.43, 
        longitude =  (Math.random() * (lonmax - lonmin)) + lonmin, 
        flmax = 0.1224, 
        flmin = 0.0034, 
        focallength =  (Math.random() * (flmax - flmin)) + flmin, 
        rotation =  Math.floor(Math.random() * (360 - 0)),
        comments = cam.comments.value + ' ++ EDITED AT  ' + date + ' ++ \n';
    latitude = latitude.toFixed(6);
    longitude = longitude.toFixed(6);
    focallength = focallength.toFixed(4);
    
    newcam.lat.newvalue = latitude;
    newcam.lon.newvalue = longitude;
    newcam.flc.newvalue = focallength;
    newcam.azimuth.newvalue = rotation;
    newcam.comments.newvalue = comments;
    
//    console.log(performance.now().toFixed(2) + ", cam_WFS-T_test_1.js - insertEdits() - cam: " + JSON.stringify(cam)); console.log(cam);
//    console.log(performance.now().toFixed(2) + ", cam_WFS-T_test_1.js - insertEdits() - newcam: " + JSON.stringify(newcam)); console.log(newcam);
    
    return newcam;
}


///////////////////////////////////////////////////////////////////////
// 
// Function to run AJAX POST request to the service
// 

// Run a POST request to the service
function runRequest (requestData, success) {
//    console.log(performance.now().toFixed(2) + ", cam_WFS-T_test_1.js - getPostDataDelete() - postData:"); console.log(postData);
    
    var startTime = performance.now().toFixed(2), 
        postData = requestData;
    
    function error (XMLHttpRequest, textStatus, errorThrown) { 
        console.log(performance.now().toFixed(2) + ", AJAX ERROR"); 
        console.log(XMLHttpRequest); 
        console.log("Status: " + textStatus); 
        console.log("Error: " + errorThrown); 
    }
    
//    function success (xml) {
//        var inJSON = xml2JSON(xml), 
//            endTime = performance.now().toFixed(2), 
//            elapsedTime = endTime - startTime;
//        console.log(performance.now() + ", Success ajax runRequest() ");
//        console.log('xml: '); console.log(xml);
//        console.log('inJSON: '); console.log(inJSON);
//        requests[requests.length] = { request: requestData, response: { xml: xml, json: inJSON }, time: { start: startTime, end: endTime, elapsed: elapsedTime } };
//    }

    $.ajax({
        type: "POST",
        url: serviceUrl,
        dataType: "xml",
        contentType: "text/xml",
        data: requestData,
        success: success,
        error: error
    });
}


///////////////////////////////////////////////////////////////////////
// 
// Functions to generate the XML requests
// 

// Get Insert XML Request
function getPostDataInsert (cam) {
    console.log(performance.now().toFixed(2) + ", cam_WFS-T_test_1.js - getPostDataInsert()");

    var datatypename = 'Cameras_Ekkersrijt', 
        datasetname = 'Cameras_Ekkersrijt_20150511', 
        baseurl = 'http://localhost:6080/arcgis/services/', 
        postDataHeader =
        '<?xml version="1.0" encoding="UTF-8" ?> \n'
      + '<wfs:Transaction service="WFS" version="1.1.0" \n'
      + '  xsi:schemaLocation="WFS \n'
      + '    ' + baseurl + 'multipos/' + datasetname + '/MapServer/WFSServer?request=DescribeFeatureType%26version=1.1.0%26typename=' + datatypename + ' \n'
      + '    http://www.opengis.net/wfs \n'
      + '    http://schemas.opengis.net/wfs/1.1.0/wfs.xsd" \n'
      + '  xmlns:' + datasetname + '="WFS" \n'
      + '  xmlns:wfs="http://www.opengis.net/wfs" \n'
      + '  xmlns:gml="http://www.opengis.net/gml" \n'
      + '  xmlns:xlink="http://www.w3.org/1999/xlink" \n'
      + '  xmlns:ogc="http://www.opengis.net/ogc" \n'
      + '  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> \n', 
        postDataBody = 
        '  <wfs:Insert handle="Insert" idgen="GenerateNew">'
      + '<' + datasetname + ':' + datatypename + ' ' + cam.gmlid.name + '="' + cam.gmlid.value + '"> \n' // GML ID
      + '<' + datasetname + ':' + cam.camid.name + '>' + cam.camid.value + '</' + datasetname + ':' + cam.camid.name + '> \n' // Camera ID
      + '<' + datasetname + ':' + cam.region.name + '>' + cam.region.value + '</' + datasetname + ':' + cam.region.name + '> \n' // Region
      + '<' + datasetname + ':' + cam.area.name + '>' + cam.area.value + '</' + datasetname + ':' + cam.area.name + '> \n' // Area
      + '<' + datasetname + ':' + cam.type.name + '>' + cam.type.value + '</' + datasetname + ':' + cam.type.name + '> \n' // Camera Type
      + '<' + datasetname + ':' + cam.brand.name + '>' + cam.brand.value + '</' + datasetname + ':' + cam.brand.name + '> \n' // Camera Brand
      + '<' + datasetname + ':' + cam.model.name + '>' + cam.model.value + '</' + datasetname + ':' + cam.model.name + '> \n' // Camera Model
      + '<' + datasetname + ':' + cam.lat.name + '>' + cam.lat.value + '</' + datasetname + ':' + cam.lat.name + '> \n' // Latitude
      + '<' + datasetname + ':' + cam.lon.name + '>' + cam.lon.value + '</' + datasetname + ':' + cam.lon.name + '> \n' // Longitude
      + '<' + datasetname + ':' + cam.height.name + '>' + cam.height.value + '</' + datasetname + ':' + cam.height.name + '> \n' // Camera Height
      + '<' + datasetname + ':' + cam.azimuth.name + '>' + cam.azimuth.value + '</' + datasetname + ':' + cam.azimuth.name + '> \n' // Camera rotation (azimuth)
      + '<' + datasetname + ':' + cam.tilt.name + '>' + cam.tilt.value + '</' + datasetname + ':' + cam.tilt.name + '> \n' // Camera Inclination (Tilt)
      + '<' + datasetname + ':' + cam.fld.name + '>' + cam.fld.value + '</' + datasetname + ':' + cam.fld.name + '> \n' // Default Focal Length
      + '<' + datasetname + ':' + cam.flmax.name + '>' + cam.flmax.value + '</' + datasetname + ':' + cam.flmax.name + '> \n' // Max Focal Length
      + '<' + datasetname + ':' + cam.flmin.name + '>' + cam.flmin.value + '</' + datasetname + ':' + cam.flmin.name + '> \n' // Min Focal Length
      + '\<' + datasetname + ':' + cam.flc.name + '>' + cam.flc.value + '</' + datasetname + ':' + cam.flc.name + '> \n' // Current Focal Length
      + '<' + datasetname + ':' + cam.ssh.name + '>' + cam.ssh.value + '</' + datasetname + ':' + cam.ssh.name + '> \n' // Sensor Size Height
      + '<' + datasetname + ':' + cam.ssw.name + '>' + cam.ssw.value + '</' + datasetname + ':' + cam.ssw.name + '> \n' // Sensor Size Width
      + '<' + datasetname + ':' + cam.srv.name + '>' + cam.srv.value + '</' + datasetname + ':' + cam.srv.name + '> \n' // Sensor Resolution Vertical
      + '<' + datasetname + ':' + cam.srh.name + '>' + cam.srh.value + '</' + datasetname + ':' + cam.srh.name + '> \n' // Sensor Resolution Horizontal
      + '<' + datasetname + ':' + cam.canpan.name + '>' + cam.canpan.value + '</' + datasetname + ':' + cam.canpan.name + '> \n' // Camera can Pan (rotate)
      + '<' + datasetname + ':' + cam.cantilt.name + '>' + cam.cantilt.value + '</' + datasetname + ':' + cam.cantilt.name + '> \n' // Camera can Tilt (inclination)
      + '<' + datasetname + ':' + cam.canzoom.name + '>' + cam.canzoom.value + '</' + datasetname + ':' + cam.canzoom.name + '> \n' // Camera can Zoom
      + '<' + datasetname + ':' + cam.createdat.name + '>' + cam.createdat.value + '</' + datasetname + ':' + cam.createdat.name + '> \n' // Camera Creation Date
      + '<' + datasetname + ':' + cam.updatedat.name + '>' + cam.updatedat.value + '</' + datasetname + ':' + cam.updatedat.name + '> \n' // Camera Update Date
      + '<' + datasetname + ':' + cam.comments.name + '>' + cam.comments.value + '</' + datasetname + ':' + cam.comments.name + '> \n' // Camera Comments
      + '<' + datasetname + ':' + cam.shape.name + '><gml:Point><gml:pos>' + cam.shape.value + '</gml:pos></gml:Point></' + datasetname + ':' + cam.shape.name + '> \n' // Camera Shape (Geometry)
      + '</' + datasetname + ':' + datatypename + '> \n'
      + '  </wfs:Insert> \n', 
        postDataFooter = '</wfs:Transaction> \n', 
        postData = postDataHeader + postDataBody + postDataFooter;

//    console.log(performance.now().toFixed(2) + ", cam_WFS-T_test_1.js - getPostDataInsert() - cam:"); console.log(cam);
//    console.log(performance.now().toFixed(2) + ", cam_WFS-T_test_1.js - getPostDataInsert() - postData:"); console.log(postData);
    inserts[inserts.length] = { cam: cam, postData: postData };
    fillInsert(count, cam, postData);
    
    return postData;
}

// Get Lock Feature XML Request
function getPostDataLock (cam) {
    console.log(performance.now().toFixed(2) + ", cam_WFS-T_test_1.js - getPostDataLock()");

    var datatypename = 'Cameras_Ekkersrijt', 
        datasetname = 'Cameras_Ekkersrijt_20150511', 
        baseurl = 'http://localhost:6080/arcgis/services/', 
        lockProperty = {
            name: 'Camera_ID',
            value: cam.camid.value
        },
        lockTimeout = 1.0, 
        postDataHeader =
            '<?xml version="1.0" encoding="UTF-8" ?> \n'
          + '<wfs:GetFeatureWithLock service="WFS" version="1.1.0" \n'
          + '  expiry="' + lockTimeout + '" \n'
          + '  handle="lock" \n'
          + '  xsi:schemaLocation="WFS \n'
          + '    ' + baseurl + 'multipos/' + datasetname + '/MapServer/WFSServer?request=DescribeFeatureType%26version=1.1.0%26typename=' + datatypename + ' \n'
          + '    http://www.opengis.net/wfs \n'
          + '    http://schemas.opengis.net/wfs/1.1.0/wfs.xsd" \n'
          + '  xmlns:' + datasetname + '="WFS" \n'
          + '  xmlns:wfs="http://www.opengis.net/wfs" \n'
          + '  xmlns:gml="http://www.opengis.net/gml" \n'
          + '  xmlns:xlink="http://www.w3.org/1999/xlink" \n'
          + '  xmlns:ogc="http://www.opengis.net/ogc" \n'
          + '  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> \n', 
        postDataBody = 
            '  <wfs:Query typeName="' + datatypename + '"> \n'
          + '    <ogc:Filter> \n'
          + '      <ogc:PropertyIsEqualTo> \n'
          + '        <ogc:PropertyName>' + lockProperty.name + '</ogc:PropertyName> \n'
          + '        <ogc:Literal>' + lockProperty.value + '</ogc:Literal> \n'
          + '      </ogc:PropertyIsEqualTo> \n'
          + '    </ogc:Filter> \n'
          + '  </wfs:Query> \n', 
        postDataFooter = '</wfs:GetFeatureWithLock> \n', 
        postData = postDataHeader + postDataBody + postDataFooter;

//    console.log(performance.now().toFixed(2) + ", cam_WFS-T_test_1.js - getPostDataLock() - cam:"); console.log(cam);
//    console.log(performance.now().toFixed(2) + ", cam_WFS-T_test_1.js - getPostDataInsert() - postData:"); console.log(postData);
    locks[locks.length] = { cam: cam, postData: postData,  lockProperty: lockProperty };
    fillLock(count, cam, postData, lockProperty);
    
    return postData;
}

// Get Delete XML Request
function getPostDataDelete (cam, lock) {
    console.log(performance.now().toFixed(2) + ", cam_WFS-T_test_1.js - getPostDataDelete()");

    var datatypename = 'Cameras_Ekkersrijt', 
        datasetname = 'Cameras_Ekkersrijt_20150511', 
        baseurl = 'http://localhost:6080/arcgis/services/', 
        deleteProperty = { name: 'Camera_ID', value: cam.camid.value },
        postDataHeader =
        '<?xml version="1.0" encoding="UTF-8" ?> \n'
      + '<wfs:Transaction service="WFS" version="1.1.0" \n'
      + '  xsi:schemaLocation="WFS \n'
      + '    ' + baseurl + 'multipos/' + datasetname + '/MapServer/WFSServer?request=DescribeFeatureType%26version=1.1.0%26typename=' + datatypename + '\n'
      + '    http://www.opengis.net/wfs \n'
      + '    http://schemas.opengis.net/wfs/1.1.0/wfs.xsd" \n'
      + '  xmlns:' + datasetname + '="WFS" \n'
      + '  xmlns:wfs="http://www.opengis.net/wfs" \n'
      + '  xmlns:ogc="http://www.opengis.net/ogc" \n'
      + '  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> \n', 
        postDataBody = 
        '  <wfs:LockId xmlns:wfs="http://www.opengis.net/wfs">' + lock + '</wfs:LockId>  \n'
      + '  <wfs:Delete handle="delete" typeName="' + datatypename + '"> \n'
      + '    <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc" > \n'
      + '      <ogc:PropertyIsEqualTo>\n'
      + '        <ogc:PropertyName>' + deleteProperty.name + '</ogc:PropertyName> \n'
      + '        <ogc:Literal>' + deleteProperty.value + '</ogc:Literal> \n'
      + '      </ogc:PropertyIsEqualTo> \n'
      + '    </ogc:Filter> \n'
      + '  </wfs:Delete> \n', 
        postDataFooter = '</wfs:Transaction> \n', 
        postData = postDataHeader + postDataBody + postDataFooter;

//    console.log(performance.now().toFixed(2) + ", cam_WFS-T_test_1.js - getPostDataDelete() - cam: "); console.log(cam);
//    console.log(performance.now().toFixed(2) + ", cam_WFS-T_test_1.js - getPostDataDelete() - postData: "); console.log(postData);
    
//    console.log(performance.now().toFixed(2) + ", cam_WFS-T_test_1.js - getPostDataDelete() - cam: " + JSON.stringify(cam)); console.log(cam);
//    console.log(performance.now().toFixed(2) + ", cam_WFS-T_test_1.js - getPostDataDelete() - postData: " + postData);
    deletes[deletes.length] = { cam: cam, postData: postData, lockProperty: deleteProperty, lock: lock };
    fillDelete(count, cam, postData, lock, deleteProperty);
    
    return postData;
}

// Get Update XML Request
function getPostDataUpdate (cam, lock) {
    console.log(performance.now().toFixed(2) + ", cam_WFS-T_test_1.js - getPostDataUpdate()");

    var datatypename = 'Cameras_Ekkersrijt', 
        datasetname = 'Cameras_Ekkersrijt_20150511', 
        baseurl = 'http://localhost:6080/arcgis/services/', 
        updateFields = cam.updateFields,
        lockProperty = { name: 'Camera_ID', value: cam.camid.value },
        postDataBodyFilter = 
            '    <ogc:Filter> \n'
          + '      <ogc:PropertyIsEqualTo> \n'
          + '        <ogc:PropertyName>' + lockProperty.name + '</ogc:PropertyName> \n'
          + '        <ogc:Literal>' + lockProperty.value + '</ogc:Literal> \n'
          + '      </ogc:PropertyIsEqualTo> \n'
          + '    </ogc:Filter> \n', 
        postDataBodyProperties = '';
    var willUpdate = false, 
        date = getCurrentDateString(); 
//    var fields = ['region', 'area', 'lat', 'lon', 'azimuth', 'comments', 'flc'];
//    var fields = ['region', 'area', 'camtype', 'brand', 'model', 'lat', 'lon', 'azimuth', 'height', 'tilt', 'comments', 'ssh', 'ssw', 'srv', 'srh', 'fld', 'flma', 'flmi', 'flc'];
//    var fields = ['region', 'area', 'camtype', 'brand', 'model', 'latitude', 'longitude', 'rotation', 'height', 'tilt', 'comments', 'sensorheight', 'sensorwidth', 'resvert', 'reshor', 'fldef', 'flmax', 'flmin', 'focallength'];
//    for (f in fields) {
    for (f in cam) {
        var p = cam[f];
        if ( (typeof(p.newvalue) != "undefined") && (p.value != p.newvalue) ) { 
            if (willUpdate == false) {
                willUpdate = true;
                postDataBodyProperties += 
                      '  <wfs:Property> \n' 
                    + '    <wfs:Name>lastupdatedat</wfs:Name> \n' 
                    + '    <wfs:Value>' + date + '</wfs:Value> \n' 
                    + '  </wfs:Property> \n'; 
            }
            postDataBodyProperties += 
                  '  <wfs:Property> \n' 
                + '    <wfs:Name>' + p.name + '</wfs:Name> \n' 
                + '    <wfs:Value>' + p.newvalue + '</wfs:Value> \n' 
                + '  </wfs:Property> \n'; 
        }
    }
    var postDataHeader = 
            '<?xml version="1.0" encoding="UTF-8" ?> \n'
          + '<wfs:Transaction service="WFS" version="1.1.0" \n'
          + '  xsi:schemaLocation="WFS \n'
          + '    ' + baseurl + 'multipos/' + datasetname + '/MapServer/WFSServer?request=DescribeFeatureType%26version=1.1.0%26typename=' + datatypename + ' \n'
          + '    http://www.opengis.net/wfs \n'
          + '    http://schemas.opengis.net/wfs/1.1.0/wfs.xsd" \n'
          + '  xmlns:' + datasetname + '="WFS" \n'
          + '  xmlns:wfs="http://www.opengis.net/wfs" \n'
          + '  xmlns:gml="http://www.opengis.net/gml" \n'
          + '  xmlns:xlink="http://www.w3.org/1999/xlink" \n'
          + '  xmlns:ogc="http://www.opengis.net/ogc" \n'
          + '  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> \n', 
        postDataBody = 
            '  <wfs:LockId xmlns:wfs="http://www.opengis.net/wfs">' + lock + '</wfs:LockId> \n'
          + '  <wfs:Update handle="update" typeName="'+datatypename+'"> \n'
          + postDataBodyProperties
          + postDataBodyFilter
          + '  </wfs:Update> \n', 
        postDataFooter = '</wfs:Transaction> \n', 
        postData = postDataHeader + postDataBody + postDataFooter;

//    console.log(performance.now().toFixed(2) + ", cam_WFS-T_test_1.js - getPostDataDelete() - cam:"); console.log(cam);
//    console.log(performance.now().toFixed(2) + ", cam_WFS-T_test_1.js - getPostDataDelete() - postData:"); console.log(postData);
    updates[updates.length] = { cam: cam, postData: postData, lockProperty: lockProperty, lock: lock };
    fillUpdate(count, cam, postData, lock, lockProperty);
    
    return postData;
}


///////////////////////////////////////////////////////////////////////
// 
// Functions to run the test
// 

// Set nCameras
function setNCameras () {
    nCameras = $('#numCameras').val();
    console.log('nCameras is now ' + nCameras);
}

// Create the cameras
function createCameras () {
    for (var i = 0; i < nCameras; i++) {
        var camera = createCameraData(); 
        
        console.log(performance.now().toFixed(2) + ', cam_WFS-T_test_1.js - createCameras(i=' + i + ')');
//        console.log(performance.now().toFixed(2) + ', cam_WFS-T_test_1.js - createCameras() - camera: ' + JSON.stringify(camera)); console.log(camera);
        fillCamera(i, camera);
    }
}

// Insert the cameras
function runInserts () {
    console.log(performance.now().toFixed(2) + ', cam_WFS-T_test_1.js - runInserts()');
    count = 0;
    
    function runInsert () {
        console.log(performance.now().toFixed(2) + ', cam_WFS-T_test_1.js - runInsert(' +count + ')');
        if (count < nCameras) {
            var cam = prepareCamData(cameras[count]);
            var request = getPostDataInsert(cam);
            var startTime = performance.now().toFixed(2);
            var success = function (xml) {
                var inJSON = xml2JSON(xml), 
                    endTime = performance.now().toFixed(2), 
                    elapsedTime = endTime - startTime;
                console.log(performance.now().toFixed(2) + ", Success ajax Insert Request() ");
//                console.log('xml: '); console.log(xml);
//                console.log('inJSON: '); console.log(inJSON);
                requests[requests.length] = { cam: cam, type: 'Insert', lock: '-', request: request, response: { xml: xml, json: inJSON }, time: { start: startTime, end: endTime, elapsed: elapsedTime } };
                
//                var row = $('<tr/>');
//                $('<td/>').text(count).appendTo(row);
//                $('<td/>').text(JSON.stringify(camera)).appendTo(row);
//                $('<td/>').text(request).appendTo(row);
//                $('<td/>').text(xml).appendTo(row);
//                $('<td/>').text('-').appendTo(row);
//                $('<td/>').text('Insert').appendTo(row);
//                $('<td/>').text(startTime).appendTo(row);
//                $('<td/>').text(endTime).appendTo(row);
//                $('<td/>').text(elapsedTime).appendTo(row);
//                row.appendTo('#Requests');
                fillRequest(count, cam, request, inJSON, '-', 'Insert', startTime, endTime, elapsedTime);
                
                count++;
                runInsert();
            }
            runRequest(request, success);
        } else { runUpdates(); }
    }
    
    runInsert();
}

// Delete the cameras
function runDeletes () {
    console.log(performance.now().toFixed(2) + ', cam_WFS-T_test_1.js - runDeletes()');
    count = 0;
    
    function runDelete () {
        console.log(performance.now().toFixed(2) + ', cam_WFS-T_test_1.js - runDelete(' +count + ')');
        function lockCam (cam) {
            var startTime = performance.now().toFixed(2);
            var request = getPostDataLock(cam);
            var success = function (xml) {
                function getLock (xml) {
                    var inJSON = xml2JSON(xml);
                    var lock = inJSON["wfs:FeatureCollection"]["@attributes"].lockId;
                    return lock;
//                    return inJSON["wfs:FeatureCollection"]["@attributes"].lockId;
                }
                var endTime = performance.now().toFixed(2), 
                    elapsedTime = endTime - startTime; 
                var inJSON = xml2JSON(xml); 
                var lock = getLock(xml);
//                var lock = inJSON["wfs:FeatureCollection"]["@attributes"].lockId;
                console.log(performance.now().toFixed(2) + ", Success ajax Lock Request() "); 
//                console.log('xml: '); console.log(xml); console.log('inJSON: '); console.log(inJSON);
                requests[requests.length] = { cam: cam, lock: lock, type: 'Lock', request: request, response: { xml: xml, json: inJSON }, time: { start: startTime, end: endTime, elapsed: elapsedTime } };
                fillRequest(count, cam, request, inJSON, lock, 'Lock', startTime, endTime, elapsedTime);
                deleteCam(cam, lock);
            }
            runRequest(request, success);
        }
        
        function deleteCam (cam, lock) {
            var startTime = performance.now().toFixed(2);
            var request = getPostDataDelete(cam, lock);
            var success = function (xml) {
                var inJSON = xml2JSON(xml), 
                    endTime = performance.now().toFixed(2), 
                    elapsedTime = endTime - startTime;
                console.log(performance.now().toFixed(2) + ", Success ajax Delete Request() ");
//                console.log('xml: '); console.log(xml);
//                console.log('inJSON: '); console.log(inJSON);
                requests[requests.length] = { cam: cam, lock: lock, type: 'Delete', request: request, response: { xml: xml, json: inJSON }, time: { start: startTime, end: endTime, elapsed: elapsedTime } };
                fillRequest(count, cam, request, inJSON, lock, 'Delete', startTime, endTime, elapsedTime);
                count++;
                runDelete();
            }
            runRequest(request, success);
        }
        
        if (count < nCameras) {
            var cam = prepareCamData(cameras[count]);
            lockCam(cam);
        } 
//        else { populateSummary(); }
    }
    runDelete();
}

// Update the cameras
function runUpdates () {
    console.log(performance.now().toFixed(2) + ', cam_WFS-T_test_1.js - runUpdates()');
    count = 0;
    
    function runUpdate () {
        console.log(performance.now().toFixed(2) + ', cam_WFS-T_test_1.js - runUpdate(' +count + ')');
        // 1) Lock feature
        function lockCam (cam) {
            var startTime = performance.now().toFixed(2);
            var request = getPostDataLock(cam);
            var success = function (xml) {
                function getLock (xml) {
                    var inJSON = xml2JSON(xml);
                    var lock = inJSON["wfs:FeatureCollection"]["@attributes"].lockId;
                    return lock;
                }
                var endTime = performance.now().toFixed(2), 
                    elapsedTime = endTime - startTime; 
                var inJSON = xml2JSON(xml); 
                var lock = getLock(xml);
                console.log(performance.now().toFixed(2) + ", Success ajax Lock Request() "); 
//                console.log('xml: '); console.log(xml); 
//                console.log('inJSON: '); console.log(inJSON);
                requests[requests.length] = { cam: cam, lock: lock, type: 'Lock', request: request, response: { xml: xml, json: inJSON }, time: { start: startTime, end: endTime, elapsed: elapsedTime } };
                fillRequest(count, cam, request, inJSON, lock, 'Lock', startTime, endTime, elapsedTime);
                updateCam(cam, lock);
            }
            runRequest(request, success);
        }
        // 2) Update feature
        function updateCam (cam, lock) {
            var startTime = performance.now().toFixed(2);
            var request = getPostDataUpdate(cam, lock);
            var success = function (xml) {
                var inJSON = xml2JSON(xml), 
                    endTime = performance.now().toFixed(2), 
                    elapsedTime = endTime - startTime;
                console.log(performance.now().toFixed(2) + ", Success ajax Update Request() ");
//                console.log('xml: '); console.log(xml);
//                console.log('inJSON: '); console.log(inJSON);
                requests[requests.length] = { cam: cam, lock: lock, type: 'Update', request: request, response: { xml: xml, json: inJSON }, time: { start: startTime, end: endTime, elapsed: elapsedTime } };
                fillRequest(count, cam, request, inJSON, lock, 'Update', startTime, endTime, elapsedTime);
                count++;
                runUpdate();
            }
            runRequest(request, success);
        }
        // 3) If counter then run
        if (count < nCameras) {
            var cam = prepareCamData(cameras[count]);
            var editcam = insertEdits(cam);
            lockCam(editcam);
        } else { runDeletes(); }
    }
    runUpdate();
}


///////////////////////////////////////////////////////////////////////
// 
// Functions to display the test output as HTML
// 

// Populate a summary of the already execured transactions
function populateSummary () {

    function populateCameras () {
        var tableCameras = $('<table/>'), 
            tableCamerasHeader = $('<tr/>');
        $('<th/>').text('#').appendTo(tableCamerasHeader);
        $('<th/>').text('Camera').appendTo(tableCamerasHeader);
        tableCamerasHeader.appendTo(tableCameras);
        for (var i=0; i<cameras.length; i++) {
            var row = $('<tr/>');
            $('<td/>').text(i).appendTo(row);
            $('<td/>').text(JSON.stringify(cameras[i])).appendTo(row);
            row.appendTo(tableCameras);
        } 
        $('<h2/>').text('Cameras').appendTo('#summary');
        tableCameras.appendTo('#summary');
        $('<hr/>').appendTo('#summary');
    }

    function populateLocks () {
        var tableLocks = $('<table/>'), 
            tableLocksHeader = $('<tr/>');
        $('<th/>').text('#').appendTo(tableLocksHeader);
        $('<th/>').text('Cam').appendTo(tableLocksHeader);
        $('<th/>').text('Request').appendTo(tableLocksHeader);
        $('<th/>').text('Camera_ID').appendTo(tableLocksHeader);
        tableLocksHeader.appendTo(tableLocks);
        for (var i=0; i<locks.length; i++) {
            var l = locks[i];
            var row = $('<tr/>');
            $('<td/>').text(i).appendTo(row);
            $('<td/>').text(JSON.stringify(l.cam)).appendTo(row);
            $('<td/>').text(l.postData).appendTo(row);
            $('<td/>').text(l.lockProperty.value).appendTo(row);
            row.appendTo(tableLocks);
        }
        $('<h2/>').text('Locks').appendTo('#summary');
        tableLocks.appendTo('#summary');
        $('<hr/>').appendTo('#summary');
    }

    function populateInserts () {
        var tableInserts = $('<table/>'), 
            tableInsertsHeader = $('<tr/>');
        $('<th/>').text('#').appendTo(tableInsertsHeader);
        $('<th/>').text('Cam').appendTo(tableInsertsHeader);
        $('<th/>').text('Request').appendTo(tableInsertsHeader);
        tableInsertsHeader.appendTo(tableInserts);
        for (var i=0; i<inserts.length; i++) {
            var d = inserts[i];
            var row = $('<tr/>');
            $('<td/>').text(i).appendTo(row);
            $('<td/>').text(JSON.stringify(d.cam)).appendTo(row);
            $('<td/>').text(d.postData).appendTo(row);
            row.appendTo(tableInserts);
        }
        $('<h2/>').text('Inserts').appendTo('#summary');
        tableInserts.appendTo('#summary');
        $('<hr/>').appendTo('#summary');
    }

    function populateUpdates () {
        var tableUpdates = $('<table/>'), 
            tableUpdatesHeader = $('<tr/>');
        $('<th/>').text('#').appendTo(tableUpdatesHeader);
        $('<th/>').text('Cam').appendTo(tableUpdatesHeader);
        $('<th/>').text('Request').appendTo(tableUpdatesHeader);
        $('<th/>').text('lock').appendTo(tableUpdatesHeader);
        $('<th/>').text('Camera_ID').appendTo(tableUpdatesHeader);
        tableUpdatesHeader.appendTo(tableUpdates);
        for (var i=0; i<updates.length; i++) {
            var d = updates[i];
            var row = $('<tr/>');
            $('<td/>').text(i).appendTo(row);
            $('<td/>').text(JSON.stringify(d.cam)).appendTo(row);
            $('<td/>').text(d.postData).appendTo(row);
            $('<td/>').text(d.lock).appendTo(row);
            $('<td/>').text(d.lockProperty).appendTo(row);
            row.appendTo(tableUpdates);
        }
        $('<h2/>').text('Updates').appendTo('#summary');
        tableUpdates.appendTo('#summary');
        $('<hr/>').appendTo('#summary');
    }

    function populateDeletes () {
        var tableDeletes = $('<table/>'), 
            tableDeletesHeader = $('<tr/>');
        $('<th/>').text('#').appendTo(tableDeletesHeader);
        $('<th/>').text('Cam').appendTo(tableDeletesHeader);
        $('<th/>').text('Request').appendTo(tableDeletesHeader);
        $('<th/>').text('Lock').appendTo(tableDeletesHeader);
        $('<th/>').text('Camera_ID').appendTo(tableDeletesHeader);
        tableDeletesHeader.appendTo(tableDeletes);
        for (var i=0; i<deletes.length; i++) {
            var d = deletes[i];
            var row = $('<tr/>');
            $('<td/>').text(i).appendTo(row);
            $('<td/>').text(JSON.stringify(d.cam)).appendTo(row);
            $('<td/>').text(d.postData).appendTo(row);
            $('<td/>').text(d.lock).appendTo(row);
            $('<td/>').text(d.lockProperty.value).appendTo(row);
            row.appendTo(tableDeletes);
        }
        $('<h2/>').text('Deletes').appendTo('#summary');
        tableDeletes.appendTo('#summary');
        $('<hr/>').appendTo('#summary');
    }

    function populateRequests () {
        var tableRequests = $('<table/>'), 
            tableRequestsHeader = $('<tr/>');
        $('<th/>').text('#').appendTo(tableRequestsHeader);
        $('<th/>').text('Cam').appendTo(tableRequestsHeader);
        $('<th/>').text('Request').appendTo(tableRequestsHeader);
        $('<th/>').text('Response').appendTo(tableRequestsHeader);
        $('<th/>').text('Lock').appendTo(tableRequestsHeader);
        $('<th/>').text('Type').appendTo(tableRequestsHeader);
        $('<th/>').text('Start').appendTo(tableRequestsHeader);
        $('<th/>').text('End').appendTo(tableRequestsHeader);
        $('<th/>').text('Elapsed').appendTo(tableRequestsHeader);
        tableRequestsHeader.appendTo(tableRequests);
        for (var i=0; i<requests.length; i++) {
            var r = requests[i];
            var row = $('<tr/>');
            $('<td/>').text(i).appendTo(row);
            $('<td/>').text(JSON.stringify(r.cam)).appendTo(row);
            $('<td/>').text(r.request).appendTo(row);
            $('<td/>').text(JSON.stringify(r.response.json)).appendTo(row);
            $('<td/>').text(r.lock).appendTo(row);
            $('<td/>').text(r.type).appendTo(row);
            $('<td/>').text(r.time.start).appendTo(row);
            $('<td/>').text(r.time.end).appendTo(row);
            $('<td/>').text(r.time.elapsed).appendTo(row);
            row.appendTo(tableRequests);
        }
        $('<h2/>').text('Requests').appendTo('#summary');
        tableRequests.appendTo('#summary');
        $('<hr/>').appendTo('#summary');
    }

    populateCameras();
    populateRequests();
    populateInserts();
    populateLocks();
    populateUpdates();
    populateDeletes();
}

// Add row to requests table
function fillRequest(n, cam, req, res, lock, type, start, end, elapsed) {
    var row = $('<tr/>');
    $('<td/>').text(n).appendTo(row);
    $('<td/>').text(JSON.stringify(cam)).appendTo(row);
    $('<td/>').text(req).appendTo(row);
    $('<td/>').text(JSON.stringify(res)).appendTo(row);
    $('<td/>').text(lock).appendTo(row);
    $('<td/>').text(type).appendTo(row);
    $('<td/>').text(start).appendTo(row);
    $('<td/>').text(end).appendTo(row);
    $('<td/>').text(elapsed).appendTo(row);
    row.appendTo('#Requests');
}

// Add row to cameras table
function fillCamera(n, cam) {
    var row = $('<tr/>');
    $('<td/>').text(n).appendTo(row);
    $('<td/>').text(JSON.stringify(cam)).appendTo(row);
//    var td1 = $('<td/>');
//    $('<code/>').text(JSON.stringify(cam)).appendTo(td1);
//    td1.appendTo(row);
    row.appendTo('#Cameras');
}

// Add row to inserts table
function fillInsert(n, cam, req) {
    var row = $('<tr/>');
    $('<td/>').text(n).appendTo(row);
    $('<td/>').text(JSON.stringify(cam)).appendTo(row);
    $('<td/>').text(req).appendTo(row);
    row.appendTo('#Inserts');
}

// Add row to locks table
function fillLock(n, cam, req, camid) {
    var row = $('<tr/>');
    $('<td/>').text(n).appendTo(row);
    $('<td/>').text(JSON.stringify(cam)).appendTo(row);
    $('<td/>').text(req).appendTo(row);
    $('<td/>').text(camid).appendTo(row);
    row.appendTo('#Locks');
}

// Add row to updates table
function fillUpdate(n, cam, req, lock, camid) {
    var row = $('<tr/>');
    $('<td/>').text(n).appendTo(row);
    $('<td/>').text(JSON.stringify(cam)).appendTo(row);
    $('<td/>').text(req).appendTo(row);
    $('<td/>').text(lock).appendTo(row);
    $('<td/>').text(camid).appendTo(row);
    row.appendTo('#Updates');
}

// Add row to deletes table
function fillDelete(n, cam, req, lock, camid) {
    var row = $('<tr/>');
    $('<td/>').text(n).appendTo(row);
    $('<td/>').text(JSON.stringify(cam)).appendTo(row);
    $('<td/>').text(req).appendTo(row);
    $('<td/>').text(lock).appendTo(row);
    $('<td/>').text(camid).appendTo(row);
    row.appendTo('#Deletes');
}


///////////////////////////////////////////////////////////////////////
// 
// Functions to Clean the cameras dataset by removin test cameras
// 
// These functions are used in case there is an error during the test and, 
// as a consequence, not all the cameras created by the test are removed.
// 

// Delete cameras with oid > 31 one by one
function getCamsAndDelete () {
    var c = 0;
    var total = 0;
    var camsXML, camsJSON, cameraFeatures;
    
    function getCams () {
        var url = '/service/geodanarcgis/services/multipos/Cameras_Ekkersrijt_20150511/MapServer/WFSServer?request=getfeature&typename=Cameras_Ekkersrijt';
        function success (xml) {
            var inJSON = xml2JSON(xml), 
                features = inJSON["wfs:FeatureCollection"]["gml:featureMember"];
            camsXML = xml;
            camsJSON = inJSON;
            cameraFeatures = features;
            total = features.length;
            console.log(camsXML); 
//            console.log(camsJSON); 
//            console.log(cameraFeatures); 
            console.log("Total # of cameras: " + total);
            rundels();
        }
        
        $.ajax({
            method: 'GET',
            url: url,
            dataType: 'xml',
            success: success
        });
    }
    
    function rundels () {
        if (c<total) {
            var cam = cameraFeatures[c]['Cameras_Ekkersrijt_20150511:Cameras_Ekkersrijt'];
            
            var oid = Number(cam["Cameras_Ekkersrijt_20150511:OBJECTID"]["#text"]);
            if (oid > 31) {
                lockCam(oid);
            } else {
                c++;
                rundels();
            }
            
        }
    }
    
    function getLockReq (oid) {
        var datatypename = 'Cameras_Ekkersrijt', 
            datasetname = 'Cameras_Ekkersrijt_20150511', 
            baseurl = 'http://localhost:6080/arcgis/services/', 
            lockProperty = {
                name: 'OBJECTID',
                value: oid
            },
            lockTimeout = 1.0, 
            postDataHeader =
                '<?xml version="1.0" encoding="UTF-8" ?> \n'
              + '<wfs:GetFeatureWithLock service="WFS" version="1.1.0" \n'
              + '  expiry="' + lockTimeout + '" \n'
              + '  handle="lock" \n'
              + '  xsi:schemaLocation="WFS \n'
              + '    ' + baseurl + 'multipos/' + datasetname + '/MapServer/WFSServer?request=DescribeFeatureType%26version=1.1.0%26typename=' + datatypename + ' \n'
              + '    http://www.opengis.net/wfs \n'
              + '    http://schemas.opengis.net/wfs/1.1.0/wfs.xsd" \n'
              + '  xmlns:' + datasetname + '="WFS" \n'
              + '  xmlns:wfs="http://www.opengis.net/wfs" \n'
              + '  xmlns:gml="http://www.opengis.net/gml" \n'
              + '  xmlns:xlink="http://www.w3.org/1999/xlink" \n'
              + '  xmlns:ogc="http://www.opengis.net/ogc" \n'
              + '  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> \n', 
            postDataBody = 
                '  <wfs:Query typeName="' + datatypename + '"> \n'
              + '    <ogc:Filter> \n'
              + '      <ogc:PropertyIsEqualTo> \n'
              + '        <ogc:PropertyName>' + lockProperty.name + '</ogc:PropertyName> \n'
              + '        <ogc:Literal>' + lockProperty.value + '</ogc:Literal> \n'
              + '      </ogc:PropertyIsEqualTo> \n'
              + '    </ogc:Filter> \n'
              + '  </wfs:Query> \n', 
            postDataFooter = '</wfs:GetFeatureWithLock> \n', 
            postData = postDataHeader + postDataBody + postDataFooter;

//        var success = function (xml) {
//            function getLock (xml) {
//                var inJSON = xml2JSON(xml);
//                var lock = inJSON["wfs:FeatureCollection"]["@attributes"].lockId;
//                return lock;
//            }
//            var inJSON = xml2JSON(xml); 
//            var lock = getLock(xml);
//            console.log('lock: '); console.log(lock);
//            console.log('xml: '); console.log(xml);
//            console.log('inJSON: '); console.log(inJSON);
//            delCam(lock);
//        }
//        runRequest(postData, success);
        return postData;
    }
        
    function getDelreq (oid, lock) {
        var datatypename = 'Cameras_Ekkersrijt', 
            datasetname = 'Cameras_Ekkersrijt_20150511', 
            baseurl = 'http://localhost:6080/arcgis/services/', 
            deleteProperty = { name: 'OBJECTID', value: oid },
            postDataHeader =
                '<?xml version="1.0" encoding="UTF-8" ?> \n'
              + '<wfs:Transaction service="WFS" version="1.1.0" \n'
              + '  xsi:schemaLocation="WFS \n'
              + '    ' + baseurl + 'multipos/' + datasetname + '/MapServer/WFSServer?request=DescribeFeatureType%26version=1.1.0%26typename=' + datatypename + '\n'
              + '    http://www.opengis.net/wfs \n'
              + '    http://schemas.opengis.net/wfs/1.1.0/wfs.xsd" \n'
              + '  xmlns:' + datasetname + '="WFS" \n'
              + '  xmlns:wfs="http://www.opengis.net/wfs" \n'
              + '  xmlns:ogc="http://www.opengis.net/ogc" \n'
              + '  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> \n', 
            postDataBody = 
                '  <wfs:LockId xmlns:wfs="http://www.opengis.net/wfs">' + lock + '</wfs:LockId>  \n'
              + '  <wfs:Delete handle="delete" typeName="' + datatypename + '"> \n'
              + '    <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc" > \n'
              + '      <ogc:PropertyIsEqualTo>\n'
              + '        <ogc:PropertyName>' + deleteProperty.name + '</ogc:PropertyName> \n'
              + '        <ogc:Literal>' + deleteProperty.value + '</ogc:Literal> \n'
              + '      </ogc:PropertyIsEqualTo> \n'
              + '    </ogc:Filter> \n'
              + '  </wfs:Delete> \n', 
            postDataFooter = '</wfs:Transaction> \n', 
            postData = postDataHeader + postDataBody + postDataFooter;
        
//        var success = function (xml) {
//            var inJSON = xml2JSON(xml);
//            console.log(performance.now().toFixed(2) + ", Success ajax Delete Request() ");
//            console.log('xml: '); console.log(xml);
//            console.log('inJSON: '); console.log(inJSON);
//        }
//        runRequest(postData, success);
        return postData;
    }
    
    function lockCam (oid) {
        console.log(performance.now().toFixed(2) + ", lockCam(" + oid + ") ");
//        var startTime = performance.now().toFixed(2);
        var request = getLockReq(oid);
        var success = function (xml) {
            function getLock (xml) {
                var inJSON = xml2JSON(xml);
                var lock = inJSON["wfs:FeatureCollection"]["@attributes"].lockId;
                return lock;
//                    return inJSON["wfs:FeatureCollection"]["@attributes"].lockId;
            }
//            var endTime = performance.now().toFixed(2), 
//                elapsedTime = endTime - startTime; 
            var inJSON = xml2JSON(xml); 
            var lock = getLock(xml);
//                var lock = inJSON["wfs:FeatureCollection"]["@attributes"].lockId;
            console.log(performance.now().toFixed(2) + ", Success ajax Lock Request() "); 
            console.log('xml: '); console.log(xml); console.log('inJSON: '); console.log(inJSON);
//            requests[requests.length] = { cam: cam, lock: lock, type: 'Lock', request: request, response: { xml: xml, json: inJSON }, time: { start: startTime, end: endTime, elapsed: elapsedTime } };
//            fillRequest(count, cam, request, inJSON, lock, 'Lock', startTime, endTime, elapsedTime);
            deleteCam(oid, lock);
        }
        runRequest(request, success);
    }
        
    function deleteCam (oid, lock) {
        console.log(performance.now().toFixed(2) + ", DeleteCam(" + oid + ") ");
//        var startTime = performance.now().toFixed(2);
        var request = getDelreq(oid, lock);
        var success = function (xml) {
            var inJSON = xml2JSON(xml); 
//            var endTime = performance.now().toFixed(2), 
//                elapsedTime = endTime - startTime;
            console.log(performance.now().toFixed(2) + ", Success ajax Delete Request() ");
                console.log('xml: '); console.log(xml); console.log('inJSON: '); console.log(inJSON);
//            requests[requests.length] = { cam: cam, lock: lock, type: 'Delete', request: request, response: { xml: xml, json: inJSON }, time: { start: startTime, end: endTime, elapsed: elapsedTime } };
//            fillRequest(count, cam, request, inJSON, lock, 'Delete', startTime, endTime, elapsedTime);
            c++;
            rundels();
        }
        runRequest(request, success);
    }
    
    getCams();
}

// Delete cameras with oid > 31 in sets of 500 Max. starting with oid > 20000
function cleanTestCameras () {
    var ranges = [20000, 19500, 19000, 18500, 18000, 17500, 17000, 16500, 16000, 15500, 15000, 14500, 14000, 13500, 13000, 12500, 12000, 11500, 11000, 10500, 10000, 9500, 9000, 8500, 8000, 7500, 7000, 6500, 6000, 5500, 5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 500, 32];
    var c = 0;
    
    function getLockReq (oid) {
        var datatypename = 'Cameras_Ekkersrijt', 
            datasetname = 'Cameras_Ekkersrijt_20150511', 
            baseurl = 'http://localhost:6080/arcgis/services/', 
            lockProperty = {
                name: 'OBJECTID',
                value: oid
            },
            lockTimeout = 5.0, 
            postDataHeader =
                '<?xml version="1.0" encoding="UTF-8" ?> \n'
              + '<wfs:GetFeatureWithLock service="WFS" version="1.1.0" \n'
              + '  expiry="' + lockTimeout + '" \n'
              + '  handle="lock" \n'
              + '  xsi:schemaLocation="WFS \n'
              + '    ' + baseurl + 'multipos/' + datasetname + '/MapServer/WFSServer?request=DescribeFeatureType%26version=1.1.0%26typename=' + datatypename + ' \n'
              + '    http://www.opengis.net/wfs \n'
              + '    http://schemas.opengis.net/wfs/1.1.0/wfs.xsd" \n'
              + '  xmlns:' + datasetname + '="WFS" \n'
              + '  xmlns:wfs="http://www.opengis.net/wfs" \n'
              + '  xmlns:gml="http://www.opengis.net/gml" \n'
              + '  xmlns:xlink="http://www.w3.org/1999/xlink" \n'
              + '  xmlns:ogc="http://www.opengis.net/ogc" \n'
              + '  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> \n', 
            postDataBody = 
                '  <wfs:Query typeName="' + datatypename + '"> \n'
              + '    <ogc:Filter> \n'
              + '      <ogc:PropertyIsGreaterThan> \n'
              + '        <ogc:PropertyName>' + lockProperty.name + '</ogc:PropertyName> \n'
              + '        <ogc:Literal>' + lockProperty.value + '</ogc:Literal> \n'
              + '      </ogc:PropertyIsGreaterThan> \n'
              + '    </ogc:Filter> \n'
              + '  </wfs:Query> \n', 
            postDataFooter = '</wfs:GetFeatureWithLock> \n', 
            postData = postDataHeader + postDataBody + postDataFooter;

        var success = function (xml) {
            function getLock (xml) {
                var inJSON = xml2JSON(xml);
                var lock = inJSON["wfs:FeatureCollection"]["@attributes"].lockId;
                return lock;
            }
            var inJSON = xml2JSON(xml); 
            var lock = getLock(xml);
            console.log('lock: '); console.log(lock);
            console.log('xml: '); console.log(xml);
            console.log('inJSON: '); console.log(inJSON);
            getDelreq(oid,lock);
        }
        runRequest(postData, success);
    }
        
    function getDelreq (oid, lock) {
        var datatypename = 'Cameras_Ekkersrijt', 
            datasetname = 'Cameras_Ekkersrijt_20150511', 
            baseurl = 'http://localhost:6080/arcgis/services/', 
            deleteProperty = { name: 'OBJECTID', value: oid },
            postDataHeader =
                '<?xml version="1.0" encoding="UTF-8" ?> \n'
              + '<wfs:Transaction service="WFS" version="1.1.0" \n'
              + '  xsi:schemaLocation="WFS \n'
              + '    ' + baseurl + 'multipos/' + datasetname + '/MapServer/WFSServer?request=DescribeFeatureType%26version=1.1.0%26typename=' + datatypename + '\n'
              + '    http://www.opengis.net/wfs \n'
              + '    http://schemas.opengis.net/wfs/1.1.0/wfs.xsd" \n'
              + '  xmlns:' + datasetname + '="WFS" \n'
              + '  xmlns:wfs="http://www.opengis.net/wfs" \n'
              + '  xmlns:ogc="http://www.opengis.net/ogc" \n'
              + '  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> \n', 
            postDataBody = 
                '  <wfs:LockId xmlns:wfs="http://www.opengis.net/wfs">' + lock + '</wfs:LockId>  \n'
              + '  <wfs:Delete handle="delete" typeName="' + datatypename + '"> \n'
              + '    <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc" > \n'
              + '      <ogc:PropertyIsGreaterThan>\n'
              + '        <ogc:PropertyName>' + deleteProperty.name + '</ogc:PropertyName> \n'
              + '        <ogc:Literal>' + deleteProperty.value + '</ogc:Literal> \n'
              + '      </ogc:PropertyIsGreaterThan> \n'
              + '    </ogc:Filter> \n'
              + '  </wfs:Delete> \n', 
            postDataFooter = '</wfs:Transaction> \n', 
            postData = postDataHeader + postDataBody + postDataFooter;
        
        var success = function (xml) {
            var inJSON = xml2JSON(xml);
            console.log(performance.now().toFixed(2) + ", Success ajax Delete Request() ");
            console.log('xml: '); console.log(xml);
            console.log('inJSON: '); console.log(inJSON);
            c++;
            starting();
        }
        runRequest(postData, success);
    }
    function starting() {
//        if (c < ranges.length) { getLockReq(ranges[c]); }
//        else { console.log(performance.now() + ', END'); }
        (c < ranges.length) ? getLockReq(ranges[c]) : console.log(performance.now() + ', END');
    }
    starting();
}
