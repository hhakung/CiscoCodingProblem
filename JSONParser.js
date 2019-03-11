// Make sure we got a filename on the command line
if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' PATH_TO_JSON_FILE');
    process.exit(1);
}

var fs = require('fs');
var filename = process.argv[2];

fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err; // Make sure we can open the file

    // The file is not properly formatted; it contains JSON packets, but they are not in arrays
    // so, process the data, get each JSON packet and store it in a JSON array
    var JSONData = []; // JSON array
    var tempData = data;
    while (1) {
        var startBrace = tempData.indexOf('{'); // search for the next starting brace
        var endBrace = tempData.indexOf('}'); // search for the next ending brace

        if (startBrace == -1 || endBrace == -1) {
            break; // if any of these is -1, it means that we reached the end of string
        }

        JSONData.push(JSON.parse(tempData.substring(startBrace, endBrace + 1))); // add the JSON object to the end of the array
        tempData = tempData.substring(endBrace + 1); // store the rest of the string in tempData so that we can process it again
    }

    if (JSONData.length == 0) {
        console.log('JSON File not properly read; exiting...');
        process.exit(1);
    }

    // Now that we have the properly formatted JSON data, we can process it and find unique extensions and the number of unique filenames for that extension
    var i;
    var countSameExt = 0;
    // var countSameFiles = 0;
    var uniqueExt = [];
    for (i in JSONData) {
        // if there is no entry for nm, continue to the next entry
        if (!JSONData[i].hasOwnProperty('nm')) {
            continue;
        }

        // check if nm has any entry; if it doens't have any entry, continue to the next entry
        if (JSONData[i].nm == '') {
            continue;
        }

        var locationOfPeriod = JSONData[i].nm.indexOf('.');
        var name = JSONData[i].nm.substring(0, locationOfPeriod);
        var ext = JSONData[i].nm.substring(locationOfPeriod + 1);

        // if the locationOfPeriod is -1, the file format is invalid. continue to the next entry
        if (locationOfPeriod == -1) {
            continue;
        }

        // if name contains any of the following characters, they are invalid; continue to the next entry
        if (name.includes('/') || name.includes('\\') || name.includes('?') || name.includes('%') || name.includes('*') || name.includes(':') || name.includes('|')
            || name.includes('"') || name.includes('<') || name.includes('>') || name.includes('.') || name.includes(' ')) {
                continue;
        }

        // if ext contains any of the following characters, they are invalid; continue to the next entry
        if (ext.includes('/') || ext.includes('\\') || ext.includes('?') || ext.includes('%') || ext.includes('*') || ext.includes(':') || ext.includes('|')
            || ext.includes('"') || ext.includes('<') || ext.includes('>') || ext.includes('.') || ext.includes(' ')) {
                continue;
        }

        if (uniqueExt.length == 0) {
            // if there is no entry in uniqueExt to compare with, just store the extension - ext, the count of files - 1, and the fileName
            uniqueExt.push({'extName':ext, 'numFiles':1, 'fileName':[name]});

        } else {
            // if there are some entries in the uniqueExt, go through each of them and compare
            for (var j = 0; j < uniqueExt.length; j++) {
                if (ext == uniqueExt[j].extName) {
                    // // check if this file has the same name as any of the other files with the same extension
                    // for (var k = 0; k < uniqueExt[j].fileName.length; k++) {
                    //     if (name == uniqueExt[j].fileName[k]) {
                    //         countSameFiles++;
                    //         console.log('here' + ' ' + countSameFiles);
                    //     }
                    // }

                    // if (countSameFiles == 0) {
                    //     // if it doesn't have the same name as any of the other files with the same extension, just add the name
                    //     uniqueExt[j].fileName.push(name);
                    // }

                    uniqueExt[j].numFiles = uniqueExt[j].numFiles + 1; // add 1 to the number of files that has the same extension
                    countSameFiles = 0; // reset countSameFiles to 0
                    countSameExt++;
                }
            }

            if (countSameExt == 0) {
                // if there is no entry that has the same extension as this one, add this one to the array
                uniqueExt.push({'extName':ext, 'numFiles':1, 'fileName':[name]});
            }

            countSameExt = 0; // reset countSameExt to 0
        }
    }

    // output
    for (var i = 0; i < uniqueExt.length; i++) {
        console.log(uniqueExt[i].extName + ': ' + uniqueExt[i].numFiles);
    }

});