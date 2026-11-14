/* ------------------------------------------------------------------------
   HOST LANGUAGE — the language of the country you are in.
   Adding another destination later = copy this file, translate the script
   and latin fields, and register it in index.html's <script> list.
   ------------------------------------------------------------------------ */
window.HOSTS = window.HOSTS || {};

window.HOSTS.th = {
  code: 'th',
  name: 'Thai',
  native: 'ไทย',

  // Politeness particles: men say krub, women say kha (คะ in questions).
  parts: {
    m:  { latin: 'krub', script: 'ครับ' },
    f:  { latin: 'kha',  script: 'ค่ะ' },
    fq: { latin: 'kha',  script: 'คะ' },
  },

  // Tiny hints under the egg switch (host language, not translated).
  hints: { eggOn: 'ได้', eggOff: 'ไม่ได้' },

  /* Category ids only — colours live in index.html (--acc-<id>), so a new
     destination language file does not have to think about presentation. */
  categories: [
    { id: 'greet' },
    { id: 'food' },
    { id: 'spice' },
    { id: 'night' },
  ],

  /* {p} = politeness particle. `q: true` = question.
     `egg` = variant wording, because มังสวิรัติ (egg ok) and เจ (strict)
     are different requests in a Thai kitchen. */
  phrases: [
    { id: 'hello',  cat: 'greet', script: 'สวัสดี{p}', latin: 'Sawatdee {p}' },
    { id: 'morning', cat: 'greet', script: 'สวัสดีตอนเช้า{p}', latin: 'Sawatdee ton chao {p}' },
    { id: 'evening', cat: 'greet', script: 'สวัสดีตอนเย็น{p}', latin: 'Sawatdee ton yen {p}' },
    { id: 'thanks', cat: 'greet', script: 'ขอบคุณมาก{p}', latin: 'Khop khun mak {p}' },
    { id: 'excuse', cat: 'greet', script: 'ขอโทษ{p}', latin: 'Khor thot {p}' },
    { id: 'welcome', cat: 'greet', script: 'ไม่เป็นไร{p}', latin: 'Mai pen rai {p}' },
    { id: 'goodluck', cat: 'greet', script: 'โชคดีนะ{p}', latin: 'Chok dee na {p}' },
    { id: 'howareyou', cat: 'greet', script: 'สบายดีไหม{p}', latin: 'Sabai dee mai {p}', q: true },
    { id: 'imfine', cat: 'greet', script: 'สบายดี{p}', latin: 'Sabai dee {p}' },
    { id: 'dontunderstand', cat: 'greet', script: 'ไม่เข้าใจ{p}', latin: 'Mai khao jai {p}' },
    { id: 'speakenglish', cat: 'greet', script: 'คุณพูดภาษาอังกฤษได้ไหม{p}', latin: 'Khun phut phasa angkrit dai mai {p}', q: true },
    { id: 'isright', cat: 'greet', script: 'ใช่{p}', latin: 'Chai {p}' },
    { id: 'iswrong', cat: 'greet', script: 'ไม่ใช่{p}', latin: 'Mai chai {p}' },

    { id: 'order', cat: 'food', script: 'ขอสั่งอาหาร{p}', latin: 'Khor sang aharn {p}' },
    { id: 'bill', cat: 'food', script: 'เก็บเงินด้วย{p}', latin: 'Kep ngern duai {p}' },
    { id: 'howmuch', cat: 'food', script: 'เท่าไหร่{p}', latin: 'Tao rai {p}', q: true },
    { id: 'water', cat: 'food', script: 'น้ำเปล่า{p}', latin: 'Nam plao {p}' },
    { id: 'morerice', cat: 'food', script: 'ขอเพิ่มข้าว{p}', latin: 'Khor phoem khao {p}' },
    { id: 'beer', cat: 'food', script: 'เบียร์หนึ่งแก้ว{p}', latin: 'Bia nueng khaew {p}' },
    { id: 'noice', cat: 'food', script: 'ไม่ใส่น้ำแข็ง{p}', latin: 'Mai sai nam khaeng {p}' },
    { id: 'takeaway', cat: 'food', script: 'ห่อกลับบ้าน{p}', latin: 'Hor klap ban {p}' },
    { id: 'delicious', cat: 'food', script: 'อร่อย', latin: 'Aroi!' },
    { id: 'imfull', cat: 'food', script: 'อิ่มแล้ว{p}', latin: 'Im laeo {p}' },

    { id: 'notspicy', cat: 'spice', script: 'ไม่เผ็ด{p}', latin: 'Mai pet {p}' },
    { id: 'littlespicy', cat: 'spice', script: 'เผ็ดนิดหน่อย{p}', latin: 'Pet nit noi {p}' },
    { id: 'spicy', cat: 'spice', script: 'เผ็ด{p}', latin: 'Pet {p}' },
    { id: 'veryspicy', cat: 'spice', script: 'เผ็ดมาก{p}', latin: 'Pet mak {p}' },
    { id: 'vegetarian', cat: 'spice', script: 'มังสวิรัติ{p}', latin: 'Mang sa wi rat{p}',
      egg: { scriptOn: 'ใส่ไข่ได้', scriptOff: 'ไม่ใส่ไข่',
             latinOn: 'sai khai dai', latinOff: 'mai sai khai' } },
    { id: 'vegan', cat: 'spice', script: 'เจ{p}', latin: 'Je {p}' },
    { id: 'nofishsauce', cat: 'spice', script: 'ไม่ใส่น้ำปลา{p}', latin: 'Mai sai nam pla {p}' },
    { id: 'nomeat', cat: 'spice', script: 'ไม่ใส่เนื้อสัตว์{p}', latin: 'Mai sai nuea sat {p}' },
    { id: 'nopork', cat: 'spice', script: 'ไม่ใส่หมู{p}', latin: 'Mai sai mu {p}' },
    { id: 'nomsg', cat: 'spice', script: 'ไม่ใส่ผงชูรส{p}', latin: 'Mai sai phong chu rot {p}' },
    { id: 'peanutallergy', cat: 'spice', script: 'แพ้ถั่วลิสง{p}', latin: 'Phae thua lisong {p}' },

    { id: 'cheers', cat: 'night', script: 'ชนแก้ว{p}', latin: 'Chon khaew {p}' },
    { id: 'onemore', cat: 'night', script: 'ขอเบียร์อีกแก้ว{p}', latin: 'Khor bia eek khaew {p}' },
    { id: 'glasswater', cat: 'night', script: 'ขอน้ำเปล่าแก้วหนึ่ง{p}', latin: 'Khor nam plao khaew nueng {p}' },
    { id: 'recommend', cat: 'night', script: 'แนะนำอะไรดี{p}', latin: 'Nae nam arai dee {p}', q: true },
    { id: 'noalcohol', cat: 'night', script: 'ไม่ดื่มเหล้า{p}', latin: 'Mai duem lao {p}' },
    { id: 'toilet', cat: 'night', script: 'ห้องน้ำอยู่ไหน{p}', latin: 'Hong nam yu nai {p}', q: true },
    { id: 'separatebill', cat: 'night', script: 'แยกบิล{p}', latin: 'Yaek bin {p}' },
    { id: 'paycard', cat: 'night', script: 'จ่ายบัตรได้ไหม{p}', latin: 'Jai bat dai mai {p}', q: true },
    { id: 'closing', cat: 'night', script: 'ปิดกี่โมง{p}', latin: 'Pit ki mong {p}', q: true },
    { id: 'goinghome', cat: 'night', script: 'กลับบ้านแล้ว{p}', latin: 'Klap ban laeo {p}' },

    { id: 'justlooking', cat: 'night', script: 'แค่ดูเฉยๆ{p}', latin: 'Khae du chuey chuey {p}' },
    { id: 'nothanks', cat: 'night', script: 'ไม่ต้อง{p}', latin: 'Mai tong {p}' },
    { id: 'justdrinking', cat: 'night', script: 'นั่งดื่มเฉยๆ{p}', latin: 'Nang duem chuey chuey {p}' },
    { id: 'havepartner', cat: 'night', script: 'มีแฟนแล้ว{p}', latin: 'Mee faen laeo {p}' },
    { id: 'justchat', cat: 'night', script: 'อยากคุยเฉยๆ{p}', latin: 'Yak khui chuey chuey {p}' },
    { id: 'buydrink', cat: 'night', script: 'ขอเลี้ยงเครื่องดื่มได้ไหม{p}', latin: 'Khor liang khreuang duem dai mai {p}', q: true },
    { id: 'yourname', cat: 'night', script: 'คุณชื่ออะไร{p}', latin: 'Khun chue arai {p}', q: true },
    { id: 'barfine', cat: 'night', script: 'ค่าปรับเท่าไหร่{p}', latin: 'Kha pap thao rai {p}', q: true },
  ],
};
