"use strict"

const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();
var file = 'address_book.db';
var db = new sqlite.Database(file);
// write your code here
var CREATE_TABLE_CONTACTS = "CREATE TABLE IF NOT EXISTS contacts ( id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT, telp TEXT, email TEXT);";

var CREATE_TABLE_GROUP = "CREATE TABLE IF NOT EXISTS groups ( id INTEGER PRIMARY KEY AUTOINCREMENT, groupname TEXT NOT NULL);";

var CREATE_TABLE_TR = "CREATE TABLE IF NOT EXISTS tr_contact_group ( id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER, group_id INTEGER, FOREIGN KEY (contact_id) REFERENCES contacts(id), FOREIGN KEY (group_id) REFERENCES groups(id));";

var SEED_DATA = "INSERT INTO contacts (first_name, last_name, telp, email) VALUES ('Rubi', 'Henjaya', '0812345678', 'rubicode@google.com'), ('Riza', 'Fahmi', '085612345', 'rizafahmi@google.com');";

//CREATE TABLE
let createTableContacts = () => {
  db.serialize(function () {
    db.run(CREATE_TABLE_CONTACTS, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE CONTACTS');
      }
    });
  });
}

let createTableGroup = () => {
  db.serialize(function () {
    db.run(CREATE_TABLE_GROUP, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE GROUP');
      }
    });
  });
}

let createTableTr = () => {
  db.serialize(function () {
    db.run(CREATE_TABLE_TR, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE TR');
      }
    });
  });
}

let seedData = () => {
  db.serialize(function () {
    db.run(SEED_DATA, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('SEED DATA');
      }
    });
  });
}
let modifyTable = () => {
  db.serialize(function () {
    db.run(ALTER_TABLE, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('ALTER TABLE');
      }
    });
  });
}

createTableContacts()
createTableGroup()
createTableTr()
