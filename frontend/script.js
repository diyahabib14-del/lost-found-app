const API = "https://lost-found-app-14xy.onrender.com";

async function addItem() {
    const data = {
        title: document.getElementById("title").value,
        description: document.getElementById("desc").value,
        type: document.getElementById("type").value,
        contact: document.getElementById("contact").value
    };

    await fetch(API + "/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    alert("Item Added");

    loadItems(); // refresh list
}

async function loadItems() {
    const res = await fetch(API + "/items");
    const items = await res.json();

    const list = document.getElementById("list");
    list.innerHTML = "";

    items.forEach(i => {
        list.innerHTML += `
            <div>
                <b>${i.title}</b> (${i.type})<br>
                ${i.description}<br>
                Contact: ${i.contact}
                <hr>
            </div>
        `;
    });
}

// Load items when page opens
window.onload = loadItems;