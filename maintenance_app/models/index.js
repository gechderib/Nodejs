const mongoose  = require("mongoose")
const dbConfig = require("../config/db.config")
const Role = require("./role.model")
const User = require("./user.model")

mongoose.Promise = global.Promise;

const db = {}

// db.url = dbConfig
db.mongoose = mongoose
db.user = User
db.role = Role
db.ROLES = ['user','admin','moderator']

module.exports = db