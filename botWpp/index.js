const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );

  // Navega para o Whatsapp
  await page.goto("https://web.whatsapp.com/");

  // Aguarda o carregamento da página
  await page.waitForSelector('span[title="Riquelme"]');

  // Clica no contato
  await page.click('span[title="Riquelme"]');

  // Aguarda um pouco antes de começar a enviar mensagens
  await delay(3000);

  // Envia 10 mensagens
  for (let index = 0; index < 500; index++) {
    // Encontra o campo de entrada de texto usando XPath
    const input = await page.$x('//*[@id="main"]/footer/div[1]/div/span[2]/div/div[2]/div[1]/div/div[1]/p');

    if (input && input[0]) {
    await input[0].type('Opa!');
}
    await page.keyboard.press('Enter');
    
  }
})();

async function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

