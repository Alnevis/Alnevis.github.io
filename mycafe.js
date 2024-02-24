let tg = window.Telegram.WebApp; //получаем объект webapp телеграма
let x = tg.initDataUnsafe;
let y = tg.initData;
let z = false;
tg.expand(); //расширяем на все окно
tg.MainButton.text = "Changed Text"; //изменяем текст кнопки
tg.MainButton.setText("CДЕЛАТЬ ЗАКАЗ"); //изменяем текст кнопки иначе 

tg.SettingsButton.show();
tg.isClosingConfirmationEnabled = true;
tg.BackButton.hide();
tg.setBackgroundColor('bg_color');
//$(".h").text("HI")
let count1;        // Declare count
let itemprice;    // Declare itemprice
let itemtitle; 

function incrClicked (itemEl, delta) {
  
  var count = itemEl.data('item-count');
 // alert(`count = ${count}`);
  count += delta;
  //alert(`count = ${count}`);
  itemEl.find('.js-item-quantity').text(count);
  if (count <= 0) {
    itemEl.find('.js-item-quantity-incr').hide();
    itemEl.find('.js-item-quantity-decr').hide();
    itemEl.find('.js-item-quantity').hide();
    itemEl.find('.js-item-incr-btn').show();
    tg.MainButton.hide();
  }
  itemEl.data('item-count', count);
  itemprice = 0;
  itemtitle = 0;
  count1 = 0;
  if (count > 0) {
    itemprice = itemEl.find('.cafe-item-price').text();
    itemtitle = itemEl.find('.cafe-item-title').text();
    count1 = count
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
 //alert(`count1 = ${count}`);
 itemEl.data('item-count',1)
 itemEl.find('.js-item-quantity').text(1);
});

var decrButton = $('.js-item-quantity-decr');
// Add a click event listener to the button
decrButton.on('click', function(event) {
  event.preventDefault();
  var itemEl = $(this).closest('.js-item');
  incrClicked(itemEl, -1);
});

// Select the quantity increment button
var incrButton = $('.js-item-quantity-incr');
// Add a click event listener to the button
incrButton.on('click', function(event) {
  //event.preventDefault();
  //alert("itemEl.data('item-count')");
  var itemEl = $(this).closest('.js-item');
  incrClicked(itemEl, 1);
});

Telegram.WebApp.onEvent('mainButtonClicked', function () {
  alert(`Заказ: ${count1} шт. ${itemprice} ${itemtitle}`);
  tg.BackButton.show();
  var OrderMode = document.querySelector('.cafe-items');
  OrderMode.style.display = 'none';
  var OrderItem = document.querySelector('.cafe-order-item');
  OrderItem.style.display = 'flex';
  var cafeOrderOverview = document.querySelector('.cafe-order-overview');
  cafeOrderOverview.style.display = 'flex';
  /*if (!x) {
    //window.alert('x is true!');   
    tg.showAlert(`ОТКРОЙТЕ ПРИЛОЖЕНИЕ ЧЕРЕЗ КНОПКУ НА КЛАВИАТУРЕ БОТА!!!`);
    //tg.openTelegramLink('https://t.me/public_python');  
  } else {
      //tg.showAlert(`Данные получены! y: ${typeof y} ${JSON.stringify(y)}  x: ${typeof x} ${JSON.stringify(x)} `);
      tg.sendData(`${itemtitle} ${count1} шт. по цене ${itemprice} `);     
    }*/
});