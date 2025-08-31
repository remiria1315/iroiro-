const { Server, Logger, World, EncryptionMode, ServerEvent } = require("socket-be");
const ROMAJI_MAP = (() => {
  const map = new Map();
  map.set("a", "あ");
  map.set("i", "い");
  map.set("yi", "い");
  map.set("u", "う");
  map.set("wu", "う");
  map.set("whu", "う");
  map.set("e", "え");
  map.set("o", "お");
  map.set("wha", "うぁ");
  map.set("whi", "うぃ");
  map.set("wi", "うぃ");
  map.set("whe", "うぇ");
  map.set("we", "うぇ");
  map.set("who", "うぉ");
  map.set("wyi", "ゐ");
  map.set("wye", "ゑ");
  map.set("la", "ぁ");
  map.set("xa", "ぁ");
  map.set("li", "ぃ");
  map.set("xi", "ぃ");
  map.set("lyi", "ぃ");
  map.set("xyi", "ぃ");
  map.set("lu", "ぅ");
  map.set("xu", "ぅ");
  map.set("le", "ぇ");
  map.set("xe", "ぇ");
  map.set("lye", "ぇ");
  map.set("xye", "ぇ");
  map.set("lo", "ぉ");
  map.set("xo", "ぉ");
  map.set("ye", "いぇ");
  map.set("ka", "か");
  map.set("ca", "か");
  map.set("ki", "き");
  map.set("ku", "く");
  map.set("cu", "く");
  map.set("qu", "く");
  map.set("ke", "け");
  map.set("ko", "こ");
  map.set("co", "こ");
  map.set("kya", "きゃ");
  map.set("kyi", "きぃ");
  map.set("kyu", "きゅ");
  map.set("kye", "きぇ");
  map.set("kyo", "きょ");
  map.set("qya", "くゃ");
  map.set("qyu", "くゅ");
  map.set("qyo", "くょ");
  map.set("qwa", "くぁ");
  map.set("qa", "くぁ");
  map.set("kwa", "くぁ");
  map.set("qwi", "くぃ");
  map.set("qi", "くぃ");
  map.set("qyi", "くぃ");
  map.set("qwu", "くぅ");
  map.set("qwe", "くぇ");
  map.set("qe", "くぇ");
  map.set("qye", "くぇ");
  map.set("qwo", "くぉ");
  map.set("qo", "くぉ");
  map.set("kwo", "くぉ");
  map.set("ga", "が");
  map.set("gi", "ぎ");
  map.set("gu", "ぐ");
  map.set("ge", "げ");
  map.set("go", "ご");
  map.set("gya", "ぎゃ");
  map.set("gyi", "ぎぃ");
  map.set("gyu", "ぎゅ");
  map.set("gye", "ぎぇ");
  map.set("gyo", "ぎょ");
  map.set("gwa", "ぐぁ");
  map.set("gwi", "ぐぃ");
  map.set("gwu", "ぐぅ");
  map.set("gwe", "ぐぇ");
  map.set("gwo", "ぐぉ");
  map.set("lka", "ヵ");
  map.set("xka", "ヵ");
  map.set("lke", "ヶ");
  map.set("xke", "ヶ");
  map.set("sa", "さ");
  map.set("si", "し");
  map.set("ci", "し");
  map.set("shi", "し");
  map.set("su", "す");
  map.set("se", "せ");
  map.set("ce", "せ");
  map.set("so", "そ");
  map.set("sya", "しゃ");
  map.set("sha", "しゃ");
  map.set("syi", "しぃ");
  map.set("syu", "しゅ");
  map.set("shu", "しゅ");
  map.set("sye", "しぇ");
  map.set("she", "しぇ");
  map.set("syo", "しょ");
  map.set("sho", "しょ");
  map.set("swa", "すぁ");
  map.set("swi", "すぃ");
  map.set("swu", "すぅ");
  map.set("swe", "すぇ");
  map.set("swo", "すぉ");
  map.set("za", "ざ");
  map.set("zi", "じ");
  map.set("ji", "じ");
  map.set("zu", "ず");
  map.set("ze", "ぜ");
  map.set("zo", "ぞ");
  map.set("zya", "じゃ");
  map.set("ja", "じゃ");
  map.set("jya", "じゃ");
  map.set("zyi", "じぃ");
  map.set("jyi", "じぃ");
  map.set("zyu", "じゅ");
  map.set("ju", "じゅ");
  map.set("jyu", "じゅ");
  map.set("zye", "じぇ");
  map.set("je", "じぇ");
  map.set("jye", "じぇ");
  map.set("zyo", "じょ");
  map.set("jo", "じょ");
  map.set("jyo", "じょ");
  map.set("ta", "た");
  map.set("ti", "ち");
  map.set("chi", "ち");
  map.set("tu", "つ");
  map.set("tsu", "つ");
  map.set("te", "て");
  map.set("to", "と");
  map.set("tya", "ちゃ");
  map.set("cha", "ちゃ");
  map.set("cya", "ちゃ");
  map.set("tyi", "ちぃ");
  map.set("cyi", "ちぃ");
  map.set("tyu", "ちゅ");
  map.set("chu", "ちゅ");
  map.set("cyu", "ちゅ");
  map.set("tye", "ちぇ");
  map.set("che", "ちぇ");
  map.set("cye", "ちぇ");
  map.set("tyo", "ちょ");
  map.set("cho", "ちょ");
  map.set("cyo", "ちょ");
  map.set("tsa", "つぁ");
  map.set("tsi", "つぃ");
  map.set("tse", "つぇ");
  map.set("tso", "つぉ");
  map.set("tha", "てゃ");
  map.set("thi", "てぃ");
  map.set("thu", "てゅ");
  map.set("the", "てぇ");
  map.set("tho", "てょ");
  map.set("twa", "とぁ");
  map.set("twi", "とぃ");
  map.set("twu", "とぅ");
  map.set("twe", "とぇ");
  map.set("two", "とぉ");
  map.set("da", "だ");
  map.set("di", "ぢ");
  map.set("du", "づ");
  map.set("de", "で");
  map.set("do", "ど");
  map.set("dya", "ぢゃ");
  map.set("dyi", "ぢぃ");
  map.set("dyu", "ぢゅ");
  map.set("dye", "ぢぇ");
  map.set("dyo", "ぢょ");
  map.set("dha", "でゃ");
  map.set("dhi", "でぃ");
  map.set("dhu", "でゅ");
  map.set("dhe", "でぇ");
  map.set("dho", "でょ");
  map.set("dwa", "どぁ");
  map.set("dwi", "どぃ");
  map.set("dwu", "どぅ");
  map.set("dwe", "どぇ");
  map.set("dwo", "どぉ");
  map.set("ltu", "っ");
  map.set("xtu", "っ");
  map.set("ltsu", "っ");
  map.set("xtsu", "っ");
  map.set("na", "な");
  map.set("ni", "に");
  map.set("nu", "ぬ");
  map.set("ne", "ね");
  map.set("no", "の");
  map.set("nya", "にゃ");
  map.set("nyi", "にぃ");
  map.set("nyu", "にゅ");
  map.set("nye", "にぇ");
  map.set("nyo", "にょ");
  map.set("ha", "は");
  map.set("hi", "ひ");
  map.set("hu", "ふ");
  map.set("fu", "ふ");
  map.set("he", "へ");
  map.set("ho", "ほ");
  map.set("hya", "ひゃ");
  map.set("hyi", "ひぃ");
  map.set("hyu", "ひゅ");
  map.set("hye", "ひぇ");
  map.set("hyo", "ひょ");
  map.set("fwa", "ふぁ");
  map.set("fa", "ふぁ");
  map.set("fwi", "ふぃ");
  map.set("fi", "ふぃ");
  map.set("fyi", "ふぃ");
  map.set("fwu", "ふぅ");
  map.set("fwe", "ふぇ");
  map.set("fe", "ふぇ");
  map.set("fye", "ふぇ");
  map.set("fwo", "ふぉ");
  map.set("fo", "ふぉ");
  map.set("fya", "ふゃ");
  map.set("fyu", "ふゅ");
  map.set("fyo", "ふょ");
  map.set("ba", "ば");
  map.set("bi", "び");
  map.set("bu", "ぶ");
  map.set("be", "べ");
  map.set("bo", "ぼ");
  map.set("bya", "びゃ");
  map.set("byi", "びぃ");
  map.set("byu", "びゅ");
  map.set("bye", "びぇ");
  map.set("byo", "びょ");
  map.set("va", "ヴぁ");
  map.set("vi", "ヴぃ");
  map.set("vu", "ヴ");
  map.set("ve", "ヴぇ");
  map.set("vo", "ヴぉ");
  map.set("vya", "ヴゃ");
  map.set("vyi", "ヴぃ");
  map.set("vyu", "ヴゅ");
  map.set("vye", "ヴぇ");
  map.set("vyo", "ヴょ");
  map.set("pa", "ぱ");
  map.set("pi", "ぴ");
  map.set("pu", "ぷ");
  map.set("pe", "ぺ");
  map.set("po", "ぽ");
  map.set("pya", "ぴゃ");
  map.set("pyi", "ぴぃ");
  map.set("pyu", "ぴゅ");
  map.set("pye", "ぴぇ");
  map.set("pyo", "ぴょ");
  map.set("ma", "ま");
  map.set("mi", "み");
  map.set("mu", "む");
  map.set("me", "め");
  map.set("mo", "も");
  map.set("mya", "みゃ");
  map.set("myi", "みぃ");
  map.set("myu", "みゅ");
  map.set("mye", "みぇ");
  map.set("myo", "みょ");
  map.set("ya", "や");
  map.set("yu", "ゆ");
  map.set("yo", "よ");
  map.set("lya", "ゃ");
  map.set("xya", "ゃ");
  map.set("lyu", "ゅ");
  map.set("xyu", "ゅ");
  map.set("lyo", "ょ");
  map.set("xyo", "ょ");
  map.set("ra", "ら");
  map.set("ri", "り");
  map.set("ru", "る");
  map.set("re", "れ");
  map.set("ro", "ろ");
  map.set("rya", "りゃ");
  map.set("ryi", "りぃ");
  map.set("ryu", "りゅ");
  map.set("rye", "りぇ");
  map.set("ryo", "りょ");
  map.set("wa", "わ");
  map.set("wo", "を");
  map.set("lwa", "ゎ");
  map.set("xwa", "ゎ");
  map.set("n", "ん");
  map.set("nn", "ん");
  map.set("n'", "ん");
  map.set("xn", "ん");

  // 促音を追加
  for (let [romaji, kana] of [...map.entries()]) {
    if (canStartFromSokuon(romaji)) {
      map.set(romaji[0] + romaji, "っ" + kana);
    }
  }

  return map;
})();

