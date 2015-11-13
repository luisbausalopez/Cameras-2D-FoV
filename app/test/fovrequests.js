
var requests = [
    "/service/cams/camera/fieldofviewactual?latitude=51.50153&longitude=5.473166&sensorwidth=0.00369&verticalresolution=582&focallength=0.0068&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=108"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.501998&longitude=5.469673&sensorwidth=0.00369&verticalresolution=582&focallength=0.0068&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=90"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.497239&longitude=5.468053&sensorwidth=0.00369&verticalresolution=582&focallength=0.0068&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=79"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.498067&longitude=5.45137&sensorwidth=0.00369&verticalresolution=582&focallength=0.0068&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=354"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.498077&longitude=5.451279&sensorwidth=0.00369&verticalresolution=582&focallength=0.0068&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=353"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.501472&longitude=5.451582&sensorwidth=0.00369&verticalresolution=582&focallength=0.0068&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=356"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.501276&longitude=5.484248&sensorwidth=0.00369&verticalresolution=582&focallength=0.0068&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=165"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.501089&longitude=5.48559&sensorwidth=0.00369&verticalresolution=582&focallength=0.0068&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=171"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.501597&longitude=5.491168&sensorwidth=0.00369&verticalresolution=582&focallength=0.0068&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=200"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.501948&longitude=5.492633&sensorwidth=0.00369&verticalresolution=582&focallength=0.0068&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=208"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.504995&longitude=5.490983&sensorwidth=0.00369&verticalresolution=582&focallength=0.0068&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=201"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.502999&longitude=5.470237&sensorwidth=0.00369&verticalresolution=576&focallength=0.0082&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=93"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.503393&longitude=5.466439&sensorwidth=0.00369&verticalresolution=576&focallength=0.0082&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=74"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.501737&longitude=5.463552&sensorwidth=0.00369&verticalresolution=576&focallength=0.0082&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=58"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.502265&longitude=5.458993&sensorwidth=0.00369&verticalresolution=576&focallength=0.0082&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=35"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.502692&longitude=5.455302&sensorwidth=0.00369&verticalresolution=576&focallength=0.0082&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=16"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.500138&longitude=5.456096&sensorwidth=0.00369&verticalresolution=576&focallength=0.0082&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=19"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.500912&longitude=5.458714&sensorwidth=0.00369&verticalresolution=576&focallength=0.0082&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=33"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.497763&longitude=5.453526&sensorwidth=0.00369&verticalresolution=576&focallength=0.0082&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=4"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.49702&longitude=5.458824&sensorwidth=0.00369&verticalresolution=576&focallength=0.0082&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=31"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.49757&longitude=5.4609&sensorwidth=0.00369&verticalresolution=576&focallength=0.0082&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=42"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.500623&longitude=5.461326&sensorwidth=0.00369&verticalresolution=576&focallength=0.0082&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=46"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.500445&longitude=5.467549&sensorwidth=0.00369&verticalresolution=576&focallength=0.0082&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=78"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.499213&longitude=5.469984&sensorwidth=0.00369&verticalresolution=576&focallength=0.0082&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=90"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.500415&longitude=5.472296&sensorwidth=0.00369&verticalresolution=576&focallength=0.0082&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=103"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.504808&longitude=5.486308&sensorwidth=0.00369&verticalresolution=576&focallength=0.0082&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=177"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.503454&longitude=5.490772&sensorwidth=0.00369&verticalresolution=576&focallength=0.0082&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=199"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.500827&longitude=5.491995&sensorwidth=0.00369&verticalresolution=576&focallength=0.0082&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=204"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.499904&longitude=5.487&sensorwidth=0.00369&verticalresolution=576&focallength=0.0082&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=178"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.498535&longitude=5.493454&sensorwidth=0.00369&verticalresolution=576&focallength=0.0082&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=210"
    ,
    "/service/cams/camera/fieldofviewactual?latitude=51.497373&longitude=5.491316&sensorwidth=0.00369&verticalresolution=576&focallength=0.0082&terrainheight=0&cameraheight=3&insrs=4326&outsrs=4326&zoned=true&rotation=199"
];

console.log(performance.now() + ' +++ FoV Requests +++');
//console.log(requests);

var track = [];
var avg = 0, 
    n = 0;
var fls = [];
//var nReq = 31;
var nReq = 150;
var starttime = performance.now().toFixed(3);
    
$('#fovrequests').append('Start Time: ' + starttime + ' ms.');

