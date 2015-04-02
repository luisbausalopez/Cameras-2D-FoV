


    function mainMenuClick () {
        console.log("MAIN MENU");
    }
    function searchMenuClick () {
        console.log("SEARCH MENU");
    }
    function moreMenuClick () {
        console.log("MORE MENU");
//            l2i.download();
//            l2i.clear();
    }



// Polymer JavaScript

//    var tabs = document.querySelector('paper-tabs');

//    var doc = document;
//    doc.addEventListener('load', function() {
//        var spinner = document.querySelector('paper-spinner');
//        var coreheaderpanel = document.querySelector('core-header-panel');
//        var sidebar = document.querySelector('#sidebar');
//        
//        spinner.active = !spinner.active;
//        sidebar.active = !sidebar.active;
//        coreheaderpanel.active = !coreheaderpanel.active;
//    });


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

    function switchBasemap (a, b, c) {
        console.log(a);
        console.log(b);
        console.log(c);
        console.log("switch Basemap");
    }
//      var mainmenu = document.getElementById('mainmenu');
////      var mainmenu = document.querySelector('paper-menu-button')
//      mainmenu.addEventListener('core-select', function() {
//        console.log(performance.now() + ", MENU BUTTON CLICK"+ '\n');
//      });
//      var search = document.querySelector('paper-icon-button');
//      search.addEventListener('core-select', function() {
//        console.log(performance.now() + ", SEARCH BUTTON CLICK" + '\n');
//      });
//      var more = document.querySelector('paper-icon-button');
//      more.addEventListener('core-select', function() {
//        console.log(performance.now() + ", MORE BUTTON CLICK" + '\n');
//      });
