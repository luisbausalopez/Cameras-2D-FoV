//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
////////////                                                                        //////////////////
////////////                                 MAP JS                                 //////////////////
////////////                                                                        //////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////           Layers          //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
var layers = {
    // DITSS Cameras: Ekkersrijt 
    "DITSS_Cameras_Ekkersrijt": {
        "type": "overlay", 
        "category": "Cameras", 
        "layer": {
            "type":"betterwms",
            "visible":false,
            "name":"Cameras Ekkersrijt WMS",
            "url":"/service/geodanarcgis/services/multipos/Cameras_Ekkersrijt_20150319/MapServer/WMSServer",
            "layerOptions": {
                "name":"Cameras Ekkersrijt WMS",
                "maxZoom": 25,
                "minZoom":2,
                "layers":0,
                "format":"image/png",
                "transparent":true,
                "opacity":0.8
            }
        }
    }
    // DITSS Cameras: All 
    , "DITSS_Surveillance_Cameras": {
        "type": "overlay", 
        "category": "Cameras", 
        "layer": {
            "type":"betterwms",
            "visible":false,
            "name":"DITSS Surveillance Cameras WMS",
            "url":"/service/geodanarcgis/services/multipos/DITSS_Surveillance_Cameras/MapServer/WmsServer",
            "layerOptions": {
                "name":"DITSS Surveillance Cameras WMS",
                "maxZoom": 25,
                "minZoom":2,
                "layers":0,
                "format":"image/png",
                "transparent":true,
                "opacity":0.8
            }
        }
    }
    // PDOK AHN1: Terrain Height 
    , "AHN1_hoogtes": {
        "type": "overlay", 
        "category": "Terrain", 
        "layer": {
            "type":"betterwms",
            "visible":false,
            "name":"Height map",
            "url":"http://t3.edugis.nl/tiles/tilecache.py?map=maps/edugis/cache/hoogte.map",
            "layerOptions": {
                "name":"Height map",
                "maxZoom": 25,
                "minZoom":2,
                "layers":"hoogtes",
                "format":"image/png",
                "transparent":true,
                "opacity":0.8
            }
        }
    }
    // BAG Pand: Building footprints
    , "BAG_pand": {
        "type": "overlay", 
        "category": "BAG", 
        "layer": {
            "type":"betterwms",
            "visible":true,
            "name":"Building footprints (Pand)",
            "url":"/service/ngr/bag/wms",
            "layerOptions": {
                "name":"Building footprints (BAG Pand)",
                "maxZoom": 25,
                "minZoom":2,
                "layers":"pand",
                "format":"image/png",
                "transparent":true,
                "opacity":0.8
            }
        }
    }
//    // BAG Ligplaats: floating houses
//    , "BAG_ligplaats": {
//        "type": "overlay", 
//        "category": "BAG", 
//        "layer": {
//            "type":"betterwms",
//            "visible":false,
//            "name":"Floating houses (Ligplaats)",
//            "url":"/service/ngr/bag/wms",
//            "layerOptions": {
//                "maxZoom": 25,
//                "minZoom":2,
//                "layers":"ligplaats",
//                "format":"image/png",
//                "transparent":true,
//                "opacity":0.85
//            }
//        }
//    }
//    // BAG Standplaats: temporary pitches/caravans
//    , "BAG_standplaats": {
//        "type": "overlay", 
//        "category": "BAG", 
//        "layer": {
//            "type":"betterwms",
//            "visible":false,
//            "name":"Seasonal pitches (Standplaats)",
//            "url":"/service/ngr/bag/wms",
//            "layerOptions": {
//                "maxZoom": 25,
//                "minZoom":2,
//                "layers":"standplaats",
//                "format":"image/png",
//                "transparent":true,
//                "opacity":0.8
//            }
//        }
//    }
//    // BAG Verblijfobject: Residential objects
//    , "BAG_verblijfsobject": {
//        "type": "overlay", 
//        "category": "BAG", 
//        "layer": {
//            "type":"betterwms",
//            "visible":false,
//            "name":"Residential objects (Verblijfobject)",
//            "url":"/service/ngr/bag/wms",
//            "layerOptions": {
//                "maxZoom": 25,
//                "minZoom":2,
//                "layers":"verblijfsobject",
//                "format":"image/png",
//                "transparent":true,
//                "opacity":0.8
//            }
//        }
//    }
//    // BAG Woonplaats: 
//    , "BAG_woonplaats": {
//        "type": "overlay", 
//        "category": "BAG", 
//        "layer": {
//            "type":"betterwms",
//            "visible":false,
//            "name":"woonplaats",
//            "url":"/service/ngr/bag/wms",
//            "layerOptions": {
//                "name":"woonplaats",
//                "layers":"woonplaats",
//                "format":"image/png",
//                "transparent":true,
//                "opacity":0.8
//            }
//        }
//    }
//    // PDOK AHN2: Terrain height 0.5m interpolated
//    , "AHN2_05m_int": {
//        "type": "overlay", 
//        "category": "AHN2", 
//        "layer": {
//            "type":"betterwms",
//            "visible":false,
//            "name":"Terrain Height (0.5m interpolated)",
//            "url":"/service/ngr/ahn2/wms",
//            "layerOptions": {
//                "name":"Terrain Height (0.5m interpolated)",
//                "maxZoom": 25,
//                "minZoom":2,
//                "layers":"ahn2_05m_int",
//                "format":"image/png",
//                "transparent":true,
//                "opacity":0.8
//            }
//        }
//    }
//    // PDOK AHN2: Terrain height 0.5m no interpolated
//    , "AHN2_05m_non": {
//        "type": "overlay", 
//        "category": "AHN2", 
//        "layer": {
//            "type":"betterwms",
//            "visible":false,
//            "name":"Terrain Height (0.5m no interpolated)",
//            "url":"/service/ngr/ahn2/wms",
//            "layerOptions": {
//                "maxZoom": 25,
//                "minZoom":2,
//                "layers":"ahn2_05m_non",
//                "format":"image/png",
//                "transparent":true,
//                "opacity":0.8
//            }
//        }
//    }
//    // PDOK AHN2: Terrain height 0.5m raw
//    , "AHN2_05m_ruw": {
//        "type": "overlay", 
//        "category": "AHN2", 
//        "layer": {
//            "type":"betterwms",
//            "visible":false,
//            "name":"Terrain Height (0.5m raw)",
//            "url":"/service/ngr/ahn2/wms",
//            "layerOptions": {
//                "maxZoom": 25,
//                "minZoom":2,
//                "layers":"ahn2_05m_ruw",
//                "format":"image/png",
//                "transparent":true,
//                "opacity":0.8
//            }
//        }
//    }
//    // PDOK AHN2: Terrain height 5m
//    , "AHN2_5m": {
//        "type": "overlay", 
//        "category": "AHN2", 
//        "layer": {
//            "type":"betterwms",
//            "visible":false,
//            "name":"Terrain Height (5m)",
//            "url":"/service/ngr/ahn2/wms",
//            "layerOptions": {
//                "maxZoom": 25,
//                "minZoom":2,
//                "layers":"ahn2_5m",
//                "format":"image/png",
//                "transparent":true,
//                "opacity":0.8
//            }
//        }
//    }
//    // PDOK AHN2: Bladindex
//    , "AHN2_bladindex": {
//        "type": "overlay", 
//        "category": "AHN2", 
//        "layer": {
//            "type":"betterwms",
//            "visible":false,
//            "name":"AHN2 Bladindex",
//            "url":"/service/ngr/ahn2/wms",
//            "layerOptions": {
//                "maxZoom": 25,
//                "minZoom":2,
//                "layers":"ahn2_bladindex",
//                "format":"image/png",
//                "transparent":true,
//                "opacity":0.8
//            }
//        }
//    }
//    // PDOK TOP10NL Wegdeelvlakken: Pathways/roadways sections
//    , "TOP10NL_wegdeelvlakken": {
//        "type": "overlay", 
//        "category": "TOP10NL", 
//        "layer": {
//            "type":"betterwms",
//            "visible":false,
//            "name":"Pathways (Wegdeelvlakken)",
//            "url":"/service/ngr/top10nl/wms",
//            "layerOptions": {
//                "maxZoom": 25,
//                "minZoom":2,
//                "layers":"wegdeelvlakken",
//                "format":"image/png",
//                "transparent":true,
//                "opacity":0.8
//            }
//        }
//    }
//    // PDOK TOP10NL Waterdeellijnen: Waterways lines
//    , "TOP10NL_waterdeellijnen": {
//        "type": "overlay", 
//        "category": "TOP10NL", 
//        "layer": {
//            "type":"betterwms",
//            "visible":false,
//            "name":"waterdeellijnen",
//            "url":"/service/ngr/top10nl/wms",
//            "layerOptions": {
//                "maxZoom": 25,
//                "minZoom":2,
//                "layers":"waterdeellijnen",
//                "format":"image/png",
//                "transparent":true,
//                "opacity":0.8
//            }
//        }
//    }
//    // PDOK TOP10NL Waterdeelvlakken: Waterways sections
//    , "TOP10NL_waterdeel_vlakken": {
//        "type": "overlay", 
//        "category": "TOP10NL", 
//        "layer": {
//            "type":"betterwms",
//            "visible":false,
//            "name":"waterdeel_vlakken",
//            "url":"/service/ngr/top10nl/wms",
//            "layerOptions": {
//                "maxZoom": 25,
//                "minZoom":2,
//                "layers":"waterdeel_vlakken",
//                "format":"image/png",
//                "transparent":true,
//                "opacity":0.8
//            }
//        }
//    }
//    // PDOK TOP10NL Terreinen: Terrain (land use)
//    , "TOP10NL_terreinen": {
//        "type": "overlay", 
//        "category": "TOP10NL", 
//        "layer": {
//            "type":"betterwms",
//            "visible":false,
//            "name":"Land use",
//            "url":"/service/ngr/top10nl/wms",
//            "layerOptions": {
//                "maxZoom": 25,
//                "minZoom":2,
//                "layers":"terreinen",
//                "format":"image/png",
//                "transparent":true,
//                "opacity":0.8
//            }
//        }
//    }
//    // PDOK TOP10NL Spoorbaandeel lijnen: Train Rails
//    , "TOP10NL_spoorbaandeel_lijnen": {
//        "type": "overlay", 
//        "category": "TOP10NL", 
//        "layer": {
//            "type":"betterwms",
//            "visible":false,
//            "name":"Train Rails",
//            "url":"/service/ngr/top10nl/wms",
//            "layerOptions": {
//                "maxZoom": 25,
//                "minZoom":2,
//                "layers":"spoorbaandeel_lijnen",
//                "format":"image/png",
//                "transparent":true,
//                "opacity":0.8
//            }
//        }
//    }
//    // PDOK TOP10NL Inrichtingselementlijnen: 
//    , "TOP10NL_inrichtingselementlijnen": {
//        "type": "overlay", 
//        "category": "TOP10NL", 
//        "layer": {
//            "type":"betterwms",
//            "visible":false,
//            "name":"inrichtingselementlijnen",
//            "url":"/service/ngr/top10nl/wms",
//            "layerOptions": {
//                "layers":"inrichtingselementlijnen",
//                "format":"image/png",
//                "transparent":true,
//                "opacity":0.8
//            }
//        }
//    }
//    // PDOK TOP10NL Inrichtingselement punten: __ points
//    , "TOP10NL_inrichtingselement_punten": {
//        "type": "overlay", 
//        "category": "TOP10NL", 
//        "layer": {
//            "type":"betterwms",
//            "visible":false,
//            "name":"inrichtingselement_punten",
//            "url":"/service/ngr/top10nl/wms",
//            "layerOptions": {
//                "layers":"inrichtingselement_punten",
//                "format":"image/png",
//                "transparent":true,
//                "opacity":0.8
//            }
//        }
//    }
//    // PDOK TOP10NL Geo Labels: geographic elements labels
//    , "TOP10NL_geo_labels": {
//        "type": "overlay", 
//        "category": "TOP10NL", 
//        "layer": {
//            "type":"betterwms",
//            "visible":false,
//            "name":"geo_labels",
//            "url":"/service/ngr/top10nl/wms",
//            "layerOptions": {
//                "layers":"geo_labels",
//                "format":"image/png",
//                "transparent":true,
//                "opacity":0.8
//            }
//        }
//    }
//    // PDOK TOP10NL Gebouwen: 
//    , "TOP10NL_gebouwen": {
//        "type": "overlay", 
//        "category": "TOP10NL", 
//        "layer": {
//            "type":"betterwms",
//            "visible":false,
//            "name":"gebouwen",
//            "url":"/service/ngr/top10nl/wms",
//            "layerOptions": {
//                "maxZoom": 25,
//                "minZoom":2,
//                "layers":"gebouwen",
//                "format":"image/png",
//                "transparent":true,
//                "opacity":0.8
//            }
//        }
//    }
//    // PDOK TOP10NL Functioneelgebied labels: 
//    , "TOP10NL_functioneelgebied_labels": {
//        "type": "overlay", 
//        "category": "TOP10NL", 
//        "layer": {
//            "type":"betterwms",
//            "visible":false,
//            "name":"functioneelgebied_labels",
//            "url":"/service/ngr/top10nl/wms",
//            "layerOptions": {
//                "maxZoom": 25,
//                "minZoom":2,
//                "layers":"functioneelgebied_labels",
//                "format":"image/png",
//                "transparent":true,
//                "opacity":0.8
//            }
//        }
//    }
//    // PDOK BRP Gewaspercelen: Crop parcels
//    , "BRP_brpgewaspercelen": {
//        "type": "overlay", 
//        "category": "BRP", 
//        "layer": {
//            "type": "betterwms",
//            "visible": false, 
//            "name": "Crop parcels", 
//            "url": "/service/ngr/brpgewaspercelen/wms", 
//            "layerOptions": {
//                "maxZoom": 25,
//                "minZoom":2,
//                "layers": "brpgewaspercelen",
//                "format": "image/png", 
//                "transparent": true
//            }
//        }
//    }
//    // 3Di Wave Front
//    , golffront: {
//    type: 'overlay', 
//    category: '3Di', 
//    layer: { 
//            name: "Wave front",
//            type:  'betterwms',
//            url: "http://result.3di.lizard.net/3di/wms",
//            visible: false,
//            layerOptions: {
//                "maxZoom": 25,
//                "minZoom":2,
//                layers: '61f5a464c35044c19bc7d4b42d7f58cb:arrival',
//                format: 'image/png',
//                transparent: true
//            }
//        }
//    }
//    // 3Di Water Depth
//    , waterdepth: {
//        type: 'overlay', 
//        category: '3Di', 
//        layer: { 
//            name: "Water depth",
//            type:  'betterwms',
//            url: "http://result.3di.lizard.net/3di/wms",
//            visible: false,
//            layerOptions: {
//                name: "Water depth",
//                "maxZoom": 25,
//                "minZoom":2,
//                layers: '61f5a464c35044c19bc7d4b42d7f58cb:maxdepth',
//                format: 'image/png',
//                transparent: true
//            }
//        }
//    }
    
    // BASEMAPS
    // Basemap CartoDB Light Grey 
    , lightgrey: {
        type: 'basemap', 
        category: 'Basemaps', 
        layer: { 
            name: 'Light Grey',
            type: "tilelayer",
            url: "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
            visible: true,
            layerOptions: {
                name: 'Light Grey',
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
                maxZoom: 25,
                minZoom: 1
            }
        }
    }
//    // Basemap CartoDB Light Grey (no labels)
//    , lightgreynl: {
//        type: 'basemap', 
//        category: 'Basemaps', 
//        layer: { 
//            name: 'Light Grey (no labels)',
//            type: "tilelayer",
//            url: "http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
//            visible: false,
//            layerOptions: {
//                name: 'Light Grey (no labels)',
//                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
//                maxZoom: 25,
//                minZoom: 1
//            }
//        }
//    }
//    // Basemap CartoDB Dark Grey
//    , darkgrey: {
//        type: 'basemap', 
//        category: 'Basemaps', 
//        layer: { 
//            name: 'Dark Grey',
//            type: "tilelayer",
//            url: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
//            visible: false,
//            layerOptions: {
//                name: 'Dark Grey',
//                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
//                maxZoom: 25,
//                minZoom: 1
//            }
//        }
//    }
//    // Basemap CartoDB Dark Grey (no labels)
//    , darkgreynl: {
//        type: 'basemap', 
//        category: 'Basemaps', 
//        layer: { 
//            name: 'Darak Grey (no labels)',
//            type: "tilelayer",
//            url: 'http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',
//            visible: false,
//            layerOptions: {
//                name: 'Darak Grey (no labels)',
//                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
//                maxZoom: 25,
//                minZoom: 1
//            }
//        }
//    }
    // Basemap OSM Humanitarian
    , humanitarian: {
        type: 'basemap', 
        category: 'Basemaps', 
        layer: { 
            name: 'Humanitarian',
            type: "tilelayer",
            url: 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
            visible: false,
            layerOptions: {
                name: 'Humanitarian',
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
                maxZoom: 20,
                minZoom: 1
            }
        }
    }
//    // Basemap OSM Default
//    , openstreetmaps: {
//        type: 'basemap', 
//        category: 'Basemaps', 
//        layer: { 
//            name: 'OpenStreetMaps',
//            type: "tilelayer",
//            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//            visible: false,
//            layerOptions: {
//                name: 'OpenStreetMaps',
//                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
//                maxZoom: 19,
//                minZoom: 1
//            }
//        }
//    }
    // Basemap OSM Landscape
    , landscape: {
        type: 'basemap', 
        category: 'Basemaps', 
        layer: { 
            name: 'Landscape',
            type: "tilelayer",
            url: 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
            visible: false,
            layerOptions: {
                name: 'Landscape',
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
                maxZoom: 18,
                minZoom: 1
            }
        }
    }
//    // Basemap OSM Transport
//    , transport: {
//        type: 'basemap', 
//        category: 'Basemaps', 
//        layer: { 
//            name: 'Transport',
//            type: "tilelayer",
//            url: 'https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png',
//            visible: false,
//            layerOptions: {
//                name: 'Transport',
//                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
//                maxZoom: 25,
//                minZoom: 1
//            }
//        }
//    }
    // Basemap Mapnik
    , mapnik: {
        type: 'basemap', 
        category: 'Basemaps', 
        layer: { 
            name: 'Mapnik',
            type: "tilelayer",
            url: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
            visible: false,
            layerOptions: {
                name: 'Mapnik',
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
                maxZoom: 17,
                minZoom: 1
            }
        }
    }
//    // Basemap Navteq
//    , navteq: {
//        type: 'basemap', 
//        category: 'Basemaps', 
//        layer: { 
//            name: 'Navteq',
//            type: "tilelayer",
//            url: 'http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',
//            visible: false,
//            layerOptions: {
//                name: 'Navteq',
//                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
//                maxZoom: 19,
//                minZoom: 1
//            }
//        }
//    }
    // Basemap Esri Topography
    , esritopo: {
        type: 'basemap', 
        category: 'Basemaps', 
        layer: { 
            name: 'Topography',
            type: "tilelayer",
            url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
            visible: false,
            layerOptions: {
                name: 'Topography',
                attribution: '<a href="http://www.nconemap.com">NC OneMap</a> Tiles: &copy; Esri',
                maxZoom: 19,
                minZoom: 1
            }
        }
    }
    
    
    // Basemap Esri World
    , esriworld: {
        type: 'basemap', 
        category: 'Basemaps', 
        layer: { 
            name: 'Satellite',
            type: "tilelayer",
            url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            visible: false,
            layerOptions: {
                name: 'Satellite',
                attribution: '&copy; <a href="http://www.esri.com/">Esri</a>, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
                maxZoom: 18,
                minZoom: 1
            }
        }
    }
    
    
//    // FEATURE LAYERS
//    // GeoJSON Feature Layer geojson
//    , geojson: {
//        type: 'overlay', 
//        category: 'Feature Layers', 
//        layer: { 
//            name: 'geojson',
//            type: "geojson",
//            url: '',
//            visible: false,
//            layerOptions: {
//                attribution: '',
//                maxZoom: 25,
//                minZoom: 1
//            }
//        }
//    }
//    // MarkerCluster Feature Layer markercluster
//    , markercluster: {
//        type: 'overlay', 
//        category: 'Feature Layers', 
//        layer: { 
//            name: 'markercluster',
//            type: "markercluster",
//            url: '',
//            visible: false,
//            layerOptions: {
//                attribution: '',
//                maxZoom: 25,
//                minZoom: 1
//            }
//        }
//    }
//    // Esri Feature Layer esrifeaturelayer
//    , esrifeaturelayer: {
//        type: 'overlay', 
//        category: 'Feature Layers', 
//        layer: { 
//            name: 'esrifeaturelayer',
//            type: "esrifeaturelayer",
//            url: '',
//            visible: false,
//            layerOptions: {
//                attribution: '',
//                maxZoom: 25,
//                minZoom: 1
//            }
//        }
//    }
    // Esri Feature Layer Cams Ekk FS
    , camsekkfslh: {
        type: 'overlay', 
        category: 'Feature Layers', 
        layer: { 
            name: 'Cams Ekk FS LH',
            type: "esrifeaturelayer",
            url: '/service/localhostarcgis/rest/services/Cameras/Cameras_Ekkersrijt_20150319/FeatureServer/0/',
            visible: false,
            layerOptions: {
//                attribution: '',
                name: 'Cams Ekk FS LH',
                maxZoom: 25,
                minZoom: 1
            }
        }
    }
    // Esri Feature Layer Cams Ekk FS
    , camsekkfsgeodan: {
        type: 'overlay', 
        category: 'Feature Layers', 
        layer: { 
            name: 'Cams Ekk FS Geodan',
            type: "esrifeaturelayer",
            url: '/service/geodanarcgis/rest/services/multipos/Cameras_Ekkersrijt_20150319/FeatureServer/0/',
            visible: false,
            layerOptions: {
                name: 'Cams Ekk FS Geodan',
//                attribution: '',
                maxZoom: 25,
                minZoom: 1
            }
        }
    }
    // MarkerCluster Feature Layer GeoJSON Ekkersrijt Cameras
    , camsekkgeojsonmk: {
        type: 'overlay', 
        category: 'Feature Layers', 
        layer: { 
            name: 'GeoJSON Ekkersrijt Cameras',
//            name: 'GeoJSON Ekkersrijt Cameras 2',
            type: "markercluster",
            url: './data/cameras_ekkersrijt.json',
            visible: true,
            layerOptions: {
                name: 'GeoJSON Ekkersrijt Cameras',
                spiderfyOnMaxZoom: true,    // default true
                showCoverageOnHover: true,     // default true
                zoomToBoundsOnClick: true,     // default true
                removeOutsideVisibleBounds: true,   // true for enhanced performance
                animateAddingMarkers: true,    // default true
                disableClusteringAtZoom: 13,    // default disabled
                maxClusterRadius: 100, // Default 80
                spiderfyDistanceMultiplier: 100, // default 1
                polygonOptions: {
                    color: 'yellow',
                    weight: 15,
                    opacity: 0.9,
                    fillOpacity: 0.6
                },
//                iconCreateFunction: function(cluster) {
//                    return new L.DivIcon({ html: '<b>' + cluster.getChildCount() + '</b>' });
//                },
                singleMarkerMode: false,     // default false
//                attribution: '',
                maxZoom: 25,
                minZoom: 1
            }
        }
    }
    // GeoJSON Feature Layer GeoJSON FoV Identification
    , geojsonfovidentification: {
        type: 'overlay', 
        category: 'Feature Layers', 
        layer: { 
            name: 'GeoJSON FoV Identification',
            type: "geojson",
            url: '',
            visible: true,
            layerOptions: {
                attribution: '',
                maxZoom: 25,
                minZoom: 1
            }
        }
    }
    // GeoJSON Feature Layer GeoJSON FoV Recognition
    , geojsonfovrecognition: {
        type: 'overlay', 
        category: 'Feature Layers', 
        layer: { 
            name: 'GeoJSON FoV Recognition',
            type: "geojson",
            url: '',
            visible: true,
            layerOptions: {
                attribution: '',
                maxZoom: 25,
                minZoom: 1
            }
        }
    }
    // GeoJSON Feature Layer GeoJSON FoV Detection
    , geojsonfovdetection: {
        type: 'overlay', 
        category: 'Feature Layers', 
        layer: { 
            name: 'GeoJSON FoV Detection',
            type: "geojson",
            url: '',
            visible: true,
            layerOptions: {
                attribution: '',
                maxZoom: 25,
                minZoom: 1
            }
        }
    }
    // GeoJSON Feature Layer GeoJSON FoV Monitor
    , geojsonfovmonitor: {
        type: 'overlay', 
        category: 'Feature Layers', 
        layer: { 
            name: 'GeoJSON FoV Monitor',
            type: "geojson",
            url: '',
            visible: true,
            layerOptions: {
                attribution: '',
                maxZoom: 25,
                minZoom: 1
            }
        }
    }
    // GeoJSON Feature Layer GeoJSON FoV Visible
    , geojsonfovvisible: {
        type: 'overlay', 
        category: 'Feature Layers', 
        layer: { 
            name: 'GeoJSON FoV Visible',
            type: "geojson",
            url: '',
            visible: true,
            layerOptions: {
                name: 'GeoJSON FoV Visible',
                attribution: '',
                maxZoom: 25,
                minZoom: 1
            }
        }
    }
    
    // MarkerCluster WFST Feature Layer GeoJSON Ekkersrijt Cameras
    , wfstcamsekkgeojsonmk: {
        type: 'overlay', 
        category: 'Feature Layers', 
        layer: { 
            name: 'LH WFST CAMS',
            type: "markercluster",
            url: '/service/localhostarcgis/services/Cameras/Cameras_Ekkersrijt_20150319/MapServer/WFSServer?request=getfeature&typename=Cameras_Ekkersrijt_withspecs',
            visible: true,
            layerOptions: {
                name: 'LH WFST CAMS',
                spiderfyOnMaxZoom: true,    // default true
                showCoverageOnHover: true,     // default true
                zoomToBoundsOnClick: true,     // default true
                removeOutsideVisibleBounds: true,   // true for enhanced performance
                animateAddingMarkers: true,    // default true
                disableClusteringAtZoom: 13,    // default disabled
                maxClusterRadius: 100, // Default 80
                spiderfyDistanceMultiplier: 100, // default 1
                polygonOptions: {
                    color: 'yellow',
                    weight: 15,
                    opacity: 0.9,
                    fillOpacity: 0.6
                },
//                iconCreateFunction: function(cluster) {
//                    return new L.DivIcon({ html: '<b>' + cluster.getChildCount() + '</b>' });
//                },
                singleMarkerMode: false,     // default false
//                attribution: '',
                maxZoom: 25,
                minZoom: 1
            }
        }
    }
    // GeoJSON WFST Feature Layer GeoJSON FoV Identification
    , wfstgeojsonfovidentification: {
        type: 'overlay', 
        category: 'Feature Layers', 
        layer: { 
            name: 'LH WFST CAMS FoV Identification',
            type: "geojson",
            url: '',
            visible: true,
            layerOptions: {
                name: 'LH WFST CAMS FoV Identification',
                attribution: '',
                maxZoom: 25,
                minZoom: 1
            }
        }
    }
    // GeoJSON WFST Feature Layer GeoJSON FoV Recognition
    , wfstgeojsonfovrecognition: {
        type: 'overlay', 
        category: 'Feature Layers', 
        layer: { 
            name: 'LH WFST CAMS FoV Recognition',
            type: "geojson",
            url: '',
            visible: true,
            layerOptions: {
                name: 'LH WFST CAMS FoV Recognition',
                attribution: '',
                maxZoom: 25,
                minZoom: 1
            }
        }
    }
    // GeoJSON WFST Feature Layer GeoJSON FoV Detection
    , wfstgeojsonfovdetection: {
        type: 'overlay', 
        category: 'Feature Layers', 
        layer: { 
            name: 'LH WFST CAMS FoV Detection',
            type: "geojson",
            url: '',
            visible: true,
            layerOptions: {
                name: 'LH WFST CAMS FoV Detection',
                attribution: '',
                maxZoom: 25,
                minZoom: 1
            }
        }
    }
    // GeoJSON FWFST eature Layer GeoJSON FoV Monitor
    , wfstgeojsonfovmonitor: {
        type: 'overlay', 
        category: 'Feature Layers', 
        layer: { 
            name: 'LH WFST CAMS FoV M&C',
            type: "geojson",
            url: '',
            visible: true,
            layerOptions: {
                name: 'LH WFST CAMS FoV M&C',
                attribution: '',
                maxZoom: 25,
                minZoom: 1
            }
        }
    }
    // GeoJSON WFST Feature Layer GeoJSON FoV Visible
    , wfstgeojsonfovvisible: {
        type: 'overlay', 
        category: 'Feature Layers', 
        layer: { 
            name: 'LH WFST CAMS FoV Visible',
            type: "geojson",
            url: '',
            visible: true,
            layerOptions: {
                name: 'LH WFST CAMS FoV Visible',
                attribution: '',
                maxZoom: 25,
                minZoom: 1
            }
        }
    }
    
    // MarkerCluster WFST Feature Layer GeoJSON Ekkersrijt Cameras
    , geodanwfstcamsekkgeojsonmk: {
        type: 'overlay', 
        category: 'Feature Layers', 
        layer: { 
            name: 'Geodan WFST CAMS',
            type: "markercluster",
//            url: 'http://arcgis.geodan.nl:6080/arcgis/services/multipos/Cameras_Ekkersrijt_20150319/MapServer/WFSServer?request=getfeature&typename=Cameras_Ekkersrijt_withspecs',
            url: '/service/geodanarcgis/services/multipos/Cameras_Ekkersrijt_20150319/MapServer/WFSServer?request=getfeature&typename=Cameras_Ekkersrijt_withspecs',
            visible: true,
            layerOptions: {
                name: 'Geodan WFST CAMS',
                spiderfyOnMaxZoom: true,    // default true
                showCoverageOnHover: true,     // default true
                zoomToBoundsOnClick: true,     // default true
                removeOutsideVisibleBounds: true,   // true for enhanced performance
                animateAddingMarkers: true,    // default true
                disableClusteringAtZoom: 13,    // default disabled
                maxClusterRadius: 100, // Default 80
                spiderfyDistanceMultiplier: 100, // default 1
                polygonOptions: {
                    color: 'yellow',
                    weight: 15,
                    opacity: 0.9,
                    fillOpacity: 0.6
                },
//                iconCreateFunction: function(cluster) {
//                    return new L.DivIcon({ html: '<b>' + cluster.getChildCount() + '</b>' });
//                },
                singleMarkerMode: false,     // default false
//                attribution: '',
                maxZoom: 25,
                minZoom: 1
            }
        }
    }
    // GeoJSON WFST Feature Layer GeoJSON FoV Identification
    , geodanwfstgeojsonfovidentification: {
        type: 'overlay', 
        category: 'Feature Layers', 
        layer: { 
            name: 'Geodan WFST CAMS FoV Identification',
            type: "geojson",
            url: '',
            visible: true,
            layerOptions: {
                name: 'Geodan WFST CAMS FoV Identification',
                attribution: '',
                maxZoom: 25,
                minZoom: 1
            }
        }
    }
    // GeoJSON WFST Feature Layer GeoJSON FoV Recognition
    , geodanwfstgeojsonfovrecognition: {
        type: 'overlay', 
        category: 'Feature Layers', 
        layer: { 
            name: 'Geodan WFST CAMS FoV Recognition',
            type: "geojson",
            url: '',
            visible: true,
            layerOptions: {
                name: 'Geodan WFST CAMS FoV Recognition',
                attribution: '',
                maxZoom: 25,
                minZoom: 1
            }
        }
    }
    // GeoJSON WFST Feature Layer GeoJSON FoV Detection
    , geodanwfstgeojsonfovdetection: {
        type: 'overlay', 
        category: 'Feature Layers', 
        layer: { 
            name: 'Geodan WFST CAMS FoV Detection',
            type: "geojson",
            url: '',
            visible: true,
            layerOptions: {
                name: 'Geodan WFST CAMS FoV Detection',
                attribution: '',
                maxZoom: 25,
                minZoom: 1
            }
        }
    }
    // GeoJSON FWFST eature Layer GeoJSON FoV Monitor
    , geodanwfstgeojsonfovmonitor: {
        type: 'overlay', 
        category: 'Feature Layers', 
        layer: { 
            name: 'Geodan WFST CAMS FoV M&C',
            type: "geojson",
            url: '',
            visible: true,
            layerOptions: {
                name: 'Geodan WFST CAMS FoV M&C',
                attribution: '',
                maxZoom: 25,
                minZoom: 1
            }
        }
    }
    // GeoJSON WFST Feature Layer GeoJSON FoV Visible
    , geodanwfstgeojsonfovvisible: {
        type: 'overlay', 
        category: 'Feature Layers', 
        layer: { 
            name: 'Geodan WFST CAMS FoV Visible',
            type: "geojson",
            url: '',
            visible: true,
            layerOptions: {
                name: 'Geodan WFST CAMS FoV Visible',
                attribution: '',
                maxZoom: 25,
                minZoom: 1
            }
        }
    }
    
    
};

