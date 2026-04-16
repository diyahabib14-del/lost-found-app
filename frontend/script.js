const API = "https://lost-found-app-14xy.onrender.com";

// ADD ITEM
document.getElementById("itemForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const file = document.getElementById("image").files[0];
    let imageUrl = "";

    if (file) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("upload_preset", "vwc2caen");

        const res = await fetch("https://api.cloudinary.com/v1_1/dqw3uggee/image/upload", {
            method: "POST",
            body: fd
        });

        const data = await res.json();
        console.log("UPLOAD:", data);

        imageUrl = data.secure_url;
    }

    const item = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        type: document.getElementById("type").value,
        contact: document.getElementById("contact").value,
        image: imageUrl
    };

    await fetch(API + "/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
    });

    alert("Item Added 🚀");

    e.target.reset();
    loadItems();
});