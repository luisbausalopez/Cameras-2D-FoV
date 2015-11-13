
var startTime = 0;
var track = []; // Tracking of requests
var count = 0;  // Counter: keeps track of the munber of requests performed
var lot = 1;    // Counter: keeps track of the mumber of Lots performed
//var nLot = 5;  // Number of Lots to perform
//var nReq = 5; // Number of requests to perform
//var nLot = 10;  // Number of Lots to perform
var nLot = 20;  // Number of Lots to perform
var nReq = 100; // Number of requests to perform
//var nReq = 1000; // Number of requests to perform
//var nReq = 5000; // Number of requests to perform
//var nReq = 25000; // Number of requests to perform

// Reset counter and start
function startNow() {
    startTime = performance.now().toFixed(2);
    console.log(performance.now().toFixed(2) + ", START - Start Time: " + startTime);
    $('<p/>').text('Start Time: ' + startTime).appendTo('#summary');
    if (count > 0) { 
        count = 0;
        lot++; 
    }
    startRunReq();
}

// Load request parameters
function startRunReq() {
    console.log(performance.now().toFixed(2) + ", startRunReq()");
    var typename = "Cameras_Ekkersrijt";
    var req = '/service/geodanarcgis/services/multipos/Cameras_Ekkersrijt_20150511/MapServer/WFSServer?request=getfeature&typename='+typename;
    
    // If counter has not reached limit
    if ((count < nReq) && (lot<=nLot)) { 
        count++;    // Increase request counter
        runRequest(req, performance.now().toFixed(2));     // Run next request
    } 
    // If counter reached limit and lot has not reached limit
    else if ((count >= nReq) && (lot<=nLot)) {
        count = 0;  // Reset counter
        lot++;      // Increase lot number
        startRunReq();
    }
    else {
        var end = performance.now().toFixed(2), 
            elapsed = end - startTime, 
            trl = track.length, 
            average = 0.0, 
            max = 0.0, 
            min = 100000.0;
        
        elapsed = elapsed/1000.0;
        elapsed = elapsed.toFixed(2);
        for (i=0; i<trl; i++) { 
            var el = track[i].elapsed * 1.0;
            average += (el / trl); 
            if (el > max) { max = el; }
            if (el < min) { min = el; }
        }
        average = average.toFixed(2);
        max = max.toFixed(2);
        min = min.toFixed(2);
        
        $('<p/>').text('End Time: ' + end).appendTo('#summary');
        $('<p/>').text('Elapsed Time: ' + elapsed + ' seconds').appendTo('#summary');
        $('<p/>').text('Average Time: ' + average + ' milliseconds').appendTo('#summary');
        $('<p/>').text('Max Time: ' + max + ' milliseconds').appendTo('#summary');
        $('<p/>').text('Min Time: ' + min + ' milliseconds').appendTo('#summary');
        $('<p/>').text('Total Number of requests: ' + trl).appendTo('#summary');
        $('<p/>').text('Number of Lots: ' + nLot).appendTo('#summary');
        $('<p/>').text('Requests per Lot: ' + nReq).appendTo('#summary');
        
        console.log(performance.now().toFixed(2) + ", END - Elapsed Time: " + elapsed + ' seconds.');
    }
//    runRequest(req, performance.now().toFixed(2));
}

// Run request to FoV service
function runRequest (url, start) { 
    console.log(performance.now().toFixed(2) + ", runRequest(" + url + ", " + start + ")");
    
    function success(data) {
        
        var inJSON = xml2JSON(data), 
            responseString = JSON.stringify(inJSON), 
            responseLength = responseString.length, 
            features = inJSON["wfs:FeatureCollection"]["gml:featureMember"],
            lote = lot,      //  Load variables
            rn = count, 
            type = 'Get All Cameras', 
            elapsed = performance.now() - start, 
            cameras = features.length, 
            response = responseLength;
        elapsed = elapsed.toFixed(2);
        
        // Add stats to table
        printStats(lote, rn, type, elapsed, cameras, response);  
        
        // Keep track of requests
        track[track.length] = {
            rn: rn,
            type: type,
            elapsed: elapsed,
            cameras: cameras,
            url: url,
            features: features,
            response: response
        };
        
        // Run next request
        startRunReq();
    }
    
    $.ajax({
        method: 'GET',
        url: url,
        dataType: 'xml',
        success: success
    });
}

//  Add request stats to table
function printStats(lote, rn, type, elapsed, cameras, response) {
    console.log(performance.now().toFixed(2) + ", printStats(" + lote + ", " + rn + ", " + type + ", " + elapsed + ", " + cameras + ")");
    var row = $('<tr/>');
    $('<td/>').text(lote).appendTo(row), 
    $('<td/>').text(rn).appendTo(row), 
    $('<td/>').text(type).appendTo(row), 
    $('<td/>').text(elapsed).appendTo(row),
    $('<td/>').text(cameras).appendTo(row);
    $('<td/>').text(response).appendTo(row);
    $('#camstats').append(row);
}


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