// 促音から開始可能かどうか
function canStartFromSokuon(romaji) {
  return !["a", "i", "u", "e", "o", "n"].includes(romaji[0]);
}

function conv(romaji) {
  let result = romaji;

  // まず nn と n' を先に置換
  result = result.replace(/nn/g, "ん").replace(/n'/g, "ん");

  // 残りを長さ順に置換
  for (let [key, value] of [...ROMAJI_MAP.entries()].sort((a, b) => b[0].length - a[0].length)) {
    if (["nn", "n'"].includes(key)) continue; // もう置換済み
    result = result.split(key).join(value);
  }
  result = result.toLowerCase();
  return result;
}
function asciiToFullWidth(str) {
  return str
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);

      // 半角スペースを全角スペースに
      if (code === 0x20) return String.fromCharCode(0x3000);

      // 英数字は変換しない
      if (
        (code >= 0x30 && code <= 0x39) || // 0-9
        (code >= 0x41 && code <= 0x5a) || // A-Z
        (code >= 0x61 && code <= 0x7a) // a-z
      ) {
        return char;
      }

      // 半角記号（!〜~）を全角に
      if (code >= 0x21 && code <= 0x7e) return String.fromCharCode(code + 0xfee0);

      return char; // それ以外はそのまま
    })
    .join("");
}

