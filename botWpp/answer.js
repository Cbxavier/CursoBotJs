const puppeteer = require('puppeteer');
(async () => {

  const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();

    await page.setUserAgent(

      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"

    );

    //Navigates to Whatsapp

    await page.goto("https://web.whatsapp.com/");

    await page.waitForSelector('span[title="Dropzin dos crias"]');

    // Clica no contato
    await page.click('span[title="Dropzin dos crias"]');
  
    await delay(2000);
    var lastMessagesCount = 0;

    await page.evaluate(()=>{
      let messagesIn = document.querySelectorAll('.message-in');
      lastMessagesCount = messagesIn.length;

    })

    console.log("no momento possuimos apenas: "+ lastMessagesCount);

    while(true){

      await page.evaluate(()=>{

          let messagesIn = document.querySelectorAll('.message-in');

          console.log(lastMessagesCount);

          if(messagesIn.length > lastMessagesCount){

            console.log("Nova mensagem!");
            const input =  page.$x('//*[@id="main"]/footer/div[1]/div/span[2]/div/div[2]/div[1]/div/div[1]/p');
            
             input[0].type('Gosto!');
             page.keyboard.press('Enter');
    

            console.log(messagesIn[messagesIn.length-1].textContent);

          }else{

            console.log("Nada novo :(");

          }

      })

      await delay(2000);

    }
})();

function delay(time) {

  return new Promise(function (resolve) {

    setTimeout(resolve, time);

  });

}