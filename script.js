// Glamax Beauty demo storefront. Replace sample products and WhatsApp number before launch.
const WHATSAPP_NUMBER = "8801XXXXXXXXX"; // Replace with the shop's WhatsApp number, digits only.
const products = [
  {id:1,brand:"COSRX",name:"Advanced Snail 96 Mucin Power Essence",category:"Serums",price:1850,old:2200,tag:"Best Sellers",image:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=85"},
  {id:2,brand:"Beauty of Joseon",name:"Relief Sun Rice + Probiotics SPF50+",category:"Sunscreens",price:1550,old:1850,tag:"Best Sellers",image:"https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=700&q=85"},
  {id:3,brand:"ANUA",name:"Heartleaf 77% Soothing Toner",category:"Toners",price:1950,old:2300,tag:"Best Sellers",image:"https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=700&q=85"},
  {id:4,brand:"SKIN1004",name:"Madagascar Centella Ampoule",category:"Serums",price:1750,old:2100,tag:"New Arrivals",image:"https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=85"},
  {id:5,brand:"CeraVe",name:"Foaming Facial Cleanser",category:"Cleansers",price:2250,old:2650,tag:"Best Sellers",image:"https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=85"},
  {id:6,brand:"TIRTIR",name:"Mask Fit Red Cushion",category:"Makeup",price:2450,old:2900,tag:"New Arrivals",image:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=85"},
  {id:7,brand:"The Ordinary",name:"Niacinamide 10% + Zinc 1%",category:"Serums",price:1450,old:1700,tag:"Best Sellers",image:"https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=700&q=85"},
  {id:8,brand:"MEDICUBE",name:"Collagen Jelly Cream",category:"Moisturizers",price:2650,old:3200,tag:"New Arrivals",image:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=85"},
  {id:9,brand:"Round Lab",name:"Birch Juice Moisturizing Cream",category:"Moisturizers",price:2100,old:2450,tag:"Best Sellers",image:"https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=700&q=85"},
  {id:10,brand:"Some By Mi",name:"AHA BHA PHA Miracle Cleanser",category:"Cleansers",price:1350,old:1600,tag:"New Arrivals",image:"https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=700&q=85"}
];
let activeCategory="All", searchTerm="", wishlist=JSON.parse(localStorage.getItem("glamax-wishlist")||"[]"), cart=JSON.parse(localStorage.getItem("glamax-cart")||"[]");
const grid=document.getElementById("product-grid"), toast=document.getElementById("toast");
const money=n=>"৳"+Number(n).toLocaleString("en-BD");
function notify(msg){toast.textContent=msg;toast.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove("show"),2200)}
function updateCounts(){document.getElementById("cart-count").textContent=cart.reduce((a,b)=>a+b.qty,0);document.getElementById("wish-count").textContent=wishlist.length}
function render(){
 let list=products.filter(p=>(activeCategory==="All"||p.category===activeCategory)&&(p.name+" "+p.brand+" "+p.category).toLowerCase().includes(searchTerm));
 const sort=document.getElementById("sort-select").value;
 if(sort==="low")list.sort((a,b)=>a.price-b.price);if(sort==="high")list.sort((a,b)=>b.price-a.price);
 document.getElementById("product-heading").textContent=searchTerm?"Search Results":activeCategory==="All"?"Best Sellers":activeCategory;
 document.getElementById("result-count").textContent=`${list.length} demo products`;
 document.getElementById("empty-state").hidden=!!list.length;
 grid.innerHTML=list.map(p=>`<article class="product-card">
 <div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.hidden=false"><div class="fallback" hidden>${p.brand}</div><span class="discount">-${Math.round((1-p.price/p.old)*100)}%</span><button class="wish" data-wish="${p.id}" aria-label="Add ${p.name} to wishlist">${wishlist.includes(p.id)?"♥":"♡"}</button></div>
 <div class="product-info"><div class="product-brand">${p.brand}</div><h3>${p.name}</h3><div><span class="price">${money(p.price)}</span><span class="old-price">${money(p.old)}</span></div><div class="card-actions"><button data-cart="${p.id}">Add to Cart</button><button data-order="${p.id}">Order</button></div></div></article>`).join("");
}
function whatsappUrl(message){return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
document.addEventListener("click",e=>{
 const cat=e.target.closest("[data-category]");if(cat){activeCategory=cat.dataset.category;document.querySelectorAll(".category").forEach(x=>x.classList.toggle("active",x===cat));render()}
 const filter=e.target.closest("[data-filter]");if(filter){activeCategory=filter.dataset.filter==="New Arrivals"?"All":"All";searchTerm="";document.getElementById("search-input").value="";render()}
 const add=e.target.closest("[data-cart]");if(add){const id=Number(add.dataset.cart),item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});localStorage.setItem("glamax-cart",JSON.stringify(cart));updateCounts();notify("Added to your demo cart")}
 const wish=e.target.closest("[data-wish]");if(wish){const id=Number(wish.dataset.wish);wishlist.includes(id)?wishlist=wishlist.filter(x=>x!==id):wishlist.push(id);localStorage.setItem("glamax-wishlist",JSON.stringify(wishlist));updateCounts();render();notify("Wishlist updated")}
 const order=e.target.closest("[data-order]");if(order){const p=products.find(x=>x.id===Number(order.dataset.order));window.open(whatsappUrl(`Hello Glamax Beauty, I am interested in ${p.name} (${money(p.price)}). Is it available?`),"_blank")}
});
document.getElementById("search-form").addEventListener("submit",e=>{e.preventDefault();searchTerm=document.getElementById("search-input").value.trim().toLowerCase();activeCategory="All";document.querySelectorAll(".category").forEach(x=>x.classList.toggle("active",x.dataset.category==="All"));render()});
document.getElementById("sort-select").addEventListener("change",render);
document.getElementById("cart-btn").addEventListener("click",()=>{if(!cart.length)return notify("Your demo cart is empty");const lines=cart.map(x=>{const p=products.find(y=>y.id===x.id);return `${p.name} x ${x.qty} — ${money(p.price*x.qty)}`});const total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);window.open(whatsappUrl("Hello Glamax Beauty, I would like to order:\n"+lines.join("\n")+"\nTotal: "+money(total)),"_blank")});
document.getElementById("wishlist-btn").addEventListener("click",()=>{if(!wishlist.length)return notify("Your wishlist is empty");searchTerm="";activeCategory="All";render();grid.querySelectorAll(".product-card").forEach(card=>{const id=Number(card.querySelector("[data-wish]").dataset.wish);if(!wishlist.includes(id))card.remove()});document.getElementById("product-heading").textContent="My Wishlist"});
document.getElementById("account-btn").addEventListener("click",()=>notify("Customer account feature can be added in the next phase"));
document.getElementById("nav-whatsapp").href=whatsappUrl("Hello Glamax Beauty, I would like to know more about your products.");
document.getElementById("footer-whatsapp").href=whatsappUrl("Hello Glamax Beauty, I need assistance.");
document.getElementById("year").textContent=new Date().getFullYear();
updateCounts();render();
