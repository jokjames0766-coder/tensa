let services = []

async function loadServices() {
  const res = await fetch("/api/services");
  services = await res.json();
  displayServices(servies);
}

function displayServices(list) {
  const container = document.getElementById("services");
  container.innerHTML = "";

  list.forEach(service => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML =
      <h3>${service.worker} - ${service.name}</h3>
      <p>${service.description}</p>
      <p>${service.rating}</p>
      <p>${service.location}</p>
      <p>${service.phone}</p>
      <a href="tel:${service.phone}">
        <button>Call</button>
      </a>
    `;

    container.appendChild(card);
  });
}


async function addService() {
 const worker = document.getElementById("worker").value;
 const name = document.getElementById("name").value;
 const description = document.getElementById("description").value;
 const phone = document.getElementById("phone").value;
 const location = document.getElementById("location").value;

 if (!worker || !name || !description || !phone || !location) return;

  await fetch("/api/services", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, description, phone })
  });

  document.getElementById("worker").value = "";
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("location").value = "";
  document.getElementById("rationg: 5").value = "";

  loadServices();
}

document.getElementById("addBtn").addEventListener("click", addService);

document.getElementById("search").addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();

  const filtered = services.filter(s =>
    s.name.toLowerCase().includes(term) ||
    s.description.toLowerCase().includes(term)
  );

  displayServices(filtered);
});

loadServices();
















