"use strict"

//write your code here
const repl = require ('repl');
const sqlite = require ('sqlite3').verbose();

let file = 'address_book.db';
let db = new sqlite.Database(file);

//SQL Statement
let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS address_book ( user_id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT, gender TEXT, email TEXT, phone INTEGER )";
let SEED_DATA = "INSERT INTO address_book (first_name, last_name, gender, email, phone) VALUES ('ahmad','ahmadi','Pria','ahmadahmadi@gmail.com','081219090355');";

let CREATE_TABLE_GROUPS = "CREATE TABLE IF NOT EXISTS groups ( group_id INTEGER PRIMARY KEY AUTOINCREMENT, group_name TEXT )";

let CREATE_TABLE_HEADER_GROUPS = "CREATE TABLE IF NOT EXISTS header_group (header_group_id INTEGER PRIMARY KEY AUTOINCREMENT, group_id INTEGER, user_id INTEGER, FOREIGN KEY (group_id) REFERENCES groups(group_id), FOREIGN KEY(user_id) REFERENCES address_book(user_id));";



//CREATE TABLE
let createTable = () => {
  //RUN SQL one at a a time

  db.serialize(function() {
    // Create TABLE
    db.run (CREATE_TABLE, function(err){
      if (err){
        console.log(err);
      } else {
        console.log('CREATE TABLE');
      }
    })

    db.run (CREATE_TABLE_GROUPS, function(err){
      if (err){
        console.log(err);
      } else {
        console.log('CREATE_TABLE_HEADER_GROUPS TABLE');
      }
    })

    db.run (CREATE_TABLE_HEADER_GROUPS, function(err){
      if (err){
        console.log(err);
      } else {
        console.log('CREATE_TABLE_GROUPS');
      }
    })


  })
}

//SEED_DATA

let seedData = () => {
  //RUN SQL one at a a time

  db.serialize(function() {
    // Create TABLE

    db.run (SEED_DATA, function(err){
      if (err){
        console.log(err);
      } else {
        console.log('seed data');
      }
    })
  })
}


createTable();
seedData();
