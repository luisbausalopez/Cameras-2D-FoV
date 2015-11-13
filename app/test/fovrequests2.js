
var track = []; // Tracking of requests
var count = 0;  // Counter: keeps track of the munber of requests performed
var lot = 1;
var nReq = 100; // Number of requests to perform
//var nReq = 1000; // Number of requests to perform
//var nReq = 5000; // Number of requests to perform
//var nReq = 25000; // Number of requests to perform

// Reset counter and start
function startNow() {
    if (count > 0) { 
        count = 0;
        lot++; 
    }
    startRunReq();
}

// Load request parameters
function startRunReq() {
    console.log(performance.now().toFixed(2) + ", startRunReq()");
    
    var latmax = 51.51, 
        latmin = 51.49, 
        lat = (Math.random() * (latmax - latmin)) + latmin, 
        lonmax = 5.50, 
        lonmin = 5.44, 
        lon = (Math.random() * (lonmax - lonmin)) + lonmin, 
        flmax = 0.1224, 
        flmin = 0.0034, 
        fl = (Math.random() * (flmax - flmin)) + flmin, 
//        fl = flmin, 
//        fl = flmax, 
        th = 0, 
        ch = 3, 
        ssw = 0.00369, 
        srv = 582, 
        srs = 4326,
        rot = Math.floor(Math.random() * (360 - 0));
    lat = lat.toFixed(6);
    lon = lon.toFixed(6);
    fl = fl.toFixed(4);
    var req = '/service/cams/camera/fieldofviewactual?latitude=' + lat + '&longitude=' + lon + '&sensorwidth=' + ssw + '&verticalresolution=' + srv + '&focallength=' + fl + '&rotation=' + rot + '&terrainheight=' + th +  '&cameraheight=' + ch + '&insrs=' + srs + '&outsrs=' + srs + '&zoned=true';

    runRequest(req, performance.now().toFixed(2), fl);
}

// Run request to FoV service
function runRequest (url, start, fl) { 
    console.log(performance.now().toFixed(2) + ", runRequest(" + url + ", " + start + ", " + fl + ")");
    
    function success(data) {
        count++;    // Increase request counter
        
        var lote = lot,      //  Load variables
            rn = count, 
            type = 'Random', 
//            type = 'Min', 
//            type = 'Max', 
            elapsed = performance.now() - start, 
            foclen = fl, 
            vertices = 0,
            area = 0;
        elapsed = elapsed.toFixed(2);
        if (data.features.length == 5) {
            vertices = data.features[4].geometry.coordinates[0].length - 1; // in closed polygons first vertex is repeated
            area = data.features[4].properties.area; // Area of Visible FoV
        }
        
        // Add stats to table
        printStats(lote, rn, type, elapsed, foclen, vertices, area);  
        // Run next request
        if (count < nReq) { startRunReq(); }    
        
        // Keep track of requests
        track[track.length] = {
            rn: rn,
            type: type,
            elapsed: elapsed,
            foclen: foclen,
            vertices: vertices,
            area: area, 
            url: url,
            fovs: data.features
        };
    }

    $.ajax({
        method: 'GET',
        dataType: "json",
        url: url,
        success: success
    });
}

//  Add request stats to table
function printStats(lote, rn, type, elapsed, foclen, vertices, area) {
    console.log(performance.now().toFixed(2) + ", printStats(" + rn + ", " + type + ", " + elapsed + ", " + foclen + ")");
    var row = $('<tr/>');
    $('<td/>').text(lote).appendTo(row), 
    $('<td/>').text(rn).appendTo(row), 
    $('<td/>').text(type).appendTo(row), 
    $('<td/>').text(elapsed).appendTo(row),
    $('<td/>').text(foclen).appendTo(row);
    $('<td/>').text(vertices).appendTo(row);
    $('<td/>').text(area).appendTo(row);
    $('#fovstats').append(row);
}

