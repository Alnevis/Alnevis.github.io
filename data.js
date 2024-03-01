

$('.buttons-wrapper').hide();
//
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
// */
// Select the quantity increment button
var plusButton = $('.add-item .addplusbutton');
// Add a click event listener to the button
$('.cafe-settings').on('click', '.addplusbutton', function(event) {
  
  var itemEl = $(this).closest('.add-item');
  var itemId = itemEl.data('item-id');
  addclick(itemEl, 1, itemId);
 // alert(itemId);
});

var minusButton = $('.addminusbutton');
// Add a click event listener to the button
$('.cafe-settings').on('click', '.addminusbutton', function(event) {  
  var itemEl = $(this).closest('.add-item');
  var itemId = itemEl.data('item-id');
  addclick(itemEl, -1, itemId );
});

function addclick(itemEl, delta, itemId) {
  var count = itemEl.data('item-count');
  count += delta;
  itemEl.find('.add-qty').text(count);
  itemEl.data('item-count', count);
  var countdata = itemEl.data('item-count');
  var qtycount = itemEl.find('.add-qty').text();
  console.log(`count=${count}  countdata = ${countdata} qty = ${qtycount}`);

  itempricefloat = parseFloat(itemEl.data('item-price'));
  thisDivID = itemEl.data('item-id');

  // Retrieve existing values from session storage
  const existingItemsJson = sessionStorage.getItem('newItemsList');

  // Parse the JSON or initialize an empty array if it's null
  const existingItems = existingItemsJson ? JSON.parse(existingItemsJson) : [];
  console.log('existingItemsJson in addclick:', existingItemsJson);

    if (Array.isArray(existingItems)) {
      if (existingItems.length > 0){
        existingItems.forEach((storedValues, index) => {
          const { randomItem2, newPrice2, newItemName2, newDescription2, newAmountText2 } = storedValues;
          console.log(' isArray(existingItems)) Item at index ', index, 'in addbutton :', storedValues , 'divID:', thisDivID);
          if (randomItem2==thisDivID){        
            updatedItems[index].newAmountText = qtycount;
            console.log("randomItem1",randomItem2,"thisDivID",thisDivID,"newAmountText" , newAmountText2, "updatedItems[index].newAmountText",updatedItems[index].newAmountText,"qtycount",qtycount )
          }
        });
      }else{     
      
      tg.CloudStorage.getItem(thisDivID, function (error, storedValues) {
        if (error) {
          console.error('Error retrieving data for key in addclick:', thisDivID, error);
        } else if (storedValues) {
          //
          const retrievedValues = JSON.parse(storedValues);
          const {newItemName3,newPrice3,  newDescription3, newAmountText3 } = retrievedValues;
          console.log('Retrieved values:', storedValues);
          const newItem3 = {
            randomItem1: thisDivID,
            newItemName: newItemName3,
            newPrice: newPrice3,
            newDescription: newDescription3,
            newAmountText: newAmountText3,
          };
          console.log("existingItems.push(newItem3) in addclick ", newItem3);
          existingItems.push(newItem3);
    
          // Save the updated array back to session storage
          sessionStorage.setItem('newItemsList', JSON.stringify(existingItems));
        } else {
          console.log(`Key ${thisDivID} does not exist in Cloud Storage.`);
        }
      });
    }
  }
}



 var delAllButton = $('.js-delAllItemBtn');
