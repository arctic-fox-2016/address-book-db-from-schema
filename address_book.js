const repl = require("repl");
const sqlite = require("sqlite3").verbose();
let file = "addressbook.db";
let db = new sqlite.Database(file);

class System{
  static clearScreen(){
    let lines = process.stdout.getWindowSize()[1];
    for(let idx = 0; idx < lines; idx++) console.log("\r\n");
  }
  static printHead(text){
    console.log(text);
  }
  static printTitle(text){
    console.log("\n");
    console.log("========================");
    console.log(text);
  }
  static printProcess(text){
    console.log(`... ${text}`);
  }
}

class Contacts{
  constructor(property = {}){
    this._id = null;
    this._firstname = property["firstname"] || null;
    this._lastname = property["lastname"] || null;
    this._phone = property["phone"] || null;
    this._email = property["email"] || null;
    this._request_status = false;
    this._request_data = false;
  }

  set id(value){ this._id = value; }
  get id(){ return this._id; }
  set firstname(value){ this._firstname = value; }
  get firstname(){ return this._firstname; }
  set lastname(value){ this._lastname = value; }
  get lastname(){ return this._lastname; }
  set phone(value){ this._phone = value; }
  get phone(){ return this._phone; }
  set email(value){ this._email = value; }
  get email(){ return this._email; }
  set request_status(value){ this._request_status = value; }
  get request_status(){ return this._request_status; }
  set request_data(value){ this._request_data = value; }
  get request_data(){ return this._request_data; }

  define(property = {}){
    this.firstname = property["firstname"] || null;
    this.lastname = property["lastname"] || null;
    this.phone = property["phone"] || null;
    this.email = property["email"] || null;
    return true;
  }

  create(){
    let p = this;

    p.request_status = false;
    let QUERY = "CREATE TABLE IF NOT EXISTS contacts(contact_id INTEGER PRIMARY KEY AUTOINCREMENT, firstname VARCHAR(20) NOT NULL, lastname VARCHAR(20) NOT NULL, phone VARCHAR(15) NOT NULL, email VARCHAR(50) NOT NULL);";
    db.serialize(function(){
      db.run(QUERY);
      System.printProcess("table contacts created");
      p.request_status = true;
      return true;
    });
  }

  save(){
    let p = this;

    p.request_status = false;
    let QUERY = `INSERT INTO contacts(firstname, lastname, phone, email) VALUES ('${p.firstname}','${p.lastname}','${p.phone}','${p.email}');`;

    if(p.id){
      QUERY = `UPDATE contacts SET firstname='${p.firstname}', lastname='${p.lastname}', phone='${p.phone}', email='${p.email}' WHERE contact_id='${p.id}';`;
    }

    db.serialize(function(){
      db.run(QUERY, function(err){
        if(err){ console.log(err)
        } else if(p.id){
          System.printProcess("table contacts record updated");
          p.request_status = true;
          return true;
        } else {
          QUERY = `SELECT contact_id FROM contacts ORDER BY contact_id DESC LIMIT 1;`
          db.all(QUERY, function(err, result){
            p.id = result[0].contact_id
            System.printProcess("table contacts record inserted");
            p.request_status = true;
            return true;
          });
        }
      });
    });
  }

  select(){
    let p = this;

    p.request_data = false;
    p.request_status = false;
    let QUERY = `SELECT * FROM contacts;`;
    db.serialize(function(){
      db.all(QUERY, function(err, result){
        System.printProcess("table contacts get all record");
        p.request_status = true;
        p.request_data = result;
        return true;
      });
    });
  }

  delete(){
    let p = this;

    p.request_status = false;
    let QUERY = `DELETE FROM contacts WHERE contact_id = '${p.id}';`;
    db.serialize(function(){
      db.run(QUERY, function(err){
        if(err){ console.log(err);
        } else {
          System.printProcess("table contacts record deleted");
        }
        p.request_status = true;
        return true;
      });
    });
  }
}

