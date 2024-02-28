

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

return [newItemItem,newOrderItem, randomString];
};

// Storing div information
function storeDivInfo(itemName, price, description, randomPlace) {
  //tg.showAlert(`Random  ` + randomPlace + ` Name ` + itemName + ` Price ` + price + ` Desc ` + description );
  const divInfo = [itemName, price, description];
  const jsonString = JSON.stringify(divInfo); 
  //tg.showAlert(`SAVED IN STORAGE : ` + jsonString);  
  tg.CloudStorage.setItem(`${randomPlace}`, jsonString, function(error, success) {
    if (error) {
      tg.showAlert('Error storing data in Cloud Storage');
    } else {
      tg.showAlert('Данные товара сохранены успешно!');
    }    
  });
}
/*
// Retrieve the stored JSON string from Telegram's Cloud Storage
tg.CloudStorage.getItem('addedDivInfo', function(error, storedDivInfo) {
  if (error) {
    tg.showAlert('Error retrieving data from Cloud Storage:' + error);
  } else {
    if (storedDivInfo) {
      // Parse the JSON string back to an array
      const parsedDivInfo = JSON.parse(storedDivInfo);

      // Assuming you have a function createNewItem that takes relevant parameters and returns a new div
      const [newItem, newOrderItem] = createNewItem(parsedDivInfo[1], parsedDivInfo[0], parsedDivInfo[2]);

      // Append the new divs to the container
      cafeContainer.appendChild(newItem);
      cafeOrderContainer.appendChild(newOrderItem);
    } else {
      tg.showAlert('No stored data found.');
    }
  }
});
//
// Get all keys from Cloud Storage
tg.CloudStorage.getKeys(function(error, keys) {
  if (error) {
    tg.showAlert('Error retrieving keys from Cloud Storage: ' + error);
  } else {
    if (keys && keys.length > 0) {
      // Iterate through each key
      keys.forEach(function(key) {        
        tg.CloudStorage.getItem(key, function(error, storedData) {
          if (error) {
            tg.showAlert('Error retrieving data for key ' + key + ': ' + error);
          } else {
              if (storedData) {
              // Parse the JSON string back to an array or object based on your data structure
              const parsedData = JSON.parse(storedData);
              // Now you can work with each retrieved data
              //tg.showAlert('Ключ : ' + key + ' Значение ключа '+ parsedData[1] + ' Значение ключа '+ parsedData[0] + ' Значение ключа '+ parsedData[2]);
              const cafeContainer = document.querySelector('.cafe-page')   
              const [newItemDivS,newOrderDivS, randomItemS] = createNewItem(parsedData[1], parsedData[0], parsedData[2]);
              cafeContainer.appendChild(newItemDivS);
              const OrderContainer = document.querySelector('.cafe-block');
              OrderContainer.appendChild(newOrderDivS); 
            }
          }
        });
      });
    } else {
      tg.showAlert('No keys found in Cloud Storage.');
    }
  }
});
*/
function retrieveAndAppendItems(keys) {
  const promises = keys.map(key => {
    return new Promise((resolve, reject) => {
      tg.CloudStorage.getItem(key, function(error, storedData) {
        if (error) {
          reject('Error retrieving data for key ' + key + ': ' + error);
        } else {
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            const [newItemDivS, newOrderDivS, randomItemS] = createNewItem(parsedData[1], parsedData[0], parsedData[2]);
            resolve({ newItemDivS, newOrderDivS });
          } else {
            reject('No data found for key ' + key);
          }
        }
      });
    });
  });

  Promise.all(promises)
    .then(results => {
      const cafeContainer = document.querySelector('.cafe-page');
      const OrderContainer = document.querySelector('.cafe-block');

      results.forEach(({ newItemDivS, newOrderDivS }) => {
        cafeContainer.appendChild(newItemDivS);
        OrderContainer.appendChild(newOrderDivS);
      });
    })
    .catch(error => {
      tg.showAlert(error);
    });
}


