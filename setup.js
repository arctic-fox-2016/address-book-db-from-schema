"use strict"

const repl = require('repl')
const sqlite = require('sqlite3').verbose()
let fs = require('fs')

let file = 'address_book.db'
let db = new sqlite.Database(file)

// SQL Statement
let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student ( id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT NOT NULL, phone TEXT, email TEXT )"

let address = JSON.parse(fs.readFileSync('address_book.json'))

for (let i = 0; i < address.length; i++)

// let SEED_DATA = "INSERT INTO student (firstname, lastname, birthdate) VALUES ('Peter', 'Raswono', '081324354657', 'peter@gmail.com'), ('Andrew', 'Tandiawan', '081234567890', 'andrew@gmail.com')"

// // CREATE_TABLE
// let createTable = () => {

//   // Run SQL one at a time
//   db.serialize(function() {

//     // Create table
//     db.run(CREATE_TABLE, function(err) {
//       if (err) {
//         console.log(err)
//       } else {
//         console.log('CREATE TABLE')
//       }
//     })
//   })
// }

// // SEED_DATA
// let seedData = () => {

//   // Run SQL one at a time
//   db.serialize(function() {

//     // Insert data into datatable
//     db.run(SEED_DATA, function(err) {
//       if (err) {
//         console.log(err)
//       } else {
//         console.log('INSERT DATA')
//       }
//     })
//   })
// }

// createTable()
// seedData()
