const searchInput = document.getElementById("searchInput"); 
const sortButton = document.getElementById("sortButton");
const sortButtonNum = document.getElementById("sortButtonNum"); 
const songList = document.getElementById("songList"); 
const calculateTotallisteners = document.querySelector("#calculateTotallisteners");
const totalDurationResult = document.querySelector("#totalDurationResult");


// Пошук
searchInput.addEventListener("input", () => {
    const filterValue = searchInput.value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "")
    const listItems = songList.getElementsByTagName("li");

    Array.from(listItems).forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(filterValue) ? "" : "none";
    });
});

// Назва
sortButton.addEventListener('click', () => {
    const listItems = Array.from(songList.getElementsByTagName("li"));
    listItems.sort((a, b) => a.textContent.localeCompare(b.textContent));

    songList.innerHTML = "";
    listItems.forEach(item => songList.appendChild(item));
});

sortButtonNum.addEventListener('click', () => {
    const listItems = Array.from(songList.getElementsByTagName("li"));
    listItems.sort((a, b) => b.textContent.localeCompare(a.textContent));

    songList.innerHTML = "";
    listItems.forEach(item => songList.appendChild(item));
});

// Рахунок
calculateTotallisteners.addEventListener("click", () => {
    const listItems = songList.getElementsByTagName("li");
    let total = 0;

    Array.from(listItems).forEach(item => {
        const listeners = parseInt(item.querySelector(".listeners").textContent);
        total += listeners;
    });

    totalDurationResult.textContent = `Total listeners: ${total}`;
});


// Лаба №4 редагування
songList.addEventListener("click", (event) => {
    if (event.target.classList.contains("editBtn")) {
        const li = event.target.closest("li");
        const nameP = li.querySelector(".songname");
        const listenersP = li.querySelector(".listeners");

        const newName = prompt("Edit song name:", nameP.textContent);
        const newListeners = prompt("Edit listeners:", listenersP.textContent);

        if (newName && newName.trim() !== "") {
            nameP.textContent = newName.trim();
        }

        if (newListeners && !isNaN(newListeners)) {
            if (parseInt(newListeners) < 0) {
                alert("Listeners cannot be negative");
                return;
            }
            listenersP.textContent = newListeners.trim();
        } else if (newListeners !== null) {
            alert("Listeners must be a number");
            return;
        }

    }
});


// Лаба №4 yjdbq tktvyn
const itemInput = document.getElementById("itemInput");
const addButton = document.getElementById("addButton");
const listenersInput = document.getElementById("listenersInput");

const defaultImage = "Linkin_Park.jpg";

addButton.addEventListener('click', () => {
    const songName = itemInput.value.trim();
    const listeners = listenersInput.value.trim();

    if (songName === "" || listeners === "") {
        alert("Please enter both song name and listeners");
        return;
    }

    if (isNaN(listeners)) {
        alert("Listeners must be a number");
        return;
    }

    if (isNaN(listeners) || listeners < 0) {
        alert("Listeners must be a positive number");
        return;
    }

    const newItem = document.createElement("li");
    const nameP = document.createElement("p");

    const img = document.createElement("img");
    img.src = defaultImage;
    img.alt = songName;
    img.className = "song-image";


    const editBtn = document.createElement("button");
    editBtn.className = "editBtn";
    editBtn.textContent = "Edit";

    newItem.appendChild(editBtn);

    nameP.className = "songname";
    nameP.textContent = songName;

    const listenersP = document.createElement("p");
    listenersP.className = "listeners";
    listenersP.textContent = listeners;

    newItem.appendChild(img);
    newItem.appendChild(nameP);
    newItem.appendChild(listenersP);

    songList.appendChild(newItem);

    itemInput.value = "";
    listenersInput.value = "";
});
