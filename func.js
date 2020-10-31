async function buttonClick(locator){
    await page.waitForXPath(locator);
    const buttonWrite = await page.$x(locator);
    await buttonWrite[0].click({delay:20});
}

module.exports ={
    buttonClick
}
