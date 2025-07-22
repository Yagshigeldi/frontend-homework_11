const BASE_URL = "https://dummyjson.com";
const wrapperEl = document.querySelector(".wrapper")
const btnEl = document.querySelector(".btn")
const loadingEl = document.querySelector(".loading")


let offset = 0
const limit = 4

btnEl.addEventListener("click", ()=>{
  offset++
  manageLoading("flex")
  fetchData("recipes", createRecipes, `?limit=${limit}&skip=${offset * limit}`,  manageLoading);
})

function createRecipes(data) {
  const fragment = document.createDocumentFragment()
  data.recipes.forEach((item) => {
    const cardEl = document.createElement("div")
    cardEl.classList.add("card")
    cardEl.innerHTML = `
    <img src="${item.image}" alt="">
    <h3>Name: ${item.name}</h3>
    <p>PrepTimeMinutes: ${item.prepTimeMinutes}</p>
    <p>CookTimeMinutes: ${item.cookTimeMinutes}</p>
    <p>Servings: ${item.servings}</p>
    <p>Difficulty: ${item.difficulty}</p>
    <p>Cuisine: ${item.cuisine}</p>
    <p>CaloriesPerServing: ${item.caloriesPerServing}</p>
    <p>Rating: ${item.rating}</p>
    <p>ReviewCount: ${item.reviewCount}</p>
    `
    fragment.appendChild(cardEl)
  })
  wrapperEl.appendChild(fragment)
}

function manageLoading(type){
 loadingEl.style.display = type
}

function fetchData(endpoint, cl, query="", loading) {
  // url, options || return Promise
  fetch(`${BASE_URL}/${endpoint}${query}`, {
    method: "GET"
  })
  .then(res => {
    if(!res.ok){
      throw new Error("internal server error")
    }
    return res.json()
  })
  .then(data => {
    cl(data)
  })
  .catch(err => {
    console.error(err);
  })
  .finally(()=> {
   loading("none")
  })
}

window.onload = ()=>{
  fetchData("recipes", createRecipes, `?limit=${limit}&skip=0`,manageLoading);
}