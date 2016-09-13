
const repl = require ('repl');
const sqlite = require ('sqlite3').verbose();

let file = 'address_book.db';
let db = new sqlite.Database(file);
var fs = require('fs')
var contactsJSON = JSON.parse(fs.readFileSync('contacts.json'))


let insertJSON = () => {



}

insertJSON();


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
}


//Contact.add();

//hapus kontak

//Contact.del("Ivan");

static update(first_name){
  for (let i =0;i<contactsJSON.length;i++){
    db.run (`UPDATE address_book set  first_name ="Ivan" where gender='pria'`, function(err){
      if (err){
        console.log(err);
      } else {
        console.log('UPDATE data');
      }
    })

  }
}
