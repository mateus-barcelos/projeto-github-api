const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                            <img src="${user.avatarUrl}" alt="Foto de perfil" />
                                <div class="data">
                                <h1>${user.name ?? "Não possui nome cadastrado"}</h1>
                                <p>${user.bio ?? "Não possui bio cadastrada"} </p><br>
                                <p>Seguidores: ${user.followers}</p>
                                <p>Seguindo: ${user.following}</p>
                                </div>
                        </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" 
        target="_blank">${repo.name}<br><br><span>🍴${repo.forks_count}</span>
                                        <span>⭐${repo.stargazers_count}</span>
                                        <span>👀${repo.watchers_count}</span>
                                        <span>👩‍💻${repo.language}</span></a></li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<h2>Repositórios</h2>
                                                <div class="repositories section">
                                                     <ul>${repositoriesItens}</ul>
                                                </div>`
                                                
        }
       
        let eventsItens = ''
        user.lastEvents.forEach(event => {
           if(event.payload.commits && event.payload.commits.length > 0){
            eventsItens += `<li><span id="event-repo">${event.repo.name}</span> -${event.payload.commits[0].message}</li>`
           }
        })

        if (user.lastEvents.length > 0 ){
            this.userProfile.innerHTML += `<h2>Últimas atividades</h2><br>
                                            <ul>${eventsItens}</ul>`
        }
    },
    renderNotFound(){
        this.userProfile.innerHTML = '<h3>Usuário não encontrado</h3>'
    }
}

export { screen }