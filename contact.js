const form = document.getElementById("contactForm");
const statusMsg = document.getElementById("statusMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  statusMsg.innerHTML = `<p style="color:#06b6d4;">Sending message...</p>`;

  setTimeout(() => {
    statusMsg.innerHTML = `<p style="color:lightgreen;">✅ Message sent successfully!</p>`;
    form.reset();
  }, 1500);
});
