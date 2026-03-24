const MATCH_URL_YOUTUBE = /(?:youtu\.be\/|youtube(?:-nocookie|education)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//;
const url = "https://youtu.be/4PyS7un8fgk?si=9Y3fKgWrY6zp1830";
console.log("Match:", MATCH_URL_YOUTUBE.test(url));
const match = url.match(MATCH_URL_YOUTUBE);
console.log("Groups:", match);
