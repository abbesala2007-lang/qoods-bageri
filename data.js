/* ===== Qoods Bageri — products & cart =====
   type "kg"      -> sold by weight; total = round(price * kg); step/min in kg; wholeOnly = 1kg steps
   type "package" -> sold per package/bag; total = price * qty (integer); weight = label
*/
const PRODUCTS = [
  { id:"baklava-cashew",  img:"img/baklava-cashew.jpg",  type:"package", price:90, weight:"500 g" },
  { id:"hariseh",         img:"img/hariseh.jpg",         type:"package", price:80, weight:"500 g" },
  { id:"barazek",         img:"img/barazek.jpg",         type:"package", price:39, weight:"200 g" },
  { id:"turkish-baklava", img:"img/turkish-baklava.jpg", type:"kg", price:209, step:0.5, min:0.5 },
  { id:"baklava-platter", img:"img/baklava-platter.jpg", type:"kg", price:279, step:0.5, min:0.5 },
  { id:"baklava-box",     img:"img/baklava-box.jpg",     type:"kg", price:259, step:0.5, min:0.5 },
  { id:"baklava-luxury",  img:"img/baklava-luxury.jpg",  type:"kg", price:350, step:1,   min:1, wholeOnly:true },
  { id:"maamoul",         img:"img/maamoul.jpg",         type:"kg", price:159, step:0.5, min:0.5 },
  { id:"petitfour",       img:"img/petitfour.jpg",       type:"kg", price:159, step:0.5, min:0.5 },
  { id:"kunafe",          img:"img/kunafe.jpg",          type:"kg", price:200, step:0.5, min:0.5, pickupOnly:true },
  { id:"ghureyba",        img:"img/ghureyba.jpg",        type:"kg", price:159, step:0.5, min:0.5 },
  { id:"sesame-cookies",  img:"img/sesame-cookies.jpg",  type:"package", price:30, weight:"400 g", bag:true },
];

const CART_KEY = "qoods_cart_v2";
const productById = id => PRODUCTS.find(p => p.id === id);
const round0 = n => Math.round(n);
const round1 = n => Math.round(n * 10) / 10;

// line total for a product given quantity (kg or package count)
function lineTotal(p, qty){ return p.type === "kg" ? round0(p.price * qty) : p.price * qty; }
// smallest orderable quantity for a product
function minQty(p){ return p.type === "kg" ? (p.min || 0.5) : 1; }
function stepQty(p){ return p.type === "kg" ? (p.step || 0.5) : 1; }
function clampQty(p, q){
  const step = stepQty(p), min = minQty(p);
  let n = Math.round(q / step) * step;
  n = Math.max(min, n);
  return p.type === "kg" ? round1(n) : Math.round(n);
}

const getCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch(e){ return []; } };
const saveCart = c => { localStorage.setItem(CART_KEY, JSON.stringify(c)); updateCartBadge(); };

function addToCart(id, qty){
  const p = productById(id); if(!p) return;
  const c = getCart();
  const e = c.find(x => x.id === id);
  if (e) e.qty = clampQty(p, e.qty + qty);
  else c.push({ id, qty: clampQty(p, qty) });
  saveCart(c);
}
function setQty(id, qty){
  const p = productById(id); if(!p) return;
  const c = getCart();
  const e = c.find(x => x.id === id);
  if (!e) return;
  e.qty = clampQty(p, qty);
  saveCart(c);
}
function removeFromCart(id){ saveCart(getCart().filter(x => x.id !== id)); }
function cartSubtotal(){ return getCart().reduce((s,x)=>{ const p=productById(x.id); return s + (p ? lineTotal(p, x.qty) : 0); },0); }

function updateCartBadge(){
  const n = getCart().length;
  document.querySelectorAll("[data-cart-count]").forEach(el=>{
    el.textContent = n;
    el.style.display = n ? "inline-flex" : "none";
  });
}
document.addEventListener("DOMContentLoaded", updateCartBadge);
