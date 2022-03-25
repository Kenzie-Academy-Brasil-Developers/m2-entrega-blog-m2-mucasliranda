import {Board} from "./board.js";
import {Api} from "./api.js"


let usuario = {
  id        : "",
  token     : "", 
  username  : "", 
  email     : "", 
  avatarUrl : "", 
  createdAt : ""
}

let posts = []

Board.showModal()

document.querySelector("body").addEventListener("submit", (event) => {
  Board.capturarDados(event)
})

export {usuario}