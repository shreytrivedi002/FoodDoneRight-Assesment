const express = require("express");
const router = express.Router();
const geoData = require('../../assets/converted-asset.json');

const checkIfPointIsInside = (polygon, point) => {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html

    let odd = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; i++) {
        if (((polygon[i][1] > point[1]) !== (polygon[j][1] > point[1]))
            && (point[0] < ((polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0]))) {
            odd = !odd;
        }
        j = i;
    }
    return odd;
}

const findNearestProperty = (point_) => {
    var pName;
    geoData?.jsonObj.forEach(item => {
        if (checkIfPointIsInside(item?.geometry?.coordinates[0], point_)) {
            pName = item?.properties?.name;
        }
    })
    return pName ? pName : 'not found'
}

router.get("/", (req, res) => {
    res.status(200).json({
        studentList: 'result',
    });
});

router.post("/nearestRestro", (req, res) => {
    let nearestProperty = findNearestProperty(req?.body?.coordinate);
    res.status(200).json({
        property: nearestProperty,
        status: "ok",
    });
});

module.exports = router;