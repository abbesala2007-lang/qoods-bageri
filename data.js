/* ===== Qoods Bakery — products (id, img, price) & cart ===== */
const PRODUCTS = [
  { id:"pistachio-baklava-platter", img:"img/baklava-platter.jpg", price:320 },
  { id:"mixed-baklava-box",         img:"img/baklava-mixed.jpg",   price:300 },
  { id:"classic-baklava-tray",      img:"img/baklava-tray.jpg",    price:260 },
  { id:"kunafa",                    img:"img/kunafa.jpg",          price:240 },
  { id:"basbousa",                  img:"img/basbousa.jpg",        price:220 },
  { id:"maamoul",                   img:"img/maamoul.jpg",         price:280 },
  { id:"ghraybeh",                  img:"img/ghraybeh.jpg",        price:240 },
  { id:"petitfour",                 img:"img/petitfour.jpg",       price:300 },
  { id:"barazek",                   img:"img/barazek.jpg",         price:220 },
  { id:"luxury-box",                img:"img/luxury-box.jpg",      price:380 },
];

const CART_KEY = "qoods_cart_v1";
const productById = id => PRODUCTS.find(p => p.id === id);
const getCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch(e){ return []; } };
const saveCart = c => { localStorage.setItem(CART_KEY, JSON.stringify(c)); updateCartBadge(); };
const round1 = n => Math.round(n * 10) / 10;

function addToCart(id, kg){
  const c = getCart();
  const e = c.find(x => x.id === id);
  if (e) e.kg = round1(e.kg + kg);
  else c.push({ id, kg: round1(kg) });
  saveCart(c);
}
function setKg(id, kg){
  const c = getCart();
  const e = c.find(x => x.id === id);
  if (!e) return;
  e.kg = Math.max(0.5, round1(kg));
  saveCart(c);
}
function removeFromCart(id){ saveCart(getCart().filter(x => x.id !== id)); }
function cartSubtotal(){ return getCart().reduce((s,x)=>{ const p=productById(x.id); return s + (p ? p.price * x.kg : 0); },0); }

function updateCartBadge(){
  const n = getCart().length;
  document.querySelectorAll("[data-cart-count]").forEach(el=>{
    el.textContent = n;
    el.style.display = n ? "inline-flex" : "none";
  });
}
document.addEventListener("DOMContentLoaded", updateCartBadge);
