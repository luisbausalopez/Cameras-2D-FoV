///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////   
//////      
//////      
//////      
//////      POLY-FOV.JS
//////      
//////      (C)Luis Bausá López, Amsterdam 2013-2016
//////      
//////      EU MC Multi-POS
//////      VU Amsterdam
//////      
//////      
//////      
//////   
//////   
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////  getCurrentDateString()   //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//  getCurrentDateString() - Returns string of current date with format yyyy-mm-ddThh:mm:ss
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




///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////    findCamLayerById()     //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//  findCamLayerById() - Returns layer of camera with ID = camid
function findCamLayerById (camid) {
    var resultlayer = null;
    map.eachLayer( function (layer) { 
        if ( (layer.feature != null) && (layer.feature.properties != null) && (layer.feature.properties.featuretype == "Camera") && (layer.feature.properties.id == camid) ) { 
            console.log(layer);
            resultlayer = layer;
            return layer;
        }
    });
    return resultlayer;
}


///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
////////////// removeCameraLayerWithId() //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//  removeCameraLayerWithId() - Remove camera layer with ID = camid 
function removeCameraLayerWithId (camid) {
    map.eachLayer( function (layer) { 
        if ( (layer.feature != null) && (layer.feature.properties != null) && (layer.feature.properties.featuretype == "Camera") && (layer.feature.properties.id == camid) ) { 
            map.removeLayer(layer);
        }
    });
}


///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////// removeFovLayersWithCameraId() ////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//  removeFovLayersWithCameraId() - Remove FoV layers of camera with ID = camid 
function removeFovLayersWithCameraId (camid) {
    var resultlayer = null;
    map.eachLayer( function (layer) { 
        if ( (layer.feature != null) && (layer.feature.properties != null) && (layer.feature.properties.featuretype == "FoV") && (layer.feature.properties.cameraid == camid) ) { 
            map.removeLayer(layer);
        }
    });
}


///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////       switchLayer()       //////////////
//////////////      switchMapLayer()     //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//  switch(Map)Layer() - If layer is on map, remove layer. Else, add layer to map.
function switchLayer(layer) {
    if (layer != null) {   
        map.hasLayer(layer) ? map.removeLayer(layer) : map.addLayer(layer);
    }
}

function switchMapLayer (layer) {
    var starttime = performance.now();
    console.log(performance.now() + ", switchMapLayer(), START: " + starttime + '\n');

    if (layer != null) {   
        map.hasLayer(layer) ? map.removeLayer(layer) : map.addLayer(layer);
    }
    
    var name = "";
    if ( (layer != null) && (layer.options != null) && (layer.options.name != null) ) {   
        name = layer.options.name;
    }
    console.log("Layer " + name + " switched");

    var endtime = performance.now();
    var exectime = endtime - starttime;
    console.log(performance.now() + ", switchMapLayer(), END: " + endtime + ", Exec time (ms): " + exectime + '\n');
}


///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////       editCamera()        //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//  editCamera() - Enable camera editing inside popup 
function editCamera() {
    var starttime = performance.now();
    var buttonName = 'editCamera';
    console.log(performance.now() + ", editCamera( " + buttonName + " ), START: " + starttime + '\n');

    var fields = ['editcamid','editcamtype','editcambrand','editcammodel','editcamregion','editcamarea','editcamlat','editcamlon','editcamrot','editcamflc','editcamflma','editcamflmi','editcamfld','editcamssh','editcamssw','editcamsrh','editcamsrv','editcamheight','editcamtilt','editcamoid','editcamgmlid','editcamglobalid','editcamcreated','editcamupdated','editcamshape','editcamcomm','editcamcom2'];

    appContent.editinfeature = {};

    $('#editcambutton').addClass('hidden');
    $('#saveeditcambutton').removeClass('hidden');
    $('#removecambutton').removeClass('hidden');
    $('#canceleditcambutton').removeClass('hidden');

    for (var i=0; i<fields.length; i++) {
        var field = fields[i];
        $('#'+field).attr('disabled', false);
        appContent.editinfeature[field] = $('#'+field).valueOf()[0].value;
    }

    var endtime = performance.now();
    var exectime = endtime - starttime;
    console.log(performance.now() + ", editCamera( " + buttonName + " ), END: " + endtime + ", Exec time (ms): " + exectime + '\n');
}


