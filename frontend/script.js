const API = "https://lost-found-app-14xy.onrender.com";

// ADD ITEM
document.getElementById("itemForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const file = document.getElementById("image").files[0];
    let imageUrl = "";

    // Upload to Cloudinary
    if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "vwc2caen");

        const res = await fetch("https://api.cloudinary.com/v1_1/dqw3uggee/image/upload", {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        imageUrl = data.secure_url;
    }

    // Create item
    const item = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        type: document.getElementById("type").value,
        contact: document.getElementById("contact").value,
        image: imageUrl   // ✅ correct
    };

    // Send to backend
    await fetch(API + "/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
    });

    alert("Item Added 🚀");

    e.target.reset();
    loadItems();
});


// LOAD ITEMS
async function loadItems() {
    const res = await fetch(API + "/items");
    const data = await res.json();

    const itemsList = document.getElementById("itemsList");
    itemsList.innerHTML = "";

    data.forEach(item => {
        const div = document.createElement("div");

        div.innerHTML = `
            <strong>${item.title}</strong>
            (${item.type})<br>

            ${item.image ? `<img src="${item.image}" style="width:100%;margin-top:10px;">` : ""}

            <p>${item.description}</p>
            <small>📞 ${item.contact}</small><br>

            <button onclick="deleteItem('${item._id}')" style="background:red;color:white;margin-top:10px;">
                ❌ Delete
            </button>
        `;

        itemsList.appendChild(div);
    });
}


// DELETE ITEM
async function deleteItem(id) {
    await fetch(API + "/delete/" + id, {
        method: "DELETE"
    });

    loadItems();
}


// INITIAL LOAD
loadItems();