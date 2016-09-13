const repl = require('repl')

class Contact {

  constructor(options) {
    this.firstname = options['firstname']
    this.lastname = options['lastname'] || null
    this.gender = options['gender'] || null
    this.birthdate = options['birthdate'] || null
    this.email = options['email'] || null
    this.address = options['address'] || null
    this.phone = options['phone'] || null
    this.company = options['company'] || null
    this.inserted = false
  }


  setDB(db){
    this.db = db
  }


  updateId(){
    let stmt = 'select * from contact order by id_contact desc limit 1'
    this.db.serialize(()=>{
      this.db.each(stmt,(err,row) =>{
        if (err) {
          console.log(err)
        } else{
          this.id_contact = row.id_contact
          this.inserted = true
        }
      })
    })
  }


  save(){
    let update_stmt = `UPDATE contact SET firstname = '${this.firstname}', lastname = '${this.lastname}', gender = ${this.gender}, birthdate = '${this.birthdate}', email = '${this.email}', address = '${this.address}', phone = '${this.phone}', company = '${this.company}' where id_contact = ${this.id_contact}`
    let insert_stmt = `INSERT INTO contact (firstname, lastname, gender, birthdate, email, address, phone, company) VALUES ('${this.firstname}', '${this.lastname}', ${this.gender}, '${this.birthdate}', '${this.email}', '${this.address}', '${this.phone}', '${this.company}')`
    this.db.serialize(()=>{
      if(!this.inserted){
      this.db.run(insert_stmt,(err)=>{
        if (err) {
          console.log(err)
        } else{
          this.updateId()
        }
      })
    } else {
      this.db.run(update_stmt,(err)=>{
        if (err) {
          console.log(err)
        }
      })
    }
    })
  }

  updateAddress(new_address,id_contact){
    let update_stmt = `UPDATE contact set address = '${new_address}' where id_contact = ${id_contact}`
    this.db.serialize(()=>{
      this.db.run(update_stmt,(err)=>{
        if (err) console.log(err)
      })
    })
  }

  deleteContact(id_contact){
    let delete_stmt = `DELETE FROM contact where id_contact = ${id_contact}`
    this.db.serialize(()=>{
      this.db.run(delete_stmt,(err)=>{
        if (err) console.log(err)
      })
    })
  }

  deleteGroup(id_group){
    let deletegroup_stmt = `DELETE FROM groups where id_group = ${id_group}`
    this.db.serialize(()=>{
      this.db.run(deletegroup_stmt,(err)=>{
        if (err) console.log(err)
      })
    })
  }


}
let replServer = repl.start({prompt:">"})
replServer.context.Contact = Contact
export default Contact
