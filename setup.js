"use strict"

const repl = require('repl')
const sqlite = require('sqlite3').verbose()
let fs = require('fs')

let file = 'address_book.db'
let db = new sqlite.Database(file)

// SQL Statement
let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS contacts ( id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT NOT NULL, phone TEXT, email TEXT, address TEXT )"

let address = JSON.parse(fs.readFileSync('address_book.json'))
let SEED_DATA = "INSERT INTO contacts (firstname, lastname, phone, email) VALUES "

for (let i = 0; i < address.length; i++) {
  SEED_DATA += "('" + address[i].firstname + "', '" + address[i].lastname + "', '" + address[i].phone + "', '" + address[i].email + "')"
  if (address.length - 1 > i) {
    SEED_DATA += ", "
  }
}

// CREATE_TABLE
let createTable = () => {

  // Run SQL one at a time
  db.serialize(function() {

    // Create table
    db.run(CREATE_TABLE, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('CREATE TABLE')
      }
    })
  })
}

// SEED_DATA
let seedData = () => {

  // Run SQL one at a time
  db.serialize(function() {

    // Insert data into datatable
    db.run(SEED_DATA, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('INSERT DATA')
      }
    })
  })
}

createTable()
seedData()
