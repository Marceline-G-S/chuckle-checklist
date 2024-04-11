


export const postJokeService = (inputJoke) => {
    const constructeObject =
    {
        "text": inputJoke,
        "told": false
    }


    return fetch("http://localhost:8088/jokes/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(constructeObject)
        })
}


export const putJoke = (editedJoke) => {
    return fetch(`http://localhost:8088/jokes/${editedJoke.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedJoke)
    })
}

export const deleteJoke = (jokeToDelete) => {
    return fetch(`http://localhost:8088/jokes/${jokeToDelete.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: null
    })
}