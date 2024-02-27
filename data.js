

$('.buttons-wrapper').hide();

var addItem = $('.js-addNewItemBtn'); 
addItem.on('click', function(event) {  
$('.js-addNewItemBtn').hide();
$('.buttons-wrapper').show();
 // event.preventDefault();
 var itemEl = $(this).closest('.add-item'); 
 var itemId = itemEl.data('item-id');
 //alert(`count1 = ${count}`);
 itemEl.data('item-count',1)  
 addclick(itemEl, 0 , itemId);
});

// Select the quantity increment button
var plusButton = $('.addplusbutton');
// Add a click event listener to the button
plusButton.on('click', function(event) { 
  
  var itemEl = $(this).closest('.add-item');
  var itemId = itemEl.data('item-id');
  addclick(itemEl, 1, itemId);
 // alert(itemId);
});

var minusButton = $('.addminusbutton');
// Add a click event listener to the button
minusButton.on('click', function(event) {    
  var itemEl = $(this).closest('.add-item');
  var itemId = itemEl.data('item-id');
  addclick(itemEl, -1, itemId );
});

function addclick (itemEl, delta, itemId) {  
  var count = itemEl.data('item-count'); 
  count += delta; 
  itemEl.data('item-count',count)
  console.log(`count=${count}`);    
  //console.log(itemEl.find('.add-qty').text());
  itemEl.find('.add-qty').text(count);  
  itempricefloat = parseFloat(itemEl.data('item-price')); 
  if (count > 0) {
    itemEl.find('.addNewItemBtn').show();
    itemEl.find('.js-addNewItemBtn').hide();
  } else {     
    
    itemEl.find('.addNewItemBtn').hide();
    itemEl.find('.js-addNewItemBtn').show();
   
  };  
 // updateItem(itemEl, delta);
}

function generateRandomString(length) {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    let randomString = '';
  
    // Ensure the first character is a letter
    randomString += letters.charAt(Math.floor(Math.random() * letters.length));
  
    // Generate the remaining characters
    for (let i = 1; i < length; i++) {
      const allCharacters = letters + numbers;
      const randomIndex = Math.floor(Math.random() * allCharacters.length);
      randomString += allCharacters.charAt(randomIndex);
    }
  
    return randomString;
  }
  
  function createNewItem(newPrice,newItemName,newDescription) {
    const newItemItem = document.createElement("div");
    newItemItem.classList.add("cafe-item", "js-item");
    newItemItem.setAttribute("data-item-price", newPrice);
    newItemItem.setAttribute("data-item-count", "0");
    const randomString = generateRandomString(12); // Generate a random string of length 28
    console.log(randomString);
    newItemItem.setAttribute("data-item-id", randomString); // You can set a unique ID for the new item
    
    newItemItem.innerHTML = `
    
        <div class="cafe-item-photo">
            <picture class="cafe-item-lottie">        
                <img src="img/Popcorn_148.png"> <!-- You can set a placeholder image -->
            </picture>
        </div>
        <div class="cafe-item-label">
            <span class="cafe-item-title">${newItemName}</span>
            <span class="cafe-item-price">$${newPrice}</span>
        </div>
        <div class="cafe-item-buttons">
            <button class="cafe-item-quantity-decr js-item-quantity-decr button-item ripple-handler">-</button>
            <div class="cafe-item-quantity js-item-quantity">0</div>
            <button class="cafe-item-quantity-incr js-item-quantity-incr button-item ripple-handler">+</button>
            <button class="cafe-item-incr-button js-item-incr-btn button-item ripple-handler">
                <span class="button-item-label">Add</span>
                <span class="ripple-mask"><span class="ripple"></span></span>
            </button>
        </div>
    `;
   


    const newOrderItem = document.createElement("div");    
    newOrderItem.innerHTML = `
    <div class="cafe-order-item js-order-item" id="${randomString}mc1">
    <div class="cafe-order-item-photo">
        <picture class="cafe-item-lottie">
          <source type="application/x-tgsticker" srcset="./img/Burger.tgs">
          <img src="img/Popcorn_148.png" >
        </picture>
    </div>     
    <div class="cafe-order-item-title">${newItemName}</div>
    <div class="cafe-order-item-price js-order-item-price"><span class="cafe-order-item-counter"><span class="js-order-item-counter" id="${randomString}counterc1">0</span>x</span><span class="currency">$</span><span class="oneitemprice" id="${randomString}oneitempricec">0</span></div>
    <div class="cafe-order-item-price js-order-item-price">ИТОГО: <span class="currency">$</span><span class="oneitemtotalprice" id="${randomString}oneitemtotalprice">0</span></div>
    <div class="cafe-order-item-description"><span> ${newDescription}</span></div>
    </div>
    `;

return [newItemItem,newOrderItem];
};