//  # PROXY Web Services
//  ProxyPass /service/ngr/     http://geodata.nationaalgeoregister.nl/

//  ProxyPass /service/localhostarcgis/     http://localhost:6080/arcgis/

//  ProxyPass /service/cams/    http://wingis/camera/api/
//  ProxyPass /service/multipos/    http://arcgisdemo.geodan.nl/arcgis/rest/services/multipos/
//  ProxyPass /service/geodanarcgis/    http://arcgis.geodan.nl:6080/arcgis/





///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////     getBasemapLayers()    //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
// getBasemapLayers() - Create basemap layers
function getBasemapLayers () {
    var starttime = performance.now();
    if (appContent.console.outputLevel >= 1) { console.log(performance.now() + ", getBasemapLayers(), START: " + starttime + '\n'); }
    
    // basemaps
    var basemaps = {};
    
    // load basemaps
    for (i in layers) {
        if (layers[i].type == "basemap") {
            var bm = layers[i];
            if (bm.layer.type == "tilelayer") {
                basemaps[bm.layer.name] = L.tileLayer(bm.layer.url, bm.layer.layerOptions);
                basemaps[bm.layer.name].on("loading",function(e) { 
                    if (appContent.console.outputLevel >= 3) { 
                        console.log(performance.now() + ", BASELAYER " + e.target.options.name + " is loading"); 
                    }
                });
                basemaps[bm.layer.name].on("load",function(e) { 
                    if (appContent.console.outputLevel >= 3) { 
                        console.log(performance.now() + ", BASELAYER " + e.target.options.name + " has been loaded"); 
                    }
                });
            }
            else if (bm.layer.type == "wms") {
                basemaps[bm.layer.name] = L.tileLayer.wms(bm.layer.url, bm.layer.layerOptions);
                basemaps[bm.layer.name].on("loading",function(e) { 
                    if (appContent.console.outputLevel >= 3) { 
                        console.log(performance.now() + ", WMS BASELAYER " + e.target.options.name + " is loading"); 
                    }
                });
                basemaps[bm.layer.name].on("load",function(e) { 
                    if (appContent.console.outputLevel >= 3) { 
                        console.log(performance.now() + ", WMS BASELAYER " + e.target.options.name + " has been loaded"); 
                    }
                });
            }
            layers[i].layer.layer = basemaps[bm.layer.name];
        }   // END IF LAYER IS BASEMAP
    }   // END FOR I IN LAYERS
    
    var endtime = performance.now();
    var totaltime = endtime - starttime;
    
    if (appContent.track.endtime < endtime) {
        appContent.track.endtime = endtime;
        appContent.track.totaltime = appContent.track.endtime - appContent.track.starttime;
    }
    appContent.track.elapsedtime += totaltime;
    
    if (appContent.console.outputLevel >= 1) { console.log(performance.now() + ", getBasemapLayers(), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n'); }
    
    return basemaps;
}       // END getBasemapLayers()





///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////       getOverlays()       //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
// getOverlays() - Return Overlay layers
function getOverlays () {
    var starttime = performance.now();
    if (appContent.console.outputLevel >= 1) { console.log(performance.now() + ", getOverlays(), START: " + starttime + '\n'); }
    
    var overlays = {};
    
    // get overlays, create layers and instantiate them
    for (i in layers) {     // for each layer
        if (layers[i].type == "overlay") {   // if it is an overlay 
            var ovl = layers[i];
            // WMS LAYERS
            if (layers[i].layer.type == "betterwms") {    // if layer.type is betterwms
//                overlays[ovl.layer.name] = L.tileLayer.betterWms(ovl.layer.url, ovl.layer.layerOptions);   // create and instantiate overlay
                overlays[ovl.layer.name] = L.tileLayer.wms(ovl.layer.url, ovl.layer.layerOptions);   // create and instantiate overlay
//                overlays[ovl.layer.name].options.name = ovl.layer.name;
                if (appContent.console.outputLevel >= 2) { 
                    console.log("betterwms " + ovl.layer.name); 
                }
                overlays[ovl.layer.name].on("loading",function(e) {
                    if (appContent.console.outputLevel >= 3) { 
                        console.log(e); console.log(performance.now() + ", betterwms OVERLAY " + e.target.options.name + " is loading"); 
                    }
                });
                overlays[ovl.layer.name].on("load",function(e) {
                    if (appContent.console.outputLevel >= 3) { 
                        console.log(e); console.log(performance.now() + ", betterwms OVERLAY " + e.target.options.name + " has been loaded");  
                    }
                });
//                layers[i].layer.layer = overlays[ovl.layer.name];
            }
            // GeoJSON LAYERS
            else if (layers[i].layer.type == "geojson") {    // if layer.type is geojson.css
//                overlays[ovl.layer.name] = L.geoJson.css(ovl.layer.layerOptions)   // create and instantiate overlay
                overlays[ovl.layer.name] = L.geoJson.css()   // create and instantiate overlay
                overlays[ovl.layer.name].options.name = ovl.layer.name;
                if (appContent.console.outputLevel >= 2) { 
                    console.log("geojson" + ovl.layer.name); 
                }
                overlays[ovl.layer.name].on("loading",function(e) {
                    if (appContent.console.outputLevel >= 3) { 
                        console.log(performance.now() + ", geojson OVERLAY " + e.target.options.name + " is loading"); console.log(JSON.stringify(e)); 
                    }
                });
                overlays[ovl.layer.name].on("load",function(e) {
                    if (appContent.console.outputLevel >= 3) { 
                        console.log(performance.now() + ", geojson OVERLAY " + e.target.options.name + " has been loaded"); console.log(JSON.stringify(e)); 
                    }
                });
//                layers[i].layer.layer = overlays[ovl.layer.name];
            }
            // Marker Cluster LAYERS
            else if (layers[i].layer.type == "markercluster") {    // if layer.type is marker Cluster
                overlays[ovl.layer.name] = L.markerClusterGroup(ovl.layer.layerOptions);   // create and instantiate overlay
//                overlays[ovl.layer.name].options.name = ovl.layer.name;
               
                if (appContent.console.outputLevel >= 2) { 
                    console.log("markercluster " + ovl.layer.name); 
                }
                overlays[ovl.layer.name].on("loading",function(e) {
                    if (appContent.console.outputLevel >= 3) { 
                        console.log(performance.now() + ", markercluster OVERLAY " + e.target.options.name + " is loading"); 
                    }
                });
                overlays[ovl.layer.name].on("load",function(e) {
                    if (appContent.console.outputLevel >= 3) { 
                        console.log(performance.now() + ", markercluster OVERLAY " + e.target.options.name + " has been loaded"); 
                    }
                });
//                layers[i].layer.layer = overlays[ovl.layer.name];
            }
            // Esri Feature LAYERS
            else if (layers[i].layer.type == "esrifeaturelayer") {    // if layer.type is Esri Feature Layer
//                var icon = L.Icon({
//                    iconUrl: 'img/camera.png',
//                    iconSize: [18, 18],
//                    iconAnchor: [9, 9],
//                    popupAnchor: [0, 0]
//                });
//                var icon2 = { icon: {
//                    iconUrl: 'img/camera.png',
//                    iconSize: [18, 18],
//                    iconAnchor: [9, 9],
//                    popupAnchor: [0, 0]
//                }};
//                overlays[ovl.layer.name] = L.esri.featureLayer(ovl.layer.url, ovl.layer.layerOptions);   // create and instantiate overlay
//                overlays[ovl.layer.name] = L.esri.featureLayer(ovl.layer.url, { pointToLayer: function (geojson, latlng) { return L.marker(latlng, { icon: icon }); } });   // create and instantiate overlay
                overlays[ovl.layer.name] = L.esri.featureLayer(ovl.layer.url);   // create and instantiate overlay
                overlays[ovl.layer.name].options.name = ovl.layer.name;
               
                if (appContent.console.outputLevel >= 2) { 
                    console.log("esrifeaturelayer " + ovl.layer.name); 
                }
                overlays[ovl.layer.name].on("loading",function(e) { 
                    if (appContent.console.outputLevel >= 3) { 
                        console.log(performance.now() + ", esrifeaturelayer OVERLAY " + e.target.options.name + " is loading");
                        console.log(e);
                    }
                });
                overlays[ovl.layer.name].on("load",function(e) { 
                    if (appContent.console.outputLevel >= 3) { 
                        console.log(performance.now() + ", esrifeaturelayer OVERLAY " + e.target.options.name + " has been loaded"); 
                        console.log(e);
                    }
                });
//                layers[i].layer.layer = overlays[ovl.layer.name];
            }
            
            layers[i].layer.layer = overlays[ovl.layer.name];
            
        }   // END IF layer IS Overlay
    }   // END FOR i in layers

    var cameraslayers = getCameras(overlays);     // cameras from json file
    overlays["GeoJSON Ekkersrijt Cameras"] = cameraslayers.cameras;
    overlays["GeoJSON FoV Identification"] = cameraslayers.identification;
    overlays["GeoJSON FoV Recognition"] = cameraslayers.recognition;
    overlays["GeoJSON FoV Detection"] = cameraslayers.detection;
    overlays["GeoJSON FoV Monitor"] = cameraslayers.monitor;
    overlays["GeoJSON FoV Visible"] = cameraslayers.visible;    

    var cameraslayerswfst = getCamerasWFST(overlays);     // cameras from WFST service
    overlays["LH WFST CAMS"] = cameraslayerswfst.cameras;
    overlays["LH WFST CAMS FoV Identification"] = cameraslayerswfst.identification;
    overlays["LH WFST CAMS FoV Recognition"] = cameraslayerswfst.recognition;
    overlays["LH WFST CAMS FoV Detection"] = cameraslayerswfst.detection;
    overlays["LH WFST CAMS FoV M&C"] = cameraslayerswfst.monitor;
    overlays["LH WFST CAMS FoV Visible"] = cameraslayerswfst.visible;    

    var cameraslayerswfstg = getCamerasWFSTgeodan(overlays);     // cameras from WFST service at Geodan
    overlays["Geodan WFST CAMS"] = cameraslayerswfstg.cameras;
    overlays["Geodan WFST CAMS FoV Identification"] = cameraslayerswfstg.identification;
    overlays["Geodan WFST CAMS FoV Recognition"] = cameraslayerswfstg.recognition;
    overlays["Geodan WFST CAMS FoV Detection"] = cameraslayerswfstg.detection;
    overlays["Geodan WFST CAMS FoV M&C"] = cameraslayerswfstg.monitor;
    overlays["Geodan WFST CAMS FoV Visible"] = cameraslayerswfstg.visible;    

    var endtime = performance.now();
    var totaltime = endtime - starttime;
    
    if (appContent.track.endtime < endtime) {
        appContent.track.endtime = endtime;
        appContent.track.totaltime = appContent.track.endtime - appContent.track.starttime;
    }
    appContent.track.elapsedtime += totaltime;
    
    if (appContent.console.outputLevel >= 3) { 
        console.log("overlays");console.log(overlays); 
    }
    if (appContent.console.outputLevel >= 1) { console.log(performance.now() + ", getOverlays(), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n'); }
    
    return overlays;
}       // END getOverlays()




///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////    getCameraLayers2()     //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
////  getCameraLayers2() - 
function getCameraLayers2(overlays) {
    var starttime = performance.now();
    console.log(performance.now() + ", getCameraLayers(), START: " + starttime + '\n');
      
    // Create Cameras and FoV Layers
    var result = {
        cameras:        overlays["GeoJSON Ekkersrijt Cameras"],     // cameras
        identification: overlays["GeoJSON FoV Identification"],     // Identification
        recognition:    overlays["GeoJSON FoV Recognition"],        // Recognition
        detection:      overlays["GeoJSON FoV Detection"],          // Detection
        monitor:        overlays["GeoJSON FoV Monitor"],            // Monitor & Control
        visible:        overlays["GeoJSON FoV Visible"]             // Visible
    }; 
    
    var endtime = performance.now();
    var totaltime = endtime - starttime;
    
    if (appContent.track.endtime < endtime) {
        appContent.track.endtime = endtime;
        appContent.track.totaltime = appContent.track.endtime - appContent.track.starttime;
    }
    appContent.track.elapsedtime += totaltime;
    
    
    if (appContent.console.outputLevel >= 3) { 
        console.log("result");console.log(result); 
    }
    console.log(performance.now() + ", getCameraLayers(), END: " + endtime + ", Exec: " + totaltime + '\n');
    
    return result;
}   // END getCameraLayers2()




///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////    getCameraLayers3()     //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
////  getCameraLayers3() - 
function getCameraLayers3 (overlays) { 
    return {
        cameras:        overlays["GeoJSON Ekkersrijt Cameras"],     // cameras
        identification: overlays["GeoJSON FoV Identification"],     // Identification
        recognition:    overlays["GeoJSON FoV Recognition"],        // Recognition
        detection:      overlays["GeoJSON FoV Detection"],          // Detection
        monitor:        overlays["GeoJSON FoV Monitor"],            // Monitor & Control
        visible:        overlays["GeoJSON FoV Visible"]             // Visible
    };
}   // END getCameraLayers3()




/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
////////////////                           //////////////
////////////////   getCameraLayersWFST()   //////////////
////////////////                           //////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//////  getCameraLayersWFST() - Returns the layers for the cameras and FoVs obtained via WFS-T
//function getCameraLayersWFST (overlays) { 
//    // Create and instantiate Cameras and FoV Layers
//    overlays["LH WFST CAMS"] = new L.geoJson.css();
//    overlays["LH WFST CAMS FoV Identification"] = new L.geoJson.css();
//    overlays["LH WFST CAMS FoV Recognition"] = new L.geoJson.css();
//    overlays["LH WFST CAMS FoV Detection"] = new L.geoJson.css();
//    overlays["LH WFST CAMS FoV M&C"] = new L.geoJson.css();
//    overlays["LH WFST CAMS FoV Visible"] = new L.geoJson.css();
//    // return layers
//    return {
//        cameras:        overlays["LH WFST CAMS"],                       // cameras
//        identification: overlays["LH WFST CAMS FoV Identification"],    // Identification
//        recognition:    overlays["LH WFST CAMS FoV Recognition"],       // Recognition
//        detection:      overlays["LH WFST CAMS FoV Detection"],         // Detection
//        monitor:        overlays["LH WFST CAMS FoV M&C"],               // Monitor & Control
//        visible:        overlays["LH WFST CAMS FoV Visible"]            // Visible
//    };
//}   // END getCameraLayersWFST()




///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////   getCameraLayersWFST2()  //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
////  getCameraLayersWFST2() - Returns the layers for the cameras and FoVs obtained via WFS-T
function getCameraLayersWFST2 (overlays) { 
    return {
        cameras:        overlays["LH WFST CAMS"],                       // cameras
        identification: overlays["LH WFST CAMS FoV Identification"],    // Identification
        recognition:    overlays["LH WFST CAMS FoV Recognition"],       // Recognition
        detection:      overlays["LH WFST CAMS FoV Detection"],         // Detection
        monitor:        overlays["LH WFST CAMS FoV M&C"],               // Monitor & Control
        visible:        overlays["LH WFST CAMS FoV Visible"]            // Visible
    };
}   // END getCameraLayersWFST2()




///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////   getCameraLayersWFSTG()  //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
////  getCameraLayersWFST2() - Returns the layers for the cameras and FoVs obtained via WFS-T
function getCameraLayersWFSTG (overlays) { 
    return {
        cameras:        overlays["Geodan WFST CAMS"],                       // cameras
        identification: overlays["Geodan WFST CAMS FoV Identification"],    // Identification
        recognition:    overlays["Geodan WFST CAMS FoV Recognition"],       // Recognition
        detection:      overlays["Geodan WFST CAMS FoV Detection"],         // Detection
        monitor:        overlays["Geodan WFST CAMS FoV M&C"],               // Monitor & Control
        visible:        overlays["Geodan WFST CAMS FoV Visible"]            // Visible
    };
}   // END getCameraLayersWFSTG()




///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////    getInitBaselayer()     //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
////  getInitBaselayer() - Returns the initial basemap
function getInitBaselayer (baselayers) { 
//    return baselayers["Humanitarian"];
//    return baselayers["Mapnik"];
//    return baselayers["Landscape"];
//    return baselayers["Topography"];
    return baselayers["Light Grey"];
}   // END getInitBaselayer()




///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////   getCamerasWFSTgeodan()  //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
// getWFSTCameras() - get cameras and their FoVs and adds them to the map
function getCamerasWFSTgeodan(overlays) {
    var starttime = performance.now();
    console.log(performance.now() + ", getCamerasWFSTgeodan(), START: " + starttime + '\n');
    
//    var url = "http://arcgis.geodan.nl:6080/arcgis/services/multipos/Cameras_Ekkersrijt_20150319/MapServer/WFSServer?request=getfeature&typename=Cameras_Ekkersrijt_withspecs";
    var url = "/service/geodanarcgis/services/multipos/Cameras_Ekkersrijt_20150319/MapServer/WFSServer?request=getfeature&typename=Cameras_Ekkersrijt_withspecs";
    
//    var url = "/service/localhostarcgis/services/Cameras/Cameras_Ekkersrijt_20150319/MapServer/WFSServer?request=getfeature&typename=Cameras_Ekkersrijt_withspecs";
    
    var layers = getCameraLayersWFSTG(overlays);
    
    var cameras = layers.cameras;
    var fovs = {
        identification: layers.identification,
        recognition: layers.recognition,
        detection: layers.detection,
        monitor: layers.monitor,
        visible: layers.visible
    };
    
//    var partialresult = getCams3(jsoncameras, cameras, fovs);
    var partialresult = getWFSCameras2(url, cameras, fovs);
    
    var result = {
        cameras: partialresult.cameras,
        identification: partialresult.identification,
        recognition: partialresult.recognition,
        detection: partialresult.detection,
        monitor: partialresult.monitor,
        visible: partialresult.visible
    };

    var endtime = performance.now();
    var totaltime = endtime - starttime;
    
    if (appContent.track.endtime < endtime) {
        appContent.track.endtime = endtime;
        appContent.track.totaltime = appContent.track.endtime - appContent.track.starttime;
    }
    appContent.track.elapsedtime += totaltime;
    
    if (appContent.console.outputLevel >= 3) { 
        console.log("partialresult");console.log(partialresult); 
        console.log("result");console.log(result); 
    }
    console.log(performance.now() + ", getCamerasWFSTgeodan(), END: " + endtime + ", Exec: " + totaltime + '\n');
    
    return result;
}       // END getCamerasWFSTgeodan()




///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////     getCamerasWFST()      //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
// getWFSTCameras() - get cameras and their FoVs and adds them to the map
function getCamerasWFST(overlays) {
    var starttime = performance.now();
    console.log(performance.now() + ", getCamerasWFST(), START: " + starttime + '\n');
    
    var url = "/service/localhostarcgis/services/Cameras/Cameras_Ekkersrijt_20150319/MapServer/WFSServer?request=getfeature&typename=Cameras_Ekkersrijt_withspecs";
    
    var layers = getCameraLayersWFST2(overlays);
    
    var cameras = layers.cameras;
    var fovs = {
        identification: layers.identification,
        recognition: layers.recognition,
        detection: layers.detection,
        monitor: layers.monitor,
        visible: layers.visible
    };
    
//    var partialresult = getCams3(jsoncameras, cameras, fovs);
    var partialresult = getWFSCameras2(url, cameras, fovs);
    
    var result = {
        cameras: partialresult.cameras,
        identification: partialresult.identification,
        recognition: partialresult.recognition,
        detection: partialresult.detection,
        monitor: partialresult.monitor,
        visible: partialresult.visible
    };

    var endtime = performance.now();
    var totaltime = endtime - starttime;
    
    if (appContent.track.endtime < endtime) {
        appContent.track.endtime = endtime;
        appContent.track.totaltime = appContent.track.endtime - appContent.track.starttime;
    }
    appContent.track.elapsedtime += totaltime;
    
    if (appContent.console.outputLevel >= 3) { 
        console.log("partialresult");console.log(partialresult); 
        console.log("result");console.log(result); 
    }
    if (appContent.console.outputLevel >= 1) { console.log(performance.now() + ", getCamerasWFST(), END: " + endtime + ", Exec: " + totaltime + '\n'); }
    
    return result;
}       // END getCamerasWFST()




///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////        getCameras()         //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
// getCameras() - get cameras and their FoVs and adds them to the map
function getCameras(overlays) {
    var starttime = performance.now();
    if (appContent.console.outputLevel >= 1) { console.log(performance.now() + ", getCameras(), START: " + starttime + '\n'); }
    
    var jsoncameras = "./data/cameras_ekkersrijt.json";
    
//    var layers = getCameraLayers();
//    var layers = getCameraLayers2(overlays);
    var layers = getCameraLayers3(overlays);
    
    var cameras = layers.cameras;
    var fovs = {
        identification: layers.identification,
        recognition: layers.recognition,
        detection: layers.detection,
        monitor: layers.monitor,
        visible: layers.visible
    };
    
    var partialresult = getCams3(jsoncameras, cameras, fovs);
    
    var result = {
        cameras: partialresult.cameras,
        identification: partialresult.identification,
        recognition: partialresult.recognition,
        detection: partialresult.detection,
        monitor: partialresult.monitor,
        visible: partialresult.visible
    }

    var endtime = performance.now();
    var totaltime = endtime - starttime;
    
    if (appContent.track.endtime < endtime) {
        appContent.track.endtime = endtime;
        appContent.track.totaltime = appContent.track.endtime - appContent.track.starttime;
    }
    appContent.track.elapsedtime += totaltime;
    
    if (appContent.console.outputLevel >= 3) { 
        console.log("partialresult");console.log(partialresult);
        console.log("result");console.log(result); 
    }
    if (appContent.console.outputLevel >= 1) { console.log(performance.now() + ", getCameras(), START: " + starttime + ", END: " + endtime + ", Exec: " + totaltime + '\n'); }
    
    return result;
}       // END getCameras()





///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////       getMapOptions()     //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//  getMapOptions () - Returns the map initial configuration options
function getMapOptions (basemap) {

    // eventually these will have to be loaded from a config file
    var ekkersrijt = [51.50, 5.475],  // Ekkersrijt LatLng
        mapInitialZoom = 15,
        mapMinZoom = 3,
        mapMaxZoom = 25,
//        mapZoomControl = true,
        mapZoomControl = false,
//        mapCrs = L.CRS.EPSG4326,
//        mapCrs = L.CRS.EPSG3857,  // default projection
        mapLayers = basemap,
//        mapAttributionControl = true,
        mapAttributionControl = false,
//        mapFadeAnimation = false,
        mapFadeAnimation = true,
//        mapZoomAnimation = false,
        mapZoomAnimation = true,
//        mapMarkerZoomAnimation = false,
        mapMarkerZoomAnimation = true,
        mapZoomAnimationThreshold = 2;
    
    // Map options
    var mapOptions = {
        "center": ekkersrijt,
        "zoom": mapInitialZoom,
        "minZoom": mapMinZoom,
        "maxZoom": mapMaxZoom,
        "zoomControl": mapZoomControl,
//        "crs": mapCrs,
        "layers": mapLayers,
        "attributionControl": mapAttributionControl,
        "fadeAnimation": mapFadeAnimation,
        "zoomAnimation": mapZoomAnimation,
        "markerZoomAnimation": mapMarkerZoomAnimation,
        "zoomAnimationThreshold": mapZoomAnimationThreshold
    };
    
    return mapOptions;
}       // END getMapOptions()





///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////        createMap()        //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//  createMap () - Returns the map initial configuration options
function createMap (mapOptions) {
    var starttime = performance.now();
    if (appContent.console.outputLevel >= 1) { console.log(performance.now() + ", createMap(), START: " + starttime + '\n'); }

    var myMap;
    
    myMap = L.map('map', mapOptions);

    // Create Spinner
    var spinOpts = {
        lines: 12, // The number of lines to draw
        length: 15, // The length of each line
        width: 2, // The line thickness
        radius: 11, // The radius of the inner circle
        corners: 0.8, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#98AFC7', // #rgb or #rrggbb or array of colors
//        color: '#000', // #rgb or #rrggbb or array of colors
        speed: 1, // Rounds per second
        trail: 100, // Afterglow percentage
        shadow: true, // Whether to render a shadow
        hwaccel: true, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '50%', // Top position relative to parent
        left: '50%' // Left position relative to parent
    };
    myMap.spin(true, spinOpts);
    myMap.spin(false);
    
    map = myMap;
    

    var endtime = performance.now();
    var totaltime = endtime - starttime;
    
    if (appContent.track.endtime < endtime) {
        appContent.track.endtime = endtime;
        appContent.track.totaltime = appContent.track.endtime - appContent.track.starttime;
    }
    appContent.track.elapsedtime += totaltime;
    
    if (appContent.console.outputLevel >= 1) { console.log(performance.now() + ", createMap(), START: " + starttime + ", END: " + endtime + ", Exec: " + totaltime + '\n'); }
    
    return myMap;
}       // END createMap()




///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////                           //////////////
//////////////         initMap()         //////////////
//////////////                           //////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
// Init Map
function initMap (selectedTab) {
    var starttime = performance.now();
    console.log(performance.now() + ", initMap(), START: " + starttime + '\n');
    
    var myMap = {
        map: null,
        basemaps: {},
        baselayer: null,
        overlays: {},
        cameras: {},
        featurelayers: {},
        mapControls: {},
        mapOptions: {}
    };
    
    // Set Map Baselayers
    myMap.basemaps = getBasemapLayers()     // basemap layers
    myMap.baselayer = getInitBaselayer(myMap.basemaps);    // initial baselayer
    
    // Get Map options
    myMap.mapOptions = getMapOptions(myMap.baselayer);  // map options
    
    //  CREATE MAP INSTANCE
    map = myMap.map = createMap(myMap.mapOptions);
    
    
    // Set Map Overlays and Featurelayers
    myMap.overlays = getOverlays();       // Overlay layers (WMS, FS and other)
//    myMap.cameras = getCameraLayersWFST2(myMap.overlays);
    myMap.cameras = getCameraLayersWFSTG(myMap.overlays);
    myMap.featurelayers = getCameraLayers3(myMap.overlays);


    // Add map controls
    
    // Attribution
    var attributionControlOptions = {
//        position: 'topleft',
        position: 'bottomright',
        prefix: 'Luis Bausá López - VU Amsterdam - Geodan '
    };
    myMap.mapControls.attribution = L.control.attribution(attributionControlOptions);
    myMap.map.addControl( myMap.mapControls.attribution );      // add attribution
    
    // Scale
    var scaleOptions = {
//        position: 'bottomleft',     // The position of the control
        position: 'bottomright',     // The position of the control
        maxWidth: 150,     // Def: 100 - Maximum width in pixels
        metric: true,     // metric scale line (m/km)
        imperial: false,     // imperial scale line (mi/ft)
        updateWhenIdle: false     // If true updated on moveend, else on move
    };
    myMap.mapControls.scale = new L.Control.Scale(scaleOptions);
    myMap.map.addControl( myMap.mapControls.scale );      // add scale
    
//    // Compass
//    var compassOptions = {
////        position: 'topleft'
//        position: 'topright'
//    };
//    myMap.mapControls.compass = new L.Control.Compass(compassOptions);
//    myMap.map.addControl( myMap.mapControls.compass );      // add compass
    
    // Zoom Control
    var zoomControlOptions = {
//        position: 'topleft',
        position: 'topright',
        zoomInText: '+',
        zoomOutText: '-',
        zoomInTitle: 'Zoom In',
        zoomOutTitle: 'Zoom Out'
    };
    myMap.mapControls.zoom = new L.Control.Zoom(zoomControlOptions);
    myMap.map.addControl( myMap.mapControls.zoom );      // add zoom
    
    // Full Screen Control
    var fullscreenControlOptions = {
        position: 'topright', // change button position. [topleft, topright, bottomright, bottomleft], defaut topleft
        title: 'Switch Full Screen' // change button title, default Full Screen
//        ,
//        content: null, // change button content, can be HTML, default null
//        forceSeparateButton: true, // force seperate button to detach from zoom buttons, default false
//        forcePseudoFullscreen: true // force use of pseudo full screen even if full screen API is available, default false
    };
    myMap.mapControls.fullscreen = L.control.fullscreen(fullscreenControlOptions);
    myMap.map.addControl( myMap.mapControls.fullscreen );      // add fullscreen control
    
    // Draw Control
//    var shapeOptions = {
//      stroke: true,	//Whether to draw stroke along the path. Set it to false to disable borders on polygons or circles.
//      color: '#03f',  //Stroke color.
//      weight: 5,	//Stroke width in pixels.
//      opacity: 0.5,	//Stroke opacity.
//      fill: true, //Whether to fill the path with color. Set it to false to disable filling on polygons or circles.
//      fillColor: 	'',   //String - Default is same as color. Fill color.
//      fillOpacity: 0.2,	//Fill opacity.
//      dashArray: null,	//String - A string that defines the stroke dash pattern. Doesn't work on canvas-powered layers (e.g. Android 2).
//      lineCap: null,	//String - A string that defines shape to be used at the end of the stroke.
//      lineJoin: null,	//String - A string that defines shape to be used at the corners of the stroke.
//      clickable: true,	//If false, the vector will not emit mouse events and will act as a part of the underlying map.
//      pointerEvents: 	null,	// String - Sets the pointer-events attribute on the path if SVG backend is used.
//      className: ""
//    }
    var camMarkerIcon = L.Icon.extend({
        options: {
            shadowUrl: null,
            iconAnchor: new L.Point(9, 9),
            iconSize: new L.Point(18, 18),
            iconUrl: 'img/camera.png'
        }
    });
    var drawControlOptions = {
        position: 'topright',
        draw: {
            polyline: false,
//            polyline: {
//                allowIntersection: true,
////                drawError: {},
//                guidelineDistance: 20,
////                shapeOptions: {},
//                metric: true,
//                zIndexOffset: 2000,
//                repeatMode: false
//            },
            polygon: false,
//            polygon: {
//                allowIntersection: true,
////                drawError: {},
//                guidelineDistance: 20,
////                shapeOptions: {},
//                metric: true,
//                zIndexOffset: 2000,
//                repeatMode: false,
//                showArea: true
//            },
            rectangle: false,
//            rectangle: {
//                shapeOptions: {},
//                repeatMode: false
//            },
            circle: false,
//            circle: {
//                shapeOptions: {},
//                repeatMode: false
//            },
//            marker: false
            marker: {
//                icon: L.Icon.Default(),
                icon: new camMarkerIcon,
                zIndexOffset: 2000,
                repeatMode: false
            }
        },
        edit: {
            featureGroup: myMap.overlays["LH WFST CAMS"],
//            edit: {
//                selectedPathOptions: {
//                    maintainColor: true
////                    , opacity: 0.3
//                }
//            },
//            remove: {}
        }
    };
    myMap.mapControls.drawControl = new L.Control.Draw(drawControlOptions);
    myMap.map.addControl(myMap.mapControls.drawControl);
    
    // Layer Control
    var layerControlOptions = {
        position: 'topright', 
//        position: 'topleft', 
        collapsed: true,
        autoZIndex: true
    };
    myMap.mapControls.layercontrol = L.control.layers(myMap.basemaps, myMap.overlays, layerControlOptions).addTo(myMap.map);
    
    // Sidebar Control
    myMap.mapControls.sidebar = new L.control.sidebar('sidebar');
    myMap.map.addControl( myMap.mapControls.sidebar );      // add sidebar
    
    
//    myMap.overlays["Building footprints (Pand)"].addTo(myMap.map);
    
    
    // Some development control variables
    var serverLH = true;
    var serverGD = false;
    var fileGJ = false;
    
    // Load layers by according to tab
    switch (selectedTab) {
        case 1:
//            overlays["LH WFS-T Ekkersrijt Cameras"].addTo(map);
//            overlays["Cameras WFS-T"].addTo(map);
//            overlays["Cams Ekk FS LH"].addTo(map);
            
            if (serverLH) {
                myMap.overlays["LH WFST CAMS"].addTo(myMap.map);
                myMap.overlays["LH WFST CAMS FoV Identification"].addTo(myMap.map);
                myMap.overlays["LH WFST CAMS FoV Recognition"].addTo(myMap.map);
                myMap.overlays["LH WFST CAMS FoV Detection"].addTo(myMap.map);
                myMap.overlays["LH WFST CAMS FoV M&C"].addTo(myMap.map);
                myMap.overlays["LH WFST CAMS FoV Visible"].addTo(myMap.map);
            }
            if (serverGD) {
                myMap.overlays["Geodan WFST CAMS"].addTo(myMap.map);
                myMap.overlays["Geodan WFST CAMS FoV Identification"].addTo(myMap.map);
                myMap.overlays["Geodan WFST CAMS FoV Recognition"].addTo(myMap.map);
                myMap.overlays["Geodan WFST CAMS FoV Detection"].addTo(myMap.map);
                myMap.overlays["Geodan WFST CAMS FoV M&C"].addTo(myMap.map);
                myMap.overlays["Geodan WFST CAMS FoV Visible"].addTo(myMap.map);
            }
            if (fileGJ) {
                myMap.overlays["GeoJSON FoV Monitor"].addTo(myMap.map);
                myMap.overlays["GeoJSON FoV Detection"].addTo(myMap.map);
                myMap.overlays["GeoJSON FoV Recognition"].addTo(myMap.map);
                myMap.overlays["GeoJSON FoV Identification"].addTo(myMap.map);
                myMap.overlays["GeoJSON FoV Visible"].addTo(myMap.map);
                myMap.overlays["GeoJSON Ekkersrijt Cameras"].addTo(myMap.map);
            }
            
            myMap.overlays["Building footprints (Pand)"].addTo(myMap.map);
            
            if (appContent.console.outputLevel >= 2) { console.log("case 1"); }
            break;
            
        case 2:
            if (serverLH) { 
                myMap.overlays["LH WFST CAMS"].addTo(myMap.map); 
            }
            if (serverGD) { 
                myMap.overlays["Geodan WFST CAMS"].addTo(myMap.map); 
            }
            if (fileGJ) { 
                myMap.overlays["GeoJSON Ekkersrijt Cameras"].addTo(myMap.map); 
            }
            
            if (appContent.console.outputLevel >= 2) { console.log("case 2"); }
            break;
            
        case 3:
            if (serverLH) {
                myMap.overlays["LH WFST CAMS"].addTo(myMap.map);
                myMap.overlays["LH WFST CAMS FoV Identification"].addTo(myMap.map);
            }
            if (serverGD) {
                myMap.overlays["Geodan WFST CAMS"].addTo(myMap.map);
                myMap.overlays["Geodan WFST CAMS FoV Identification"].addTo(myMap.map);
            }
            if (fileGJ) {
                myMap.overlays["GeoJSON Ekkersrijt Cameras"].addTo(myMap.map);
                myMap.overlays["GeoJSON FoV Identification"].addTo(myMap.map);
            }
            
            if (appContent.console.outputLevel >= 2) { console.log("case 3"); }
            break;
            
        case 4:
            if (serverLH) {
                myMap.overlays["LH WFST CAMS"].addTo(myMap.map);
                myMap.overlays["LH WFST CAMS FoV Recognition"].addTo(myMap.map);
            }
            if (serverGD) {
                myMap.overlays["Geodan WFST CAMS"].addTo(myMap.map);
                myMap.overlays["Geodan WFST CAMS FoV Recognition"].addTo(myMap.map);
            }
            if (fileGJ) {
                myMap.overlays["GeoJSON Ekkersrijt Cameras"].addTo(myMap.map);
                myMap.overlays["GeoJSON FoV Recognition"].addTo(myMap.map);
            }
            
            if (appContent.console.outputLevel >= 2) { console.log("case 4"); }
            break;
            
        case 5:
            if (serverLH) {
                myMap.overlays["LH WFST CAMS"].addTo(myMap.map);
                myMap.overlays["LH WFST CAMS FoV Detection"].addTo(myMap.map);
            }
            if (serverGD) {
                myMap.overlays["Geodan WFST CAMS"].addTo(myMap.map);
                myMap.overlays["Geodan WFST CAMS FoV Detection"].addTo(myMap.map);
            }
            if (fileGJ) {
                myMap.overlays["GeoJSON Ekkersrijt Cameras"].addTo(myMap.map);
                myMap.overlays["GeoJSON FoV Detection"].addTo(myMap.map);
            }
            
            if (appContent.console.outputLevel >= 2) { console.log("case 5"); }
            break;
            
        case 6:
            if (serverLH) {
                myMap.overlays["LH WFST CAMS"].addTo(myMap.map);
                myMap.overlays["LH WFST CAMS FoV M&C"].addTo(myMap.map);
            }
            if (serverGD) {
                myMap.overlays["Geodan WFST CAMS"].addTo(myMap.map);
                myMap.overlays["Geodan WFST CAMS FoV M&C"].addTo(myMap.map);
            }
            if (fileGJ) {
                myMap.overlays["GeoJSON Ekkersrijt Cameras"].addTo(myMap.map);
                myMap.overlays["GeoJSON FoV Monitor"].addTo(myMap.map);
            }
            
            if (appContent.console.outputLevel >= 2) { console.log("case 6"); }
            break;
            
        case 7:
            if (serverLH) {
                myMap.overlays["LH WFST CAMS"].addTo(myMap.map);
                myMap.overlays["LH WFST CAMS FoV Visible"].addTo(myMap.map);
            }
            if (serverGD) {
                myMap.overlays["Geodan WFST CAMS"].addTo(myMap.map);
                myMap.overlays["Geodan WFST CAMS FoV Visible"].addTo(myMap.map);
            }
            if (fileGJ) {
                myMap.overlays["GeoJSON Ekkersrijt Cameras"].addTo(myMap.map);
                myMap.overlays["GeoJSON FoV Visible"].addTo(myMap.map);
            }
            
            if (appContent.console.outputLevel >= 2) { console.log("case 7"); }
            break;
            
        case 8:
            
            if (appContent.console.outputLevel >= 2) { console.log("case 8"); }
            break;
            
        case 9:
            
            if (appContent.console.outputLevel >= 2) { console.log("case 9"); }
            break;
            
        default:
            if (serverLH) {
                myMap.overlays["LH WFST CAMS"].addTo(myMap.map);
            }
            if (serverGD) {
                myMap.overlays["Geodan WFST CAMS"].addTo(myMap.map);
            }
            if (fileGJ) {
                myMap.overlays["GeoJSON Ekkersrijt Cameras"].addTo(myMap.map);
            }
            
            if (appContent.console.outputLevel >= 2) { console.log("case default"); }
            break;
    }
    
    
    
///////////////////////////////////////
////////  MAP EVENT LISTENERS  ////////
///////////////////////////////////////
    
    ////  FULL SCREEN
    myMap.map.on('enterFullscreen', function(){
        if (appContent.console.outputLevel >= 2) { console.log(performance.now() + ", map event, enterFullscreen" + '\n'); }
    });
    myMap.map.on('exitFullscreen', function(){
        if (appContent.console.outputLevel >= 2) { console.log(performance.now() + ", map event, exitFullscreen" + '\n'); }
    });
    
    // ZOOM
    myMap.map.on('zoomstart', function (e) {
        var zoom = myMap.map.getZoom();
        if (appContent.console.outputLevel >= 2) { 
            console.log(performance.now() + ", map event, zoomstart" + '\n');
            console.log('e: ');console.log(e);
            console.log('map.zoom: ');console.log(zoom);
        }
        
        // DO SOMETHING HERE
        map.spin(true);
//        myMap.map.spin(true);
    });
    myMap.map.on('zoomend', function (e) {
        var zoom = myMap.map.getZoom();
        if (appContent.console.outputLevel >= 2) { 
            console.log(performance.now() + ", map event, zoomend" + '\n');
            console.log('e: ');console.log(e);
            console.log('map.zoom: ');console.log(zoom);
        }
        
        // DO SOMETHING HERE
        map.spin(false);
//        myMap.map.spin(false);
    });
    
    // BASELAYER CHANGES
    myMap.map.on('baselayerchange', function(e) {
        var layer = e.layer;
        var name = e.name;
        
        if (appContent.console.outputLevel >= 2) { 
            console.log(performance.now() + ", map event, baselayerchange" + '\n');
            console.log('e: ');console.log(e);
            console.log('e.layer: ');console.log(layer);
            console.log('e.name: ');console.log(name);
        }
        
        // DO SOMETHING HERE
        
//        layer.bringToBack();
    });
    
    // ADD/REMOVE LAYERS
    myMap.map.on('layeradd', function(e) {
        var layer = e.layer;
        
        if (appContent.console.outputLevel >= 3) { 
            console.log(performance.now() + ", map event, layeradd" + '\n');
            console.log('e: ');console.log(e);
            console.log('e.layer: ');console.log(layer);
        }
        
        // DO SOMETHING HERE
        
        if ( (layer.feature != null) && (layer.feature.properties != null) && (layer.feature.properties.featuretype != null)) {
            if (appContent.console.outputLevel >= 3) { 
                console.log(layer.feature.properties);
                console.log(layer.feature.properties.featuretype);
            }
        }
    });
    myMap.map.on('layerremove', function(e) {
        var layer = e.layer;
        
        if (appContent.console.outputLevel >= 3) { 
            console.log(performance.now() + ", map event, layerremove" + '\n');
            console.log('e: ');console.log(e);
            console.log('e.layer: ');console.log(layer);
        }
        
        // DO SOMETHING HERE
        
        if ( (layer.feature != null) && (layer.feature.properties != null) && (layer.feature.properties.featuretype != null)) {
            if (appContent.console.outputLevel >= 3) { 
                console.log(layer.feature.properties);
                console.log(layer.feature.properties.featuretype);
            }
        }
    });
    
    // MAP READY
    myMap.map.whenReady( function(e){
        var mapready = performance.now() - starttime;
        
        if (appContent.console.outputLevel >= 2) { 
            console.log(performance.now() + ", map event, map.whenReady" + '\n');
            console.log('e: ');console.log(e);
            console.log("MAP READY: " + performance.now() + ", Exec time (ms): " + mapready + '\n');
        }
        
        // DO SOMETHING HERE
        
//        myMap.map.spin(false);
    });
    
    // DRAW CONTROL
    myMap.map.on('draw:created', function (e) {
        var layerType = e.layerType;
        var layer = e.layer;
        var l = layer.toGeoJSON();
        var date = new Date();
        date = date.getDate().toString();
//        var date = new Date().getDate();
        
        if (appContent.console.outputLevel >= 3) { 
            console.log(performance.now() + ", map event, draw:created" + '\n');
            console.log('e: ');console.log(e);
            console.log('e.layer: ');console.log(layer);
            console.log('e.layer.toGeoJSON(): ');console.log(l);
        }
        
        // DO SOMETHING HERE
        
        if (layerType === 'marker') {    // Do marker specific actions
            // set default values of marker's (camera) properties
            l.popupTemplate = cameraPopupTemplate();
            l.properties.latitude = layer._latlng.lat;
            l.properties.longitude = layer._latlng.lng;
            l.properties.featuretype = "Camera";
            l.properties.area = "Ekkersrijt";
            l.properties.brand = "Axis";
            l.properties.camtype = "PTZ";
            l.properties.canpan = "1";
            l.properties.cantilt = "1";
            l.properties.canzoom = "1";
            l.properties.comments = "";
            l.properties.createdat = date;
            l.properties.featuretype = "Camera";
            l.properties.fldef = 0.0041;
            l.properties.flmax = 0.0738;
            l.properties.flmin = 0.0041;
            l.properties.focallength = 0.0041;
            l.properties.id = "EKS NN-NNN";
            l.properties.latitude = 51.497373;
            l.properties.longitude = 5.491316;
            l.properties.model = "232+";
            l.properties.name = "";
            l.properties.objectid = "";
            l.properties.region = "Eindhoven";
            l.properties.reshor = 704;
            l.properties.resvert = 576;
            l.properties.rotation = 199;
            l.properties.sensorheight = 0.00369;
            l.properties.sensorwidth = 0.00443;
            l.properties.shape = layer._latlng.lat + " " + layer._latlng.lng;
            l.properties.updatedat = date;
            
            // Create Camera popup
            var popup = "<div class='popup'><h3 style='background-color:lightblue; text-align:center;'><b>New Camera</b></h3>";    // Popup header
            
            popup = popup + "<form>";    // form
            
            popup = popup + "<table><tr><td><label>ID: </label></td><td><input value='" + l.properties.id + "'></input></td></tr>";    // Camera ID
            popup = popup + "<tr><td><label>Type: </label></td><td><input value='" + l.properties.type + "'></input></td></tr>";    // Camera Type
            popup = popup + "<tr><td><label>Brand: </label></td><td><input value='" + l.properties.brand + "'></input></td></tr>";    // Camera Brand
            popup = popup + "<tr><td><label>Model: </label></td><td><input value='" + l.properties.model + "'></input></td></tr>";    // Camera Model
            popup = popup + "<tr><td><label>Region: </label></td><td><input value='" + l.properties.region + "'></input></td></tr>";    // Camera Region
            popup = popup + "<tr><td><label>Area: </label></td><td><input value='" + l.properties.area + "'></input></td></tr>";    // Camera Area
            popup = popup + "<tr><td><label>Latitude: </label></td><td><input value='" + l.properties.latitude + "'></input></td></tr>";    // Camera location - latitude 
            popup = popup + "<tr><td><label>Longitude: </label></td><td><input value='" + l.properties.longitude + "'></input></td></tr>";    // Camera location - longitude
//            popup = popup + "<tr><td><label>Latitude: </label></td><td><input value='" + lat + "'></input></td></tr>";    // Camera location - latitude 
//            popup = popup + "<tr><td><label>Longitude: </label></td><td><input value='" + lon + "'></input></td></tr>";    // Camera location - longitude
            popup = popup + "<tr><td><label>Rotation: </label></td><td><input value='" + l.properties.rotation + "'>dg</input></td></tr>";    // Camera location - rotation (azimuth)
            popup = popup + "<tr><td><label>Focal length (now): </label></td><td><input value='" + l.properties.focallength + "'>mm</input></td></tr>";    // Camera specs - focal length (current)
            popup = popup + "<tr><td><label>Focal length (max): </label></td><td><input value='" + l.properties.flmax + "'>m</input></td></tr>";    // Camera specs - focal length (max)
            popup = popup + "<tr><td><label>Focal length (min): </label></td><td><input value='" + l.properties.flmin + "'>mm</input></td></tr>";    // Camera specs - focal length (min)
            popup = popup + "<tr><td><label>Focal length (def): </label></td><td><input value='" + l.properties.fldef + "'>m</input></td></tr>";    // Camera specs - focal length (default)
            popup = popup + "<tr><td><label>Sensor height: </label></td><td><input value='" + l.properties.sensorheight + "'>m</input></td></tr>";    // Camera specs - sensor dimensions - height
            popup = popup + "<tr><td><label>Sensor width: </label></td><td><input value='" + l.properties.sensorwidth + "'>m</input></td></tr>";    // Camera specs - sensor dimensions - width
            popup = popup + "<tr><td><label>Horizontal resolution: </label></td><td><input value='" + l.properties.reshor + "'>px</input></td></tr>";    // Camera specs - sensor resolution - horizontal (columns)
            popup = popup + "<tr><td><label>Vertical resolution: </label></td><td><input value='" + l.properties.resvert + "'>px</input></td></tr></table>";    // Camera specs - sensor resolution - vertical (rows)
            
            popup = popup + "<button>Save</button>";    // Close form
            popup = popup + "</form>";    // Close form
            popup = popup + "</div>";    // Close popup div
            
            l.properties.popupContent = popup;
            
            var popupOpts = {
                closeButton: false,
                keepInView: true,
                autoPan: true,
                closeOnClick: false,
                className: 'createcamerapopup'
            };
            
//            myMap.overlays["LH WFST CAMS"].addLayer(layer);
//            myMap.overlays["LH WFST CAMS"].addLayer(l);
//            l.openPopup(popupOpts);
            var lay = L.GeoJSON.css(l);
            myMap.overlays["LH WFST CAMS"].addLayer(lay);
            lay.openPopup(popupOpts);
            
            if (appContent.console.outputLevel >= 4) { console.log(popup); }
        }

        // Do whatever else you need to. (save to db, add to map etc)
//        var gjl = layer.GeoJSON();
//        myMap.overlays["LH WFST CAMS"].addLayer(layer);
        myMap.overlays["LH WFST CAMS"].addLayer(l);
//        myMap.map.addLayer(layer);
    });
    myMap.map.on('draw:edited', function (e) {
        var layers = e.layers;
        
        if (appContent.console.outputLevel >= 3) { 
            console.log(performance.now() + ", map event, draw:edited" + '\n');
            console.log('e: ');console.log(e);
            console.log('e.layers: ');console.log(layers);
        }
        
        // DO SOMETHING HERE
        
        layers.eachLayer(function (layer) {
            //do something with the layer
            if (appContent.console.outputLevel >= 3) { console.log(layer); }
//            layer.save();
        });
    });
    myMap.map.on('draw:deleted', function (e) {
        var layers = e.layers;
        
        if (appContent.console.outputLevel >= 3) { 
            console.log(performance.now() + ", map event, draw:deleted" + '\n');
            console.log('e: ');console.log(e);
            console.log('e.layers: ');console.log(layers);
        }
        
        // DO SOMETHING HERE
        
        layers.eachLayer(function (layer) {
            //do something with the layer
            if (appContent.console.outputLevel >= 3) { console.log(layer); }
//            layer.remove();
//            myMap.overlays["LH WFST CAMS"].removeLayer(layer);
        });
        myMap.overlays["LH WFST CAMS"].removeLayers(layers);
    });
    myMap.map.on('draw:drawstart', function (e) {
        var layerType = e.layerType;
        
        if (appContent.console.outputLevel >= 3) {
            console.log(performance.now() + ", map event, draw:drawstart" + '\n');
            console.log('e: ');console.log(e);
            console.log('e.layerType: ');console.log(layerType);
        }
        
        // DO SOMETHING HERE
        
        if (layerType === 'marker') {
            // Do marker specific actions
        }
        
    });
    myMap.map.on('draw:drawstop', function (e) {
        
        var layerType = e.layerType;
        
        if (appContent.console.outputLevel >= 3) {
            console.log(performance.now() + ", map event, draw:drawstop" + '\n');
            console.log('e: ');console.log(e);
            console.log('e.layerType: ');console.log(layerType);
        }
        
        // DO SOMETHING HERE
        
        if (layerType === 'marker') {
//            var lat = e.layer.geometry.coordinates[0];
//            var lon = e.layer.geometry.coordinates[1];
//            var ltln = e.layer.geometry.coordinates.coordsToLatLng();
//            console.log(ltln);
//
//            // Create Camera popup
//            var popup = "<div class='popup'><h3 style='background-color:lightblue; text-align:center;'><b>New Camera</b></h3>";    // Popup header
//            
//            popup = popup + "<form>";    // form
//            
//            popup = popup + "<table><tr><td><label>ID: </label></td><td><input value='EKS XX-XXXX-XXXX'></input></td></tr>";    // Camera ID
//            popup = popup + "<tr><td><label>Type: </label></td><td><input value='PTZ'></input></td></tr>";    // Camera Type
//            popup = popup + "<tr><td><label>Brand: </label></td><td><input value='Axis'></input></td></tr>";    // Camera Brand
//            popup = popup + "<tr><td><label>Model: </label></td><td><input value='232+'></input></td></tr>";    // Camera Model
//            popup = popup + "<tr><td><label>Region: </label></td><td><input value='Eindhoven'></input></td></tr>";    // Camera Region
//            popup = popup + "<tr><td><label>Area: </label></td><td><input value='Ekkersrijt'></input></td></tr>";    // Camera Area
//            popup = popup + "<tr><td><label>Latitude: </label></td><td><input value='0'></input></td></tr>";    // Camera location - latitude 
//            popup = popup + "<tr><td><label>Longitude: </label></td><td><input value='0'></input></td></tr>";    // Camera location - longitude
////            popup = popup + "<tr><td><label>Latitude: </label></td><td><input value='" + lat + "'></input></td></tr>";    // Camera location - latitude 
////            popup = popup + "<tr><td><label>Longitude: </label></td><td><input value='" + lon + "'></input></td></tr>";    // Camera location - longitude
//            popup = popup + "<tr><td><label>Rotation: </label></td><td><input value='90'>dg</input></td></tr>";    // Camera location - rotation (azimuth)
//            popup = popup + "<tr><td><label>Focal length (now): </label></td><td><input value='0.0238'>mm</input></td></tr>";    // Camera specs - focal length (current)
//            popup = popup + "<tr><td><label>Focal length (max): </label></td><td><input value='0.0738'>m</input></td></tr>";    // Camera specs - focal length (max)
//            popup = popup + "<tr><td><label>Focal length (min): </label></td><td><input value='0.0041'>mm</input></td></tr>";    // Camera specs - focal length (min)
//            popup = popup + "<tr><td><label>Focal length (def): </label></td><td><input value='0.0150'>m</input></td></tr>";    // Camera specs - focal length (default)
//            popup = popup + "<tr><td><label>Sensor height: </label></td><td><input value='0.00369'>m</input></td></tr>";    // Camera specs - sensor dimensions - height
//            popup = popup + "<tr><td><label>Sensor width: </label></td><td><input value='0.00443'>m</input></td></tr>";    // Camera specs - sensor dimensions - width
//            popup = popup + "<tr><td><label>Horizontal resolution: </label></td><td><input value='1920'>px</input></td></tr>";    // Camera specs - sensor resolution - horizontal (columns)
//            popup = popup + "<tr><td><label>Vertical resolution: </label></td><td><input value='1080'>px</input></td></tr></table>";    // Camera specs - sensor resolution - vertical (rows)
//            
//            popup = popup + "<button>Save</button>";    // Close form
//            popup = popup + "</form>";    // Close form
//            popup = popup + "</div>";    // Close popup div
//            console.log(popup);
//            
//            var popupOpts = {
//                closeButton: false,
//                keepInView: true,
//                autoPan: true,
//                closeOnClick: false,
//                className: 'createcamerapopup'
//            };
//            console.log(popupOpts);
//            myMap.map.openPopup(popup, ltln, popupOpts);
//            var mapPopup = myMap.map.openPopup(popup, ltln, popupOpts);
        }
        
    });
    myMap.map.on('draw:editstart', function (e) {
        var handler = e.handler;
        
        if (appContent.console.outputLevel >= 3) {
            console.log(performance.now() + ", map event, draw:editstart" + '\n');
            console.log('e: ');console.log(e);
            console.log('e.handler: ');console.log(handler);
        }
        
        // DO SOMETHING HERE
    });
    myMap.map.on('draw:editstop', function (e) {
        var handler = e.handler;
        
        if (appContent.console.outputLevel >= 3) {
            console.log(performance.now() + ", map event, draw:editstop" + '\n');
            console.log('e: ');console.log(e);
            console.log('e.handler: ');console.log(handler);
        }
        
        // DO SOMETHING HERE
        
    });
    myMap.map.on('draw:deletestart', function (e) {
        var handler = e.handler;
        
        if (appContent.console.outputLevel >= 3) {
            console.log(performance.now() + ", map event, draw:deletestart" + '\n');
            console.log('e: ');console.log(e);
            console.log('e.handler: ');console.log(handler);
        }
        
        // DO SOMETHING HERE
        
    });
    myMap.map.on('draw:deletestop', function (e) {
        var handler = e.handler;
        
        if (appContent.console.outputLevel >= 3) { 
            console.log(performance.now() + ", map event, draw:deletestop" + '\n');
            console.log('e: ');console.log(e);
            console.log('e.handler: ');console.log(handler);
        }
        
        // DO SOMETHING HERE
        
    });
    

    var retMap = myMap.map;
    var retOverlays = myMap.overlays;
    var retBasemaps = myMap.basemaps;
    var retCameras = myMap.cameras;
    var retFeatureLayers = myMap.featurelayers;
    var retControls = myMap.mapControls;
    var retSettings = myMap.mapOptions;
    var retActivebasemap = myMap.baselayer;
    
    var result = {
        map: retMap,
        cameras: retCameras,
        basemaps: retBasemaps,
        activebasemap: retActivebasemap,
        overlays: retOverlays,
        featurelayers: retFeatureLayers,
        controls: retControls,
        settings: retSettings
    };
    
    var endtime = performance.now();
    var exectime = endtime - starttime;
    
    if (appContent.track.endtime < endtime) {
        appContent.track.endtime = endtime;
        appContent.track.totaltime = appContent.track.endtime - appContent.track.starttime;
    }
    appContent.track.elapsedtime += exectime;
    
    if (appContent.console.outputLevel >= 3) { console.log("result");console.log(result); }
    if (appContent.console.outputLevel >= 1) { console.log(performance.now() + ", initMap(), END: " + endtime + ", Exec time (ms): " + exectime + '\n'); }
    
    return result;
}   //  END initMap()


//function loadMapOverlays(overlays, selectedTab) {
//    switch (selectedTab) {
//        case 1:
////            overlays["LH WFS-T Ekkersrijt Cameras"].addTo(map);
////            overlays["Cameras WFS-T"].addTo(map);
////            overlays["Cams Ekk FS LH"].addTo(map);
//            
//            overlays["LH WFST CAMS"].addTo(map);
//            overlays["LH WFST CAMS FoV Identification"].addTo(map);
//            overlays["LH WFST CAMS FoV Recognition"].addTo(map);
//            overlays["LH WFST CAMS FoV Detection"].addTo(map);
//            overlays["LH WFST CAMS FoV M&C"].addTo(map);
//            overlays["LH WFST CAMS FoV Visible"].addTo(map);
//            
////            overlays["GeoJSON FoV Monitor"].addTo(map);
////            overlays["GeoJSON FoV Detection"].addTo(map);
////            overlays["GeoJSON FoV Recognition"].addTo(map);
////            overlays["GeoJSON FoV Identification"].addTo(map);
////            overlays["GeoJSON FoV Visible"].addTo(map);
////            overlays["GeoJSON Ekkersrijt Cameras"].addTo(map);
//            
////            overlays["GeoJSON Ekkersrijt Cameras"].addTo(map);
////            overlays["GeoJSON FoV Identification"].addTo(map);
////            overlays["GeoJSON FoV Recognition"].addTo(map);
////            overlays["GeoJSON FoV Detection"].addTo(map);
////            overlays["GeoJSON FoV Monitor"].addTo(map);
////            overlays["GeoJSON FoV Visible"].addTo(map);
//            
//            break;
//        case 2:
//            overlays["GeoJSON Ekkersrijt Cameras"].addTo(map);
//            break;
//        case 3:
//            overlays["GeoJSON Ekkersrijt Cameras"].addTo(map);
//            overlays["GeoJSON FoV Identification"].addTo(map);
//            break;
//        case 4:
//            overlays["GeoJSON Ekkersrijt Cameras"].addTo(map);
//            overlays["GeoJSON FoV Recognition"].addTo(map);
//            break;
//        case 5:
//            overlays["GeoJSON Ekkersrijt Cameras"].addTo(map);
//            overlays["GeoJSON FoV Detection"].addTo(map);
//            break;
//        case 6:
//            overlays["GeoJSON Ekkersrijt Cameras"].addTo(map);
//            overlays["GeoJSON FoV Monitor"].addTo(map);
//            break;
//        case 7:
//            overlays["GeoJSON Ekkersrijt Cameras"].addTo(map);
//            overlays["GeoJSON FoV Visible"].addTo(map);
//            break;
//        case 8:
//            
//            break;
//        case 9:
//            
//            break;
//        default:
//            console.log("default");
//            break;
//    }
//}





//function logCamsFS(layer) {
//    console.log(layer);
//    // Create Camera popup template
//    var popupTemplate = "<div class='popup'><h3 style='background-color:lightblue; text-align:center;'>DITSS Camera <b>{id}</b></h3><ln><br>" + "<table><tr><td><label>ID: </label></td><td><input value='{id}'></input></td></tr>" + "<tr><td><label>Camera type: </label></td><td><input value='{camtype}'></input></td></tr>" + "<tr><td><label>Brand: </label></td><td><input value='{brand}'></input></td></tr>" + "<tr><td><label>Model: </label></td><td><input value='{model}'></input></td></tr>" + "<tr><td><label>Region: </label></td><td><input value='{region}'></input></td></tr>" + "<tr><td><label>Area: </label></td><td><input value='{area}'></input></td></tr>" + "<tr><td><label>Latitude: </label></td><td><input value='{latitude}'></input></td></tr>" + "<tr><td><label>Longitude: </label></td><td><input value='{longitude}'></input></td></tr>" + "<tr><td><label>Rotation: </label></td><td><input value='{rotation}'>dg</input></td></tr>" + "<tr><td><label>Focal length (now): </label></td><td><input value='{focallength}'>m</input></td></tr>" + "<tr><td><label>Focal length (max): </label></td><td><input value='{flmax}'>m</input></td></tr>" + "<tr><td><label>Focal length (min): </label></td><td><input value='{flmin}'>m</input></td></tr>" + "<tr><td><label>Focal length (def): </label></td><td><input value='{fldef}'>m</input></td></tr>" + "<tr><td><label>Sensor height: </label></td><td><input value='{sensorheight}'>m</input></td></tr>" + "<tr><td><label>Sensor width: </label></td><td><input value='{sensorwidth}'>m</input></td></tr>" + "<tr><td><label>Horizontal resolution: </label></td><td><input value='{reshor}'>px</input></td></tr>" + "<tr><td><label>Vertical resolution: </label></td><td><input value='{resvert}'>px</input></td></tr></table></div>";
//    layer.eachFeature(function(e){
//        console.log(e);
//        // Add popup template to feature
//        e.popupTemplate = popupTemplate;
//        // Bind popup
//        e.bindPopup(e.popupTemplate);
////        return e;
//    });
//    
//}












/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
////////////////                           //////////////
////////////////          getWfst()        //////////////
////////////////                           //////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//// getWfst() - Return Overlay layers
//function getWfst () {
//    var starttime = performance.now();
//    console.log(performance.now() + ", getWfst(), START: " + starttime + '\n');
//    
////    // create wfst layers
////    var overlay1;
////    var overlay2;
////    
////    // instantiate wfst layers
////    var wfst = {
////        "overlay1": overlay1,
////        "overlay2": overlay2
////    };
//    var camerasWFST = {};
//    var wfstCamLayerOpts = {
//        // Required
//        url : "/service/localhostarcgis/services/Cameras/Cameras_Ekkersrijt_20150319/MapServer/WFSServer",  // ?
////        url : "http://localhost:6080/arcgis/services/Cameras/Cameras_Ekkersrijt_20150319/MapServer/WFSServer",  // ?
//        featureNS : 'Cameras_Ekkersrijt_20150319',
//        featureType : 'Cameras_Ekkersrijt_withspecs',
//        primaryKeyField: 'Camera_ID'
//    };
//    
//    // Initialize the WFS-T layer 
////    var wfstCameraLayer = L.wfst(null,{
////        // Required
////        url : "http://localhost:6080/arcgis/services/Cameras/Cameras_Ekkersrijt_20150319/MapServer/WFSServer",  // ?
////        featureNS : 'Cameras_Ekkersrijt_20150319',
////        featureType : 'Cameras_Ekkersrijt_withspecs',
////        primaryKeyField: 'Camera_ID'
////    });
//    var wfstCameraLayer = L.wfst(null, wfstCamLayerOpts);
//    camerasWFST.layer = wfstCameraLayer;
////    camerasWFST.layer = L.wfst(null, wfstCamLayerOpts);
////    camerasWFST.layer.addTo(map);
//    camerasWFST.layerOpts = wfstCamLayerOpts;
//    camerasWFST.name = "Cameras WFS-T";
//    
//    
//    // Initialize the draw control and pass it the FeatureGroup of editable layers
//    var drawControl = new L.Control.Draw({
//        edit: {
////            featureGroup: camerasWFST.layer
//            featureGroup: wfstCameraLayer
//        }
//    });
//    camerasWFST.drawcontrol = drawControl;
//    
////    map.addControl(drawControl);
////    camerasWFST.drawcontrol = new L.Control.Draw({
////        edit: {
//////            featureGroup: camerasWFST.layer
////            featureGroup: wfstCameraLayer
////        }
////    });
//    
//    map.addControl(drawControl);
//
//    map.on('draw:created', function (e) {
//        camerasWFST.layer.addLayer(e.layer);
//    });
//    map.on('draw:edited', function (e) {
//        camerasWFST.layer.wfstSave(e.layers);
//    });
//    
//    var result = {
//        cameras: camerasWFST
//    };
//    
//    console.log("result");console.log(result);
//    
//    var endtime = performance.now();
//    var totaltime = endtime - starttime;
//    console.log(performance.now() + ", getWfst(), END: " + endtime + ", Exec Time (ms): " + totaltime + '\n');
//    
//    return result;
//}       // END getWfst()




/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
////////////////                           //////////////
////////////////     getCameraLayers()     //////////////
////////////////                           //////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//////  getCameraLayers() - 
//function getCameraLayers() {
//    var starttime = performance.now();
//    console.log(performance.now() + ", getCameraLayers(), START: " + starttime + '\n');
//    
//    // Create Cameras Layer
//    var camcluslayopt = { 
//        spiderfyOnMaxZoom: true,    // default true
//        showCoverageOnHover: true,     // default true
//        zoomToBoundsOnClick: true,     // default true
//        removeOutsideVisibleBounds: true,   // true for enhanced performance
//        animateAddingMarkers: true,    // default true
//        disableClusteringAtZoom: 13,    // default disabled
//        maxClusterRadius: 100, // Default 80
//        spiderfyDistanceMultiplier: 100, // default 1
//        polygonOptions: {
//            color: 'yellow',
//            weight: 15,
//            opacity: 0.9,
//            fillOpacity: 0.6
//        },
////        iconCreateFunction: function(cluster) {
////            return new L.DivIcon({ html: '<b>' + cluster.getChildCount() + '</b>' });
////        },
//        singleMarkerMode: false     // default false
//    };
//    
//    // Create Cameras and FoV Layers
//    var result = {
//        cameras: L.markerClusterGroup(camcluslayopt),   // cameras
//        identification: L.geoJson.css(),    // Identification
//        recognition: L.geoJson.css(),    // Recognition
//        detection: L.geoJson.css(),    // Detection
//        monitor: L.geoJson.css(),    // Monitor & Control
//        visible: L.geoJson.css()    // Visible
//    }; 
////    console.log("result");console.log(result);
//    
//    var endtime = performance.now();
//    var totaltime = endtime - starttime;
//    console.log(performance.now() + ", getCameraLayers(), END: " + endtime + ", Exec: " + totaltime + '\n');
//    
//    return result;
//}   // END getCameraLayers()












