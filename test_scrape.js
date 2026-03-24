const videoId = "cLruUL..._fake"; // I will use the real one from previously: 4PyS7un8fgk
const testUrl = "https://www.youtube.com/watch?v=4PyS7un8fgk";

async function run() {
  try {
    const response = await fetch(testUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      }
    });
    const html = await response.text();
    console.log("HTML length:", html.length);
    const match1 = html.match(/"lengthSeconds":"(\d+)"/);
    const match2 = html.match(/"approxDurationMs":"(\d+)"/);
    console.log("match1 lengthSeconds:", match1 ? match1[1] : "failed");
    console.log("match2 approxDurationMs:", match2 ? match2[1] : "failed");
    if (!match1 && !match2) {
       console.log("Writing head to inspect if bot block present:");
       console.log(html.substring(0, 1000));
    }
  } catch (e) {
    console.error(e);
  }
}

run();
