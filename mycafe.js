let tg = window.Telegram.WebApp; //получаем объект webapp телеграма
let x = tg.initDataUnsafe;
let z = false;
   tg.expand(); //расширяем на все окно
  
   tg.MainButton.text = "Changed Text"; //изменяем текст кнопки
   tg.MainButton.setText("ЗАКАЗАТЬ"); //изменяем текст кнопки иначе ${x}
   tg.MainButton.show()
   tg.SettingsButton.hide()
   tg.isClosingConfirmationEnabled = false;
   tg.BackButton.show()
   tg.setBackgroundColor('bg_color');

   // Assuming you have a reference to the button element with class 'addbutton'
var addbutton = document.querySelector('.addbutton');

// Add a click event listener to the button
addbutton.addEventListener('click', function() {
  // Code to execute when the button is clicked
  tg.openTelegramLink('https://core.telegram.org/bots/webapps');
});

   Telegram.WebApp.onEvent('mainButtonClicked', function () {
    if (!x) {
     //window.alert(`ОТКРОЙ ПРИЛОЖЕНИЕ ЧЕРЕЗ КНОПКУ НА КЛАВИАТУРЕ БОТА!!!`);
      tg.showAlert(`ОТКРОЙ ПРИЛОЖЕНИЕ`)
      
       
    } else {
      tg.sendData(`Ваш Заказ отправлен! `);
      tg.showAlert(` !!!`);
    }
});


       
   
