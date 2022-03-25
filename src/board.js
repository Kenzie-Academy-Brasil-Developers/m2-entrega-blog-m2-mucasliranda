import {Api} from "./api.js"
import {usuario} from "./script.js";
import {BancoDados} from "./db.js"

class Board {

  static logado      = false

  static lastPostId  = 0

  static showModal() {

    const loginBtt     = document.getElementById("loginBtt")
    const cadastroBtt  = document.getElementById("cadastroBtt")

    const absolute  = document.getElementById("absolute")
    const cadastro  = document.getElementById("cadastro")
    const login     = document.getElementById("login")

    const xmark     = document.getElementsByClassName("fa-solid fa-xmark")
    

    loginBtt.addEventListener("click", () => {
      absolute.classList.remove("none")
      login.classList.remove("none")
    })

    cadastroBtt.addEventListener("click", () => {
      absolute.classList.remove("none")
      cadastro.classList.remove("none")
    })

    xmark[0].addEventListener("click", () => {
      // absolute.classList.add("none")
      // cadastro.classList.add("none")
      Board.fecharCadastro()
    })

    xmark[1].addEventListener("click", () => {
      // absolute.classList.add("none")
      // login.classList.add("none")
      Board.fecharLogin()
    })

  }

  static fecharCadastro() {
    const absolute  = document.getElementById("absolute")
    const cadastro  = document.getElementById("cadastro")


    absolute.classList.add("none")
    cadastro.classList.add("none")
  }

  static fecharLogin() {
    const absolute  = document.getElementById("absolute")
    const login     = document.getElementById("login")

    absolute.classList.add("none")
    login.classList.add("none")
  }

  static limparForms(event) {

    for(let i = 0; i < event.target.length - 1; i++ ){
      event.target[i].value = ""
    }

  }

  static logar(dados) {
    document.getElementById("fotoUsuario").src       = dados.avatarUrl
    document.getElementById("nomeUsuario").innerText = dados.username
    Board.fecharLogin()
    Board.mostrarPosts()
  }

  static async capturarDados(event) {
    event.preventDefault()

    if(event.target.name == "cadastro"){
      const dados = event.target
  
      let cadastroDados  = {
      username : dados[0].value,
      email    : dados[1].value,
      avatarUrl: dados[2].value,
      password : dados[3].value
      }
  
      Api.cadastro(cadastroDados, event)
    }

    else if(event.target.name == "login"){
      const dados = event.target
  
      let loginDados  = {
      email    : dados[0].value,
      password : dados[1].value
      }
  
      Api.login(loginDados, event)
    }

    else if(event.target.name == "postar"){
      const dados = event.target

      Board.mandarPostpDb(dados[0].value)
    }
    
  }

  static async criarPost(post) {
    const postContainer = document.querySelector("#postContainer")
    let postCard   = document.createElement("section")

    postCard.innerHTML = `
      <div>
        <img src="${post.dadosUsuario.avatarUrl}" >
      </div>

      <div>
        <h2>${post.dadosUsuario.username}</h2>
        <p>${post.post}</p>
      </div>  

    `

    if(post.dadosUsuario.id === usuario.id){
      let dados = document.createElement("div")

      dados.innerHTML = `
        <button class="editar">Editar</button>
        <button class="apagar">Apagar</button>
        <span class="data" >05/02/2022 </span>
      `

      dados.classList.add("dados")
      postCard.appendChild(dados)
    }

    await Api.sendPost(post.post)
    postCard.classList.add("post")
    postCard.id = Board.lastPostId

    postContainer.appendChild(postCard)
    
  }

  // static mandarPostpDb(dados) {

  //   if(Board.logado){ 
  //     let post = {
  //       post : dados ,
  //       dadosUsuario : usuario
  //     }

  //     // BancoDados.pushPost(post)
  //     Board.criarPost(post)
  //     // console.log(BancoDados.postDb)
  //   }

  // }

  static async mostrarPosts() {

    await Api.fillDb()
    
    console.log(BancoDados.postDb)

    BancoDados.postDb.forEach( (each) => {
      Board.criarPost(each)
    })

  }

  static setButtons() {
    let deleteButton = document.getElementsByClassName("data")

    deleteButton.forEach( (each) => { 
      console.log(each.target)
    });
  }

}

export {Board}