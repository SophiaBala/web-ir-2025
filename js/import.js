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

