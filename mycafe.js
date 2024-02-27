let tg = window.Telegram.WebApp; //получаем объект webapp телеграма
let x = tg.initDataUnsafe;
let y = tg.initData;
var itemsData = [];
tg.expand(); //расширяем на все окно
tg.MainButton.text = "Посмотреть заказ"; //изменяем текст кнопки
//console.log('Hiding mc1:', $('.js-order-item.mc1'));
$('.js-order-item').hide();
alert(`3  your version bot api${tg.version} . WebAppInitData :  `); ////////////////////${tg.WebAppInitData.user}///////////////////////////////////////////////////////////////////////////////////////////
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
  count += delta;  
  itemEl.find('.js-item-quantity').text(count);
  $('.js-order-item-counter#' +"counter" + itemId).text(count);

  // REMOVE MAINBUTTON IF ALL POSITION are ZERO
  var allZeros = $('.js-order-item-counter').map(function() {
    return parseInt($(this).text());
  }).get().every(function(value) {
    return value === 0;
  });  
  if (allZeros) {
    tg.MainButton.hide();
  } 

  itemEl.data('item-count', count);
  itemtitle = itemEl.find('.cafe-item-title').text();
  count1 = count
  itempricefloat = parseFloat(itemEl.data('item-price') / 1000);
  totalitemprice = count * itempricefloat; //
  totalitemprice =totalitemprice.toFixed(2)
  if (count > 0) {
    console.log(itemId);
    $('.js-order-item#' + "m"+ itemId).show();
    //console.log(' oneitemprice:', $(`.oneitemprice#`+ itemId).text());
       
    itemprice = itemEl.find('.cafe-item-price').text();
    $('.oneitemprice#' + "oneitemprice" + itemId).text(itemprice);    
    
    //totalitemprice = totalitemprice.toFixed(2);    
    $('.oneitemtotalprice#'+"oneitemtotalprice" + itemId).text(totalitemprice);
    
    // Calculate finalprice as the sum of all .oneitemtotalprice
    var allTotalPrices = $('.oneitemtotalprice').map(function () {
      return parseFloat($(this).text());
      }).get();

    var finalprice = allTotalPrices.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
      }, 0);

    $('.allitemtotalprice').text(finalprice.toFixed(2)); //
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
    console.log(itemId);
    $('.js-order-item#' + "m"+itemId).hide();
    itemEl.find('.js-item-quantity-incr').hide();
    itemEl.find('.js-item-quantity-decr').hide();
    itemEl.find('.js-item-quantity').hide();
    itemEl.find('.js-item-incr-btn').show();
    //console.log('Before Update:', $('.oneitemtotalprice#' + itemId).text());
    $('.oneitemtotalprice#' +"oneitemtotalprice"+ itemId).text(0);
    //console.log('After Update:', $('.oneitemtotalprice#' + itemId).text());
    
    var allTotalPrices = $('.oneitemtotalprice').map(function () {
      return parseFloat($(this).text());
      }).get();

    var finalprice = allTotalPrices.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
      }, 0);
    $('.allitemtotalprice').text(finalprice.toFixed(2)); //

    // Check if an item with the same title already exists in itemsData
    var existingIndex = itemsData.findIndex(item => item.title === itemtitle);

    if (existingIndex !== -1) {
      // If the item already exists, remove it from the array
      itemsData.splice(existingIndex, 1);
      }
  };  
 // updateItem(itemEl, delta);
}
var addbutton = $('.js-item-incr-btn'); 
addbutton.on('click', function(event) {
  tg.MainButton.show();
  $(this).parent('.cafe-item-buttons').find('.js-item-incr-btn').hide();
  $(this).parent('.cafe-item-buttons').find('.js-item-quantity-incr').show();
  $(this).parent('.cafe-item-buttons').find('.js-item-quantity-decr').show();
  $(this).parent('.cafe-item-buttons').find('.js-item-quantity').show();
 // event.preventDefault();
 var itemEl = $(this).closest('.js-item');
 var count = itemEl.data('item-count');
 var itemId = itemEl.data('item-id');
 //alert(`count1 = ${count}`);
 itemEl.data('item-count',1)
 itemEl.find('.js-item-quantity').text(1);
 $('.js-order-item-counter#'+"counter" + itemId).text(1);
 incrClicked(itemEl, 0 , itemId);
});

