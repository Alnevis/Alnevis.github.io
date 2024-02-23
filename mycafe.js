let tg = window.Telegram.WebApp; //получаем объект webapp телеграма

   tg.expand(); //расширяем на все окно

   tg.MainButton.text = "Changed Text"; //изменяем текст кнопки
   tg.MainButton.setText("ЗАКАЗАТЬ"); //изменяем текст кнопки иначе

   let btn = document.getElementById("btn"); //получаем кнопку скрыть/показать  

   Telegram.WebApp.onEvent('mainButtonClicked', function(){
      tg.sendData(`Ваш Заказ отправлен!`);
      window.alert(`HELLO!`);
      //при клике на основную кнопку отправляем данные в строковом виде  
   });

