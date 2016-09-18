"use strict"
const repl = require('repl');
const sqlite = require('sqlite3').verbose();
let validator = require('validator');

let file = 'address_book.db'
let db = new sqlite.Database(file)

class Contacts {
  static addContact(firstname, lastname, phone, email, address) {

    if (validator.isEmail(email)) {
      if (validator.isNumeric(phone) && phone.length <= 12 && phone.length >=10) {

        let DISPLAY_TABLE = `SELECT * FROM contacts`
        db.all(DISPLAY_TABLE, function(err, data) {
          if (err) {
            console.log(err)
          } else {
            for (let i = 0; i < data.length; i++) {
              if (data[i].email == email) {
                console.log("Email not unique")
                return
              }
            }
            let ADD_STUDENT = `INSERT INTO contacts (firstname, lastname, phone, email, address) VALUES ('${firstname}', '${lastname}', '${phone}', '${email}', '${address}')`
            Contacts.runDbCommand(ADD_STUDENT)
          }
        })

      } else {
        console.log("Wrong phone format.")
      }
    } else {
      console.log("Wrong email format")
    }
  }

  static deleteContact(id) {
    let DELETE_STUDENT = `DELETE FROM student WHERE id = ${id}`
    Contacts.runDbCommand(DELETE_STUDENT)
  }

  static displayTable(table_name) {
    let DISPLAY_TABLE = `SELECT * FROM ${table_name}`
    db.all(DISPLAY_TABLE, function(err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log(data)
      }
    })
  }

  static displayContactByName(firstname, lastname) {
    let DISPLAY_STUDENT_BY_NAME = `SELECT * FROM student WHERE firstname LIKE '${firstname}' AND lastname LIKE '${lastname}'`
    db.all(DISPLAY_STUDENT_BY_NAME, function(err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log(data)
      }
    })
  }

  static editAddress(id, newAddress){
    let EDIT_ADDRESS = `UPDATE student SET address = '${newAddress}' WHERE id = '${id}'`
    db.all(EDIT_ADDRESS, function(err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log(data)
        return data
      }
    })
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
    db.all(DISPLAY_GROUP_MEMBERS, function(err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log(data)
      }
    })
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
}

let replServer = repl.start({prompt:'> '})
replServer.context.Contacts = Contacts
