let tg = window.Telegram.WebApp; //получаем объект webapp телеграма
tg.ready()
sessionStorage.removeItem('newItemsList');
console.log('Session Storage Cleared');
// Get all keys from Cloud Storage
tg.CloudStorage.getKeys(function(error, keys) {
  if (error) {
    tg.showAlert('Error retrieving keys from Cloud Storage: ' + error);
  } else {
    if (keys && keys.length > 0) {
      console.log('keys found in Cloud Storage:',keys);
      retrieveAndAppendItems(keys);
    } else {
      tg.showAlert('62 Откройте меню в правом верхнем углу и добавьте товары!');
      log.console('Откройте меню в правом верхнем углу и добавьте товары!');
    }
  }
});
let x = tg.initDataUnsafe;
let y = tg.initData;
var itemsData = [];
tg.expand(); //расширяем на все окно
tg.MainButton.text = "Посмотреть заказ"; //изменяем текст кнопки
//console.log('Hiding mc1:', $('.js-order-item.mc1'));
//$(document).ready(function() {
  //console.log("I am here")
//$('.cafe-block .cafe-order-item .js-order-item').hide();
//});

//logWithTimestamp(`47 version bot api${tg.version} `); /////////////////////${tg.WebAppInitData.user}///////////////////////////////////////////////////////////////////////////////////////////
tg.SettingsButton.show();
tg.isClosingConfirmationEnabled = true;
tg.BackButton.hide();
tg.setBackgroundColor('bg_color');
//$(".h").text("HI")
let count1;        // Declare count
let itemprice;    // Declare itemprice
let itemtitle; 
let totalitemprice  
let finalprice

function incrClicked (itemEl, delta, itemId) {  
  var count = itemEl.data('item-count'); 
  var maximalCount = itemEl.find('.amountForSale').text();
  console.log("maximal amount = ", maximalCount)
  count += delta;
  if (parseFloat(count) > parseFloat(maximalCount)){
    tg.showAlert("Достигнуто максимальное количество товара в наличии!")
    count -= delta
  } else {  
  itemEl.find('.js-item-quantity').text(count);
  $('.cafe-block .js-order-item-counter#'+ itemId + "counterc1" ).text(count);

  // REMOVE MAINBUTTON IF ALL POSITION are ZERO
  var allZeros = $('.cafe-page .js-order-item-counter').map(function() {
    return parseInt($(this).text());
  }).get().every(function(value) {
    return value === 0;
  });  
  if (allZeros) {
    console.log("ALL ZERO ITEMS")
    tg.MainButton.hide();
  } 

  itemEl.data('item-count', count);
  itemtitle = itemEl.find('.cafe-item-title').text();
  
  count1 = count
  itempricefloat = parseFloat(itemEl.data('item-price'));  
  totalitemprice = count * itempricefloat; //
  totalitemprice =totalitemprice.toFixed(2)
  console.log(" ITEMtitle", itemtitle , " totalitemprice", totalitemprice, " itempricefloat", itempricefloat )
  if (count > 0) {    
    $('.cafe-block  .js-order-item#' + itemId+ "mc1").addClass('show');
    //console.log(' oneitemprice:', $(`.oneitemprice#`+ itemId).text());
       
    itemprice = itemEl.find('.cafe-item-price').text();
    $('.cafe-block .oneitemprice#'  + itemId + "oneitempricec").text(itemprice);    
    
    //totalitemprice = totalitemprice.toFixed(2);    
    $('.cafe-block .oneitemtotalprice#'+ itemId +"oneitemtotalprice" ).text(totalitemprice);
    
    // Calculate finalprice as the sum of all .oneitemtotalprice
    var allTotalPrices = $('.cafe-block .oneitemtotalprice').map(function () {
      return parseFloat($(this).text());
      }).get();

    var finalprice = allTotalPrices.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
      }, 0);

    $('.finalamount .allitemtotalprice').text(finalprice.toFixed(2)); //
    //alert(`count1 = ${count1} itemId = ${itemId} itemtitle = ${itemtitle} itemprice = ${itemprice} itempricefloat = ${itempricefloat} totalitemprice = ${totalitemprice} finalprice = ${finalprice}`);
     // Inside your loop or logic for processing items
     var existingItem = itemsData.find(item => item.title === itemtitle);

     if (existingItem) {
       // If the item already exists, update its quantity and total
       existingItem.count = count1;
       existingItem.total = totalitemprice;
     } else {
       // If the item is not in the array, add a new entry
    var itemData = {
      title: itemtitle,
      count: count1,
      price: itemprice,
      total: totalitemprice
    };
 
    itemsData.push(itemData);
     }

  } else {
    
    $('.cafe-block .js-order-item#' + itemId + "mc1").removeClass('show');
    itemEl.find('.js-item-quantity-incr').hide();
    itemEl.find('.js-item-quantity-decr').hide();
    itemEl.find('.js-item-quantity').hide();
    itemEl.find('.js-item-incr-btn').show();
    //console.log('Before Update:', $('.oneitemtotalprice#' + itemId).text());
    $('.cafe-block .oneitemtotalprice#' + itemId +"oneitemtotalprice").text(0);
    //console.log('After Update:', $('.oneitemtotalprice#' + itemId).text());
    
    var allTotalPrices = $('.cafe-block .oneitemtotalprice').map(function () {
      return parseFloat($(this).text());
      }).get();

    var finalprice = allTotalPrices.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
      }, 0);
    $('.finalamount .allitemtotalprice').text(finalprice.toFixed(2)); //

    // Check if an item with the same title already exists in itemsData
    var existingIndex = itemsData.findIndex(item => item.title === itemtitle);

    if (existingIndex !== -1) {
      // If the item already exists, remove it from the array
      itemsData.splice(existingIndex, 1);
      }
  };  
}
}
var addbutton = $('.js-item-incr-btn'); 
$('.cafe-page').on('click', '.js-item-incr-btn', function(event) {
  console.log('Before tg.MainButton.show()');
  tg.MainButton.show();
  
  $(this).parent('.cafe-item-buttons').find('.js-item-incr-btn').hide();
  $(this).parent('.cafe-item-buttons').find('.js-item-quantity-incr').show();
  $(this).parent('.cafe-item-buttons').find('.js-item-quantity-decr').show();
  $(this).parent('.cafe-item-buttons').find('.js-item-quantity').show();
  var textname = $(this).closest('.cafe-item').find('.cafe-item-title').text(); 
  
 // event.preventDefault();
 var itemEl = $(this).closest('.js-item');
 
 var itemId = itemEl.data('item-id');
 console.log();
 itemEl.data('item-count',1)
 var count = itemEl.data('item-count');
 itemEl.find('.js-item-quantity').text(1);
 $('.js-order-item-counter#'+ itemId + "counterc1").text(1);
 console.log('Item Title:', textname , 'Item id:', itemId, 'item-count' , count);
 incrClicked(itemEl, 0 , itemId);
});