// Add a click event listener to the button
delAllButton.on('click', function(event) {  
  console.log("DEL BUTTON PRESSED")
  tg.showConfirm("Все товары будут полностью удалены из магазина!", function(confirm) {
    if (confirm){  
  tg.CloudStorage.getKeys(function (error, keys) {
    if (error) {
      console.error('Error retrieving keys from Cloud Storage:', error);
    } else {
      // Remove all keys from Cloud Storage
      removeAllItems(keys, function (error, success) {
        if (error) {
          console.log('Failed to remove items.');
        } else {
          tg.showAlert("Все товары успешно удалены!")
          console.log('Items successfully removed.');
        }
      });
    }
  });
} 
  });
});

 // Delete only one item from settings
 $('.cafe-settings').on('click', '.js-delItemBtn', function(event) {  
  console.log("DEL BUTTON PRESSED")  
  var clickedDelButton = $(this);
  tg.showConfirm("Товар будет полностью удален из магазина.", function(confirm) {
      if (confirm){
        var itemEl = clickedDelButton.closest(' .add-item'); 
        var itemId = itemEl.data('item-id');
        console.log("Deleting item, ItemID: ", itemId);
        tg.CloudStorage.removeItem(itemId, function(error, success) {
          if (error) {
            console.error('Failed to remove item with key', itemKey, ':', error);
          } else {
            tg.showAlert("Товар успешно удален! Перезагрузите страницу!");
            console.log('Item with key', itemKey, 'successfully removed.');
          }
        });
      }else{
        console.log("User pressed Cancel");
      }
  })
});





