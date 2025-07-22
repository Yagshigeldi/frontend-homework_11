const BASE_URL = "https://dummyjson.com";
const wrapperEl = document.querySelector(".wrapper")
const btnEl = document.querySelector(".btn")
const loadingEl = document.querySelector(".loading")


let offset = 0
const limit = 4

btnEl.addEventListener("click", ()=>{
  offset++
  manageLoading("flex")
  fetchData("posts", createPosts, `?limit=${limit}&skip=${offset * limit}`,  manageLoading);
})

function createPosts(data) {
  const fragment = document.createDocumentFragment()
  data.posts.forEach((item) => {
    const cardEl = document.createElement("div")
    cardEl.classList.add("card")
    cardEl.innerHTML = `
    <h3>Title: ${item.title}</h3>
    <p>Body: ${item.body}</p>
    <p>Likes: ${item.likes}</p>
    <p>Dislokes: ${item.dislikes}</p>
    <p>Views: ${item.views}</p>
    <p>Total: ${item.total}</p>
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
  fetchData("posts", createPosts, `?limit=${limit}&skip=0`,manageLoading);
}