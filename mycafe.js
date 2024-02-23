let tg = window.Telegram.WebApp; //получаем объект webapp телеграма

   tg.expand(); //расширяем на все окно
  
   tg.MainButton.text = "Changed Text"; //изменяем текст кнопки
   tg.MainButton.setText("ЗАКАЗАТЬ"); //изменяем текст кнопки иначе
   tg.MainButton.show()
   

   function MainButtonCall() {
    tg.sendData('Ваш Заказ отправлен!');
    window.alert('ОТКРОЙ ПРИЛОЖЕНИЕ ЧЕРЕЗ КНОПКУ НА КЛАВИАТУРЕ БОТА!!!');
    // при клике на основную кнопку отправляем данные в строковом виде
  };

   Telegram.WebApp.onEvent('mainButtonClicked', MainButtonCall);