class Groups{
  constructor(property = {}){
    this._id = null;
    this._group_name = property["group_name"] || null;
    this._request_status = false;
    this._request_data = false;
  }

  set id(value){ this._id = value; }
  get id(){ return this._id; }
  set group_name(value){ this._group_name = value; }
  get group_name(){ return this._group_name; }
  set request_status(value){ this._request_status = value; }
  get request_status(){ return this._request_status; }
  set request_data(value){ this._request_data = value; }
  get request_data(){ return this._request_data; }

  define(property = {}){
    this.group_name = property["group_name"] || null;
    return true;
  }

  create(){
    let p = this;

    p.request_status = false;
    let QUERY = "CREATE TABLE IF NOT EXISTS groups(group_id INTEGER PRIMARY KEY AUTOINCREMENT, group_name VARCHAR(30) NOT NULL);";
    db.serialize(function(){
      db.run(QUERY);
      System.printProcess("table groups created");
      p.request_status = true;
      return true;
    });
  }

  save(){
    let p = this;

    p.request_status = false;
    let QUERY = `INSERT INTO groups(group_name) VALUES ('${p.group_name}');`;

    if(p.id){
      QUERY = `UPDATE groups SET group_name='${p.group_name}';`;
    }

    db.serialize(function(){
      db.run(QUERY, function(err){
        if(err){ console.log(err)
        } else if(p.id){
          System.printProcess("table groups record updated");
          p.request_status = true;
          return true;
        } else {
          QUERY = "SELECT group_id FROM groups ORDER BY group_id DESC LIMIT 1;"
          db.all(QUERY, function(err, result){
            p.id = result[0].contact_id
            System.printProcess("table groups record inserted");
            p.request_status = true;
            return true;
          });
        }
      });
    });
  }

  select(){
    let p = this;

    p.request_data = false;
    p.request_status = false;
    let QUERY = `SELECT * FROM groups;`;
    db.serialize(function(){
      db.all(QUERY, function(err, result){
        System.printProcess("table groups get all record");
        p.request_status = true;
        p.request_data = result;
        return true;
      });
    });
  }

  delete(){
    let p = this;

    p.request_status = false;
    let QUERY = `DELETE FROM groups WHERE group_id = '${p.id}';`;
    db.serialize(function(){
      db.run(QUERY, function(err){
        if(err){ console.log(err);
        } else {
          System.printProcess("table groups record deleted");
        }
        p.request_status = true;
        return true;
      });
    });
  }
}

class ContactGroup{
  constructor(property = {}){
    this._id = false;
    this._contact_id = property["contact_id"] || null;
    this._group_id = property["group_id"] || null;
    this._request_status = false;
  }

  set id(value){ this._id = value; }
  get id(){ return this._id; }
  set contact_id(value){ this._contact_id = value; }
  get contact_id(){ return this._contact_id; }
  set group_id(value){ this._group_id = value; }
  get group_id(){ return this._group_id; }
  set request_status(value){ this._request_status = value; }
  get request_status(){ return this._request_status; }

  define(property = {}){
    this.contact_id = property["contact_id"] || null;
    this.group_id = property["group_id"] || null;
    return true;
  }

  create(){
    let p = this;

    this.request_status = false;
    let QUERY = "CREATE TABLE IF NOT EXISTS contact_group(contact_group_id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INT NOT NULL, group_id INT NOT NULL, FOREIGN KEY (contact_id) REFERENCES contacts(contact_id) ON UPDATE CASCADE ON DELETE CASCADE, FOREIGN KEY (group_id) REFERENCES groups(group_id) ON UPDATE CASCADE ON DELETE CASCADE);";
    db.serialize(function(){
      db.run(QUERY);
      System.printProcess("table contact_group created");
      p.request_status = true;
      return true;
    });
  }

