const table = document.getElementById("clientTable");
const modal = document.getElementById("clientModal");
const form = document.getElementById("clientForm");
const message = document.getElementById("message");
let clientsCache = [];
let unusedCounter = 0; // Défaut volontaire : variable non utilisée (à corriger après l'analyse).

async function loadClients() {
    const response = await fetch("php/clients.php");
    const result = await response.json();
    clientsCache = result;
    displayClients(result);
}

function displayClients(clients) {
    table.innerHTML = "";
    clients.forEach(function(client) {
        table.innerHTML += `
            <tr>
                <td>${client.id}</td>
                <td>${client.nom}</td>
                <td>${client.email}</td>
                <td>${client.telephone}</td>
                <td>
                    <button class="action-edit" onclick="editClient(${client.id})">Modifier</button>
                    <button class="action-delete" onclick="deleteClient(${client.id})">Supprimer</button>
                </td>
            </tr>`;
    });
}

function validateClient(nom, email, telephone) {
    if (nom.trim() === "") {
        alert("Le nom est obligatoire");
        return false;
    }
    if (email.trim() === "") {
        alert("L'email est obligatoire");
        return false;
    }
    if (!email.includes("@")) {
        alert("L'email doit contenir @");
        return false;
    }
    if (telephone.trim() === "") {
        alert("Le téléphone est obligatoire");
        return false;
    }
    return true;
}

function resetForm() {
    form.reset();
    document.getElementById("clientId").value = "";
    document.getElementById("formTitle").textContent = "Ajouter un client";
}

async function editClient(id) {
    const client = clientsCache.find(item => Number(item.id) === Number(id));
    if (!client) return;
    document.getElementById("clientId").value = client.id;
    document.getElementById("nom").value = client.nom;
    document.getElementById("email").value = client.email;
    document.getElementById("telephone").value = client.telephone;
    document.getElementById("formTitle").textContent = "Modifier un client";
    modal.style.display = "flex";
}

async function deleteClient(id) {
    if (!confirm("Voulez-vous vraiment supprimer ce client ?")) return;
    const response = await fetch("php/delete_client.php", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id: id})
    });
    const result = await response.json();
    message.textContent = result.message;
    loadClients();
}

form.addEventListener("submit", async function(event) {
    event.preventDefault();
    const id = document.getElementById("clientId").value;
    const nom = document.getElementById("nom").value;
    const email = document.getElementById("email").value;
    const telephone = document.getElementById("telephone").value;

    if (!validateClient(nom, email, telephone)) return;

    const data = {nom: nom, email: email, telephone: telephone};
    let url = "php/add_client.php";
    if (id !== "") {
        data.id = Number(id);
        url = "php/edit_client.php";
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    const result = await response.json();
    message.textContent = result.message;
    modal.style.display = "none";
    resetForm();
    loadClients();
});

document.getElementById("openModal").addEventListener("click", function() {
    resetForm();
    modal.style.display = "flex";
});
document.getElementById("closeModal").addEventListener("click", function() {
    modal.style.display = "none";
});
loadClients();
