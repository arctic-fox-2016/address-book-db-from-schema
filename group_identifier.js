class Group_Identifier {

  static insert(id_group,id_contact,db){
    let insert_stmt = `INSERT INTO group_identifier (id_group,id_contact) VALUES ('${id_group}','${id_contact}')`
    db.serialize(()=>{
      db.run(insert_stmt,(err)=>{
        if (err) {
          console.log(err)
        }
      })
    })
  }
}

export default Group_Identifier