function printStats() {
    console.log(performance.now().toFixed(3) + ', printStats(), Start');

    var len = track.length;
    var start = 0.0, 
        end = 0.0, 
        elapsed = 0.0, 
        total = 0.0, 
        foclen = 0.0;
    
    var myStats = $('<table/>');
    var th = $('<tr/>'), 
        th1 = $('<th/>').text('#').appendTo(th), 
        th2 = $('<th/>').text('Start').appendTo(th), 
        th3 = $('<th/>').text('End').appendTo(th), 
        th4 = $('<th/>').text('Elapsed').appendTo(th), 
        th5 = $('<th/>').text('Total').appendTo(th), 
        th6 = $('<th/>').text('Focal Length').appendTo(th);
    myStats.append(th);
    
    for (var x=0; x<len; x++) {
        var tx = track[x];
        var tr = $('<tr/>');
        var td1 = $('<td/>').text(x).appendTo(tr), 
            td2 = $('<td/>').text(tx.start).appendTo(tr), 
            td3 = $('<td/>').text(tx.end).appendTo(tr), 
            td4 = $('<td/>').text(tx.elapsed).appendTo(tr), 
            td5 = $('<td/>').text(tx.total).appendTo(tr), 
            td6 = $('<td/>').text(tx.foclen).appendTo(tr);
        myStats.append(tr);
        
//        console.log('x: ' + x);
//        console.log('start: ' + tx.start);
//        console.log('end: ' + tx.end);
//        console.log('elapsed: ' + tx.elapsed);
//        console.log('total: ' + tx.total);
        
        start += tx.start * 1.0;
        end += tx.end * 1.0;
        elapsed += tx.elapsed * 1.0;
        total += tx.total * 1.0;
    }
    
    console.log('elapsed: ' + elapsed);

    start = start / len * 1.0;
    end = end / len * 1.0;
    elapsed = elapsed / len * 1.0;
    total = total / len * 1.0;
    
    console.log('start avg: ' + start);
    console.log('end avg: ' + end);
    console.log('elapsed avg: ' + elapsed);
    console.log('total avg: ' + total);
    
    $('#fovstats').append(myStats);
}

function runRequest (url, i, start) { 
    console.log(performance.now().toFixed(3) + ', runRequest(' + i + '), Start');
    
    function success(data) {
        console.log(performance.now().toFixed(3) + ', success(data), Start');
        
        var time = performance.now().toFixed(3);
        var elapsed = time - start;
        var total = time - starttime;
        elapsed = elapsed.toFixed(3);
        total = total.toFixed(3);
        
        track[n] = {
            start: start,
            end: time,
            elapsed: elapsed,
            total: total
        };
        
        n = n + 1;
        if (n > 1) { 
            avg = ( ( avg * (n-1) ) + elapsed) / n;
        } else { 
            avg = elapsed;
        }
        
        var fov = $('<div/>');
        var fovs = data.features;

        // Request
        var header = $('<div/>');
        var rdh = $('<h3/>').text('Request #' + i);
        header.append(rdh);
        fov.append(header);
        
        // time
        var timediv = $('<div/>');
        var th = $('<h4/>').text('Time').appendTo(timediv);
        var t1 = $('<p/>').text('Start: ' + start + ' ms.').appendTo(timediv);
        var t2 = $('<p/>').text('End: ' + time + ' ms.').appendTo(timediv);
        var t3 = $('<p/>').text('Elapsed: ' + elapsed + ' ms.').appendTo(timediv);
        var t4 = $('<p/>').text('Total: ' + total + ' ms.').appendTo(timediv);
        fov.append(timediv);

        // Request
        var reqdiv = $('<div/>');
        var rdh = $('<h4/>').text('Request URL').appendTo(reqdiv);
        var rdu = $('<p/>').text(url).appendTo(reqdiv);
        fov.append(reqdiv);

        // FoVs
        var objs = $('<div/>');
        var oh = $('<h4/>').text('Fields Of View').appendTo(objs);
        // all fovs
        var all = $('<div/>');
        var allh = $('<h5/>').text('All').appendTo(all);
        var allp = $('<p/>').text(JSON.stringify(data)).appendTo(all);
        objs.append(all);
        // FoVs one by one
        var separated = $('<div/>');
        var sh = $('<h5/>').text('Separated').appendTo(separated);
        for (f in fovs) {
            var fovobj1 = $('<div/>');
            var t = fovs[f].properties.zone + ' FoV (' + fovs[f].properties.area + " m2)";
            var fovobj2 = $('<h6/>').text(t).appendTo(fovobj1);
            var fovobj3 = $('<p/>').text(JSON.stringify(fovs[f])).appendTo(fovobj1);
            separated.append(fovobj1);
        }
        objs.append(separated);
        fov.append(objs);

        $('#fovrequests').append(fov);

//        console.log(performance.now() + ', FoV: ');
//        console.log(fov);
//        console.log(performance.now() + ', Data: ');
//        console.log(data);
//        console.log(performance.now() + ', URL: ');
//        console.log(url);
        console.log(performance.now() + ', success(data), END');
    }

//    console.log(performance.now() + ', FOR i=' + i);
//    console.log(performance.now().toFixed(4) + ", Url: " + url);
    console.log(performance.now().toFixed(4) + ', AJAX ' + i + ' Start');
    $.ajax({
        method: 'GET',
        dataType: "json",
        url: url,
        success: success
    });
    console.log(performance.now().toFixed(4) + ', AJAX ' + i + ' End');
    console.log(performance.now().toFixed(4) + ', runRequest(' + i + '), END');
}


