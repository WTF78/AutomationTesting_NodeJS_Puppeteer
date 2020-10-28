
const puppeteer = require('puppeteer');
const fs = require('fs');
const mailName = 'oleg.sock@ukr.net';
const buttonWriteLetter = '//button[text()=\'Написати листа\']';
const emailField = '//input[@name=\'toFieldInput\']';

(async () => {
    /* Open browser + login ukr.net */
    const browser = await puppeteer.launch({headless: false,executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'});
    const page = await browser.newPage();
    await page.goto('https://accounts.ukr.net',{waitUntil:'networkidle0'});
    await page.type('#id-l',mailName,{delay: 20});
    await page.type('#id-p','Wtf14412',{delay: 20});
    const buttonLogin = await page.$x('//button[div[text()=\'Увійти\']]');
    await buttonLogin[0].click({delay:20});

    /* Sending 10 letters */
   /* for(let i = 0; i < 10; i++){

        await page.waitForXPath(buttonWriteLetter);
        const buttonWrite = await page.$x(buttonWriteLetter);
        await buttonWrite[0].click({delay:20});
        await page.waitForXPath(emailField);
        const inputMail = await page.$x(emailField);
        await inputMail[0].type(mailName,{delay: 20})
        // const inputMailText = await page.$x('//body[@id=\'tinymce\']', {delay: 20});
        const randomText = Math.random().toString(36).substring(2, 12);
        await page.waitForSelector("iframe");
        const elementFrame = await page.$(`#mce_${i}_ifr`);
        const frame = await elementFrame.contentFrame();
        await frame.waitForSelector('#tinymce');

        const emailBody = await frame.$('#tinymce');
        await emailBody.type(randomText);
        const buttonSend = await page.$x('//button[text()=\'Надіслати\']');
        await buttonSend[0].click({delay:20});
        await page.waitForXPath('//button[text()=\'Написати ще\']', {visible: true});
        const buttonSendOneMore = await page.$x('//button[text()=\'Написати ще\']');
        await buttonSendOneMore[0].click({delay:20});
        await frame.parentFrame();
    }
*/
    const buttonInEmail = await page.$x('//span[text()=\'Вхідні\']');
    await buttonInEmail[0].click({delay:20});
    /* Checking sent Mails */
    for(let i = 0; i < 10;i++){

    }

    ааа
    await browser.close();
})();