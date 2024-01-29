const puppeteer = require('puppeteer');
(async()=>{
    const browser = await puppeteer.launch({headless:false, args:[

        '--window-size=1280,800'

    ]})
    const page = await browser.newPage();

    page.setViewport({width:1280,height:800});

    await page.goto('https://youtube.com');
    await page.waitForSelector('input[type=text]#search');

    await page.click('input[type=text]#search');

    await page.type('input[type=text]#search','Coisa de nerd');



    await page.click('#search-icon-legacy');



    await delay(5000);



    await page.evaluate(()=>{

        window.scrollTo(0,400);

    })

    

    await page.waitForSelector('div.grid-subheader h2.style-scope span#title');

    await page.evaluate ( () => {

        let videos = document.querySelectorAll('a#video-title');

        videos[1].click();

    });



    await delay(4000);



    await page.evaluate(()=>{

        window.scrollTo(0,600);

    })



    await delay(4000);



    await page.evaluate ( () => {

        let coments = document.querySelectorAll('#main.ytd-comment-renderer yt-formatted-string#content-text');

        alert(coments[0].textContent);

        alert(coments[1].textContent);

    })





})();





function delay(time) {

    return new Promise(function (resolve) {

      setTimeout(resolve, time);

    });

  }