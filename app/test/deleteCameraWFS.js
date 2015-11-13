
        
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



function deleteCameraWFS (objectid, lockid) {
    var starttime = performance.now();
    console.log(performance.now() + ", deleteCameraWFS(" + objectid + ", " + lockid + "), START: " + starttime + '\n');
    
//    map.spin(true);    // Start map spinning
    
    function getPostData (objectid, lockid) {
        console.log('objectid'); console.log(objectid); console.log('lockid'); console.log(lockid);

//        var propertyName = 'Camera_ID', 
//            propertyValue = cameraId;
        var propertyName = 'objectid', 
            propertyValue = objectid;
        
        var datatypename = 'Cameras_Ekkersrijt', 
            datasetname = 'Cameras_Ekkersrijt_20150511', 
            baseurl = 'http://localhost:6080/arcgis/services/', 
            postDataHeader =
            '<?xml version="1.0" encoding="UTF-8" ?>\n'
          + '<wfs:Transaction service="WFS" version="1.1.0"\n'
          + '  xsi:schemaLocation="WFS\n'
          + '    ' + baseurl + 'multipos/' + datasetname + '/MapServer/WFSServer?request=DescribeFeatureType%26version=1.1.0%26typename=' + datatypename + '\n'
//          + '    ' + baseurl + 'Cameras/' + datasetname + '/MapServer/WFSServer?request=DescribeFeatureType%26version=1.1.0%26typename=' + datatypename + '\n'
          + '    http://www.opengis.net/wfs\n'
          + '    http://schemas.opengis.net/wfs/1.1.0/wfs.xsd"\n'
          + '  xmlns:' + datasetname + '="WFS"\n'
          + '  xmlns:wfs="http://www.opengis.net/wfs"\n'
    //      + '  xmlns:gml="http://www.opengis.net/gml"\n'
    //      + '  xmlns:xlink="http://www.w3.org/1999/xlink"\n'
          + '  xmlns:ogc="http://www.opengis.net/ogc"\n'
          + '  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n', 
            postDataBody = 
            '  <wfs:LockId xmlns:wfs="http://www.opengis.net/wfs">' + lockid + '</wfs:LockId> \n'
          + '  <wfs:Delete handle="delete" typeName="' + datatypename + '">\n'
          + '    <ogc:Filter>\n'
          + '      <ogc:PropertyIsEqualTo>\n'
          + '        <ogc:PropertyName>' + propertyName + '</ogc:PropertyName>\n'
          + '        <ogc:Literal>' + propertyValue + '</ogc:Literal>\n'
          + '      </ogc:PropertyIsEqualTo>\n'
          + '    </ogc:Filter>\n'
          + '  </wfs:Delete>\n', 
            postDataFooter = '</wfs:Transaction>', 
            postData = postDataHeader + postDataBody + postDataFooter;
        
        console.log("postData: "); console.log(postData);
        $('<p/>').text(postData).appendTo('#summary');
        return postData;
    }
    
    function success (xml) {
        console.log("Success ajax Delete camera");
        var inJSON = xml2JSON(xml);
//        var p = $('<p/>').text(xml);
        var p2 = $('<p/>').text(JSON.stringify(inJSON));
//        $('#summary').append(p);
        $('#summary').append(p2);
        console.log(xml); console.log(inJSON); console.log(JSON.stringify(inJSON));
//            map.spin(false);    // Stop map spinning
    }
    
    var url = '/service/geodanarcgis/services/multipos/Cameras_Ekkersrijt_20150511/MapServer/WFSServer', 
//        lockId = '{4CBA6055-DDD4-4D98-BACD-6AA8F4975A5E}', 
        lockId = lockid, 
        postData = getPostData(objectid, lockId);
    
    
    // Perform POST ajax request to delete camera
    $.ajax({
        type: "POST",
        url: url,
        dataType: "xml",
        contentType: "text/xml",
        data: postData,
        success: success
    });
    
    var endtime = performance.now();
    var totaltime = endtime - starttime;
    console.log(performance.now() + ", deleteCameraWFS(), END: " + endtime + ", Exec: " + totaltime + '\n');
}   // END deleteCameraWFS()





