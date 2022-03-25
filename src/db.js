class BancoDados {

  static postDb = [

  ]

  // static pushPost(post) {

  //   BancoDados.postDb.push(post)

  //   BancoDados.setLocalStorage()

  // }

  // static setLocalStorage() {

  //   const dbFormatado = JSON.stringify(BancoDados.postDb)

  //   localStorage.setItem("dbPosts", dbFormatado)
  // }

  // static getLocalStorage() {

  //   const dbJson = localStorage.getItem("dbPosts")

  //   if(typeof dbJson === "string") {

  //     const dbFormatado   =  JSON.parse(dbJson)

  //     BancoDados.postDb = dbFormatado 
      
  //     return BancoDados.postDb
  //   }
    
  //   else {
  //     return []
  //   }

  // }

  // static inicializandoBancoDados(){
  //   BancoDados.getLocalStorage()
  // }

}


// BancoDados.inicializandoBancoDados()
export {BancoDados}