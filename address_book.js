"use strict"
import Setup from './setup.js'
import Contact from './contact.js'
import Groups from './groups.js'
import Group_Identifier from './group_identifier.js'
const fs = require('fs')


const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();
//write your code here
let file = 'address_book.db'
let db = new sqlite.Database(file)
// let replServer = repl.start({prompt:">"})
// replServer.context.createTable = Setup.createTable
Setup.createTable(db)

let imported = JSON.parse(fs.readFileSync('import.json'))
let group_import = JSON.parse(fs.readFileSync('group.json'))
imported.forEach((val)=>{
  let contact = new Contact({
    firstname: val.firstname,
    lastname: val.lastname,
    gender: val.gender,
    birthdate: val.birthdate,
    email: val.email,
    address: val.address,
    phone: val.phone,
    company: val.company,
    inserted: false
  })
  contact.setDB(db)
  contact.save()
})

group_import.forEach((val)=>{
  Groups.insert(val.group_name,db)
})

Group_Identifier.insert(1,1,db)
Group_Identifier.insert(2,2,db)
Group_Identifier.insert(3,1,db)
Group_Identifier.insert(4,3,db)
Group_Identifier.insert(5,4,db)
Group_Identifier.insert(6,2,db)
Group_Identifier.insert(7,3,db)
Group_Identifier.insert(8,4,db)

let contact = new Contact("Sahbana")
contact.setDB(db)
contact.updateAddress(`JakartaSelatan`,1)
contact.setDB(db)
let contactdel = new Contact("Sahbana")
contact.deleteContact(5)
contact.setDB(db)
let groupdel = new Contact("Sahbana")
contact.deleteGroup(2)