var preAddButton = $('.js-addItemBtn');
// Add a click event listener to the button
preAddButton.on('click', function(event) {  
  console.log("Pre ADD BUTTON PRESSED");
  
    var newItemtext = document.querySelector('.quantity-input');
    var newItemName = newItemtext.value; 
    var newPricetext = document.querySelector('.price-input');
    var newPrice = newPricetext.value; 
    var newDescriptionText = document.querySelector('.desc-input');
    var newDescription = newDescriptionText.value;
    var amountText = document.querySelector('.add-qty');
    var newAmountText = amountText.textContent;  
    console.log("Amount text: ",newAmountText)
    if (parseFloat(newAmountText) > 0) {
    const setContainer = document.querySelector('.cafe-settings')
    const randomItem = generateRandomString(12);   
  
     const [newItemDiv] = createNewSample(newPrice, newItemName,newAmountText,randomItem);
    setContainer.appendChild(newItemDiv);
  
    // Retrieve existing values from session storage
    const existingItemsJson = sessionStorage.getItem('newItemsList');
  
    // Parse the JSON or initialize an empty array if it's null
    const existingItems = existingItemsJson ? JSON.parse(existingItemsJson) : [];
  
    // Check if existingItems is an array before pushing the new item
    if (Array.isArray(existingItems)) {
      // Add the new item to the array
      const newItem = {
        randomItem1 : randomItem,
        newItemName: newItemName,
        newPrice: newPrice,
        newDescription: newDescription,
        newAmountText : newAmountText,
      };
      console.log("existingItems.push(newItem) ", newItem)
      existingItems.push(newItem);
  
      // Save the updated array back to session storage
      sessionStorage.setItem('newItemsList', JSON.stringify(existingItems));
      console.log('Saved in storage:', existingItems);
    } else {
      console.error('Existing Items is not an array:', existingItems);
    }
  }else {
    tg.showAlert("Установите количество товара в наличии!")
  }
 
});


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
  
  function createNewItem(newPrice,newItemName,newDescription,newAmountText,randomString) {
    console.log("function createNewItem",newAmountText,randomString)
    const newItemItem = document.createElement("div");
    newItemItem.classList.add("cafe-item", "js-item");
    newItemItem.setAttribute("data-item-price", newPrice);
    newItemItem.setAttribute("data-item-count", "0");
    //const randomString = generateRandomString(12); // Generate a random string of length 28    
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
            <div class="amountForSale">${newAmountText}</div>
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
    <div class="cafe-order-item-price js-order-item-price"><span class="cafe-order-item-counter"><span class="js-order-item-counter" id="${randomString}counterc1">0</span>x</span><span class="currency"></span><span class="oneitemprice" id="${randomString}oneitempricec">0</span></div>
    <div class="cafe-order-item-price js-order-item-price">ИТОГО: <span class="currency"> </span><span class="oneitemtotalprice" id="${randomString}oneitemtotalprice">0</span></div>
    <div class="cafe-order-item-description"><span> ${newDescription}</span></div>
    </div>
    `;
    console.log("function createNewItem finished")
return [newItemItem,newOrderItem];
};

function createNewSample(newPrice,newItemName,newAmountText,randomString) {
  const newItemItem = document.createElement("div");
  newItemItem.classList.add("add-item");
  newItemItem.setAttribute("data-item-price", newPrice);
  newItemItem.setAttribute("data-item-count", newAmountText);
 // const randomString = generateRandomString(12); // Generate a random string of length 28    
  newItemItem.setAttribute("data-item-id", randomString); // You can set a unique ID for the new item
  
  newItemItem.innerHTML = `
  
      <div class="cafe-item-photo">
          <picture class="cafe-item-lottie">        
              <img src="img/Popcorn_148.png">  
          </picture>
      </div>
      <div class="setting-item-label">
          <span class="cafe-item-title">${newItemName}</span>
          <span class="cafe-item-price">$${newPrice}</span>
      </div>
      <div class="settings-item-buttons">
          <button class="addNewItemBtn addminusbutton">-</button>
          <div class="add-qty addNewItemBtn">${newAmountText}</div>
          <button class="addNewItemBtn addplusbutton">+</button>         
      </div>
      <div class="button-container">
      <button class="delAllItemBtn js-delItemBtn">Удалить</button>
      <div class="buttons-wrapper">        
      </div>
    </div>
  `;
 
return [newItemItem];
};

// Storing div information
function storeDivInfo(itemName, price, description, randomPlace,amountText) {
  //tg.showAlert(`Random  ` + randomPlace + ` Name ` + itemName + ` Price ` + price + ` Desc ` + description );
  const divInfo = [itemName, price, description,amountText];
  const jsonString = JSON.stringify(divInfo); 
  //tg.showAlert(`SAVED IN STORAGE : ` + jsonString);  
  tg.CloudStorage.setItem(`${randomPlace}`, jsonString, function(error, success) {
    if (error) {
      tg.showAlert('Error storing data in Cloud Storage');
    } else {
      tg.showAlert('Данные товара сохранены успешно!',itemName, price, description,amountText);
    }    
  });
}

function retrieveAndAppendItems(keys) {
  const promises = keys.map(key => {
    return new Promise((resolve, reject) => {
      tg.CloudStorage.getItem(key, function(error, storedData) {
        if (error) {
          reject('Error retrieving data for key ' + key + ': ' + error);
        } else {
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            console.log("retrieveitems parsedata:",parsedData[1], parsedData[0], parsedData[2],parsedData[3], "key=",key)
            const [newItemDivS, newOrderDivS] = createNewItem(parsedData[1], parsedData[0], parsedData[2],parsedData[3],key);
            const [newItemDiv2] = createNewSample(parsedData[1], parsedData[0],parsedData[3],key);
            resolve({ newItemDivS, newOrderDivS, newItemDiv2 });
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
      const settingsContainer = document.querySelector('.cafe-settings');
      results.forEach(({ newItemDivS, newOrderDivS,newItemDiv2 }) => {
        cafeContainer.appendChild(newItemDivS);
        OrderContainer.appendChild(newOrderDivS);
        settingsContainer.appendChild(newItemDiv2);
      });
    })
    .catch(error => {
      tg.showAlert(error);
    });
}

function removeAllItems(keys, callback) {
  if (!keys || keys.length === 0) {
    console.error('No keys provided for removal.');
    return;
  }

  tg.CloudStorage.removeItems(keys, function (error, success) {
    if (error) {
      console.error('Error removing items from Cloud Storage:', error);
    } else {
      tg.showAlert('Items successfully removed from Cloud Storage.');
      console.log('Items successfully removed from Cloud Storage.');
    }

    if (callback && typeof callback === 'function') {
      callback(error, success);
    }
  });
}