///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////      removeCamera()       //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//  removeCamera() - Remove camera with editing enabled inside popup 
function removeCamera() {
    var starttime = performance.now();
    var buttonName = 'removeCamera';
    console.log(performance.now() + ", removeCamera( " + buttonName + " ), START: " + starttime + '\n');

    var camId = appContent.editinfeature.editcamid;

    removeCameraLayerWithId(camId);
    removeFovLayersWithCameraId(camId);

    appContent.editinfeature = null;

    var endtime = performance.now();
    var exectime = endtime - starttime;
    console.log(performance.now() + ", removeCamera( " + buttonName + " ), END: " + endtime + ", Exec time (ms): " + exectime + '\n');
}


///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////   cancelEditedCamera()    //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//  cancelEditedCamera() - Cancel camera editing inside popup 
function cancelEditedCamera() {
    var starttime = performance.now();
    var buttonName = 'cancelEditedCamera';
    console.log(performance.now() + ", cancelEditedCamera( " + buttonName + " ), START: " + starttime + '\n');

    var fields = ['editcamid','editcamtype','editcambrand','editcammodel','editcamregion','editcamarea','editcamlat','editcamlon','editcamrot','editcamflc','editcamflma','editcamflmi','editcamfld','editcamssh','editcamssw','editcamsrh','editcamsrv','editcamheight','editcamtilt','editcamoid','editcamgmlid','editcamglobalid','editcamcreated','editcamupdated','editcamshape','editcamcomm','editcamcom2'];

    $('#editcambutton').removeClass('hidden');
    $('#saveeditcambutton').addClass('hidden');
    $('#removecambutton').addClass('hidden');
    $('#canceleditcambutton').addClass('hidden');

    for (var i=0; i<fields.length; i++) {
        var field = fields[i];
        $('#'+field).valueOf()[0].value = appContent.editinfeature[field];
        $('#'+field).attr('disabled', true);
    }

    appContent.editinfeature = null;

    var endtime = performance.now();
    var exectime = endtime - starttime;
    console.log(performance.now() + ", cancelEditedCamera( " + buttonName + " ), END: " + endtime + ", Exec time (ms): " + exectime + '\n');
}


