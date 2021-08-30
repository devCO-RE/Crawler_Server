const puppeteer = require('puppeteer');
const $ = require('cheerio');

// const baseUrl1 = 'https://www.google.com/search?q=';
// const baseUrl2 = '&ei=o5b3YPmoI56Cr7wPp8iiOA&oq=apple&gs_lcp=Cgdnd3Mtd2l6EAMyBwgAELEDEEMyBQgAELEDMgQIABBDMgQIABBDMgcIABCxAxBDMgoIABCxAxCDARBDMgQIABBDMgcIABCxAxBDMgQIABBDMgUIABCxAzoHCAAQRxCwAzoCCAA6CAgAELEDEIMBSgQIQRgAUM7XB1jF4Qdg--IHaAJwAngAgAGpAYgB8QiSAQMwLjeYAQCgAQGqAQdnd3Mtd2l6sAEAyAEIwAEB&sclient=gws-wiz&ved=0ahUKEwi5hsaynvPxAhUewYsBHSekCAcQ4dUDCA4&uact=5';

//url = 'https://news.naver.com/main/read.naver?mode=LSD&mid=shm&sid1=102&oid=005&aid=0001466458';

async function printConsole(content) {
  const body = $.load(content);

  const id = 'pyi7628';
  const pw = 'duddlsdud1';
  const span = 'span.u_cbox_contents';
  const anchor = [];
  const text = [];

  body(span).each(function() {
    anchor.push(body(this));
  })
  anchor.forEach((e) => {
    text.push(e.text());
  })

  return text;
}

const crawl = async (url) => {
  const browser = await puppeteer.launch({
    headless: true,  // false 일 경우 실행 시 웹사이트 확인 가능
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil : "networkidle2" });

  const content = await page.content();
  const result =  await printConsole(content);
  await browser.close();
  return result;
};

module.exports = {
  crawl,
}