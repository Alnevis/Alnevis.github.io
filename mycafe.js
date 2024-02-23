let tg = window.Telegram.WebApp; //получаем объект webapp телеграма
let x = tg.initDataUnsafe;
let z = false;
   tg.expand(); //расширяем на все окно
  
   tg.MainButton.text = "Changed Text"; //изменяем текст кнопки
   tg.MainButton.setText("ЗАКАЗАТЬ"); //изменяем текст кнопки иначе ${x}
   tg.MainButton.show()
   tg.SettingsButton.show()
   tg.isClosingConfirmationEnabled = false;
   tg.BackButton.show()

     

   Telegram.WebApp.onEvent('mainButtonClicked', function () {
    if (!z) {
      tg.sendData(`Ваш Заказ отправлен! `);
       window.alert(` !!!`);
      
       
    } else {
      window.alert(`ОТКРОЙ ПРИЛОЖЕНИЕ ЧЕРЕЗ КНОПКУ НА КЛАВИАТУРЕ БОТА!!!`);
    }
});


       
   
