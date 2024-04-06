async function repos(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}/repos`)
    return response.json()
}

export {repos}