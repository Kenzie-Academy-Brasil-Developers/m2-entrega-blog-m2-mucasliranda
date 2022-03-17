class Board {

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
      absolute.classList.add("none")
      cadastro.classList.add("none")
    })

    xmark[1].addEventListener("click", () => {
      absolute.classList.add("none")
      login.classList.add("none")
    })

  }

  

}

export {Board}