var decrButton = $('.js-item-quantity-decr');
// Add a click event listener to the button
$('.cafe-page').on('click','.js-item-quantity-decr', function(event) {
  event.preventDefault();
  var itemEl = $(this).closest('.js-item');
  var itemId = itemEl.data('item-id');
  incrClicked(itemEl, -1, itemId );
});

// Select the quantity increment button
var incrButton = $('.js-item-quantity-incr');
// Add a click event listener to the button
$('.cafe-page').on('click', '.js-item-quantity-incr', function(event) {
  //event.preventDefault();
  //alert("itemEl.data('item-count')");
  var itemEl = $(this).closest('.js-item');
  var itemId = itemEl.data('item-id');
  incrClicked(itemEl, 1, itemId);
});

//     
Telegram.WebApp.onEvent('mainButtonClicked', function () { 
 // document.addEventListener('DOMContentLoaded', function() { 
 // alert(`Заказ: ${count1} шт. ${itemprice} ${itemtitle}`); 
   if (tg.MainButton.text=="Посмотреть заказ") {
    tg.BackButton.show();
    var OrderMode = document.querySelector('.cafe-items');
    OrderMode.style.display = 'none';
    
    var cafeOrderOverview = document.querySelector('.cafe-order-overview');
    cafeOrderOverview.style.display = 'flex';
    cafeOrderOverview.style.opacity = '1';
    var Comment = document.querySelector('.comment');
    Comment.style.display = 'flex';
    $('.finalamount').addClass('show');  
    tg.MainButton.setText("CДЕЛАТЬ ЗАКАЗ"); //изменяем текст кнопки иначе     
    //tg.showAlert(`ОТКРОЙТЕ ПРИЛОЖЕНИЕ ЧЕРЕЗ КНОПКУ НА КЛАВИАТУРЕ БОТА!!!`);
    //tg.openTelegramLink('https://t.me/public_python');
    ///////////////////////////////////////////////////////////СОХРАНИТЬ////////////////////////////////////////////////////////////////////////////  
  } else if (tg.MainButton.text=="Сохранить"){      
     
    $('.cafe-settings').removeClass('show');

    console.log("Save BUTTON PRESSED") 

  // Retrieve the updated list from session storage
  const updatedItemsJson = sessionStorage.getItem('newItemsList');
  console.log('Updated Items JSON:', updatedItemsJson);

  // Parse the JSON or initialize an empty array if it's null
  const updatedItems = updatedItemsJson ? JSON.parse(updatedItemsJson) : [];

  // Check if updatedItems is an array before iterating
  if (Array.isArray(updatedItems)) {
    updatedItems.forEach((item, index) => {
      console.log('Item at index', index, ':', item);
      const { randomItem1, newPrice, newItemName, newDescription, newAmountText } = item;
      console.log('randomItem at index', randomItem1,'newPrice at index', newPrice, 'newItemName at index', newItemName, 'newDescription at index', newDescription, 'amount for sale', newAmountText);
//
      console.log('Attempting to create elements for:', {randomItem1, newPrice, newItemName, newDescription, newAmountText });
      const cafeContainer = document.querySelector('.cafe-page');
      
      const [newItemDiv, newOrderDiv] = createNewItem(newPrice, newItemName, newDescription,newAmountText,randomItem1);
      cafeContainer.appendChild(newItemDiv);
      console.log('cafeContainer.appendChild(newItemDiv);');
      const OrderContainer = document.querySelector('.cafe-block');
      OrderContainer.appendChild(newOrderDiv);

      console.log('Processed Item:', { newPrice, newItemName, newDescription, newAmountText, randomItem1 });

      storeDivInfo(newItemName,newPrice,newDescription, randomItem1,newAmountText);
    });
  } else {
    console.error('Updated Items is not an array:', updatedItems);
  }

  // Clear session storage after processing
  sessionStorage.removeItem('newItemsList');
  console.log('Session Storage Cleared');
   
//return to initial page and conceal current page
      var OrderMode = document.querySelector('.cafe-items');
      OrderMode.style.display = 'flex';      
      var cafeOrderOverview = document.querySelector('.cafe-order-overview');
      cafeOrderOverview.style.display = 'none';
      cafeOrderOverview.style.opacity = '0';
      var Comment = document.querySelector('.comment');
      Comment.style.display = 'none';
      $('.finalamount').removeClass('show');
      tg.MainButton.setText("Посмотреть заказ"); //изменяем текст кнопки
    // We save data of new items to STORAGE
    
      
  }else {
    // After processing all items
    var finalprice = parseFloat($('.finalamount .allitemtotalprice').text());
    var finalprice = finalprice.toFixed(2)
    // Construct a string with information for all items and final price
    var message = itemsData.map(function (item) {
        return `${item.title} ${item.count} шт. по цене ${item.price}  на сумму ${item.total}`;
    }).join('\n');
    var textarea = document.querySelector('.cafe-text-field');
    var userComment = textarea.value;

    // Add the final price to the message
    message += `\nFinal Price: ${finalprice}`;
    message += `\nUser's Comment: ${userComment}`;
    tg.CloudStorage.getKeys(function (error, keys) {
        if (error) {
            console.log('Error retrieving keys from Cloud Storage: ' + error);
        } else {
            if (keys.length > 1) {
                tg.CloudStorage.getItems(keys, function (error, keyvalues) {
                  message += `\nvalues: ${JSON.stringify(keyvalues)}`;
                    tg.sendData(`${message}`);
                });
            } else {
                tg.CloudStorage.getItem(keys, function (error, keyvalue) {
                  message += `\nvalues: ${JSON.stringify(keyvalue)}`;
                    tg.sendData(`${message}`);
                });
            }
            console.log('message: ' + message);
        }
    });

    // tg.showAlert(`Данные получены! y: ${typeof y} ${JSON.stringify(y)}  x: ${typeof x} ${JSON.stringify(x)} `);
    // tg.sendData(`${itemtitle} ${count1} шт. по цене ${itemprice}  на сумму ${totalitemprice} final price : ${finalprice} `);     
    // tg.showAlert(`ОТКРОЙТЕ ПРИЛОЖЕНИЕ ЧЕРЕЗ КНОПКУ НА КЛАВИАТУРЕ БОТА!`);
}

});
//});
Telegram.WebApp.onEvent('backButtonClicked', function () {     
    tg.BackButton.hide();
    var OrderMode = document.querySelector('.cafe-items');
      OrderMode.style.display = 'flex';      
      var cafeOrderOverview = document.querySelector('.cafe-order-overview');
      cafeOrderOverview.style.display = 'none';
      cafeOrderOverview.style.opacity = '0';
      var Comment = document.querySelector('.comment');
      Comment.style.display = 'none';
      $('.finalamount').removeClass('show');
    tg.MainButton.setText("Посмотреть заказ"); //изменяем текст кнопки 
    $('.cafe-settings').removeClass('show');
    //window.alert('x is true!');   
    //tg.showAlert(`ОТКРОЙТЕ ПРИЛОЖЕНИЕ ЧЕРЕЗ КНОПКУ НА КЛАВИАТУРЕ БОТА!!!`);
    //tg.openTelegramLink('https://t.me/public_python');  
  });

  Telegram.WebApp.onEvent('settingsButtonClicked', function () {    
    
    tg.BackButton.show();
    tg.MainButton.setText("Сохранить"); //изменяем текст кнопки
    tg.MainButton.show();
    var OrderMode = document.querySelector('.cafe-items');
    OrderMode.style.display = 'none';      
    var cafeOrderOverview = document.querySelector('.cafe-order-overview');
    cafeOrderOverview.style.display = 'none';
    cafeOrderOverview.style.opacity = '0';
    var Comment = document.querySelector('.comment');
    Comment.style.display = 'none';
    $('.finalamount').removeClass('show');
    $('.cafe-settings').addClass('show');
     
    //window.alert('x is true!');   
    //tg.showAlert(`ОТКРОЙТЕ ПРИЛОЖЕНИЕ ЧЕРЕЗ КНОПКУ НА КЛАВИАТУРЕ БОТА!!!`);
    //tg.openTelegramLink('https://t.me/public_python');  
  });

  function logWithTimestamp(message) {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ${message}`);
    tg.showAlert(`[${timestamp}] ${message}`);
  }