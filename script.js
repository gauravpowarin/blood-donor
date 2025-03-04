import { db } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("donorForm");

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            let donor = {
                name: document.getElementById("name").value,
                bloodType: document.getElementById("bloodType").value,
                contact: document.getElementById("contact").value,
                weight: document.getElementById("weight").value,
                medications: document.getElementById("medications").value
            };

            try {
                await addDoc(collection(db, "donors"), donor);
                alert("Donor registered successfully!");
                form.reset();
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        });
    }

    if (document.getElementById("donorTable")) {
        loadDonorTable();
    }
});

async function loadDonorTable() {
    let tableBody = document.getElementById("donorTable");
    tableBody.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "donors"));
    querySnapshot.forEach((document) => {
        let donor = document.data();
        let row = tableBody.insertRow();
        row.insertCell(0).textContent = donor.name;
        row.insertCell(1).textContent = donor.bloodType;
        row.insertCell(2).textContent = donor.contact;
        row.insertCell(3).textContent = donor.weight;
        row.insertCell(4).textContent = donor.medications;

        let deleteCell = row.insertCell(5);
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.backgroundColor = "red";
        deleteButton.style.color = "white";
        deleteButton.style.border = "none";
        deleteButton.style.padding = "5px";
        deleteButton.style.cursor = "pointer";

        deleteButton.onclick = async function () {
            await deleteDoc(doc(db, "donors", document.id));
            loadDonorTable();
        };
        deleteCell.appendChild(deleteButton);
    });
}
