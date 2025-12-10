// Small shop: products, add-to-cart, cart persistence.
(function(){
  const products = [
    { id: 'p1', title: 'Продвижение Instagram', price: 399, img: '/Project1/Pictures/Ints.png' },
    { id: 'p2', title: 'Продвижение Facebook', price: 449, img: '/Project1/Pictures/fb.png' },
    { id: 'p3', title: 'SEO пакет для компании', price: 799, img: '/Project1/Pictures/company.png' },
    { id: 'p4', title: 'Бренд + дизайн', price: 999, img: '/Project1/Pictures/brand.png' }
  ];

  // small helper for DOM
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  const productsNode = $('#products');
  const cartNode = $('#cart');
  const openBtn = $('#open-cart');
  const closeBtn = $('#close-cart');
  const cartCount = $('#cart-count');
  const cartItemsNode = $('#cart-items');
  const totalNode = $('#cart-total');
  const clearBtn = $('#clear-cart');
  const checkoutBtn = $('#checkout');

  // render products
  function renderProducts(){
    productsNode.innerHTML = '';
    products.forEach(p => {
      const el = document.createElement('article');
      el.className = 'product';
      el.innerHTML = `
        <img src="${p.img}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p class="small">Короткое описание услуги — тестовый товар.</p>
        <div class="price-row">
          <div class="price">${p.price} грн</div>
          <button class="btn" data-add="${p.id}">В корзину</button>
        </div>
      `;
      productsNode.appendChild(el);
    });
  }

  // cart state persisted in localStorage
  const CART_KEY = 'msy_local_cart_v1';
  let cart = JSON.parse(localStorage.getItem(CART_KEY) || '{}');

  function save(){
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function updateCartUI(){
    // count
    const items = Object.values(cart).reduce((s, it)=> s + it.qty, 0);
    cartCount.textContent = items;

    // list
    cartItemsNode.innerHTML = '';
    Object.values(cart).forEach(it => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <img src="${it.item.img}" alt="${it.item.title}">
        <div class="meta">
          <strong>${it.item.title}</strong>
          <div class="small">${it.item.price} грн × <span class="qty">${it.qty}</span></div>
        </div>
        <div class="controls">
          <button data-inc="${it.item.id}">+</button>
          <button data-dec="${it.item.id}">−</button>
        </div>
      `;
      cartItemsNode.appendChild(li);
    });

    // total
    const total = Object.values(cart).reduce((s, it)=> s + it.item.price * it.qty, 0);
    totalNode.textContent = total;
  }

  function addToCart(id){
    const product = products.find(p=> p.id === id);
    if(!product) return;
    if(!cart[id]) cart[id] = { item: product, qty: 0 };
    cart[id].qty += 1;
    save();
    updateCartUI();
    openCart();
  }

  function changeQty(id, delta){
    if(!cart[id]) return;
    cart[id].qty += delta;
    if(cart[id].qty <= 0) delete cart[id];
    save();
    updateCartUI();
  }

  function clearCart(){ cart = {}; save(); updateCartUI(); }

  function openCart(){ cartNode.classList.add('open'); cartNode.setAttribute('aria-hidden', 'false'); }
  function closeCart(){ cartNode.classList.remove('open'); cartNode.setAttribute('aria-hidden', 'true'); }

  // event binding
  document.addEventListener('click', e => {
    const add = e.target.closest('[data-add]');
    if(add) { addToCart(add.getAttribute('data-add')); return; }

    const inc = e.target.closest('[data-inc]');
    if(inc){ changeQty(inc.getAttribute('data-inc'), 1); return; }

    const dec = e.target.closest('[data-dec]');
    if(dec){ changeQty(dec.getAttribute('data-dec'), -1); return; }

    if(e.target.id === 'open-cart'){ openCart(); }
    if(e.target.id === 'close-cart'){ closeCart(); }
    if(e.target.id === 'clear-cart'){ clearCart(); }
    if(e.target.id === 'checkout'){ alert('Спасибо! Заказ оформлен (демо).'); clearCart(); }
  });

  // open/close buttons
  openBtn.addEventListener('click', openCart);
  closeBtn.addEventListener('click', closeCart);

  // initial render
  renderProducts();
  updateCartUI();

})();
