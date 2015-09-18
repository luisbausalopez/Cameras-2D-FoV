//
//    function printObj (o) {
//        
//        function getString (e, s) {
//            var str = s;
//            if ( typeof o == "string" ) { return str + o; }
//            else if ( typeof o == "boolean" ) { return str + o.toString(); }
//            else if ( typeof o == "number" ) { return str + o.toString(); }
//            else if ( Object.prototype.toString.call( e ) === '[object Array]' ) {
//                var last = e.length - 1;
//                str = str + "[\n";
//                for (var i = 0; i < e.length; i++) {
//                    var el = e[i];
//                    str = str + getString(el, str);
//                    if ( i != last ) { str = str + ","; }
//                    str = str + "\n";
//                }
//                str = str + "]\n";
//            }
//            else if ( Object.prototype.toString.call( e ) === '[object Object]' ) {
//                var last = e.length - 1;
//                var count = 0;
//                str = str + "{\n";
//                for (var i in e) {
//                    var el = e[i];
//                    str = str + i + ": ";
////                    str = str + getString(i, str) + ": ";
//                    str = str + getString(el, str);
//                    if ( count != last ) { str = str + ","; }
//                    str = str + "\n";
//                    count++;
//                }
//                str = str + "}\n";
//            }
//            return str;
//        }
//        
//        return getString(o, "");
//    }



    function mainMenuClick () {
        console.log("MAIN MENU");
        console.log(JSON.stringify(appContent.track));
    }
    function searchMenuClick () {
        console.log("SEARCH MENU");
        console.log(layers);
        populatelayerbuttons(layers);
    }
    function moreMenuClick () {
        console.log("MORE MENU");
        console.log('Start time: ' + appContent.track.starttime + ' ms \n');
        console.log('End time: ' + appContent.track.endtime + ' ms \n');
        console.log('Elapsed time: ' + appContent.track.elapsedtime + ' ms \n');
        console.log('Total time: ' + appContent.track.totaltime + ' ms \n');
    }



////// Polymer JavaScript

    document.addEventListener('load', function() {
        console.log('\n\n\n\n\n\n\n\n\n Document loaded \n\n\n\n\n\n\n\n\n');
//        populatelayerbuttons(layers);
    });

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
            case "addcam":
                tabAddCamera();
                break;
            case "editcam":
                tabEditCamera();
                break;
            case "savecamfeatures":
                tabSaveCameras();
                break;
            case "savefovfeatures":
                tabSaveFovs();
                break;
            case "savelog":
                tabSaveLOG();
                break;
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

    function tabAddCamera () {

    }

    function tabEditCamera () {

    }

    function tabSaveCameras () {

    }

    function tabSaveFovs () {

    }

    function tabSaveLOG () {
//            console.downloadLog();
//            console.save();

    }

//    function switchBasemap (a, b, c) {
//        console.log(a);
//        console.log(b);
//        console.log(c);
//        console.log("switch Basemap");
//    }


    function switchLayer(layer) {
        if (layer != null) {   
            map.hasLayer(layer) ? map.removeLayer(layer) : map.addLayer(layer);
        }
    }
    
    function populatelayerbuttons (layers) {
        console.log('populatelayerbuttons');
//        function sidebarOVLelement (layer, visible, label) {
//            var button = '';
//
//            button = button + '<paper-item class="paperitembutton" center horizontal layout noink>';
//            if (visible == true) { button = button + '<paper-toggle-button class="featurelayerbutton" onClick="switchLayer(' + layer + ')" checked></paper-toggle-button>'; }
//            else { button = button + '<paper-toggle-button class="featurelayerbutton" onClick="switchLayer(' + layer + ')" ></paper-toggle-button>'; }
//
//            button = button + '<div style="width:10px"></div>';
//            button = button + '<label flex>' + label + '</label>';
//            button = button + '</paper-item>';
//
//            return button;
//        }
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
//                var l = lay.layer.layer;
                console.log(v);console.log(l);console.log(lb);
//                var b = sidebarOVLelement(l, v, lb);
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
//        console.log("Layer switched");
        console.log(layer);
        
        var endtime = performance.now();
        var exectime = endtime - starttime;
        console.log(performance.now() + ", switchMapLayer(), END: " + endtime + ", Exec time (ms): " + exectime + '\n');
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
            console.log(field);
//            $(fields[i]).attr('disabled', 'false');
            $('#'+field).attr('disabled', false);
            appContent.editinfeature[field] = $('#'+field).valueOf()[0].value;
            console.log(appContent.editinfeature[field]);
        }
        
        
        var endtime = performance.now();
        var exectime = endtime - starttime;
        console.log(performance.now() + ", editCamera( " + buttonName + " ), END: " + endtime + ", Exec time (ms): " + exectime + '\n');
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
        
        appContent.saveeditinfeature = {};
        
        
        for (var i=0; i<fields.length; i++) {
            var field = fields[i];
//            $(fields[i]).attr('disabled', 'true');
            $('#'+field).attr('disabled', true);
            appContent.saveeditinfeature[field] = $('#'+field).valueOf()[0].value;
            console.log(field);console.log(appContent.saveeditinfeature[field]);
        }
        
        var camerasLayer = appContent.cameras.cameras;
        var fovLayers = {
            identification: appContent.cameras.identification,
            recognition: appContent.cameras.recognition,
            detection: appContent.cameras.detection,
            monitor: appContent.cameras.monitor,
            visible: appContent.cameras.visible
        };
        
        var camId = appContent.editinfeature.editcamid;
        
        removeCameraLayerWithId(camId);
        removeFovLayersWithCameraId(camId);

        var e = appContent.editinfeature;
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
        
        newCamera.properties.objectid = c.editcamoid;
        newCamera.properties.gmlid = c.editcamgmlid;
        newCamera.properties.globalid = c.editcamglobalid;
        newCamera.properties.height = c.editcamheight;
        newCamera.properties.tilt = c.editcamtilt;
        newCamera.properties.shape = c.editcamshape;
        newCamera.properties.comments = c.editcamcomm;
        newCamera.properties.comments = c.editcamcom2;
        newCamera.properties.createdat = c.editcamcreated;
        newCamera.properties.updatedat = c.editcamupdated;
        
        var ops = {
            title: newCamera.name,
            alt: newCamera.name
        };
        var cameraFeature = L.geoJson.css(newCamera, ops);
        
        camerasLayer.addLayer(cameraFeature);
        
        var newFovs = getFovs(
            c.editcamid, 
            c.editcamlon, 
            c.editcamlat, 
            c.editcamrot, 
            c.editcamfld, 
            c.editcamssh, 
            c.editcamsrv, 
            fovLayers);
        
