"use strict"
//write your code here

// write your code here
class Setup {
  constructor() {

  }


static createTable(db){
  // Run AQL one at a time
  db.serialize(()=> {
    // Create table
    Setup.table.forEach((val)=>{
    db.run(val, (err)=>{
      if (err) {
        console.log(err)
      }
    })
  })
  })
}
}
Setup.table = [
   "CREATE TABLE IF NOT EXISTS contact ( id_contact INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT,gender TEXT(1), birthdate DATE,email TEXT, address TEXT,phone TEXT, company TEXT);",

  "CREATE TABLE IF NOT EXISTS groups ( id_group INTEGER PRIMARY KEY AUTOINCREMENT, group_name TEXT NOT NULL);",

  "CREATE TABLE IF NOT EXISTS group_identifier ( id_group_identifier INTEGER PRIMARY KEY AUTOINCREMENT, id_group INT, id_contact INT, FOREIGN KEY(id_group) REFERENCES groups(id_group), FOREIGN KEY(id_contact) REFERENCES contact(id_contact));"
]
export default Setup