///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////    saveEditedCamera()     //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//  saveEditedCamera() - Save edited camera inside popup 
function saveEditedCamera() {
    var starttime = performance.now();
    var buttonName = 'saveEditedCamera';
    console.log(performance.now() + ", saveEditedCamera( " + buttonName + " ), START: " + starttime + '\n');

    var fields = ['editcamid','editcamtype','editcambrand','editcammodel','editcamregion','editcamarea','editcamlat','editcamlon','editcamrot','editcamflc','editcamflma','editcamflmi','editcamfld','editcamssh','editcamssw','editcamsrh','editcamsrv','editcamheight','editcamtilt','editcamoid','editcamgmlid','editcamglobalid','editcamcreated','editcamupdated','editcamshape','editcamcomm','editcamcom2'];

    var e = appContent.editinfeature,
        camId = e.editcamid,
        date = getCurrentDateString();
    
    appContent.saveeditinfeature = {};

    // Get new values
    for (var i=0; i<fields.length; i++) {
        var field = fields[i];
        appContent.saveeditinfeature[field] = $('#'+field).valueOf()[0].value;
        $('#'+field).attr('disabled', true);    // Disable editing fields
    }

    // Get Feature Layers of Cameras and FoVs
    var camerasLayer = appContent.cameras.cameras;
    var fovLayers = {
        identification: appContent.cameras.identification,
        recognition: appContent.cameras.recognition,
        detection: appContent.cameras.detection,
        monitor: appContent.cameras.monitor,
        visible: appContent.cameras.visible
    };

    // Remove Camera and FoVs layers
    removeCameraLayerWithId(camId);
    removeFovLayersWithCameraId(camId);

    // Create new GeoJSON Camera
    var c = appContent.saveeditinfeature;
    var newCamera = createGeoJsonCamera3 (
        c.editcamid, 
//            c.editcamtype + ' - ' + c.editcamid, 
        c.editcamtype, 
        c.editcammodel, 
        c.editcambrand, 
        c.editcamregion, 
        c.editcamarea, 
        c.editcamlat, 
        c.editcamlon, 
        c.editcamrot, 
        c.editcamflc, 
        c.editcamfld, 
        c.editcamflma, 
        c.editcamflmi, 
        c.editcamssh, 
        c.editcamssw, 
        c.editcamsrv, 
        c.editcamsrh);

    // Add attributes to GeoJSON camera
    newCamera.properties.objectid = c.editcamoid;
    newCamera.properties.gmlid = c.editcamgmlid;
    newCamera.properties.globalid = c.editcamglobalid;
    newCamera.properties.height = c.editcamheight;
    newCamera.properties.tilt = c.editcamtilt;
    newCamera.properties.shape = c.editcamshape;
    newCamera.properties.comments = c.editcamcomm;
//    newCamera.properties.comments = c.editcamcom2;
    newCamera.properties.createdat = c.editcamcreated;
    newCamera.properties.updatedat = date;
    newCamera.properties.name = c.newcameratype + ' - ' + c.newcameraid;

    // Create Camera GeoJSON CSS layer and add to map
    var ops = {
        title: newCamera.name,
        alt: newCamera.name
    };
    var cameraFeature = L.geoJson.css(newCamera, ops);
    camerasLayer.addLayer(cameraFeature);

    // Get new camera FoVs
    var newFovs = getFovs(
        c.editcamid, 
        c.editcamlon, 
        c.editcamlat, 
        c.editcamrot, 
        c.editcamflc, 
        c.editcamssh, 
        c.editcamsrv, 
        fovLayers);

//    for (var i=0; i<fields.length; i++) {
//        var field = fields[i];
//        $('#'+field).attr('disabled', true);    // Disable editing fields
//    }
    // Hide buttons and show Edit button
    $('#editcambutton').removeClass('hidden');
    $('#saveeditcambutton').addClass('hidden');
    $('#removecambutton').addClass('hidden');
    $('#canceleditcambutton').addClass('hidden');

    // Clear editing variables
    appContent.editinfeature = null;
    appContent.saveeditinfeature = null;

    var endtime = performance.now();
    var exectime = endtime - starttime;
    console.log(performance.now() + ", saveEditedCamera( " + buttonName + " ), END: " + endtime + ", Exec time (ms): " + exectime + '\n');
}


