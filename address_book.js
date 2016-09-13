"use strict"
const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();

let file = 'address_book.db'
let db = new sqlite.Database(file)

class Contacts {
  static addContact(firstname, lastname, phone, email, address) {
    let ADD_STUDENT = `INSERT INTO contacts (firstname, lastname, phone, email, address) VALUES ('${firstname}', '${lastname}', '${phone}', '${email}', '${address}')`
    Contacts.runDbCommand(ADD_STUDENT)
  }

  static deleteContact(id) {
    let DELETE_STUDENT = `DELETE FROM student WHERE id = ${id}`
    Contacts.runDbCommand(DELETE_STUDENT)
  }

  static displayTable(table_name) {
    let DISPLAY_TABLE = `SELECT * FROM ${table_name}`
    Contacts.runDbAllCommand(DISPLAY_TABLE)
  }

  static displayContactByName(firstname, lastname) {
    let DISPLAY_STUDENT_BY_NAME = `SELECT * FROM student WHERE firstname LIKE '${firstname}' AND lastname LIKE '${lastname}'`
    Contacts.runDbAllCommand(DISPLAY_STUDENT_BY_NAME)
  }

  static editAddress(id, newAddress){
    let EDIT_ADDRESS = `UPDATE student SET address = '${newAddress}' WHERE id = '${id}'`
    Contacts.runDbAllCommand(EDIT_ADDRESS)
  }

  static addGroup(groupName){
    let ADD_GROUP = `INSERT INTO groups (groupname) VALUES ('${groupName}')`
    Contacts.runDbCommand(ADD_GROUP)
  }

  static removeGroup(groupName){
    let REMOVE_GROUP_MEMBERS = `DELETE FROM group_members WHERE group_id IN ( SELECT id FROM groups WHERE groupname = '${groupName}' )`
    let REMOVE_GROUP = `DELETE FROM groups WHERE groupname = '${groupName}'`

    Contacts.runDbCommand(REMOVE_GROUP_MEMBERS)
    Contacts.runDbCommand(REMOVE_GROUP)

  }

  static addToGroup(group_id, member_id){
    let ADD_TO_GROUP = `INSERT INTO group_members (group_id, member_id) VALUES ('${group_id}', '${member_id}')`
    Contacts.runDbCommand(ADD_TO_GROUP)
  }

  static displayGroupMembers(){
    let DISPLAY_GROUP_MEMBERS = `SELECT groups.groupname, contacts.firstname, contacts.lastname FROM group_members INNER JOIN groups ON group_members.group_id = groups.id INNER JOIN contacts ON contacts.id = group_members.member_id`
    Contacts.runDbAllCommand(DISPLAY_GROUP_MEMBERS)
  }

  static runDbCommand(command){
    db.serialize(function() {
      // Create table
      db.run(command, function(err,data) {
        if (err) {
          console.log(err)
        } else {
          console.log("Successful")
          console.log(data)
        }
      })
    })
  }

  static runDbAllCommand(command){
    db.serialize(function() {
      // Create table
      db.all(command, function(err,data) {
        if (err) {
          console.log(err)
        } else {
          console.log(data)
        }
      })
    })
  }
}

let replServer = repl.start({prompt:'> '})
replServer.context.Contacts = Contacts