function runRequests() {
    console.log(performance.now().toFixed(4) + ', runRequests(), START');
    
//    $('#fovrequests').append('Start Time: ' + starttime + ' ms.');
    
    for (var i=0; i<requests.length; i++) {
        console.log(performance.now() + ', FOR i=' + i);
        runRequest(requests[i], i, performance.now().toFixed(4));
//        setTimeout(runRequest(requests[i], i, performance.now().toFixed(3)), 200);
    }
    console.log(performance.now().toFixed(4) + ', runRequests(), END');
}





function runRequest2 (url, i, start, foclen) { 
    console.log(performance.now().toFixed(4) + ', runRequest2(' + i + '), Start');
    
    function success(data) {
        console.log(performance.now().toFixed(4) + ', success(' + i + '), Start');
        
        var time = performance.now().toFixed(4);
        var elapsed = time - start;
        var total = time - starttime;
        elapsed = elapsed.toFixed(4);
        total = total.toFixed(4);
        
        track[n] = {
            start: start,
            end: time,
            elapsed: elapsed,
            total: total,
            foclen: foclen
//            ,
//            url: url
        };
        fls[n] = foclen;
        
        n = n + 1;
        if (n > 1) { 
            avg = ( ( avg * (n-1) ) + elapsed) / n;
        } else { 
            avg = elapsed;
        }
        
        var fov = $('<div/>');
        var fovs = data.features;

        // Request
        var header = $('<div/>');
        var rdh = $('<h3/>').text('Request #' + i);
        header.append(rdh);
        fov.append(header);
        
        // time
        var timediv = $('<div/>');
        var th = $('<h4/>').text('Time').appendTo(timediv);
        var t1 = $('<p/>').text('Start: ' + start + ' ms.').appendTo(timediv);
        var t2 = $('<p/>').text('End: ' + time + ' ms.').appendTo(timediv);
        var t3 = $('<p/>').text('Elapsed: ' + elapsed + ' ms.').appendTo(timediv);
        var t4 = $('<p/>').text('Total: ' + total + ' ms.').appendTo(timediv);
        fov.append(timediv);

        // Request
        var reqdiv = $('<div/>');
        var rdh = $('<h4/>').text('Request URL').appendTo(reqdiv);
        var rdu = $('<p/>').text(url).appendTo(reqdiv);
        fov.append(reqdiv);

        // Focal Length
        var fldiv = $('<div/>');
        var flh = $('<h4/>').text('Focal Length: ' + foclen).appendTo(fldiv);
        fov.append(fldiv);

        // FoVs
        var objs = $('<div/>');
        var oh = $('<h4/>').text('Fields Of View').appendTo(objs);
        // all fovs
        var all = $('<div/>');
        var allh = $('<h5/>').text('All').appendTo(all);
        var allp = $('<p/>').text(JSON.stringify(data)).appendTo(all);
        objs.append(all);
        // FoVs one by one
        var separated = $('<div/>');
        var sh = $('<h5/>').text('Separated').appendTo(separated);
        for (f in fovs) {
            var fovobj1 = $('<div/>');
            var t = fovs[f].properties.zone + ' FoV (' + fovs[f].properties.area + " m2)";
            var fovobj2 = $('<h6/>').text(t).appendTo(fovobj1);
            var fovobj3 = $('<p/>').text(JSON.stringify(fovs[f])).appendTo(fovobj1);
            separated.append(fovobj1);
        }
        objs.append(separated);
        fov.append(objs);

        $('#fovrequests').append(fov);

        console.log(performance.now().toFixed(4) + ', success(' + i + '), END');
    }

//    console.log(performance.now().toFixed(4) + ', FOR i=' + i);
//    console.log(performance.now().toFixed(4) + ", Url: " + url);
//    console.log(performance.now().toFixed(4) + ", foclen: " + foclen);
    console.log(performance.now().toFixed(4) + ', AJAX ' + i + ' Start');
//    setTimeout( function(){
//        $.ajax({
//            method: 'GET',
//            dataType: "json",
//            url: url,
//            success: success
//        })}
//        , 2000);
    $.ajax({
        method: 'GET',
        dataType: "json",
        url: url,
        success: success
    });
    console.log(performance.now().toFixed(4) + ', AJAX ' + i + ' End');
    console.log(performance.now().toFixed(4) + ', runRequest2(' + i + '), END');
}