function lockCameraWFS (objectid) {
    var starttime = performance.now();
    console.log(performance.now() + ", lockCameraWFS(" + objectid + "), START: " + starttime + '\n');
    
    function getPostData(objectid) {
        var datatypename = 'Cameras_Ekkersrijt', 
            datasetname = 'Cameras_Ekkersrijt_20150511', 
            baseurl = 'http://localhost:6080/arcgis/services/', 
            lockProperty = {
                name: 'OBJECTID',
                value: objectid
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
        
        console.log(postData);
        $('<p/>').text(postData).appendTo('#summary');
        return postData;
    }
    
    var postData = getPostData(objectid);
    var url = '/service/geodanarcgis/services/multipos/Cameras_Ekkersrijt_20150511/MapServer/WFSServer';

    function success (xml) {
        console.log("Success ajax Lock camera");
        var inJSON = xml2JSON(xml);
//        var p = $('<p/>').text(xml);
        var p2 = $('<p/>').text(JSON.stringify(inJSON));
//        $('#summary').append(p);
        $('#summary').append(p2);
        console.log(xml); console.log(inJSON); console.log(JSON.stringify(inJSON));
        
        function getLockId(xml){
            var xmlString;
            var lock = '';

            console.log('Lock ID: ' + lock);
            return lock;
        }
//        var lock = getLockId(xml);
        var lock = inJSON["wfs:FeatureCollection"]["@attributes"].lockId;
        console.log(lock);
//        var cam = camera;
//        geodanWFS_UpdateCameraFeature(lock, cam);
    }

    $.ajax({
        type: "POST",
        url: url,
        dataType: "xml",
        contentType: "text/xml",
        data: postData,
        success: success
    });

    
    var endtime = performance.now();
    var totaltime = endtime - starttime;
    console.log(performance.now() + ", lockCameraWFS(), END: " + endtime + ", Exec: " + totaltime + '\n');
}   // END lockCameraWFS()





function getCameraWFS (objectid) {
    var starttime = performance.now();
    console.log(performance.now() + ", getCameraWFS(" + objectid + "), START: " + starttime + '\n');
    
    function getPostData(objectid) {
        var datatypename = 'Cameras_Ekkersrijt', 
            datasetname = 'Cameras_Ekkersrijt_20150511', 
            baseurl = 'http://localhost:6080/arcgis/services/', 
            lockProperty = {
                name: 'OBJECTID',
                value: objectid
            },
            lockTimeout = 0.5, 
            outputFormat = 'text/xml; subtype=gml/3.1.1',
            postDataHeader =
                '<?xml version="1.0" encoding="UTF-8" ?> \n'
              + '<wfs:GetFeature service="WFS" version="1.1.0" \n'
              + '  xsi:schemaLocation="WFS \n'
              + '    ' + baseurl + 'multipos/' + datasetname + '/MapServer/WFSServer?request=DescribeFeatureType%26version=1.1.0%26typename=' + datatypename + ' \n'
//              + '    ' + baseurl + 'Cameras/' + datasetname + '/MapServer/WFSServer?request=DescribeFeatureType%26version=1.1.0%26typename=' + datatypename + ' \n'
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
            postDataFooter = '</wfs:GetFeature> \n', 
            postData = postDataHeader + postDataBody + postDataFooter;
        
        console.log(postData);
        $('<p/>').text(postData).appendTo('#summary');
        return postData;
    }
    
    var postData = getPostData(objectid);
    var url = '/service/geodanarcgis/services/multipos/Cameras_Ekkersrijt_20150511/MapServer/WFSServer';

    function success (xml) {
        console.log("Success ajax Get camera");
        var inJSON = xml2JSON(xml);
//        var p = $('<p/>').text(xml);
        var p2 = $('<p/>').text(JSON.stringify(inJSON));
//        $('#summary').append(p);
        $('#summary').append(p2);
        console.log(xml); console.log(inJSON); console.log(JSON.stringify(inJSON));
        
        function getFeature(xml){
            var xmlString;
            var feature = {};

            console.log('Feature: ' + feature);
            return feature;
        }
        var feature = getFeature(xml);
    }

    $.ajax({
        type: "POST",
        url: url,
        dataType: "xml",
        contentType: "text/xml",
        data: postData,
        success: success
    });

    var endtime = performance.now();
    var totaltime = endtime - starttime;
    console.log(performance.now() + ", getCameraWFS(), END: " + endtime + ", Exec: " + totaltime + '\n');
}   // END getCameraWFS()
