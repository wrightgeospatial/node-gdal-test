const path = require('path')
const fs = require('fs')
const express = require('express')
const gdal = require('gdal')

const vector = path.join(__dirname, '../database/states.shp')
// const vector = '../database/states.shp'
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


// console.log(path.join(__dirname, '../public'))
// // console.log(__dirname)
// // console.log(__filename)

const app = express()
//Heroku Modification
const port = process.env.PORT || 3000

//Use Handle Bars
app.set('view engine', 'hbs')

//Render Handle Bars Page
app.get('', (req,res)=> {
    res.render('index')
})

app.get('/data', (req,res)=> {
    
    //Send something to the endpoint
    res.send({
        'shape': 0,
        'srs': obj.ReferenceSys,
        'geometry': obj.geometry
    })
})
//Customize folder to serve
const web = path.join(__dirname, '../public')
const database = path.join(__dirname, '../database')
// Serve up static public folder
app.use(express.static(web))

// Serve up data folder
app.use(express.static(database))

//start Server Heroku
app.listen(port, () =>{
    console.log('Server started on port' + port + '...')
})

 
// //start Server Locally
// app.listen(3000, () =>{
//     console.log('Server started on port 3000...')
// })

// app.get('/help', (req, res)=> {
//     res.send('Help page')

// })