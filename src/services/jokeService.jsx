


export const postJokeService = (inputJoke) => {
    const constructeObject =
    {
        "text": inputJoke,
        "told": false
    }


    fetch("http://localhost:8088/jokes/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(constructeObject)
        })
}