  save(){
    let p = this;

    p.request_status = false;
    let QUERY = `INSERT INTO contact_group(contact_id, group_id) VALUES ('${p.contact_id}', '${p.group_id}');`;
    db.serialize(function(){
      db.run(QUERY, function(err){
        if(err){ console.log(err)
        } else {
          QUERY = "SELECT contact_group_id FROM contact_group ORDER BY contact_group_id DESC LIMIT 1;"
          db.all(QUERY, function(err, result){
            System.printProcess("table contact_group record inserted");
            p.id = result[0]["contact_group_id"];
            p.request_status = true;
            return true;
          });
        }
      });
    });
  }

  delete(){
    let p = this;

    p.request_status = false;
    let QUERY = `DELETE FROM contact_group WHERE contact_group_id = '${p.id}';`;
    db.serialize(function(){
      db.run(QUERY, function(err){
        if(err){ console.log(err);
        } else {
          System.printProcess("table contact_group record deleted");
        }
        p.request_status = true;
        return true;
      });
    });
  }

  select(){
    let p = this;

    p.request_data = false;
    p.request_status = false;
    let QUERY = `SELECT * FROM contact_group;`;
    db.serialize(function(){
      db.all(QUERY, function(err, result){
        System.printProcess("table contact_group get all record");
        p.request_status = true;
        p.request_data = result;
        return true;
      });
    });
  }
}

let contacts = new Contacts();
let groups = new Groups();
let contact_group = new ContactGroup();

class Address_Book{
  static createTable(){
    let p = this;
    System.printTitle("Task #1 CREATE TABLE");
    contacts.create();
    groups.create();
    contact_group.create();
    let request = setInterval(function(){
      if(contacts.request_status && groups.request_status && contact_group.request_status){
        clearInterval(request);
        p.insertRecord();
      }
    }, 500);
  }

  static getRecord(action){
    let p = this;
    System.printTitle("-- SELECT TABLE --");
    contacts.select();
    groups.select();
    contact_group.select();
    let request = setInterval(function(){
      if(contacts.request_status && groups.request_status && contact_group.request_status){
        console.log("\nContacts Data:");
        console.log(contacts.request_data);
        console.log("\nGroups Data:");
        console.log(groups.request_data);
        console.log("\nContact_Group Data:");
        console.log(contact_group.request_data);
        clearInterval(request);
        setTimeout(function(){
          if(action == 1){
            p.updateRecord();
          } else if(action == 2){
            p.deleteRecord();
          }
        }, 2000);
      }
    }, 500);
  }

  static insertRecord(){
    let p = this;
    System.printTitle("Task #2 INSERT RECORD");
    contacts.define({
      "firstname":"John",
      "lastname":"Doe",
      "phone":"+62 1234 567 890",
      "email":"john@doe.com"
    });
    groups.define({
      "group_name":"College Friend"
    });

    contacts.save();
    groups.save();

    let request = setInterval(function(){
      if(contacts.request_status && groups.request_status){
        contact_group.define({
          "contact_id":contacts.id,
          "group_id":groups.id
        });
        contact_group.save();
        clearInterval(request);
        request = setInterval(function(){
          if(contact_group.request_status){
            clearInterval(request);
            p.getRecord(1);
          }
        }, 500);
      }
    }, 500);
  }
  static updateRecord(){
    let p = this;
    System.printTitle("Task #3 UPDATE RECORD");
    contacts.email = "new_john@doe.com";

    contacts.save();
    let request = setInterval(function(){
      if(contacts.request_status){
        clearInterval(request);
        p.getRecord(2);
      }
    }, 500);
  }
  static deleteRecord(){
    let p = this;
    System.printTitle("Task #4 DELETE RECORD");

    groups.delete();
    let request = setInterval(function(){
      if(groups.request_status){
        clearInterval(request);
        p.getRecord(0);
      }
    }, 500);
  }
  static process(){
    System.clearScreen();
    System.printHead("tevinstein - digachandra");
    this.createTable();
  }
}
export default Address_Book;
