fetch("clients.json")
  .then((r) => r.json())
  .then((list) => {
    const tbody = document.querySelector("#clients tbody");
    list.forEach((c) => {
      const tr = document.createElement("tr");
      tr.innerHTML = "<td>" + c.nom + "</td><td>" + c.email + "</td>";
      tbody.appendChild(tr);
    });
  });

document.getElementById("clientForm").addEventListener("submit", (e) => {
  const nom = document.getElementById("nom").value.trim();
  const email = document.getElementById("email").value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const error = document.getElementById("error");
  if (nom.length < 2) {
    e.preventDefault();
    error.textContent = "Nom invalide";
  } else if (!regex.test(email)) {
    e.preventDefault();
    error.textContent = "Email invalide";
  }
});
