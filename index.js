const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {

    /* Open browser + login ukr.net */
    const browser = await puppeteer.launch({headless: false, defaultViewport: null});
    const page = await browser.newPage();

    const mailName = 'oleg.sock@ukr.net';
    const buttonWriteLetter = '//button[text()=\'Написати листа\']';
    const emailField = '//input[@name=\'toFieldInput\']';
    const emailTheme = '//input[@name=\'subject\']';

    await page.goto('https://accounts.ukr.net',{waitUntil:'networkidle0'});
    await page.type('#id-l',mailName,{delay: 20});
    await page.type('#id-p','Wtf14412',{delay: 20});
    const buttonLogin = await page.$x('//button[div[text()=\'Увійти\']]');
    await buttonLogin[0].click({delay:20});

    /* Sending 10 letters */
   for(let i = 0; i < 2; i++){

        await page.waitForXPath(buttonWriteLetter);
        const buttonWrite = await page.$x(buttonWriteLetter);
        await buttonWrite[0].click({delay:20});

        await page.waitForXPath(emailField);
        const inputMail = await page.$x(emailField);
        await inputMail[0].type(mailName,{delay: 30})

        const randomTextTheme = Math.random().toString(36).substring(2, 7);

        await page.waitForXPath(emailTheme);
        const inputTheme = await page.$x(emailTheme);
        await inputTheme[0].type(randomTextTheme,{delay:50});

        await page.waitForSelector("iframe");
        const elementFrame = await page.$(`#mce_${i}_ifr`);
        const frame = await elementFrame.contentFrame();
        await frame.waitForSelector('#tinymce');

        const randomTextMessage = Math.random().toString(36).substring(2, 12);

        const emailBody = await frame.$('#tinymce');
        await emailBody.type(randomTextMessage,{delay:20});
        const buttonSend = await page.$x('//button[text()=\'Надіслати\']');
        await buttonSend[0].click({delay:20});

        await page.waitForXPath('//button[text()=\'Написати ще\']', {visible: true});
        const buttonSendOneMore = await page.$x('//button[text()=\'Написати ще\']');
        await buttonSendOneMore[0].click({delay:20});

        await frame.parentFrame();
    }

    const buttonInEmail = await page.$x('//span[text()=\'Вхідні\']');
    await buttonInEmail[0].click({delay:20});

    const allMessages = await page.$x('//tbody/tr/td[contains(@class,\'subject\')]');
    const messageMap = new Map();

    for(let i = 0; i < allMessages.length;i++){

        const value = await page.evaluate(el => el.textContent, allMessages[i]);
        const dataArray = value.toString().split(" ");
        messageMap.set(dataArray[0],dataArray[1]);
        const splitValue = dataArray[1].toString().match(/\d/g);
        console.log(splitValue.length);
        const splitLeeteral =dataArray[1].toString().match(/[a-z]/g);
        console.log('===='+splitLeeteral.length);
    }

    ааа
    await browser.close();
})();