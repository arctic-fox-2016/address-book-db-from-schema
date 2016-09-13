class Groups {
  static insert(group_name, db){
    let insert_stmt = `INSERT INTO groups (group_name) VALUES ('${group_name}')`
    db.serialize(()=>{
      db.run(insert_stmt,(err)=>{
        if (err) {
          console.log(err)
        }
      })
    })
  }


}

export default Groups
