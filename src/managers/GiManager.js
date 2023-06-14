export const GetGi = () => {
    return fetch("http://localhost:8000/gis", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sm_token")}`
        }
    })
        .then(response => response.json())
}