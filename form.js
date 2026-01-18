
let selectedItems = [];

// Открыть/закрыть корзину
function toggleCart() {
  const cart = document.querySelector(".formSection");
  cart.classList.toggle("open"); // класс open управляет display через CSS
}

// Закрыть корзину
function closeCart() {
  document.querySelector(".formSection").classList.remove("open");
}

// Закрытие по клику на фон
function closeByBg(e) {
  if (e.target.classList.contains("formSection")) {
    closeCart();
  }
}

// Выбор карточки
function selectCard(id) {
  const item = document.getElementById(id);
  item.style.display = "inline-flex";

  const title = item.querySelector("p").innerText;
  if (!selectedItems.includes(title)) {
    selectedItems.push(title);
  }

  updateBuyList();
}

// Удаление товара
function removeItem(id) {
  const item = document.getElementById(id);
  item.style.display = "none";

  const title = item.querySelector("p").innerText;
  selectedItems = selectedItems.filter(t => t !== title);

  updateBuyList();
}

// Обновление hidden input
function updateBuyList() {
  document.getElementById("buylist").value = selectedItems.join(", ");
}

// Отправка формы через EmailJS
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
emailjs.init("V6hMkDa_H4OTe4-KF");
  emailjs.sendForm("service_sdpymmv", "template_smab3io", this)
    .then(() => {
      alert("Сообщение отправлено!");
      this.reset();
      selectedItems = [];
      document.querySelectorAll(".itemDiv").forEach(el => el.style.display = "none");
      closeCart();
    }, (error) => {
      console.error("Email send error:", error);
      alert("Ошибка: " + error.text);
    });
});


// function test() {
//   document.querySelector(".formSection").style.display = "flex";
// }
// function test() {
//   document.querySelector(".formSection").classList.toggle("open");
// }
// function shopcard() {
//   document.querySelector(".formSection").style.display = "flex";
// }
// function closeForm() {
//   document.querySelector(".formSection").style.display = "none";
// }
// function selectCard(id) {
//   const item = document.getElementById(id);
//   item.style.display = "inline-flex";
// }
// function removeItem(id) {
//   document.getElementById(id).style.display = "none";

//   const card = document.querySelector(`[data-target="${id}"]`);
//   if(card) card.classList.remove("active");
// }
// function shopcard() {
//   const cart = document.querySelector(".formSection");

//   if (cart.style.display === "flex") {
//     cart.style.display = "none";
//   } else {
//     cart.style.display = "flex";
//   }
// }
// function shopcard() {
//   document.querySelector(".formSection").classList.toggle("open");
// }

// function closeForm() {
//   document.querySelector(".formSection").classList.remove("open");
// }

// function closeByBg(e) {
//   if (e.target.classList.contains("formSection")) {
//     closeForm();
//   }
// }
// document.getElementById("contactForm").addEventListener("submit", function(e) {
//   e.preventDefault();

//   emailjs.sendForm("service_sdpymmv", "template_smab3io", this)
//     .then(() => {
//       alert("Сообщение отправлено!");
//       this.reset();
//     }, (error) => {
//       console.error("Email send error:", error);
//       alert("Ошибка: " + error.text);
//     });
// });





