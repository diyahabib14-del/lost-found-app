const API = "https://lost-found-app-14xy.onrender.com";

document.getElementById("itemForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const file = document.getElementById("image").files[0];

    let imageUrl = "";

    if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "unsigned_upload");

        const res = await fetch("https://api.cloudinary.com/v1_1/dqw3uggee/image/upload", {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        imageUrl = data.secure_url;
    }

    const item = {
        title: title.value,
        description: description.value,
        type: type.value,
        contact: contact.value,
        image: String
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