
function test() {
  document.querySelector(".formSection").style.display = "flex";
}
function shopcard() {
  document.querySelector(".formSection").style.display = "flex";
}
function closeForm() {
  document.querySelector(".formSection").style.display = "none";
}
function instagramcard() {
  document.getElementById("igAccount").style.display = "inline-flex";
}





document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm("service_sdpymmv", "template_smab3io", this)
    .then(() => {
      alert("Сообщение отправлено!");
      this.reset();
    }, (error) => {
      console.error("Email send error:", error);
      alert("Ошибка: " + error.text);
    });
});

