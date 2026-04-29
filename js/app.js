function encrypt(text) {
    return btoa(text);
}

function decrypt(text) {
    return atob(text);
}

function resetPacket(type, text) {
    let packet = document.getElementById("packet");
    let packetText = document.getElementById("packetText");

    packet.style.display = "block";
    packet.className = "packet " + type;

    // 👇 PUT MESSAGE INSIDE PACKET
    packetText.innerText = text;

    packet.classList.remove("move");
    void packet.offsetWidth; // restart animation
    packet.classList.add("move");
}

// FLOW ANIMATION
function animateFlow(isSecure, data, original = "") {

    let user = document.getElementById("user");
    let browser = document.getElementById("browser");
    let server = document.getElementById("server");

    [user, browser, server].forEach(n => n.classList.remove("glow"));

    setTimeout(() => user.classList.add("glow"), 300);
    setTimeout(() => browser.classList.add("glow"), 900);
    setTimeout(() => server.classList.add("glow"), 1500);

    setTimeout(() => {

        if (!isSecure) {
            document.getElementById("result").innerHTML =
                "🔴 HTTP DATA (VISIBLE): " + data;

            document.getElementById("log").innerHTML =
                "⚠ Data can be intercepted!";
        } else {
            document.getElementById("result").innerHTML =
                "🟢 HTTPS ENCRYPTED: " + data +
                "<br>🔓 Decrypted: " + original;

            document.getElementById("log").innerHTML =
                "✔ Secure transmission complete!";
        }

    }, 2000);
}

// HTTP
function sendHTTP() {
    let msg = document.getElementById("msg").value;

    resetPacket("http-packet", msg);

    document.getElementById("log").innerHTML =
        "📡 Sending over HTTP...";

    animateFlow(false, msg);
}

// HTTPS
function sendHTTPS() {
    let msg = document.getElementById("msg").value;
    let encrypted = encrypt(msg);

    resetPacket("https-packet", encrypted);

    document.getElementById("log").innerHTML =
        "🔐 Encrypting data...";

    animateFlow(true, encrypted, msg);
}