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
                var l = lay.layer.layer;
                var lb = lay.layer.name;
                console.log(v);console.log(l);console.log(lb);
//                var b = sidebarOVLelement(l, v, lb);
                if (lay.category == 'Feature Layers') {
                    console.log('Feature Layers');
//                    var $div = $("<div>", {id: "foo", class: "a"});
//                    var $paperitem = ;
//                    $('#featurelayers').append(
//                        $('<div/>')
////                        .attr("flex")
//                        .append(
//                            $('<paper-item/>')
//                            .addClass("paperitembutton")
////                            .attr("center").attr("horizontal").attr("layout").attr("noink")
//                            .append(
//                                $('<paper-toggle-button/>')
//                                .addClass("featurelayerbutton")
//                                .click(function () { if (l != null) { map.hasLayer(l) ? map.removeLayer(l) : map.addLayer(l); } })
//                            )
//                            .append( $('<div/>').attr("style", "width:10px") )
//                            .append( $('<label/>')
////                                .attr("flex")
//                                .text(lb) 
//                            )
//                        )
//                    );
                    var $div = $('<div/>')
                        .attr("flex","null")
                        .append(
                            $('<paper-item/>')
                            .addClass("paperitembutton")
                            .attr("center","null").attr("horizontal","null").attr("layout","null").attr("noink","null")
                            .append(
                                $('<paper-toggle-button/>')
                                .addClass("featurelayerbutton")
                                .click(function () { if (l != null) { map.hasLayer(l) ? map.removeLayer(l) : map.addLayer(l); } })
                            )
                            .append( $('<div/>').attr("style", "width:10px") )
                            .append( $('<label/>')
                                .attr("flex","null")
                                .text(lb) 
                            )
                        );
                    console.log($div);
                    $('#featurelayers').append($div);
                }
                else {
                    console.log('populatelayerbuttons else');
                }

            }
        }
    }


    function switchButton (buttonName) {
//    function switchButton (buttonName, layer) {
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

        if (layer != null) {   
            map.hasLayer(layer) ? map.removeLayer(layer) : map.addLayer(layer);
        }
        
        console.log(buttonName);
        console.log(layer);
        
        var endtime = performance.now();
        var exectime = endtime - starttime;
        console.log(performance.now() + ", switchButton( " + buttonName + " ), END: " + endtime + ", Exec time (ms): " + exectime + '\n');
    }


