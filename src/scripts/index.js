import {user} from './services/user.js'
import {repos} from './services/repositories.js'

document.getElementById('btn-search').addEventListener('click', () => {
    let userName = document.getElementById('input-search').value
    getUserProfile(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    let userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if (isEnterKeyPressed) getUserProfile(userName)
})

function getUserProfile(userName) {
    user(userName).then(userData => {
        let userInfo = `<div class="info">
                            <img src="${userData.avatar_url}" alt="Foto de perfil" />
                                <div class="data">
                                <h1>${userData.name ?? "Não possui nome cadastrado"}</h1>
                                <p>${userData.bio ?? "Não possui bio cadastrada"} </p>
                                </div>
                        </div>`
        document.querySelector('.profile-data').innerHTML = userInfo
        getUserRepositories(userName)
    })
}

function getUserRepositories(userName) {
    repos(userName).then(reposData => {
        let repositoriesItens = ''
        reposData.forEach(repo => {
            repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`

        })
        document.querySelector('.profile-data').innerHTML += `<h2>Repositórios</h2>
                                                                <div class="repositories section">
                                                                 <ul>${repositoriesItens}</ul
                                                                </div>`
    })
}