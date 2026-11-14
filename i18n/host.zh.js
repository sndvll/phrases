/* ------------------------------------------------------------------------
   HOST LANGUAGE — Chinese (Simplified, mainland).
   No `parts`, no `night` category. `latin` holds pinyin with tone marks.
   ------------------------------------------------------------------------ */
window.HOSTS = window.HOSTS || {};

window.HOSTS.zh = {
  code: 'zh',
  name: 'Chinese',
  native: '简体中文',
  font: "'Noto Sans SC', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', system-ui, sans-serif",

  categories: [
    { id: 'greet' },
    { id: 'food' },
    { id: 'spice' },
    { id: 'shop' },
    { id: 'travel' },
    { id: 'stay' },
  ],

  phrases: [
    { id: 'hello', cat: 'greet', script: '你好', latin: 'Nǐ hǎo' },
    { id: 'morning', cat: 'greet', script: '早上好', latin: 'Zǎoshang hǎo' },
    { id: 'evening', cat: 'greet', script: '晚上好', latin: 'Wǎnshang hǎo' },
    { id: 'thanks', cat: 'greet', script: '非常感谢', latin: 'Fēicháng gǎnxiè' },
    { id: 'excuse', cat: 'greet', script: '不好意思', latin: 'Bù hǎoyìsi' },
    { id: 'welcome', cat: 'greet', script: '不客气', latin: 'Bù kèqi' },
    { id: 'goodluck', cat: 'greet', script: '一路平安', latin: 'Yílù píng’ān' },
    { id: 'howareyou', cat: 'greet', script: '你好吗', latin: 'Nǐ hǎo ma', q: true },
    { id: 'imfine', cat: 'greet', script: '我很好', latin: 'Wǒ hěn hǎo' },
    { id: 'dontunderstand', cat: 'greet', script: '我听不懂', latin: 'Wǒ tīng bù dǒng' },
    { id: 'speakenglish', cat: 'greet', script: '你会说英语吗', latin: 'Nǐ huì shuō yīngyǔ ma', q: true },
    { id: 'isright', cat: 'greet', script: '对', latin: 'Duì' },
    { id: 'iswrong', cat: 'greet', script: '不对', latin: 'Bù duì' },

    { id: 'order', cat: 'food', script: '我要点菜', latin: 'Wǒ yào diǎn cài' },
    { id: 'bill', cat: 'food', script: '买单', latin: 'Mǎidān' },
    { id: 'howmuch', cat: 'food', script: '多少钱', latin: 'Duōshao qián', q: true },
    { id: 'water', cat: 'food', script: '请给我水', latin: 'Qǐng gěi wǒ shuǐ' },
    { id: 'morerice', cat: 'food', script: '再来一碗米饭', latin: 'Zài lái yī wǎn mǐfàn' },
    { id: 'beer', cat: 'food', script: '一瓶啤酒', latin: 'Yī píng píjiǔ' },
    { id: 'noice', cat: 'food', script: '不要冰', latin: 'Bù yào bīng' },
    { id: 'takeaway', cat: 'food', script: '打包', latin: 'Dǎbāo' },
    { id: 'delicious', cat: 'food', script: '好吃！', latin: 'Hǎochī!' },
    { id: 'imfull', cat: 'food', script: '我吃饱了', latin: 'Wǒ chībǎo le' },

    { id: 'notspicy', cat: 'spice', script: '不要辣', latin: 'Bù yào là' },
    { id: 'littlespicy', cat: 'spice', script: '微辣', latin: 'Wēi là' },
    { id: 'spicy', cat: 'spice', script: '辣', latin: 'Là' },
    { id: 'veryspicy', cat: 'spice', script: '很辣', latin: 'Hěn là' },
    { id: 'vegetarian', cat: 'spice', script: '我吃素', latin: 'Wǒ chī sù' },
    { id: 'vegan', cat: 'spice', script: '我吃全素', latin: 'Wǒ chī quán sù' },
    { id: 'nomeat', cat: 'spice', script: '不要肉', latin: 'Bù yào ròu' },
    { id: 'nopork', cat: 'spice', script: '不要猪肉', latin: 'Bù yào zhūròu' },
    { id: 'nomsg', cat: 'spice', script: '不要味精', latin: 'Bù yào wèijīng' },
    { id: 'peanutallergy', cat: 'spice', script: '我对花生过敏', latin: 'Wǒ duì huāshēng guòmǐn' },

    { id: 'thisprice', cat: 'shop', script: '这个多少钱', latin: 'Zhège duōshao qián', q: true },
    { id: 'tooexp', cat: 'shop', script: '太贵了', latin: 'Tài guì le' },
    { id: 'cheaper', cat: 'shop', script: '可以便宜一点吗', latin: 'Kěyǐ piányi yīdiǎn ma', q: true },
    { id: 'bag', cat: 'shop', script: '请给我袋子', latin: 'Qǐng gěi wǒ dàizi' },
    { id: 'tryon', cat: 'shop', script: '可以试穿吗', latin: 'Kěyǐ shìchuān ma', q: true },
    { id: 'othersize', cat: 'shop', script: '有别的尺寸吗', latin: 'Yǒu bié de chǐcùn ma', q: true },
    { id: 'takeit', cat: 'shop', script: '我要这个', latin: 'Wǒ yào zhège' },
    { id: 'dontwant', cat: 'shop', script: '不要', latin: 'Bù yào' },
    { id: 'shiphome', cat: 'shop', script: '可以寄到国外吗', latin: 'Kěyǐ jì dào guówài ma', q: true },

    { id: 'ticketwhere', cat: 'travel', script: '在哪里买票', latin: 'Zài nǎlǐ mǎi piào', q: true },
    { id: 'ticketprice', cat: 'travel', script: '票价多少', latin: 'Piàojià duōshao', q: true },
    { id: 'buswhere', cat: 'travel', script: '公交车从哪里出发', latin: 'Gōngjiāochē cóng nǎlǐ chūfā', q: true },
    { id: 'airport', cat: 'travel', script: '去机场', latin: 'Qù jīchǎng' },
    { id: 'turnleft', cat: 'travel', script: '左转', latin: 'Zuǒ zhuǎn' },
    { id: 'turnright', cat: 'travel', script: '右转', latin: 'Yòu zhuǎn' },
    { id: 'straight', cat: 'travel', script: '一直走', latin: 'Yīzhí zǒu' },
    { id: 'howfar', cat: 'travel', script: '远吗', latin: 'Yuǎn ma', q: true },
    { id: 'stophere', cat: 'travel', script: '请在这里停', latin: 'Qǐng zài zhèlǐ tíng' },
    { id: 'meter', cat: 'travel', script: '请打表', latin: 'Qǐng dǎ biǎo' },

    { id: 'roomavail', cat: 'stay', script: '有空房吗', latin: 'Yǒu kòngfáng ma', q: true },
    { id: 'roomprice', cat: 'stay', script: '一晚多少钱', latin: 'Yī wǎn duōshao qián', q: true },
    { id: 'seeroom', cat: 'stay', script: '可以先看看房间吗', latin: 'Kěyǐ xiān kànkan fángjiān ma', q: true },
    { id: 'wifi', cat: 'stay', script: '有 wifi 吗', latin: 'Yǒu wifi ma', q: true },
    { id: 'breakfast', cat: 'stay', script: '含早餐吗', latin: 'Hán zǎocān ma', q: true },
    { id: 'checkin', cat: 'stay', script: '几点可以入住', latin: 'Jǐ diǎn kěyǐ rùzhù', q: true },
    { id: 'checkout', cat: 'stay', script: '我要退房', latin: 'Wǒ yào tuìfáng' },
    { id: 'keepbag', cat: 'stay', script: '可以寄存行李吗', latin: 'Kěyǐ jìcún xíngli ma', q: true },
  ],
};
