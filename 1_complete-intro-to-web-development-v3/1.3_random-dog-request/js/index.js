const DOG_URL = 'https://dog.ceo/api/breeds/image/random ';
const dogsContainer = document.getElementById('dogs-container');
const dogButton = document.getElementById('fetch-dog')


// * Example of using promise *
// const getNewDog = () => {
//  const promise = fetch(DOG_URL);
 
//  promise
//     .then((res) => {
//         return res.json();
//     })
//     .then((json) => {
//         const img = document.createElement('img');
//         img.src = json.message
//         img.alt = 'good dog'
//         dogsContainer.appendChild(img)
//     })
//     .catch((err) => {
//         throw new Error(err)
//     })
// }

const getNewDog = async () => {
    const res = await fetch(DOG_URL);
    const json = await res.json();
    const img = document.createElement('img');
        img.src = json.message
        img.alt = 'good dog'
    dogsContainer.appendChild(img)
}

dogButton.addEventListener('click', getNewDog);