///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////      saveNewCamera()      //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//  saveNewCamera() - Save new camera from sidebar form 
function saveNewCamera() {
    var starttime = performance.now();
    console.log(performance.now() + ", saveNewCamera(), START: " + starttime + '\n');

    var fields = ['newcameraid','newcameratype','newcamerabrand','newcameramodel','newcameraregion','newcameraarea','newcameralat','newcameralon','newcamerarot','newcameratilt','newcameraheight','newcameraflc','newcamerafld','newcameraflmax','newcameraflmin','newcamerassw','newcamerassh','newcamerasrv','newcamerasrh','newcameracomments'];

//    function AddZero(num) {
//        return (num >= 0 && num < 10) ? "0" + num : num + "";
//    }
//    var d = new Date(),
//        year = d.getFullYear(), 
//        month = AddZero(d.getMonth()+1), 
//        day = AddZero(d.getDate()), 
//        hours = AddZero(d.getHours()), 
//        minutes = AddZero(d.getMinutes()), 
//        seconds = AddZero(d.getSeconds()),    
//        date = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds;
    var date = getCurrentDateString();
    
    appContent.savecreatedcam = {};

    // Get new values
    for (var i=0; i<fields.length; i++) {
        var field = fields[i];
        appContent.savecreatedcam[field] = $('#'+field).valueOf()[0].value;
    }

    // Get Feature Layers of Cameras and FoVs
    var camerasLayer = appContent.cameras.cameras;
    var fovLayers = {
        identification: appContent.cameras.identification,
        recognition: appContent.cameras.recognition,
        detection: appContent.cameras.detection,
        monitor: appContent.cameras.monitor,
        visible: appContent.cameras.visible
    };

    // Create new GeoJSON Camera
    var c = appContent.savecreatedcam;
    var newCamera = createGeoJsonCamera3 (
        c.newcameraid, 
//            c.newcameratype + ' - ' + c.newcameraid, 
        c.newcameratype, 
        c.newcameramodel, 
        c.newcamerabrand, 
        c.newcameraregion, 
        c.newcameraarea, 
        c.newcameralat, 
        c.newcameralon, 
        c.newcamerarot, 
        c.newcameraflc, 
        c.newcamerafld, 
        c.newcameraflmax, 
        c.newcameraflmin, 
        c.newcamerassh, 
        c.newcamerassw, 
        c.newcamerasrv, 
        c.newcamerasrh);

    // Add attributes to GeoJSON camera
    newCamera.properties.objectid = 'OID';
    newCamera.properties.gmlid = 'GMLID';
    newCamera.properties.globalid = 'GID';
    newCamera.properties.height = c.newcameraheight;
    newCamera.properties.tilt = c.newcameratilt;
    newCamera.properties.shape = c.newcameralat + ' ' + c.newcameralon;
    newCamera.properties.comments = c.newcameracomments;
    newCamera.properties.createdat = date;
    newCamera.properties.updatedat = date;
    newCamera.properties.name = c.newcameratype + ' - ' + c.newcameraid;

    // Create Camera GeoJSON CSS layer and add to map
    var ops = {
        title: newCamera.name,
        alt: newCamera.name
    };
    var cameraFeature = L.geoJson.css(newCamera, ops);
    camerasLayer.addLayer(cameraFeature);
    
//    var e = { layer: cameraFeature };
//    map.fireEvent('draw:created',e);

    // Get FoVs for camera
    var newFovs = getFovs(
        c.newcameraid,      // Camera ID
        c.newcameralon,     // Longitude
        c.newcameralat,     // Latitude
        c.newcamerarot,     // Rotation
        c.newcameraflc,     // Focal Length
        c.newcamerassh,     // Sensor Height
        c.newcamerasrv,     // Vertical Resolution
        fovLayers);         // FoV Layers

    restoreNewCameraFormValues();    // Restore initial values of Create New Camera Form
    appContent.savecreatedcam = null;    // Clear new camera tracking variable

    var endtime = performance.now();
    var exectime = endtime - starttime;
    console.log(performance.now() + ", saveNewCamera(), END: " + endtime + ", Exec time (ms): " + exectime + '\n');
}   // END saveNewCamera()

function restoreNewCameraFormValues() {
    var starttime = performance.now();
    console.log(performance.now() + ", cancelCreateNewCamera(), START: " + starttime + '\n');
    
    $('#newcameraid').valueOf()[0].value = 'EKSXX-XXXX';
    $('#newcameratype').valueOf()[0].value = 'PTZ';
    $('#newcamerabrand').valueOf()[0].value = 'Axis';
    $('#newcameramodel').valueOf()[0].value = '232+';
    $('#newcameraregion').valueOf()[0].value = 'Eindhoven';
    $('#newcameraarea').valueOf()[0].value = 'Ekkersrijt';
    $('#newcameralat').valueOf()[0].value = '51.500000';
    $('#newcameralon').valueOf()[0].value = '5.470000';
    $('#newcamerarot').valueOf()[0].value = '180';
    $('#newcameratilt').valueOf()[0].value = '0';
    $('#newcameraheight').valueOf()[0].value = '3';
    $('#newcameraflc').valueOf()[0].value = '0.0082';
    $('#newcamerafld').valueOf()[0].value = '0.0041';
    $('#newcameraflmax').valueOf()[0].value = '0.0763';
    $('#newcameraflmin').valueOf()[0].value = '0.0041';
    $('#newcamerassw').valueOf()[0].value = '0.00443';
    $('#newcamerassh').valueOf()[0].value = '0.00369';
    $('#newcamerasrv').valueOf()[0].value = '576';
    $('#newcamerasrh').valueOf()[0].value = '704';
    $('#newcameracomments').valueOf()[0].value = 'New camera added via OGC WFS-T using the Polymer2DFoV Client.';

    var endtime = performance.now();
    var exectime = endtime - starttime;
    console.log(performance.now() + ", cancelCreateNewCamera(), END: " + endtime + ", Exec time (ms): " + exectime + '\n');
}   // END cancelCreateNewCamera()







