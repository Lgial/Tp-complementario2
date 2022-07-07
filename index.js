const kits = [
   {id:"Kit-Razer",product: 'Razer',price: 12000 ,quantity: 1,}, 
   {id:"Kit-Logitech",product: 'Logitech',price: 9000,quantity: 1,},
   {id:"Kit-HyperX",product: 'HyperX',price: 8000,quantity: 1,},
   {id:"Kit-Reddragon",product: 'Red-dragon',price: 5000,quantity: 1,}, 
 ];

const containerCards = document.getElementById('container-cards');
const selectProducts = document.getElementById('select-products');
const tableCarts = document.getElementById('table-carts');
const tBody = document.getElementById('tBody');

//let imgSelected = " ";
let idProduct = 0;
const cart = [];
const modal = document.querySelector('.modal');
const closeModal = document.getElementById('close-modal');
const filterXPrice = document.getElementById('filterXPrice');
    
window.addEventListener('load', listSelect);
selectProducts.addEventListener('change', renderCards);
closeModal.addEventListener('click',()=> modal.style.display = 'none');
filterXPrice.addEventListener('change', filterPoducts);

function filterPoducts(event) {
  const responseFilter = event.target.value === 'Menores a 8000'
  ? kits.filter( kit => kit.price < 8000)
  : event.target.value === 'Entre 5000 y 10000'
  ? kits.filter( kit => kit.price >= 5000 && kit.price <= 10000)
  : event.target.value === 'Mayores a 8000'
  ? kits.filter( kit => kit.price > 8000)
  : null;

  containerCards.innerHTML = '';
  responseFilter.map( kit => createCards(kit));
}

function importImg(event) {
  const currentImg = event.target.files[0];
  const objectURL = URL.createObjectURL(currentImg);
  imgSelected = objectURL;   
}

function createNewProduct() {
  idProduct++;
  const titleProduct = newProduct.value;
  const priceProduct = newPrice.value;
  const id = idProduct;

  const newKit = {id:id,product: titleProduct,price: priceProduct,image: imgSelected};

  kits.push(newKit);
  listSelect();
  modal.style.display = 'none';
}

function showModal() {
  modal.style.display = 'flex';  
}

function renderCards() {
  kits.map( kit => { kit.product === selectProducts.value ? createCards(kit) : null } );
}

function listSelect() {
  selectProducts.innerHTML = '';  
  const anyOption = document.createElement('option');
  selectProducts.appendChild(anyOption);
  anyOption.textContent = 'Select a product';
  kits.map( kit => {
    const option = document.createElement('option');
    option.value = kit.product;
    option.textContent = kit.product;
    selectProducts.appendChild(option);
  });
}

function createCards(kit) {
  const { product, image, id, price } = kit;

  const card = document.createElement('div');
  card.classList.add('card-product');

  const imgCard = document.createElement('img');
  imgCard.setAttribute('src',image);
  imgCard.setAttribute('alt',`${id}-${product}`);
  imgCard.classList.add('img-product');

  const nameCard = document.createElement('p');
  nameCard.textContent = product;
  nameCard.classList.add('name-product');

  const priceCard = document.createElement('p');
  priceCard.classList.add('price-product');
  priceCard.textContent = price;

  const btnAdd = document.createElement('button');
  btnAdd.setAttribute('id',id);
  btnAdd.classList.add('btn-add');
  btnAdd.textContent = "Add to Cart";
  btnAdd.addEventListener('click', addToCart);

  card.appendChild(imgCard);
  card.appendChild(nameCard);
  card.appendChild(priceCard);
  card.appendChild(btnAdd);

  containerCards.appendChild(card);
}

function addToCart(event) {

  // 1. identificar  el producto
  const idCurrentProduct = event.target.id;  

  // 2. Trae el producto
  const productSelected = kits.find( kit => kit.id === idCurrentProduct);
  console.log(productSelected);    

  // 3. Agregar al carrito
    if(cart.length === 0) {
      cart.push(productSelected);      
    }
    else {
      const isExist = cart.find( product => product.id === productSelected.id );
      if(isExist === undefined) {
        cart.push(productSelected);
      } else {
        isExist.quantity++;
      }
    }
    tBody.innerHTML = '';
    cart.map( element => {      
      renderCart(element);
    })    
}

function renderCart(product) {  
  
  const tr = document.createElement('tr');
    tr.classList.add('tr-products');
    
    tr.innerHTML = `
    <td>${product.product}</td>
    <td>${product.price}</td>
    <td><button class="decQuantity" id="decQuantity">-</button></td>        
    <td>${product.quantity}</td>
    <td><button class="addQuantity" id="addQuantity">+</button></td>
      <td>${(product.quantity * product.price).toFixed(2)}</td>  
      `
      tBody.appendChild(tr);      

  const btnAdd = document.querySelector('.addQuantity');
    btnAdd.addEventListener('click', (event)=> {
    const productName = event.target.parentElement.parentElement.children[0].textContent;
    cart.map( element => {
      if (element.product === productName) {
        element.quantity++;          
      }
    });
  })
}  