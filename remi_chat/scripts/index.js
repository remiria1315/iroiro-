import * as mc from "mojang-minecraft";
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

  for (let [romaji, kana] of [...map.entries()]) {
    if (canStartFromSokuon(romaji)) {
      map.set(romaji[0] + romaji, "っ" + kana);
    }
  }

  return map;
})();

function canStartFromSokuon(romaji) {
  return !["a", "i", "u", "e", "o", "n"].includes(romaji[0]);
}

function conv(romaji) {
  let result = romaji;

  result = result.replace(/nn/g, "ん").replace(/n'/g, "ん");

  for (let [key, value] of [...ROMAJI_MAP.entries()].sort((a, b) => b[0].length - a[0].length)) {
    if (["nn", "n'"].includes(key)) continue;
    result = result.split(key).join(value);
  }
  result = result.toLowerCase();
  return result;
}
function asciiToFullWidth(str) {
  return str
    .replace(/\//g, "・")
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);

      if (code === 0x20) return String.fromCharCode(0x3000);

      if ((code >= 0x30 && code <= 0x39) || (code >= 0x41 && code <= 0x5a) || (code >= 0x61 && code <= 0x7a)) {
        return char;
      }

      if (code >= 0x21 && code <= 0x7e) return String.fromCharCode(code + 0xfee0);

      return char;
    })
    .join("");
}
String.prototype.replace_ = function (replacements) {
  let result = this;
  for (const [from, to] of replacements) {
    const regex = new RegExp(from, "g");
    result = result.replace(regex, to);
  }
  return result;
};
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
mc.world.events.beforeChat.subscribe((ev) => {
  let message = conv(
    ev.message.replace_([
      [":IK:", "I KNOW§o§7(知ってる)§r§6"],
      [":RN:", "RIGHT NOW§o§7(今すぐ)§r§6"],
      [":BRB:", "BE RIGHT BACK§o§7(すぐ戻る)§r§6"],
      [":LOL:", "LAUGHING OUT LOUD§o§7(大笑い)§r§6"],
      [":BTW:", "BY THE WAY§o§7(ところで)§r§6"],
      [":OMG:", "OH MY GOD§o§7(なんてこった)§r§6"],
      [":IDK:", "I DON'T KNOW§o§7(わからない)§r§6"],
      [":FYI:", "FOR YOUR INFORMATION§o§7(参考までに)§r§6"],
      [":TTYL:", "TALK TO YOU LATER§o§7(あとで話そう)§r§6"],
      [":IMO:", "IN MY OPINION§o§7(私の意見では)§r§6"],
      [":BFF:", "BEST FRIEND FOREVER§o§7(親友)§r§6"],
      [":SMH:", "SHAKING MY HEAD§o§7(呆れる)§r§6"],
      [":LMAO:", "LAUGHING MY ASS OFF§o§7(大爆笑)§r§6"],
      [":ILBB:", "I'LL BE BACK§o§7(戻るよ)§r§6"],
      [":WH:", "WHAT§o§7(何)§r§6"],
      [":YTS:", "YOU TOO SLOW§o§7(お前遅すぎ)§r§6"],
      [":YEP:", "YEP§o§7(うん)§r§6"],
      [":NOPE:", "NO​PE§o§7(やだ)§r§6"],
      [":NOP:", "NO OPERATION§o§7(何もするな)§r§6"],
      [":WSU:", "WHAT'S UP§o§7(どうしたの)§r§6"],
      [":WTH:", "WHAT THE HELL§o§7(何だよ)§r§6"],
      [":WTF:", "WHAT THE FUCK§o§7(マジかよ)§r§6"],
    ])
  );
  ev.message = ev.message + (isRomaji(ev.message) ? " §6(" + asciiToFullWidth(message) + "§r§6)" : "");
});
