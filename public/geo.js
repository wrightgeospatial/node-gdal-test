const path = require('path')
const fs = require('fs')
const express = require('express')
const gdal = require('gdal')
console.log('All Stations Go...')



var vector = 'data/states.shp'

console.log(typeof gdal)

const geo = () => {
    var dataset = gdal.open(vector);

    var geometry = [];

    var layer = dataset.layers.get(0);
    var feat = dataset.layers.get(0).features;

    feat.forEach(function (feature) {

        geometry.push(feature.getGeometry().toJSON());

    });
    var obj = {
        "geometry": geometry,
        "feature": feat,
        "count": layer.features.count(),
        "extent": JSON.stringify(layer.extent),
        "ReferenceSys": layer.srs ? layer.srs.toWKT() : 'null'
    }
    console.log(obj.ReferenceSys)

}

//Call function
geo()

module.exports = geo
module.exports = vector



// // console.log(chalk.red(geometry));
// // console.log(chalk.green.bold.inverse(feat));
// // console.log("number of features: " + layer.features.count());
// // console.log("fields: " + layer.fields.getNames());
// // console.log("extent: " + JSON.stringify(layer.extent));
// // console.log("srs: " + (layer.srs ? layer.srs.toWKT() : 'null'));

// //https://github.com/naturalatlas/node-gdal
