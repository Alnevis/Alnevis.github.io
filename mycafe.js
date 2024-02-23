let tg = window.Telegram.WebApp; //получаем объект webapp телеграма
let x = tg.initData;
   tg.expand(); //расширяем на все окно
  
   tg.MainButton.text = "Changed Text"; //изменяем текст кнопки
   tg.MainButton.setText("ЗАКАЗАТЬ"); //изменяем текст кнопки иначе
   tg.MainButton.show()
   tg.SettingsButton.show()
   tg.isClosingConfirmationEnabled = true;
   

     

   Telegram.WebApp.onEvent('mainButtonClicked', function () {
    if (!!Telegram.WebApp.initDataUnsafe) {
      window.alert(`ОТКРОЙ ПРИЛОЖЕНИЕ ЧЕРЕЗ КНОПКУ НА КЛАВИАТУРЕ БОТА!!!`);
       
    } else {
      tg.sendData(`Ваш Заказ отправлен! ${x}`);
    }
});


       
   
