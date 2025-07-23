// Toggle Theme
function toggleTheme() {
    const body = document.body;
    const btn = document.querySelector('.toggle-theme');
    body.classList.toggle('dark');
    btn.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
}

// On Page Load, Apply Saved Theme
window.onload = () => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark');
        document.querySelector('.toggle-theme').textContent = '☀️';
    }
};

// Flip Card
function flipCard(el) {
    el.querySelector('.card-inner').classList.toggle('flipped');
}

// Add Card
function addCard() {
    const name = document.getElementById('username').value.trim();
    const age = document.getElementById('age').value.trim();
    const front = document.getElementById('front').value.trim();
    const back = document.getElementById('back').value.trim();

    if (!front || !back) {
        showPopup("Please fill in both front and back messages.");
        return;
    }

    const cardGrid = document.querySelector('.cards-grid');

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-inner" onclick="flipCard(this.parentElement)">
            <div class="card-front">
                <strong>${name ? name + (age ? ` (${age})` : '') : 'New Card'}</strong><br>${front}
            </div>
            <div class="card-back">
                <p>${back}</p>
                <div class="actions">
                    <button onclick="saveCard(event)">⭐ Save</button>
                    <button onclick="shareCard(event)">🔗 Share</button>
                    <button onclick="deleteCard(event)">🗑️ Delete</button>
                </div>
            </div>
        </div>
    `;

    cardGrid.appendChild(card);
    document.getElementById('username').value = '';
    document.getElementById('age').value = '';
    document.getElementById('front').value = '';
    document.getElementById('back').value = '';

    showPopup("Your Clarity Card has been added 💖");
}

// Delete Card
function deleteCard(e) {
    e.stopPropagation();
    const card = e.target.closest('.card');
    card.remove();
    showPopup("Card deleted successfully 🗑️");
}

// Save Card
function saveCard(e) {
    e.stopPropagation();
    showPopup("Card saved to your collection ⭐");
}

// Share Card
function shareCard(e) {
    e.stopPropagation();
    showPopup("Share link copied to clipboard 🔗");
}

// Show Popup
function showPopup(msg) {
    const popup = document.getElementById('popupModal');
    const message = document.getElementById('popupMessage');
    popup.classList.remove('hidden');
    message.textContent = msg;

    document.getElementById('popupClose').onclick = () => {
        popup.classList.add('hidden');
    };

    setTimeout(() => {
        popup.classList.add('hidden');
    }, 3000);
}
