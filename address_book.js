
const repl = require ('repl');
const sqlite = require ('sqlite3').verbose();
const schema = require ('validate');

let file = 'address_book.db';
let db = new sqlite.Database(file);
var fs = require('fs')
var contactsJSON = JSON.parse(fs.readFileSync('contacts.json'))
var groupsJSON = JSON.parse(fs.readFileSync('groups.json'))
var header_groupJSON = JSON.parse(fs.readFileSync('header_group.json'))

class Contact {
  constructor(component) {
    this.first_name = component['first_name'],
    this.last_name = component['last_name'],
    this.gender = component['gender'],
    this.email = component['email'],
    this.phone = component['phone']
  }


//tambah kontak
  static add(){
    for (let i =0;i<contactsJSON.length;i++){
      db.run (`INSERT INTO address_book (first_name, last_name, gender, email, phone) VALUES ('${contactsJSON[i].first_name}','${contactsJSON[i].last_name}','${contactsJSON[i].gender}','${contactsJSON[i].email}','${contactsJSON[i].phone}')`, function(err){
        if (err){
          console.log(err);
        } else {
          console.log('seed data');
        }
      })

    }

  }


  static del(first_name){
    for (let i =0;i<contactsJSON.length;i++){
      db.run (`DELETE FROM address_book where first_name='${first_name}'`, function(err){
        if (err){
          console.log(err);
        } else {
          console.log('delete data');
        }
      })

    }
  }


  static update(phone,first_name){

      db.run (`UPDATE address_book set  phone = '${phone}' where first_name = '${first_name}'`, function(err){
        if (err){
          console.log(err);
        } else {
          console.log('UPDATE data');
        }
      })


  }

}


class Header_Group {
  constructor(component) {
    this.header_group_id = component['header_group_id'],
    this.group_id = component['group_id'],
    this.user_id = component['user_id']
  }

  static add(){
    for (let i =0;i<header_groupJSON.length;i++){

      let query = `INSERT INTO header_group (group_id, user_id) VALUES ('${header_groupJSON[i].group_id}','${header_groupJSON[i].user_id}')`



      db.run (query, function(err){
        if (err){
          console.log(err);
        } else {
          console.log('add Header group data');
        }
      })
    }
  }
}



class Groups {
  constructor(component) {
    this.group_id = component['group_id'],
    this.group_name = component['group_name']
  }

  static add(){
    for (let i =0;i<groupsJSON.length;i++){
      db.run (`INSERT INTO groups ( group_name) VALUES ('${groupsJSON[i].group_name}')`, function(err){
        if (err){
          console.log(err);
        } else {
          console.log('add Groups  data');
        }
      })
    }
  }

  static del(firstname){

      db.run (`DELETE FROM address_book where first_name = '${firstname}' `, function(err){
        if (err){
          console.log(err);
        } else {
          console.log('del Groups  data');
        }
      })

  }

}

let replServer = repl.start({prompt:">"})
replServer.context.Header_Group = Header_Group
replServer.context.Contact = Contact
replServer.context.Groups = Groups
// Header_Group.add();
// Groups.add();

// CLASS header_group


//Contact.add();

//hapus kontak

//Contact.del("Ivan");

//select ab.first_name, g.group_name,hg.header_group_id from address_book ab, groups g, header_group hg where hg.group_id = g.group_id and hg.user_id = ab.user_id;
