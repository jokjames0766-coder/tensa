async function loadServices(){

const res = await fetch("/services");

const services = await res.json();

const container = document.getElementById("services");

container.innerHTML="";

services.forEach((s,index)=>{

const card=document.createElement("div");

card.className="card";

card.innerHTML=`

<h3>${s.name}</h3>

<p><b>Service:</b> ${s.type}</p>

<p>${s.description}</p>

<p><b>Phone:</b> ${s.phone}</p>

<p><b>Location:</b> ${s.location}</p>

<p><b>Rating:</b> ⭐ ${s.rating}</p>

<button class="delete" onclick="deleteService('${s._id}')">Delete</button>

`;

container.appendChild(card);

});

}

async function addService(){

const name=document.getElementById("name").value;

const type=document.getElementById("type").value;

const description=document.getElementById("description").value;

const phone=document.getElementById("phone").value;

const location=document.getElementById("location").value;

const rating=document.getElementById("rating").value;

await fetch("/services",{

method:"POST",

headers:{"Content-Type":"application/json"},

body:JSON.stringify({name,type,description,phone,location,rating})

});

loadServices();

}

async function deleteService(id){
await fetch("/services/"+id,{method:"DELETE"});
loadServices();
}

function searchServices(){

const search=document.getElementById("search").value.toLowerCase();

const cards=document.querySelectorAll(".card");

cards.forEach(card=>{

if(card.innerText.toLowerCase().includes(search)){

card.style.display="block";

}else{

card.style.display="none";

}

});

}

loadServices();















