// Menu buttons with some debug functionality
    function mainMenuClick () {
        console.log("MAIN MENU");
        console.log("appContent track");
        console.log(JSON.stringify(appContent.track));
    }
    function searchMenuClick () {
        console.log("SEARCH MENU");
        console.log("populate layer buttons");
        console.log(layers);
        populatelayerbuttons(layers);
    }
    function moreMenuClick () {
        console.log("MORE MENU");
        console.log("appContent track times");
        console.log('Start time: ' + appContent.track.starttime + ' ms \n');
        console.log('End time: ' + appContent.track.endtime + ' ms \n');
        console.log('Elapsed time: ' + appContent.track.elapsedtime + ' ms \n');
        console.log('Total time: ' + appContent.track.totaltime + ' ms \n');
    }




// Document Loaded
document.addEventListener('load', function() {
    console.log(performance.now() + ', Document loaded');
});





///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////       loadConfig()        //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//  loadConfig() - Load Config from file
function loadConfig () {
//    var config = {};
    var configFileUrl = './config/config.json';
    
    $.getJSON(configFileUrl, function (data) {
        console.log(data);
        config = data.config;
        return data.config;
    });
//    
//    console.log(config);
//    
//    return config;
}







///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////    Polymer JavaScript     //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

var tabs = document.querySelector('paper-tabs');
tabs.addEventListener('core-select', function() {
    console.log(performance.now() + ", TAB Selected: " + tabs.selected + '\n');
    switch (tabs.selected) {
        case "all":
            tabAll();
            break;
        case "cameras":
            tabCameras();
            break;
        case "identification":
            tabIdentification();
            break;
        case "recognition":
            tabRecognition();
            break;
        case "detection":
            tabDetection();
            break;
        case "monitor":
            tabMonitor();
            break;
        case "visible":
            tabVisible();
            break;
//        case "addcam":
//            tabAddCamera();
//            break;
//        case "editcam":
//            tabEditCamera();
//            break;
//        case "savecamfeatures":
//            tabSaveCameras();
//            break;
//        case "savefovfeatures":
//            tabSaveFovs();
//            break;
//        case "savelog":
//            tabSaveLOG();
//            break;
        default:
            tabAll();
            break;
    }
});

    function tabAll () {
        if (map != null) { map.remove(); }
//            map = initMap(1);
        var result = initMap(1);
        map = result.map;
        appContent.cameras = result.cameras;
        appContent.basemaps = result.basemaps;
        appContent.activebasemap = result.activebasemap;
        appContent.overlays = result.overlays;
        appContent.featurelayers = result.featurelayers;
        appContent.controls = result.controls;
        appContent.settings = result.settings;
//            loadlayersByTab(1);
    }

    function tabCameras () {
        if (map != null) { map.remove(); }
//        map = initMap(2);
        var result = initMap(2);
        map = result.map;
        appContent.cameras = result.cameras;
        appContent.basemaps = result.basemaps;
        appContent.activebasemap = result.activebasemap;
        appContent.overlays = result.overlays;
        appContent.featurelayers = result.featurelayers;
        appContent.controls = result.controls;
        appContent.settings = result.settings;
//            loadlayersByTab(2);
    }

    function tabIdentification () {
        if (map != null) { map.remove(); }
//        map = initMap(3);
        var result = initMap(3);
        map = result.map;
        appContent.cameras = result.cameras;
        appContent.basemaps = result.basemaps;
        appContent.activebasemap = result.activebasemap;
        appContent.overlays = result.overlays;
        appContent.featurelayers = result.featurelayers;
        appContent.controls = result.controls;
        appContent.settings = result.settings;
//            loadlayersByTab(3);
    }

    function tabRecognition () {
        if (map != null) { map.remove(); }
//        map = initMap(4);
        var result = initMap(4);
        map = result.map;
        appContent.cameras = result.cameras;
        appContent.basemaps = result.basemaps;
        appContent.activebasemap = result.activebasemap;
        appContent.overlays = result.overlays;
        appContent.featurelayers = result.featurelayers;
        appContent.controls = result.controls;
        appContent.settings = result.settings;
//            loadlayersByTab(4);
    }

    function tabDetection () {
        if (map != null) { map.remove(); }
//        map = initMap(5);
        var result = initMap(5);
        map = result.map;
        appContent.cameras = result.cameras;
        appContent.basemaps = result.basemaps;
        appContent.activebasemap = result.activebasemap;
        appContent.overlays = result.overlays;
        appContent.featurelayers = result.featurelayers;
        appContent.controls = result.controls;
        appContent.settings = result.settings;
//            loadlayersByTab(5);
    }

    function tabMonitor () {
        if (map != null) { map.remove(); }
//        map = initMap(6);
        var result = initMap(6);
        map = result.map;
        appContent.cameras = result.cameras;
        appContent.basemaps = result.basemaps;
        appContent.activebasemap = result.activebasemap;
        appContent.overlays = result.overlays;
        appContent.featurelayers = result.featurelayers;
        appContent.controls = result.controls;
        appContent.settings = result.settings;
//            loadlayersByTab(6);
    }

    function tabVisible () {
        if (map != null) { map.remove(); }
//        map = initMap(7);
        var result = initMap(7);
        map = result.map;
        appContent.cameras = result.cameras;
        appContent.basemaps = result.basemaps;
        appContent.activebasemap = result.activebasemap;
        appContent.overlays = result.overlays;
        appContent.featurelayers = result.featurelayers;
        appContent.controls = result.controls;
        appContent.settings = result.settings;
//            loadlayersByTab(7);
    }