var decrButton = $('.js-item-quantity-decr');
// Add a click event listener to the button
decrButton.on('click', function(event) {
  event.preventDefault();
  var itemEl = $(this).closest('.js-item');
  var itemId = itemEl.data('item-id');
  incrClicked(itemEl, -1, itemId );
});

// Select the quantity increment button
var incrButton = $('.js-item-quantity-incr');
// Add a click event listener to the button
incrButton.on('click', function(event) {
  //event.preventDefault();
  //alert("itemEl.data('item-count')");
  var itemEl = $(this).closest('.js-item');
  var itemId = itemEl.data('item-id');
  incrClicked(itemEl, 1, itemId);
});
/*-------------------zzzzzzzzzzzzzzzzzzzzzzzzz-------------------------------------------------------------------------------------


document.addEventListener('DOMContentLoaded', function() {
    var myButton = document.getElementById('myButton');
  myButton.addEventListener('click', function() {  
    if (myButton.textContent == "Посмотреть заказ") {  
      myButton.textContent = "Сохранить";
      var OrderMode = document.querySelector('.cafe-items');
      OrderMode.style.display = 'none';
      var cafeOrderOverview = document.querySelector('.cafe-order-overview');
      cafeOrderOverview.style.display = 'flex';
      cafeOrderOverview.style.opacity = '1';
      var Comment = document.querySelector('.comment');
      Comment.style.display = 'flex';
      $('.finalamount').addClass('show');
    } else if (myButton.textContent=="Сохранить"){
    alert(`Сохранено!`);     

  }else if (myButton.textContent=="SET"){    
    storeDivInfo(newItemName,newPrice,newDescription);
  }else {
    alert(`ено!`);
    }
  });
});
//---------------------------------------------------------------------------------*/
/*
    var newItemtext = document.querySelector('.quantity-input');
    var newItemName = newItemtext.value; 
    var newPricetext = document.querySelector('.price-input');
    var newPrice = newPricetext.value; 
    var newDescriptionText = document.querySelector('.desc-input');
    var newDescription =newDescriptionText.value; 
    
    const cafeContainer = document.querySelector('.cafe-page')   
    const [newItemDiv,newOrderDiv] = createNewItem(newPrice,newItemName,newDescription);
    cafeContainer.appendChild(newItemDiv);
    const OrderContainer = document.querySelector('.cafe-block');
    OrderContainer.appendChild(newOrderDiv); 
    $('.cafe-settings').removeClass('show');
   
//return to initial page and conceal current page 

var OrderMode = document.querySelector('.cafe-items');
OrderMode.style.display = 'none';      
var cafeOrderOverview = document.querySelector('.cafe-order-overview');
cafeOrderOverview.style.display = 'none';
cafeOrderOverview.style.opacity = '0';
var Comment = document.querySelector('.comment');
Comment.style.display = 'none';
$('.finalamount').removeClass('show');
$('.cafe-settings').addClass('show');
//alert(`itemname1` );

   
//     */
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
    var newItemtext = document.querySelector('.quantity-input');
    var newItemName = newItemtext.value; 
    var newPricetext = document.querySelector('.price-input');
    var newPrice = newPricetext.value; 
    var newDescriptionText = document.querySelector('.desc-input');
    var newDescription =newDescriptionText.value; 
    
    const cafeContainer = document.querySelector('.cafe-page')   
    const [newItemDiv,newOrderDiv] = createNewItem(newPrice,newItemName,newDescription);
    cafeContainer.appendChild(newItemDiv);
    const OrderContainer = document.querySelector('.cafe-block');
    OrderContainer.appendChild(newOrderDiv); 
    $('.cafe-settings').removeClass('show');
   
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
    
    storeDivInfo(newItemName,newPrice,newDescription);
  }else {
    // After processing all items
    var finalprice =  parseFloat($('.allitemtotalprice').text());
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
    //alert(`${message}`);
    tg.sendData(`${message}`);    
    //tg.showAlert(`Данные получены! y: ${typeof y} ${JSON.stringify(y)}  x: ${typeof x} ${JSON.stringify(x)} `);
    //tg.sendData(`${itemtitle} ${count1} шт. по цене ${itemprice}  на сумму ${totalitemprice} final price : ${finalprice} `);     
    //tg.showAlert(`ОТКРОЙТЕ ПРИЛОЖЕНИЕ ЧЕРЕЗ КНОПКУ НА КЛАВИАТУРЕ БОТА!`);
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