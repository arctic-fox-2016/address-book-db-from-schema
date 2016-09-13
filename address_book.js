"use strict"
const fs = require('fs');
const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();
var file = 'address_book.db';
var db = new sqlite.Database(file);
let content = fs.readFileSync('contacts.json', 'utf8')
let parse = JSON.parse(content)

class Contacts {
  // constructor(property = {}) {
  //     this._firstName = property['firstname']
  //     this._lastName = property['lastname']
  //     this._telp = property['telp']
  //     this._email = property['email']
  //   }
  // set firstname(id, value) {
  //   var sfn = `update contacts set firstname = ${value} where id = ${id};`
  //   db.serialize(function () {
  //     db.run(sfn, function (err) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log('firstname updated !');
  //       }
  //     })
  //   })
  // }
  // get firstname(id) {
  //   var gfn = `select firstname from contacts where id = ${id};`
  //   db.serialize(function () {
  //     db.run(gfn, function (err) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log('First Name :=> \n');
  //       }
  //     })
  //   })
  // }
  // set lastname(id, value) {
  //   var sln = `update contacts set lastname = ${value} where id = ${id};`
  //   db.serialize(function () {
  //     db.run(sln, function (err) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log('lastname updated !');
  //       }
  //     })
  //   })
  // }
  // get lastname(id) {
  //   var gln = `select lastname from contacts where id = ${id};`
  //   db.serialize(function () {
  //     db.run(gln, function (err) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log('Last Name :=> \n');
  //       }
  //     })
  //   })
  // }
  // set telp(id, value) {
  //   var stelp = `update contacts set telp = ${value} where id = ${id};`
  //   db.serialize(function () {
  //     db.run(stelp, function (err) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log('Telephone updated !');
  //       }
  //     })
  //   })
  // }
  // get telp(id) {
  //   var gtelp = `select telp from contacts where id = ${id};`
  //   db.serialize(function () {
  //     db.run(gtelp, function (err) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log('Telephone :=> \n');
  //       }
  //     })
  //   })
  // }
  // set email(id, value) {
  //   var smail = `update contacts set email = ${value} where id = ${id};`
  //   db.serialize(function () {
  //     db.run(smail, function (err) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log('email updated !');
  //       }
  //     })
  //   })
  // }
  // get email(id) {
  //   var gmail = `select email from contacts where id = ${id};`
  //   db.serialize(function () {
  //     db.run(gtelp, function (err) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log('E-Mail :=> \n');
  //       }
  //     })
  //   })
  // }
  static insert(firstname, lastname, telp, email) {
    db.serialize(function () {
      var save = `insert into contacts (first_name,last_name,telp,email) values ('${firstname}','${lastname}','${telp}','${email}');`
      db.run(save, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('new contact saved !');
        }
      })
    })
  }

  static newestContact() {

    db.serialize(function () {
      var newest = `select id from contacts order by id desc limit 1;`
      var rest = ""
      db.all(newest, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          rest += result[0]["id"]
            // console.log(`newest = ${rest}`);
            // console.log(typeof (rest));
          return rest
        }
      })
    })

  }
  static search(id) {
    db.serialize(function () {
      var search = `select * from contacts where id = ${id};`
      db.each(search, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log('Contact found : \n');
          console.log(result);
        }
      })
    })
  }
  static saveJson() {

    for (let i = 0; i < parse.length; i++) {
      Contacts.insert(parse[i].firstname, parse[i].lastname, parse[i].telp, parse[i].email)
    }
  }
  static deleteContact(id) {
    db.serialize(function () {
      var deletec = `delete from contacts where id = ${id};`
      db.run(deletec, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`Contact deleted !`);
        }
      })
    })
  }
  static viewAllContacts() {
    db.serialize(function () {
      let view = `select * from contacts;`
      db.all(view, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          for (let i = 0; i < result.length; i++) {
            console.log(`id : ${result[i].id}\t name: ${result[i].first_name} ${result[i].last_name}`);
          }
        }
      })
    })
  }
  static editEmailContact(id, email) {
    db.serialize(function () {
      var editemail = `update contacts set email = "${value}" where id = ${id};`
      db.run(editemail, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`Email updated !`);
        }
      })
    })
  }


}


class Groups {
  static insertGroups(value) {
    db.serialize(function () {
      let temp = `insert into groups (groupname) values ('${value.groupname}');`
      db.run(temp, function (err) {
        if (err) {
          console.log('insert group eror');
          console.log(err)
        } else {
          console.log("New Group Added")
        }
      })
    })
  }

  static groupSaveJson() {
    let data = JSON.parse(fs.readFileSync("group.json", "utf8"))
    for (let i = 0; i < data.length; i++) {
      Groups.insertGroups(data[i])
    }
  }

  static searchIdGroup(groupname) {
    let search = `select id from groups where groupname = '${groupname}';`
    db.serialize(function () {
      db.all(search, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          return result[0]['id']
            // console.log(`searchidgrup = ${result[0]['id']}`);
        }
      })
    })
  }

  static viewAllGroup() {
    db.serialize(function () {
      let view = `select * from groups;`
      db.all(view, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          for (let i = 0; i < result.length; i++) {
            console.log(`id : ${result[i].id}\t Grup name: ${result[i].groupname}`);
          }
        }
      })
    })
  }
}


class AddressBook {
  static insertTableTR(contact_id, group_id) {
    var temp = `insert into tr_contact_group (contact_id, group_id) values (
        '${contact_id}', '${group_id}');`
    db.serialize(function () {
      db.run(temp, function (err) {
        if (err) {
          console.log(err)
        } else {
          console.log("New TR data added")
        }
      })
    })
  }

  static newContact(first_name, last_name, telp, email, groupname) {
    Contacts.insert(first_name, last_name, telp, email)
    var id_contact = Contacts.newestContact()
    var id_group = Groups.searchIdGroup(groupname)
      // console.log(`${id_contact} ========= ${id_group}`);
    AddressBook.insertTableTR(id_contact, id_group)

  }

  static viewAllAddressBook() {
    var temp = `select a.id, a.first_name, a.last_name, c.groupname from contacts a left join tr_contact_group b on a.id = b.contact_id left join groups c on b.group_id = c.id;`
    db.serialize(function () {
      db.all(temp, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          for (let i = 0; i < result.length; i++) {
            console.log(`id : ${result[i].id}\t  Name: ${result[i].first_name} ${result[i].last_name} || ${result[i].groupname}`);
          }
        }
      })
    })
  }
}

let replServer = repl.start({
  prompt: "hello > "
})

replServer.context.groupSaveJson = Groups.groupSaveJson
replServer.context.viewAllGroup = Groups.viewAllGroup
replServer.context.insertGroups = Groups.insertGroups

replServer.context.search = Contacts.search
replServer.context.viewAllContacts = Contacts.viewAllContacts
replServer.context.deleteContact = Contacts.deleteContact
replServer.context.editEmailContact = Contacts.editEmailContact

replServer.context.insertAddressBook = AddressBook.insertAddressBook
replServer.context.viewAllAddressBook = AddressBook.viewAllAddressBook
replServer.context.newContact = AddressBook.newContact
  //
  // SELECT COUNT( * )
  // FROM congress_members a
  // INNER JOIN votes b
  // ON a.id = b.politician_id AND a.id = '524';
