let tg = window.Telegram.WebApp; //получаем объект webapp телеграма

   tg.expand(); //расширяем на все окно
  
   tg.MainButton.text = "Changed Text"; //изменяем текст кнопки
   tg.MainButton.setText("ЗАКАЗАТЬ"); //изменяем текст кнопки иначе
   tg.MainButton.show()
   

     

   Telegram.WebApp.onEvent('mainButtonClicked', function(){
      
      if (!Telegram.WebApp.initDataUnsafe) {window.alert(`ОТКРОЙ ПРИЛОЖЕНИЕ ЧЕРЕЗ КНОПКУ НА КЛАВИАТУРЕ БОТА!!!`);
    }else {tg.sendData(`Ваш Заказ отправлен!`)};
       
   });

