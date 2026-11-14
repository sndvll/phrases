/* ------------------------------------------------------------------------
   HOST LANGUAGE — Japanese.
   No `parts`: Japanese has no gendered politeness particle, so the
   Male/Female switch is hidden for this destination.
   No `night` category: the Thai bar-fine concepts do not apply here.
   No `egg` variants: the vegetarian split is a Thai kitchen concept.
   ------------------------------------------------------------------------ */
window.HOSTS = window.HOSTS || {};

window.HOSTS.ja = {
  code: 'ja',
  name: 'Japanese',
  native: '日本語',
  font: "'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', system-ui, sans-serif",

  hints: { eggOn: '卵OK', eggOff: '卵抜き' },

  categories: [
    { id: 'greet' },
    { id: 'food' },
    { id: 'spice' },
    { id: 'shop' },
    { id: 'travel' },
    { id: 'stay' },
    { id: 'night' },
  ],

  phrases: [
    { id: 'hello', cat: 'greet', script: 'こんにちは', latin: 'Konnichiwa' },
    { id: 'morning', cat: 'greet', script: 'おはようございます', latin: 'Ohayō gozaimasu' },
    { id: 'evening', cat: 'greet', script: 'こんばんは', latin: 'Konbanwa' },
    { id: 'thanks', cat: 'greet', script: 'ありがとうございます', latin: 'Arigatō gozaimasu' },
    { id: 'excuse', cat: 'greet', script: 'すみません', latin: 'Sumimasen' },
    { id: 'welcome', cat: 'greet', script: 'どういたしまして', latin: 'Dō itashimashite' },
    { id: 'goodluck', cat: 'greet', script: 'お気をつけて', latin: 'O-ki o tsukete' },
    { id: 'howareyou', cat: 'greet', script: 'お元気ですか', latin: 'O-genki desu ka', q: true },
    { id: 'imfine', cat: 'greet', script: '元気です', latin: 'Genki desu' },
    { id: 'dontunderstand', cat: 'greet', script: 'わかりません', latin: 'Wakarimasen' },
    { id: 'speakenglish', cat: 'greet', script: '英語を話せますか', latin: 'Eigo o hanasemasu ka', q: true },
    { id: 'isright', cat: 'greet', script: 'はい', latin: 'Hai' },
    { id: 'iswrong', cat: 'greet', script: 'いいえ', latin: 'Iie' },

    { id: 'order', cat: 'food', script: '注文お願いします', latin: 'Chūmon onegai shimasu' },
    { id: 'bill', cat: 'food', script: 'お会計お願いします', latin: 'O-kaikei onegai shimasu' },
    { id: 'howmuch', cat: 'food', script: 'いくらですか', latin: 'Ikura desu ka', q: true },
    { id: 'water', cat: 'food', script: 'お水をください', latin: 'O-mizu o kudasai' },
    { id: 'morerice', cat: 'food', script: 'ご飯のおかわりをください', latin: 'Gohan no okawari o kudasai' },
    { id: 'beer', cat: 'food', script: 'ビールをひとつください', latin: 'Bīru o hitotsu kudasai' },
    { id: 'noice', cat: 'food', script: '氷なしでお願いします', latin: 'Kōri nashi de onegai shimasu' },
    { id: 'takeaway', cat: 'food', script: '持ち帰りでお願いします', latin: 'Mochikaeri de onegai shimasu' },
    { id: 'delicious', cat: 'food', script: 'おいしい！', latin: 'Oishii!' },
    { id: 'imfull', cat: 'food', script: 'お腹いっぱいです', latin: 'Onaka ippai desu' },

    { id: 'notspicy', cat: 'spice', script: '辛くしないでください', latin: 'Karaku shinai de kudasai' },
    { id: 'littlespicy', cat: 'spice', script: '少し辛めでお願いします', latin: 'Sukoshi karame de onegai shimasu' },
    { id: 'spicy', cat: 'spice', script: '辛いです', latin: 'Karai desu' },
    { id: 'veryspicy', cat: 'spice', script: 'とても辛いです', latin: 'Totemo karai desu' },
    { id: 'vegetarian', cat: 'spice', script: 'ベジタリアンです', latin: 'Bejitarian desu',
      egg: { scriptOn: 'ベジタリアンです。卵は大丈夫です', scriptOff: 'ベジタリアンです。卵は抜きでお願いします',
             latinOn: 'Bejitarian desu. Tamago wa daijōbu desu', latinOff: 'Bejitarian desu. Tamago wa nuki de onegai shimasu' } },
    { id: 'vegan', cat: 'spice', script: 'ヴィーガンです', latin: 'Vīgan desu' },
    { id: 'nomeat', cat: 'spice', script: '肉なしでお願いします', latin: 'Niku nashi de onegai shimasu' },
    { id: 'nopork', cat: 'spice', script: '豚肉なしでお願いします', latin: 'Butaniku nashi de onegai shimasu' },
    { id: 'nomsg', cat: 'spice', script: 'うま味調味料なしでお願いします', latin: 'Umami chōmiryō nashi de onegai shimasu' },
    { id: 'peanutallergy', cat: 'spice', script: 'ピーナッツアレルギーがあります', latin: 'Pīnattsu arerugī ga arimasu' },

    { id: 'thisprice', cat: 'shop', script: 'これはいくらですか', latin: 'Kore wa ikura desu ka', q: true },
    { id: 'tooexp', cat: 'shop', script: '高すぎます', latin: 'Takasugimasu' },
    { id: 'cheaper', cat: 'shop', script: '安くなりますか', latin: 'Yasuku narimasu ka', q: true },
    { id: 'bag', cat: 'shop', script: '袋をもらえますか', latin: 'Fukuro o moraemasu ka', q: true },
    { id: 'tryon', cat: 'shop', script: '試着できますか', latin: 'Shichaku dekimasu ka', q: true },
    { id: 'othersize', cat: 'shop', script: 'ほかのサイズはありますか', latin: 'Hoka no saizu wa arimasu ka', q: true },
    { id: 'takeit', cat: 'shop', script: 'これにします', latin: 'Kore ni shimasu' },
    { id: 'dontwant', cat: 'shop', script: 'いりません', latin: 'Irimasen' },
    { id: 'shiphome', cat: 'shop', script: '海外に送れますか', latin: 'Kaigai ni okuremasu ka', q: true },

    { id: 'ticketwhere', cat: 'travel', script: '切符はどこで買えますか', latin: 'Kippu wa doko de kaemasu ka', q: true },
    { id: 'ticketprice', cat: 'travel', script: '切符はいくらですか', latin: 'Kippu wa ikura desu ka', q: true },
    { id: 'buswhere', cat: 'travel', script: 'バスはどこから出ますか', latin: 'Basu wa doko kara demasu ka', q: true },
    { id: 'airport', cat: 'travel', script: '空港までお願いします', latin: 'Kūkō made onegai shimasu' },
    { id: 'turnleft', cat: 'travel', script: '左に曲がってください', latin: 'Hidari ni magatte kudasai' },
    { id: 'turnright', cat: 'travel', script: '右に曲がってください', latin: 'Migi ni magatte kudasai' },
    { id: 'straight', cat: 'travel', script: 'まっすぐお願いします', latin: 'Massugu onegai shimasu' },
    { id: 'howfar', cat: 'travel', script: '遠いですか', latin: 'Tōi desu ka', q: true },
    { id: 'stophere', cat: 'travel', script: 'ここで止めてください', latin: 'Koko de tomete kudasai' },
    { id: 'meter', cat: 'travel', script: 'メーターを使ってください', latin: 'Mētā o tsukatte kudasai' },

    { id: 'roomavail', cat: 'stay', script: '空いている部屋はありますか', latin: 'Aite iru heya wa arimasu ka', q: true },
    { id: 'roomprice', cat: 'stay', script: '一泊いくらですか', latin: 'Ippaku ikura desu ka', q: true },
    { id: 'seeroom', cat: 'stay', script: '部屋を見せてもらえますか', latin: 'Heya o misete moraemasu ka', q: true },
    { id: 'wifi', cat: 'stay', script: 'Wi-Fiはありますか', latin: 'Waifai wa arimasu ka', q: true },
    { id: 'breakfast', cat: 'stay', script: '朝食は含まれていますか', latin: 'Chōshoku wa fukumarete imasu ka', q: true },
    { id: 'checkin', cat: 'stay', script: 'チェックインは何時ですか', latin: 'Chekku in wa nanji desu ka', q: true },
    { id: 'checkout', cat: 'stay', script: 'チェックアウトしたいです', latin: 'Chekku auto shitai desu' },
    { id: 'keepbag', cat: 'stay', script: '荷物を預かってもらえますか', latin: 'Nimotsu o azukatte moraemasu ka', q: true },

    { id: 'cheers', cat: 'night', script: '乾杯', latin: 'Kanpai' },
    { id: 'onemore', cat: 'night', script: 'もう一杯ください', latin: 'Mō ippai kudasai' },
    { id: 'glasswater', cat: 'night', script: 'お水を一杯ください', latin: 'O-mizu o ippai kudasai' },
    { id: 'recommend', cat: 'night', script: 'おすすめは何ですか', latin: 'Osusume wa nan desu ka', q: true },
    { id: 'noalcohol', cat: 'night', script: 'アルコールは飲みません', latin: 'Arukōru wa nomimasen' },
    { id: 'toilet', cat: 'night', script: 'トイレはどこですか', latin: 'Toire wa doko desu ka', q: true },
    { id: 'separatebill', cat: 'night', script: '別々でお願いします', latin: 'Betsubetsu de onegai shimasu' },
    { id: 'paycard', cat: 'night', script: 'カードは使えますか', latin: 'Kādo wa tsukaemasu ka', q: true },
    { id: 'closing', cat: 'night', script: '何時に閉まりますか', latin: 'Nanji ni shimarimasu ka', q: true },
    { id: 'goinghome', cat: 'night', script: '帰ります', latin: 'Kaerimasu' },
  ],
};
