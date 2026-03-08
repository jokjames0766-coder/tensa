const form = document.getElementById("serviceForm");
const servicesList = document.getElementById("services");

async function loadServices() {
  const res = await fetch("/services");
  const services = await res.json();

  servicesList.innerHTML = "";

  services.forEach((service, index) => {
    const div = document.createElement("div")

    div.innerHTML = `
      <h3>${service.name}</h3>
      <p>${service.type}</p>
      <p>${service.description}</p>
      <p>${service.phone}</p>
      <p>${service.location}</p>
      <button onclick="deleteService(${index})">Delete</button>
      <hr>
     `;

     servicesList.appendChild(div);
   });
 }

 form.addEventListener("submit", aasync (e) => {
   e.preventDefault();

   const service = {
     name: document.getElementById("name").value,
     type: document.getElementById("type").value,
     description: document.getElementById("description").value,
     phone: document.getElementById("phone").value,
     location: document.getElementById("location").value,
  };

  await fetch("/services", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(service),
  });

  form.reset();
  loadServices();
});

async function deleteService(index) {
  await fetch("/services/" + index, {
    method: "DELETE",
  });

  loadServices();
}

loadServices();


















































