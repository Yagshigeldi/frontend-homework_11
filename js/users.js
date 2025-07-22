const BASE_URL = "https://dummyjson.com";
const wrapperEl = document.querySelector(".wrapper")
const btnEl = document.querySelector(".btn")
const loadingEl = document.querySelector(".loading")


let offset = 0
const limit = 4

btnEl.addEventListener("click", ()=>{
  offset++
  manageLoading("flex")
  fetchData("users", createUsers, `?limit=${limit}&skip=${offset * limit}`,  manageLoading);
})

function createUsers(data) {
  const fragment = document.createDocumentFragment()
  data.users.forEach((item) => {
    const cardEl = document.createElement("div")
    cardEl.classList.add("card")
    cardEl.innerHTML = `
    <img src="${item.image}" alt="">
    <h3>FirstName: ${item.firstName}</h3>
    <h3>LastName: ${item.lastName}</h3>
    <p>Age: ${item.age}</p>
    <p>Gender: ${item.gender}</p>
    <p>Email: ${item.email}</p>
    <p>Phone: ${item.phone}</p>
    <p>Username: ${item.username}</p>
    <p>Password: ${item.password}</p>
    <p>BirthDate: ${item.birthDate}</p>
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
  fetchData("users", createUsers, `?limit=${limit}&skip=0`,manageLoading);
}