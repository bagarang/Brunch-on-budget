document.addEventListener("DOMContentLoaded", function() {
    // 1. Inject HTML Chatbot ke dalam halaman
    const chatHTML = `
        <div id="chat-container">
            <div id="chat-box">
                <div class="chat-header">
                    <span>💬 CS Brunch On Budget</span>
                    <span class="close-chat" onclick="toggleChat()">✖</span>
                </div>
                <div class="chat-messages" id="chat-messages">
                    <div class="message bot-msg">Halo! Mau tanya menu apa hari ini? 😊</div>
                </div>
                <div class="chat-input-area">
                    <input type="text" id="user-input" placeholder="Tanya menu/harga..." onkeypress="handleEnter(event)">
                    <button id="send-btn" onclick="sendMessage()">➤</button>
                </div>
            </div>
            <div id="chat-toggle-btn" onclick="toggleChat()">
                <span>Tanya Saya</span>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatHTML);
});

// 2. Database Menu & Logika Jawaban
const database = [
    {
        keywords: ["mandhi", "mandi", "kambing", "ayam", "arab"],
        reply: "🍚 <b>Nasi Mandhi:</b><br>- Ayam Single: 20k<br>- Ayam Group (3ptg): 100k<br>- Kambing Single: 50k<br>- Kambing Group (3ptg): 165k<br><i>(Semua Pre-Order)</i>"
    },
    {
        keywords: ["rice", "bowl", "teriyaki", "pokpok", "pok-pok", "pok pok"],
        reply: "🍲 <b>Rice Bowl (500ml):</b><br>- Chicken Teriyaki: 12k<br>- Pokpok BBQ Cheese: 12k<br>- Pokpok Cheeselava: 12k"
    },
    {
        keywords: ["sushi", "susi", "gimbab", "kimbab", "mentai"],
        reply: "🍣 <b>Sushi & Gimbab:</b><br>- Gimbab Mix: 28k<br>- Only Gimbab: 16k<br>- Sushi Mix: 20k-22k<br>- Paket Gift/Party tersedia mulai 65k s/d 125k."
    },
    {
        keywords: ["bento", "katsu", "roll", "box"],
        reply: "🍱 <b>Bento Box:</b><br>- Chicken Katsu: 15k<br>- Chicken Roll: 15k<br>- Pokpok BBQ Cheese: 15k"
    },
    {
        keywords: ["pempek", "tekwan", "palembang"],
        reply: "🐟 <b>Pempek & Tekwan:</b><br>- Pempek (Adaan/Selam/Kulit/Lenjer): 15k<br>- Tekwan: 17k"
    },
    {
        keywords: ["spageti", "spagheti", "spaghetti", "pasta", "mie"],
        reply: "🍝 <b>Spageti:</b><br>- BBQ Sauce: 10k<br>- Cheese Sauce: 10k"
    },
    {
        keywords: ["lokasi", "alamat", "dimana", "kirim", "ongkir"],
        reply: "Kami melayani sistem <b>PO (Pre-Order)</b>. Untuk info pengiriman dan alamat, silakan hubungi Admin ya."
    },
    {
        keywords: ["halo", "hi", "pagi", "siang", "sore", "malam", "test", "tes"],
        reply: "Halo kak! Ada yang bisa dibantu? Ketik nama menu untuk cek harga ya. 😊"
    }
];

// 3. Fungsi Logika Chat
function toggleChat() {
    const box = document.getElementById('chat-box');
    const btn = document.getElementById('chat-toggle-btn');
    if (box.style.display === 'flex') {
        box.style.display = 'none';
        btn.style.display = 'flex';
    } else {
        box.style.display = 'flex';
        btn.style.display = 'none';
    }
}

function handleEnter(e) {
    if (e.key === 'Enter') sendMessage();
}

function sendMessage() {
    const inputField = document.getElementById('user-input');
    const message = inputField.value.trim();
    if (message === "") return;

    // Tampilkan pesan user
    addMessage(message, 'user-msg');
    inputField.value = "";

    // Proses jawaban bot (Delay dikit biar natural)
    setTimeout(() => {
        const botResponse = getBotResponse(message.toLowerCase());
        addMessage(botResponse, 'bot-msg');
    }, 500);
}

function addMessage(text, className) {
    const chatContainer = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = `message ${className}`;
    div.innerHTML = text;
    chatContainer.appendChild(div);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function getBotResponse(input) {
    // Cek database kata kunci
    for (let item of database) {
        // Cek jika salah satu keyword ada di input user
        if (item.keywords.some(keyword => input.includes(keyword))) {
            return item.reply;
        }
    }

    // Jawaban default untuk "Absurd"/Tidak ditemukan
    return `Maaf, saya kurang paham "<b>${input}</b>". 🤔<br><br>
            Untuk pertanyaan detail atau order, silakan chat langsung ke Admin:<br>
            <a href="https://wa.me/6283161584348" target="_blank" style="color:#ff6f61; font-weight:bold; text-decoration:none;">
            📞 Chat WhatsApp Klik Disini</a>`;
}