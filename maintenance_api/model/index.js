const dbCongif = require('../config/db.config.js')
const maintenanceRequestModel = require('./maintenance_req.model')
const mongoose = require('mongoose')


// mongoose.Promise = global.Promise;

const db = {}

db.mongoose = mongoose
db.url = dbCongif
db.maintenances = maintenanceRequestModel (mongoose)

module.exports = db