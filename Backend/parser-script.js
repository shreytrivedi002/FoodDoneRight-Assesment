const parseKML = require('parse-kml');
var fs = require('fs');
// Read KML From URL

const saveFile = (jsonObj) => {
    // to seperate out the 'Point' type geometry data 
    let newCollection = [];
    jsonObj?.features.map(item => {
        if (item?.geometry?.type === 'Polygon') {
            newCollection.push(item)
        }
    })

    // stringify JSON Object
    var jsonContent = JSON.stringify({ jsonObj: newCollection });

    fs.writeFile("./assets/converted-asset.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });
}

// KML To JSON From File
parseKML
    .toJson('./assets/asset.kml')
    .then(response => saveFile(response))
    .catch(err => { console.log(err) });