console.log(conv("tenna")); // → てんな

const options = {
  port: 19132, // 通常のBedrockデフォルトポート
  debug: true,
  commandVersion: "1.19.70",
  disableEncryption: true,
  encryptionMode: EncryptionMode.Aes256cfb8,
};
// サーバーインスタンスを作成
const server = new Server(options);
String.prototype.replace_ = function (replacements) {
  let result = this;
  for (const [from, to] of replacements) {
    const regex = new RegExp(from, "g");
    result = result.replace(regex, to);
  }
  return result;
};
async function searchWikipediaMC(query) {
  const url = `https://ja.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json`;
  const res = await fetch(url);
  const data = await res.json();

  if (!data.query || !data.query.search || data.query.search.length === 0) return null;

  const item = data.query.search[0]; // 0番目だけ
  const snippet = item.snippet.replace(/<[^>]*>/g, ""); // HTMLタグ除去
  return `§l${item.title}§r\n${snippet}`;
}
const ranges = {
  HG: { start: 0x3041, end: 0x3096 }, // ひらがな
  KK: { start: 0x30a1, end: 0x30f6 }, // カタカナ
};
function isRomaji(str) {
  str = str.replace(/ /g, "");
  // 文字列の全ての文字がASCII英字かどうかチェック
  for (let char of str) {
    const code = char.charCodeAt(0);
    // ひらがな・カタカナなら false
    for (const key in ranges) {
      if (code >= ranges[key].start && code <= ranges[key].end) {
        return false;
      }
    }
    // ASCII 英字以外は false
    if (code < 0x00 || code > 0x7f) {
      return false;
    }
  }
  return true;
}
let dscmode = false;
let romajimode = false;
let whispermode = false;
const send = (...messages) => {
  if (whispermode) {
    server.broadcastCommand("tell @s §r\n" + messages.join("\n"));
  } else {
    server.broadcastMessage(messages.join("\n"));
  }
};
server.on(ServerEvent.PlayerChat, async (event) => {
  let { world, sender, message, type } = event;

  let isRoma = isRomaji(message);
  message = message.replace_([
    ["IK", "I KNOW§o§7(知ってる)§r"],
    ["RN", "RIGHT NOW§o§7(今すぐ)§r"],
    ["BRB", "BE RIGHT BACK§o§7(すぐ戻る)§r"],
    ["LOL", "LAUGHING OUT LOUD§o§7(大笑い)§r"],
    ["BTW", "BY THE WAY§o§7(ところで)§r"],
    ["OMG", "OH MY GOD§o§7(なんてこった)§r"],
    ["IDK", "I DON'T KNOW§o§7(知らん)§r"],
    ["FYI", "FOR YOUR INFORMATION§o§7(参考までに)§r"],
    ["TTYL", "TALK TO YOU LATER§o§7(あとで話そう)§r"],
    ["IMO", "IN MY OPINION§o§7(私の意見では)§r"],
    ["BFF", "BEST FRIEND FOREVER§o§7(親友)§r"],
    ["SMH", "SHAKING MY HEAD§o§7(呆れる)§r"],
    ["LMAO", "LAUGHING MY ASS OFF§o§7(大爆笑)§r"],
    ["ILBB", "I'LL BE BACK§o§7(戻るよ)§r"],
    ["WH", "WHAT§o§7(何)§r"],
    ["YTS", "YOU TOO SLOW§o§7(お前遅すぎ)§r"],
    ["YEP", "YEP§o§7(うん)§r"],
    ["NOPE", "NO§§PE§o§7(やだ)§r"],
    ["NOP", "NO OPERATION§o§7(何もするな)§r"],
    ["RBX", "ROBLOX"],
    ["MC", "MINECRAFT"],
    ["EN", "ENGLISH"],
    [("DN", "DIE NOW§o§7(死ね)§r")],
  ]);

  const kana = isRomaji(message) ? asciiToFullWidth(conv(message)) : message;
  if (message == ".togglediscord") {
    dscmode = !dscmode;
    send("§l§9Discord§r§aモードを" + dscmode + "に設定しました");
  }
  if (message == ".toggleromaji") {
    send("§l§6ローマ字§r§aモードを" + dscmode + "に設定しました");
    romajimode = !romajimode;
  }
  if (message == ".togglewhisper") {
    whispermode = !whispermode;
  }
  if (message.startsWith(".getid")) {
    let args = message.slice(7).trim().split(" ");
    let searchTerm = args[0];
    let all = {};
    all.block = await world.queryData("block");
    all.item = await world.queryData("item");
    all.entity = await world.queryData("mob");
    // もしAPIからデータが取得できない場合、先ほどのデータを使用
    if (
      (!all.block || all.block.length === 0) &&
      (!all.item || all.item.length === 0) &&
      (!all.entity || all.entity.length === 0)
    ) {
      send("§eAPIからデータを取得できません。代替データを使用します...");

      // 先ほど提供されたデータから検索（最初のブロックデータのみ使用）
      // 実際の環境では、これを適切なデータソースに置き換えてください
      console.log("Using fallback: trying to get any available data");

      // 最後の手段：直接データ検索を試行
      try {
        let testData = await world.queryData();
        console.log("Direct queryData result:", testData);

        if (testData && Array.isArray(testData)) {
          all.item = testData; // 全データをアイテムとして扱う
        }
      } catch (e) {
        console.log("Direct query also failed:", e);
      }
    }
    if (!searchTerm || searchTerm === "") {
      send("§c使用方法: .getid <検索名>");
      return;
    }

    // データを安全に取得（複数の方法を試す）
    try {
      // 方法1: 直接取得
      all.block = await world.queryData("block");
      all.item = await world.queryData("item");
      all.entity = await world.queryData("mob");

      // 方法2: もし上記が失敗したら別のキーを試す
      if (!all.block) all.block = await world.queryData("blocks");
      if (!all.item) all.item = await world.queryData("items");
      if (!all.entity) all.entity = (await world.queryData("entities")) || (await world.queryData("mobs"));

      // 方法3: 全データを取得してカテゴリ分けする場合
      if (!all.block && !all.item && !all.entity) {
        let allData = await world.queryData();
        if (allData && Array.isArray(allData)) {
          // データをカテゴリごとに分類（推測）
          all.block = allData.filter(
            (item) =>
              item.name &&
              (item.name.includes("Block") ||
                item.name.includes("Slab") ||
                item.name.includes("Stair") ||
                item.name.includes("Wall") ||
                (item.id && item.id.includes("_block")))
          );
          all.item = allData.filter(
            (item) =>
              item.name &&
              (item.name.includes("Sword") ||
                item.name.includes("Pickaxe") ||
                item.name.includes("Axe") ||
                item.name.includes("Shovel") ||
                item.name.includes("Hoe") ||
                item.name.includes("Helmet") ||
                item.name.includes("Chestplate") ||
                item.name.includes("Leggings") ||
                item.name.includes("Boots"))
          );
          all.entity = allData.filter(
            (item) =>
              item.name &&
              (item.name.includes("Zombie") ||
                item.name.includes("Skeleton") ||
                item.name.includes("Creeper") ||
                item.name.includes("Spider"))
          );

          // 残りは全部itemとして扱う
          let usedItems = [...all.block, ...all.item, ...all.entity];
          let remainingItems = allData.filter((item) => !usedItems.includes(item));
          all.item = [...all.item, ...remainingItems];
        }
      }

      console.log("Raw data check:");
      console.log("Block data:", all.block);
      console.log("Item data:", all.item);
      console.log("Entity data:", all.entity);
    } catch (error) {
      send("§cデータの取得に失敗しました: " + error.message);
      console.log("Error getting data:", error);
      return;
    }

    let results = [];

    // デバッグ情報
    console.log(`Searching for: "${searchTerm}"`);
    console.log(`Block data length: ${all.block ? all.block.length : 0}`);
    console.log(`Item data length: ${all.item ? all.item.length : 0}`);
    console.log(`Entity data length: ${all.entity ? all.entity.length : 0}`);

    // 各カテゴリで検索
    for (let [category, dataArray] of Object.entries(all)) {
      // データが存在し、配列であることを確認
      if (!dataArray || !Array.isArray(dataArray) || dataArray.length === 0) {
        console.log(`${category} data is empty or not an array`);
        continue;
      }

      console.log(`Searching in ${category}: ${dataArray.length} items`);

      for (let i = 0; i < dataArray.length; i++) {
        let data = dataArray[i];

        // データの構造を確認
        if (!data || typeof data !== "object") {
          continue;
        }

        let shouldAdd = false;

        // 名前での検索（部分一致、大文字小文字を無視）
        if (data.name && typeof data.name === "string" && data.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          shouldAdd = true;
        }

        // IDでの検索（部分一致、大文字小文字を無視）
        if (data.id && typeof data.id === "string" && data.id.toLowerCase().includes(searchTerm.toLowerCase())) {
          shouldAdd = true;
        }

        if (shouldAdd) {
          let id = data.id || "unknown";
          let aux = data.aux !== undefined ? data.aux : 0;

          results.push({
            category: category,
            name: data.name || "Unknown",
            id: id,
            aux: aux,
          });
        }
      }
    }

    // 結果の表示
    if (results.length === 0) {
      send(`§c'${searchTerm}'に一致するアイテムが見つかりませんでした`);
    } else {
      send(`§a'${searchTerm}'の検索結果 (${results.length}件):`);

      // 重複を除去
      let uniqueResults = results.filter(
        (result, index, self) => index === self.findIndex((r) => r.id === result.id && r.aux === result.aux)
      );

      // 結果を表示（最大10件まで）
      for (let i = 0; i < Math.min(uniqueResults.length, 10); i++) {
        let result = uniqueResults[i];
        let categoryIcon = {
          entity: "§e[Entity]",
          block: "§6[Block]",
          item: "§b[Item]",
        };

        send(`${categoryIcon[result.category]} §f${result.name}: §a${result.id}:${result.aux}`);
      }

      if (uniqueResults.length > 10) {
        send(`§7... および他${uniqueResults.length - 10}件`);
      }
    }
  }
  if (message === ".status") {
    let successCount = 0;
    let totalAttempts = 0;
    let errorCount = 0;
    const start = performance.now(); // 高精度タイマー
    const targetInterval = 50; // 目標間隔（ms）
    const testDuration = 1000; // テスト期間（ms）

    const runTest = async () => {
      const startTime = performance.now();

      while (performance.now() - startTime < testDuration) {
        const iterationStart = performance.now();
        totalAttempts++;

        try {
          // コマンドが完了するまで待つ
          await world.runCommand('tell @s "tps_testing #' + (successCount + errorCount) + '"');
          successCount++;
        } catch (error) {
          errorCount++;
        }

        // ping/処理時間を考慮して次のコマンドまで待機
        const elapsed = performance.now() - iterationStart;
        const waitTime = Math.max(0, targetInterval - elapsed);

        if (waitTime > 0) await new Promise((resolve) => setTimeout(resolve, waitTime));
        if (waitTime === 0) await new Promise((resolve) => setTimeout(resolve, 1));
      }
    };

    runTest()
      .then(() => {
        const actualElapsed = (performance.now() - start) / 1000;
        const actualTPS = Math.min((successCount / actualElapsed) * 2, 20);
        const successRate = ((successCount / totalAttempts) * 100).toFixed(1);
        const averageInterval = (actualElapsed * 1000) / totalAttempts;
        const minecraftColors = {
          6: { ansi256: "\x1b[33m" },
          7: { name: "gray", r: 170, g: 170, b: 170, hex: "#AAAAAA", ansi256: "\x1b[30m" },
          a: { name: "green", r: 85, g: 255, b: 85, hex: "#55FF55", ansi256: "\x1b[32m" },
          c: { name: "red", r: 255, g: 85, b: 85, hex: "#FF5555", ansi256: "\x1b[31m" },
          e: { name: "yellow", r: 255, g: 255, b: 85, hex: "#FFFF55", ansi256: "\x1b[33m" },
        };
        // ヘルパー関数: §コードをANSIに変換
        function convertMinecraftColorsToAnsi(text) {
          return (
            text.replace(/§([0-9a-g])/gi, (_, code) => {
              const c = minecraftColors[`${code.toLowerCase()}`];
              return c ? c.ansi256 : "";
            }) + "\x1b[0m"
          ); // 最後にリセット
        }
        let disp = [
          `§6=== サーバーパフォーマンス診断 ===`,
          `§a成功実行数: §e${successCount}§7/${totalAttempts}§r`,
          `§a実行成功率: §e${successRate}%§r`,
          `§aエラー数: §c${errorCount}§r`,
          `§a実際のTPS: §e${actualTPS.toFixed(2)}§r`,
          `§a平均実行間隔: §e${averageInterval.toFixed(1)}ms§r`,
          `§a測定時間: §e${actualElapsed.toFixed(3)}秒§r`,
          `§aping: §e${world.averagePing}ms§r`,
          `§7目標間隔: ${targetInterval}ms | 理論最大TPS: ${(1000 / targetInterval).toFixed(1)}§r`,
        ].join("\n");
        if (dscmode) world.runCommand("say §k§0```ansi\n" + convertMinecraftColorsToAnsi(disp) + "§k§0```");
        send(disp);
      })
      .catch((error) => {
        send(`§cテスト実行中にエラーが発生しました: ${error.message}`);
      });
  }

  server.worlds.forEach((wor) => {
    if (wor == world) return;
    send(sender.name + "§r" + " : " + kana);
  });
  if (isRoma && romajimode) server.broadcastMessage(sender.name + "§r" + " : " + kana);
});
