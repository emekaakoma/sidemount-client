export const getBeltsRegistration = () => {
    return fetch("http://localhost:8000/belts")
        .then(response => response.json())
}