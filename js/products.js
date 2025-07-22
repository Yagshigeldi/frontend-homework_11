const BASE_URL = "https://dummyjson.com";
const wrapperEl = document.querySelector(".wrapper")
const btnEl = document.querySelector(".btn")
const loadingEl = document.querySelector(".loading")


let offset = 0
const limit = 4

btnEl.addEventListener("click", ()=>{
  offset++
  manageLoading("flex")
  fetchData("products", createProducts, `?limit=${limit}&skip=${offset * limit}`,  manageLoading);
})

function createProducts(data) {
  const fragment = document.createDocumentFragment()
  data.products.forEach((item) => {
    const cardEl = document.createElement("div")
    cardEl.classList.add("card")
    cardEl.innerHTML = `
    <img src="${item.images[0]}" alt="">
    <h3>Title: ${item.title}</h3>
    <p>Category: ${item.category}</p>
    <p>Price: ${item.price}</p>
    <p>DiscountPercentage: ${item.discountPercentage}</p>
    <p>Rating: ${item.rating}</p>
    <p>Stock: ${item.stock}</p>
    <p>Brand: ${item.brand}</p>
    <p>Sku: ${item.sku}</p>
    <p>Weight: ${item.weight}</p>
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
  fetchData("products", createProducts, `?limit=${limit}&skip=0`,manageLoading);
}