// Random Focal Length
function runRequests2() {
    console.log(performance.now().toFixed(4) + ', runRequests2(), START');
    
//    $('#fovrequests').append('Start Time: ' + starttime + ' ms.');
    
    for (var i=0; i<nReq; i++) {
        console.log(performance.now().toFixed(4) + ', FOR i=' + i);
        var latmax = 51.51, 
            latmin = 51.49, 
            lat = (Math.random() * (latmax - latmin)) + latmin, 
            lonmax = 5.50, 
            lonmin = 5.44, 
            lon = (Math.random() * (lonmax - lonmin)) + lonmin, 
            flmax = 0.1224, 
            flmin = 0.0034, 
            fl = (Math.random() * (flmax - flmin)) + flmin, 
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
//        setTimeout(runRequest2(req, i, performance.now().toFixed(4), fl), 200);
        runRequest2(req, i, performance.now().toFixed(4), fl);
        
//        console.log(req);console.log(fl);
    }
    console.log(performance.now().toFixed(4) + ', runRequests2(), END');
}

// Maximum Focal Length
function runRequests3() {
    console.log(performance.now().toFixed(4) + ', runRequests3(), START');
    
    for (var i=0; i<nReq; i++) {
        console.log(performance.now().toFixed(4) + ', FOR i=' + i);
        var latmax = 51.51, 
            latmin = 51.49, 
            lat = (Math.random() * (latmax - latmin)) + latmin, 
            lonmax = 5.50, 
            lonmin = 5.44, 
            lon = (Math.random() * (lonmax - lonmin)) + lonmin, 
            flmax = 0.1224, 
//            flmin = 0.0034, 
//            fl = (Math.random() * (flmax - flmin)) + flmin, 
            th = 0, 
            ch = 3, 
            ssw = 0.00369, 
            srv = 582, 
            srs = 4326,
            rot = Math.floor(Math.random() * (360 - 0));
        lat = lat.toFixed(6);
        lon = lon.toFixed(6);
//        fl = fl.toFixed(4);
        var req = '/service/cams/camera/fieldofviewactual?latitude=' + lat + '&longitude=' + lon + '&sensorwidth=' + ssw + '&verticalresolution=' + srv + '&focallength=' + flmax + '&rotation=' + rot + '&terrainheight=' + th +  '&cameraheight=' + ch + '&insrs=' + srs + '&outsrs=' + srs + '&zoned=true';
//        setTimeout(runRequest2(req, i, performance.now().toFixed(4), flmax), 200);
        runRequest2(req, i, performance.now().toFixed(4), flmax);
        
//        console.log(req);console.log(flmax);
    }
    console.log(performance.now().toFixed(4) + ', runRequests3(), END');
}

// Minimum Focal Length
function runRequests4() {
    console.log(performance.now().toFixed(4) + ', runRequests4(), START');
    
    for (var i=0; i<nReq; i++) {
        console.log(performance.now().toFixed(4) + ', FOR i=' + i);
        var latmax = 51.51, 
            latmin = 51.49, 
            lat = (Math.random() * (latmax - latmin)) + latmin, 
            lonmax = 5.50, 
            lonmin = 5.44, 
            lon = (Math.random() * (lonmax - lonmin)) + lonmin, 
//            flmax = 0.1224, 
            flmin = 0.0034, 
//            fl = (Math.random() * (flmax - flmin)) + flmin, 
            th = 0, 
            ch = 3, 
            ssw = 0.00369, 
            srv = 582, 
            srs = 4326,
            rot = Math.floor(Math.random() * (360 - 0));
        lat = lat.toFixed(6);
        lon = lon.toFixed(6);
//        fl = fl.toFixed(4);
        var req = '/service/cams/camera/fieldofviewactual?latitude=' + lat + '&longitude=' + lon + '&sensorwidth=' + ssw + '&verticalresolution=' + srv + '&focallength=' + flmin + '&rotation=' + rot + '&terrainheight=' + th +  '&cameraheight=' + ch + '&insrs=' + srs + '&outsrs=' + srs + '&zoned=true';
//        setTimeout(runRequest2(req, i, performance.now().toFixed(4), flmin), 200);
        runRequest2(req, i, performance.now().toFixed(4), flmin);
        
//        console.log(req);console.log(flmin);
    }
    console.log(performance.now().toFixed(4) + ', runRequests4(), END');
}







