"use strict"

const repl = require('repl')
const sqlite = require('sqlite3').verbose()
let fs = require('fs')

let file = 'address_book.db'
let db = new sqlite.Database(file)

let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS contacts ( id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT NOT NULL, phone TEXT, email TEXT, address TEXT )"
let CREATE_GROUP_TABLE = "CREATE TABLE IF NOT EXISTS groups ( id INTEGER PRIMARY KEY AUTOINCREMENT, groupname TEXT NOT NULL)"
let CREATE_TRANSACTIONAL_TABLE = "CREATE TABLE IF NOT EXISTS group_members (id INTEGER PRIMARY KEY AUTOINCREMENT, group_id TEXT, member_id INTEGER, FOREIGN KEY(group_id) REFERENCES groups(id), FOREIGN KEY(member_id) REFERENCES contacts(id))"

let address = JSON.parse(fs.readFileSync('address_book.json'))

let SEED_DATA = "INSERT INTO contacts (firstname, lastname, phone, email, address) VALUES "

for (let i in address.contacts) {
  SEED_DATA += "('" + address.contacts[i].firstname + "', '" + address.contacts[i].lastname + "', '" + address.contacts[i].phone + "', '" + address.contacts[i].email + "', '" + address.contacts[i].address + "')"
  if (address.contacts.length - 1 > i) {
    SEED_DATA += ", "
  }
}

let SEED_GROUP_DATA = "INSERT INTO groups (groupname) VALUES "

for (let i in address.groups) {
  SEED_GROUP_DATA += "('" + address.groups[i].groupname + "')"
  if (address.groups.length - 1 > i) {
    SEED_GROUP_DATA += ", "
  }
}

let SEED_TRANSACTIONAL_DATA = "INSERT INTO group_members (group_id, member_id) VALUES "

for (let i in address.group_members) {
  SEED_TRANSACTIONAL_DATA += "('" + address.group_members[i].group_id + "', '" + address.group_members[i].member_id + "')"
  if (address.group_members.length - 1 > i) {
    SEED_TRANSACTIONAL_DATA += ", "
  }
}

let createTable = () => {
  db.serialize(function() {
    db.run(CREATE_TABLE, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('CREATE TABLE')
      }
    })
    db.run(CREATE_GROUP_TABLE, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('CREATE GROUP TABLE')
      }
    })
    db.run(CREATE_TRANSACTIONAL_TABLE, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('CREATE TRANSACTIONAL TABLE')
      }
    })
  })
}

let seedData = () => {
  db.serialize(function() {
    db.run(SEED_DATA, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('INSERT DATA')
      }
    })

    db.run(SEED_GROUP_DATA, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('INSERT GROUP DATA')
      }
    })

    db.run(SEED_TRANSACTIONAL_DATA, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('INSERT TRANSACTIONAL DATA')
      }
    })
  })
}

createTable()
seedData()