//    function tabAddCamera () {
//
//    }
//
//    function tabEditCamera () {
//
//    }
//
//    function tabSaveCameras () {
//
//    }
//
//    function tabSaveFovs () {
//
//    }
//
//    function tabSaveLOG () {
////            console.downloadLog();
////            console.save();
//
//    }

    
function populatelayerbuttons (layers) {
    console.log('populatelayerbuttons');
    var sidebarfl = document.getElementById('featurelayers');
    var sidebarovl = document.getElementById('overlays');
    for ( layer in layers ) {
        var lay = layers[layer];
        console.log(lay);
        if (lay.type == 'overlay') {
            console.log('overlay');
            var v = lay.layer.visible;
            var lb = lay.layer.name;
            var l = appContent.overlays[lb];
            console.log(v);console.log(l);console.log(lb);
            if (lay.category == 'Feature Layers') {
                console.log('Feature Layers');
                setTimeout(addMapLayerButton(l, lb, '#featurelayers'), 1500);
            }
            else {
                console.log('populatelayerbuttons else');
            }
        }
    }
}


function addMapLayerButton (layer, label, pane) {
    var starttime = performance.now();
    console.log(performance.now() + ", addMapLayerButton(), START: " + starttime + '\n');

    var isvisible = map.hasLayer(layer);
    var buttonclass = "overlay";
    if ( pane != '#overlays' ) { 
        switch (pane) {
            case '#cameras':
                buttonclass = 'camera';
                break;
            case '#fovlayers':
                buttonclass = 'fov';
                break;
            case '#featurelayers':
                buttonclass = 'featurelayerbutton';
                break;
            case '#basemaps':
                buttonclass = 'basemap';
                break;
            default:
                buttonclass = 'overlay';
                break;
        } 
    }

    var ptb = '<paper-toggle-button/>';
    if ( isvisible == true ) { ptb = '<paper-toggle-button checked/>'; }

    var button = $('<div flex/>');

    var paperitem = $('<paper-item center horizontal layout noink/>').addClass("paperitembutton");

    var togglebutton = $(ptb).addClass("featurelayerbutton").click(function () { switchMapLayer(layer); });

    var separator = $('<div/>').attr("style", "width:10px");
    var btnlabel = $('<label flex/>').text(label);

    paperitem.append(togglebutton).append(separator).append(btnlabel);
    button.append(paperitem);

    $(pane).append(button);

    var name = "";
    if ( (layer != null) && (layer.options != null) && (layer.options.name != null) ) {   
        name = layer.options.name;
    }
    console.log("Layer " + name + " has a button now!!");

    if (appContent.console.outputLevel >= 4) { 
        console.log('layer: ');console.log(layer);
        console.log('label: ');console.log(label);
        console.log('pane: ');console.log(pane);
        console.log('button: ');console.log(button);
        console.log('visible: ');console.log(visible);
        console.log('paperitem: ');console.log(paperitem);
        console.log('ptb: ');console.log(ptb);
        console.log('separator: ');console.log(separator);
        console.log('btnlabel: ');console.log(btnlabel);
        console.log('button: ');console.log(button);
    }
    var endtime = performance.now();
    var exectime = endtime - starttime;
    console.log(performance.now() + ", addMapLayerButton(), END: " + endtime + ", Exec time (ms): " + exectime + '\n');
}





    function switchButton (buttonName) {
        var starttime = performance.now();
        console.log(performance.now() + ", switchButton( " + buttonName + " ), START: " + starttime + '\n');
        var layer = null;
        
        switch (buttonName) {
            //  WFS-T LOCALHOST
            case 'buttoncamera':
                layer = appContent.overlays["LH WFST CAMS"];
                console.log(performance.now() + ", switchButton( buttoncamera ) \n");
                break;
            case 'buttonfovmonitor':
                layer = appContent.overlays["LH WFST CAMS FoV M&C"];
                console.log(performance.now() + ", switchButton( buttonfovmonitor ) \n");
                break;
            case 'buttonfovdetection':
                layer = appContent.overlays["LH WFST CAMS FoV Detection"];
                console.log(performance.now() + ", switchButton( buttonfovdetection ) \n");
                break;
            case 'buttonfovrecognition':
                layer = appContent.overlays["LH WFST CAMS FoV Recognition"];
                console.log(performance.now() + ", switchButton( buttonfovrecognition ) \n");
                break;
            case 'buttonfovidentification':
                layer = appContent.overlays["LH WFST CAMS FoV Identification"];
                console.log(performance.now() + ", switchButton( buttonfovidentification ) \n");
                break;
            case 'buttonfovvisible':
                layer = appContent.overlays["LH WFST CAMS FoV Visible"];
                console.log(performance.now() + ", switchButton( buttonfovvisible ) \n");
                break;
                
            //  WFS-T GEODAN
            case 'buttoncamerag':
                layer = appContent.cameras.cameras;
                console.log(performance.now() + ", switchButton( buttoncamera ) \n");
                break;
            case 'buttonfovmonitorg':
                layer = appContent.cameras.monitor;
                console.log(performance.now() + ", switchButton( buttonfovmonitor ) \n");
                break;
            case 'buttonfovdetectiong':
                layer = appContent.cameras.detection;
                console.log(performance.now() + ", switchButton( buttonfovdetection ) \n");
                break;
            case 'buttonfovrecognitiong':
                layer = appContent.cameras.recognition;
                console.log(performance.now() + ", switchButton( buttonfovrecognition ) \n");
                break;
            case 'buttonfovidentificationg':
                layer = appContent.cameras.identification;
                console.log(performance.now() + ", switchButton( buttonfovidentification ) \n");
                break;
            case 'buttonfovvisibleg':
                layer = appContent.cameras.visible;
                console.log(performance.now() + ", switchButton( buttonfovvisible ) \n");
                break;
                
//            //  WFS-T GEODAN INTRANET
//            case 'buttoncameragi':
//                layer = appContent.overlays["Geodan WFST CAMS"];
//                console.log(performance.now() + ", switchButton( buttoncameragi ) \n");
//                break;
//            case 'buttonfovmonitorgi':
//                layer = appContent.overlays["Geodan WFST CAMS FoV M&C"];
//                console.log(performance.now() + ", switchButton( buttonfovmonitorgi ) \n");
//                break;
//            case 'buttonfovdetectiongi':
//                layer = appContent.overlays["Geodan WFST CAMS FoV Detection"];
//                console.log(performance.now() + ", switchButton( buttonfovdetectiongi ) \n");
//                break;
//            case 'buttonfovrecognitiongi':
//                layer = appContent.overlays["Geodan WFST CAMS FoV Recognition"];
//                console.log(performance.now() + ", switchButton( buttonfovrecognitiongi ) \n");
//                break;
//            case 'buttonfovidentificationgi':
//                layer = appContent.overlays["Geodan WFST CAMS FoV Identification"];
//                console.log(performance.now() + ", switchButton( buttonfovidentificationgi ) \n");
//                break;
//            case 'buttonfovvisiblegi':
//                layer = appContent.overlays["Geodan WFST CAMS FoV Visible"];
//                console.log(performance.now() + ", switchButton( buttonfovvisiblegi ) \n");
//                break;
                
            //  JSON GeoJSON
            case 'buttoncameragi':
                layer = appContent.overlays["GeoJSON Ekkersrijt Cameras"];
                console.log(performance.now() + ", switchButton( buttoncameragi ) \n");
                break;
            case 'buttonfovmonitorgi':
                layer = appContent.overlays["GeoJSON FoV Monitor"];
                console.log(performance.now() + ", switchButton( buttonfovmonitorgi ) \n");
                break;
            case 'buttonfovdetectiongi':
                layer = appContent.overlays["GeoJSON FoV Detection"];
                console.log(performance.now() + ", switchButton( buttonfovdetectiongi ) \n");
                break;
            case 'buttonfovrecognitiongi':
                layer = appContent.overlays["GeoJSON FoV Recognition"];
                console.log(performance.now() + ", switchButton( buttonfovrecognitiongi ) \n");
                break;
            case 'buttonfovidentificationgi':
                layer = appContent.overlays["GeoJSON FoV Identification"];
                console.log(performance.now() + ", switchButton( buttonfovidentificationgi ) \n");
                break;
            case 'buttonfovvisiblegi':
                layer = appContent.overlays["GeoJSON FoV Visible"];
                console.log(performance.now() + ", switchButton( buttonfovvisiblegi ) \n");
                break;
                
            case 'buttonoverlaypand':
                layer = appContent.overlays["Building footprints (Pand)"];
                console.log(performance.now() + ", switchButton( buttonoverlaypand ) \n");
                break;
            case 'buttonoverlayterrain':
                layer = appContent.overlays["Height map"];
                console.log(performance.now() + ", switchButton( buttonoverlayterrain ) \n");
                break;
                
            default:
                layer = null;
                console.log(performance.now() + ", switchButton( DEFAULT ) \n");
                break;
        }   // END switch(buttonName)

        switchMapLayer(layer);
        
        console.log(buttonName);
        console.log(layer);
        
        var endtime = performance.now();
        var exectime = endtime - starttime;
        console.log(performance.now() + ", switchButton( " + buttonName + " ), END: " + endtime + ", Exec time (ms): " + exectime + '\n');
    }









