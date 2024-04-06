import { getUser } from './services/user.js'
import { getRepositories } from './services/repositories.js'

import { user } from './objects/user.js'
import { screen } from './objects/screen.js'

document.getElementById('btn-search').addEventListener('click', () => {
    let userName = document.getElementById('input-search').value
    if (validateEmptyInput(userName)) return

    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    let userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if (validateEmptyInput(userName)) return

    if (isEnterKeyPressed) getUserData(userName)
})

async function getUserData(userName) {
    const userResponse = await getUser(userName)
    const repositoriesResponse = await getRepositories(userName)

    if(userResponse.message === "Not Found"){
        screen.renderNotFound()
        return
    }

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    screen.renderUser(user)

}

function validateEmptyInput(userName) {
    if (userName.length === 0) {
        alert('Insira um nome de usuário do GitHub')
        return true
    }
}