//        editcamid
//        editcamtype
//        editcambrand
//        editcammodel
//        editcamregion
//        editcamarea
//        editcamlat
//        editcamlon
//        editcamrot
//        editcamflc
//        editcamflma
//        editcamflmi
//        editcamfld
//        editcamssh
//        editcamssw
//        editcamsrh
//        editcamsrv
//        editcamheight
//        editcamtilt
//        editcamoid
//        editcamgmlid
//        editcamglobalid
//        editcamcreated
//        editcamupdated
//        editcamshape
//        editcamcomm
//        editcamcom2
        
        
        appContent.editinfeature = null;
        
        appContent.saveeditinfeature = null;
        
        $('#editcambutton').removeClass('hidden');
        $('#saveeditcambutton').addClass('hidden');
        $('#removecambutton').addClass('hidden');
        $('#canceleditcambutton').addClass('hidden');
        
        for (var i=0; i<fields.length; i++) {
            var field = fields[i];
            console.log(field);
//            $(fields[i]).attr('disabled', 'true');
            $('#'+field).attr('disabled', true);
        }
        
        
        var endtime = performance.now();
        var exectime = endtime - starttime;
        console.log(performance.now() + ", saveEditedCamera( " + buttonName + " ), END: " + endtime + ", Exec time (ms): " + exectime + '\n');
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
//        removeCameraLayerWithId(camId);
        
        var cameraLayer = findCamLayerById(camId);
//        removeCameraLayer(cameraLayer);
        
        map.removeLayer(cameraLayer);
        
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
        
        appContent.editinfeature = null;
        
        $('#editcambutton').removeClass('hidden');
        $('#saveeditcambutton').addClass('hidden');
        $('#removecambutton').addClass('hidden');
        $('#canceleditcambutton').addClass('hidden');
        
        for (var i=0; i<fields.length; i++) {
            var field = fields[i];
            console.log(field);
//            $(fields[i]).attr('disabled', 'true');
            $('#'+field).attr('disabled', true);
        }
        
        
        var endtime = performance.now();
        var exectime = endtime - starttime;
        console.log(performance.now() + ", cancelEditedCamera( " + buttonName + " ), END: " + endtime + ", Exec time (ms): " + exectime + '\n');
    }


    function findCamLayerById (camid) {
        var resultlayer = null;
        map.eachLayer( function (layer) { 
            console.log(layer);
            if ( (layer.feature != null) && (layer.feature.properties != null) && (layer.feature.properties.featuretype == "Camera") && (layer.feature.properties.id == camid) ) { 
                resultlayer = layer;
                return layer;
            }
        });
        return resultlayer;
    }



    function removeCameraLayerWithId (camid) {
        map.eachLayer( function (layer) { 
            if ( (layer.feature != null) && (layer.feature.properties != null) && (layer.feature.properties.featuretype == "Camera") && (layer.feature.properties.id == camid) ) { 
                console.log(layer);
                map.removeLayer(layer);
//                layer.remove();
            }
        });
    }


    function removeFovLayersWithCameraId (camid) {
        var resultlayer = null;
        map.eachLayer( function (layer) { 
            if ( (layer.feature != null) && (layer.feature.properties != null) && (layer.feature.properties.featuretype == "FoV") && (layer.feature.properties.cameraid == camid) ) { 
                console.log(layer);
                map.removeLayer(layer);
//                layer.remove();
            }
        });
    }


