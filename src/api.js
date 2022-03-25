import {Board} from "./board.js";
import { BancoDados } from "./db.js";
import {usuario} from "./script.js";

class Api {

  static async cadastro(dados, event) {

    await fetch("https://api-blog-m2.herokuapp.com/user/register", {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(response => {
      // console.log(response)
      if(response.status !== "error"){
        Board.limparForms(event)
      }
    })
    .catch(err => console.error(err));
  }

  static async login(dados, event) {
    // console.log(dados)
    await fetch("https://api-blog-m2.herokuapp.com/user/login", {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(response => {
      // console.log(response)
      if(response.status !== "error"){
        Board.limparForms(event)
      }
      Api.retornarUsuario(response)
    })
    .catch(err => console.error(err));
  }

  static async retornarUsuario(tokenAndId){
    await fetch(`https://api-blog-m2.herokuapp.com/user/${tokenAndId.userId}`, {
    "method": "GET",
    "headers": {
      "Authorization": `Bearer ${tokenAndId.token}`
    } 
    })
    .then(response => response.json())
    .then(response => {
      Board.logar(response)
      Board.logado = true
      // console.log(response)
      usuario.id    = response.id
      usuario.token = tokenAndId.token
      usuario.username = response.username
      usuario.email     = response.email
      usuario.avatarUrl = response.avatarUrl
      usuario.createdAt = response.createdAt

      Api.fillDb(tokenAndId.token)
      Board.mostrarPosts()
      // console.log(tokenAndId.token)
    })
    .catch(err => console.error(err));
  }

  static async sendPost(texto) {
    await fetch("https://api-blog-m2.herokuapp.com/post", {
      "method": "POST",
      "headers": {
        "Authorization": `Bearer ${usuario.token}`,
        "Content-Type": "application/json"
      },
      "body": JSON.stringify({
        "content" : texto
      })
    })
    .then(response => response.json())
    .then(response => {
      Board.lastPostId = response.id
      console.log(response.id)
    })
    .catch(err => console.error(err));

    
  }

  static async deletePost() {
    fetch("https://api-blog-m2.herokuapp.com/post/776be59f-94cc-4313-a891-dc697259b72a", {
      "method": "DELETE",
      "headers": {
        "Authorization": `Bearer ${usuario.token}`
      }
    })
  .then(response => console.log(response))
  .catch(err => console.error(err));
  }

  static async fillDb(token) {

    for(let i = 1; i <= 1; i++){

      fetch(`https://api-blog-m2.herokuapp.com/post?page=${i}`, {
        "method": "GET",
        "headers": {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(response => {return response.json()})
      .then(response => { 
        response.data.forEach( (each) => {
          BancoDados.postDb.push(each)
        })
        // console.log(BancoDados.postDb)
        // console.log(response)
      })
      .catch(err => console.error(err));

    }
    
  }

}

export {Api}