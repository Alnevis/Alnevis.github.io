let tg = window.Telegram.WebApp; //получаем объект webapp телеграма 
tg.MainButton.show()
tg.MainButton.enable()
  console.log("start1111")
  function getBotInfo() {
   // Replace 'YOUR_BOT_TOKEN' with your actual bot token
   const botToken = '6566526748:AAEKT_vmAfS5IXEvw7vJcX8qri-4YtUHGJ4';

   // Telegram Bot API endpoint for the getMe method
   const apiUrl = `https://api.telegram.org/bot${botToken}/getMe`;

   // Make a fetch request to the Telegram Bot API
   fetch(apiUrl)
       .then(response => {
           if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
           }
           return response.json();
       })
       .then(data => {
           if (data && data.ok) {
               console.log(data);
               alert(`Bot ID: ${data.result.id}\nBot Username: ${data.result.username}`);
           } else {
               throw new Error(`Invalid response format`);
           }
       })
       .catch(error => {
           console.error('Error getting bot information:', error);
           alert('Error getting bot information. Check console for details.');
       });
}
  getBotInfo()
  console.log("start6")
  Telegram.WebApp.onEvent('mainButtonClicked', function(){
   let profName = tg.initDataUnsafe.user.first_name   
    console.log(profName)
});
   /* let usercard = document.getElementById("usercard"); //получаем блок usercard

   
   profName.innerText = `
   ${tg.initDataUnsafe.user.last_name}
   ${tg.initDataUnsafe.user.username} (${tg.initDataUnsafe.user.language_code})`;
   //выдем имя, "фамилию", через тире username и код языка
   usercard.appendChild(profName); //добавляем

   let userid = document.createElement('p'); //создаем еще параграф
   userid.innerText = `${tg.initDataUnsafe.user.id}`; //показываем user_id
   usercard.appendChild(userid); //добавляем */

         
   //работает только в attachment menu
   // let pic = document.createElement('img'); //создаем img
   // pic.src = tg.initDataUnsafe.user.photo_url; //задаём src
   // usercard.appendChild(pic); //добавляем элемент в карточку