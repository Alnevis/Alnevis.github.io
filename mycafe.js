let tg = window.Telegram.WebApp; //получаем объект webapp телеграма

   tg.expand(); //расширяем на все окно
  
   tg.MainButton.text = "Changed Text"; //изменяем текст кнопки
   tg.MainButton.setText("ЗАКАЗАТЬ"); //изменяем текст кнопки иначе
   tg.MainButton.show()
   tg.SettingsButton.show()
   

     

   Telegram.WebApp.onEvent('mainButtonClicked', function () {
    if (!Telegram.WebApp.initDataUnsafe) {
        tg.sendData(`Ваш Заказ отправлен!`);
    } else {
        window.alert(`ОТКРОЙ ПРИЛОЖЕНИЕ ЧЕРЕЗ КНОПКУ НА КЛАВИАТУРЕ БОТА!!!`);
    }
});


       
   
