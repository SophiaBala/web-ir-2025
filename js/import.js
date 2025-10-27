const addButton = document.getElementById('addButton');
const itemInput = document.getElementById('itemInput');
const listenersInput = document.getElementById('listenersInput');
const songList = document.getElementById('songList');
const totalResult = document.getElementById('totalResult');
const sortButton = document.getElementById('sortButton');
const sortButtonNum = document.getElementById('sortButtonNum');

// count
function updateTotalListeners() {
    const listItems = songList.getElementsByTagName("li");
    let total = 0;

    Array.from(listItems).forEach(item => {
        if (item.style.display !== "none") {
            const listeners = parseInt(item.querySelector(".listeners")?.textContent);
            if (!isNaN(listeners) && listeners >= 0) {
                total += listeners;
            }
        }
    });

    totalResult.textContent = `Total listeners: ${total}`;
}

// +
async function loadSongs(sortType = null) {
    const res = await fetch('/api/songs');
    let songs = await res.json();

    // sort
    if (sortType === 'name') songs.sort((a, b) => a.name.localeCompare(b.name));
    if (sortType === 'listeners') songs.sort((a, b) => b.listeners - a.listeners);

    songList.innerHTML = '';

    songs.forEach(song => {
        const li = document.createElement('li');
        li.innerHTML = 
            `<p class="songname">${song.name}</p>
            <p class="listeners">${song.listeners}</p>
            <button class="editBtn" data-id="${song.id}">Edit</button>
            <button class="deleteBtn" data-id="${song.id}">Delete</button>`;
        songList.appendChild(li);
    });

    // del
    document.querySelectorAll('.deleteBtn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            if (confirm('Delete this song?')) {
                await fetch(`/api/songs/${id}`, { method: 'DELETE' });
                await loadSongs(sortType);
            }
        });
    });

    // ed
    document.querySelectorAll('.editBtn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            const li = e.target.closest('li');
            const nameP = li.querySelector('.songname');
            const listenersP = li.querySelector('.listeners');

            const newName = prompt("Enter new song name:", nameP.textContent);
            if (newName === null || newName.trim() === "") { alert("Invalid name"); return; }

            const newListeners = prompt("Enter new number of listeners:", listenersP.textContent);
            if (newListeners === null || isNaN(newListeners) || parseInt(newListeners) < 0) {
                alert("Listeners must be a non-negative number"); return;
            }

            await fetch(`/api/songs/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName.trim(), listeners: parseInt(newListeners) })
            });

            await loadSongs(sortType);
        });
    });

    updateTotalListeners();
}

// add
addButton.addEventListener('click', async () => {
    const name = itemInput.value.trim();
    const listeners = parseInt(listenersInput.value);

    if (!name || isNaN(listeners) || listeners < 0) {
        alert('Please enter a valid name and a non-negative number of listeners');
        return;
    }

    await fetch('/api/songs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, listeners })
    });

    itemInput.value = '';
    listenersInput.value = '';
    await loadSongs();
});

//search
searchInput.addEventListener("input", () => {
    const filterValue = searchInput.value.toLowerCase().trim().replace(/\s+/g, "");
    const listItems = songList.getElementsByTagName("li");

    Array.from(listItems).forEach(item => {
        const nameText = item.querySelector(".songname").textContent.toLowerCase().replace(/\s+/g, "");
        const listeners = parseInt(item.querySelector(".listeners").textContent);

        if (nameText.includes(filterValue)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });

    updateTotalListeners();
});

sortButton.addEventListener('click', () => loadSongs('name'));
sortButtonNum.addEventListener('click', () => loadSongs('listeners'));

loadSongs();
