/* ------------------------------------------------------------------------
   HOST LANGUAGE — Vietnamese.
   The script is already latin, so `latin` is empty on purpose: the card shows
   one line and the transliteration row stays hidden.
   No `parts` and no `night` category, same reasoning as Japanese.
   ------------------------------------------------------------------------ */
window.HOSTS = window.HOSTS || {};

window.HOSTS.vi = {
  code: 'vi',
  name: 'Vietnamese',
  native: 'Tiếng Việt',
  font: "'Noto Sans', system-ui, sans-serif",

  hints: { eggOn: 'được', eggOff: 'không' },

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
    { id: 'hello', cat: 'greet', script: 'Xin chào', latin: '' },
    { id: 'morning', cat: 'greet', script: 'Chào buổi sáng', latin: '' },
    { id: 'evening', cat: 'greet', script: 'Chào buổi tối', latin: '' },
    { id: 'thanks', cat: 'greet', script: 'Cảm ơn rất nhiều', latin: '' },
    { id: 'excuse', cat: 'greet', script: 'Xin lỗi', latin: '' },
    { id: 'welcome', cat: 'greet', script: 'Không có gì', latin: '' },
    { id: 'goodluck', cat: 'greet', script: 'Chúc may mắn', latin: '' },
    { id: 'howareyou', cat: 'greet', script: 'Bạn có khỏe không?', latin: '', q: true },
    { id: 'imfine', cat: 'greet', script: 'Tôi khỏe', latin: '' },
    { id: 'dontunderstand', cat: 'greet', script: 'Tôi không hiểu', latin: '' },
    { id: 'speakenglish', cat: 'greet', script: 'Bạn có nói tiếng Anh không?', latin: '', q: true },
    { id: 'isright', cat: 'greet', script: 'Đúng rồi', latin: '' },
    { id: 'iswrong', cat: 'greet', script: 'Không đúng', latin: '' },

    { id: 'order', cat: 'food', script: 'Tôi muốn gọi món', latin: '' },
    { id: 'bill', cat: 'food', script: 'Cho tôi tính tiền', latin: '' },
    { id: 'howmuch', cat: 'food', script: 'Cái này bao nhiêu tiền?', latin: '', q: true },
    { id: 'water', cat: 'food', script: 'Cho tôi nước lọc', latin: '' },
    { id: 'morerice', cat: 'food', script: 'Cho thêm cơm', latin: '' },
    { id: 'beer', cat: 'food', script: 'Một bia', latin: '' },
    { id: 'noice', cat: 'food', script: 'Không đá', latin: '' },
    { id: 'takeaway', cat: 'food', script: 'Cho tôi mang về', latin: '' },
    { id: 'delicious', cat: 'food', script: 'Ngon quá!', latin: '' },
    { id: 'imfull', cat: 'food', script: 'Tôi no rồi', latin: '' },

    { id: 'notspicy', cat: 'spice', script: 'Không cay', latin: '' },
    { id: 'littlespicy', cat: 'spice', script: 'Cay vừa thôi', latin: '' },
    { id: 'spicy', cat: 'spice', script: 'Cay', latin: '' },
    { id: 'veryspicy', cat: 'spice', script: 'Rất cay', latin: '' },
    { id: 'vegetarian', cat: 'spice', script: 'Tôi ăn chay', latin: '',
      egg: { scriptOn: 'Tôi ăn chay, ăn trứng được', scriptOff: 'Tôi ăn chay, không ăn trứng',
             latinOn: '', latinOff: '' } },
    { id: 'vegan', cat: 'spice', script: 'Tôi ăn thuần chay', latin: '' },
    { id: 'nomeat', cat: 'spice', script: 'Không thịt', latin: '' },
    { id: 'nopork', cat: 'spice', script: 'Không thịt heo', latin: '' },
    { id: 'nomsg', cat: 'spice', script: 'Không bột ngọt', latin: '' },
    { id: 'peanutallergy', cat: 'spice', script: 'Tôi bị dị ứng đậu phộng', latin: '' },

    { id: 'thisprice', cat: 'shop', script: 'Cái này giá bao nhiêu?', latin: '', q: true },
    { id: 'tooexp', cat: 'shop', script: 'Đắt quá', latin: '' },
    { id: 'cheaper', cat: 'shop', script: 'Bớt chút được không?', latin: '', q: true },
    { id: 'bag', cat: 'shop', script: 'Cho tôi cái túi', latin: '' },
    { id: 'tryon', cat: 'shop', script: 'Tôi mặc thử được không?', latin: '', q: true },
    { id: 'othersize', cat: 'shop', script: 'Có cỡ khác không?', latin: '', q: true },
    { id: 'takeit', cat: 'shop', script: 'Tôi lấy cái này', latin: '' },
    { id: 'dontwant', cat: 'shop', script: 'Không cần đâu', latin: '' },
    { id: 'shiphome', cat: 'shop', script: 'Gửi về nước được không?', latin: '', q: true },

    { id: 'ticketwhere', cat: 'travel', script: 'Mua vé ở đâu?', latin: '', q: true },
    { id: 'ticketprice', cat: 'travel', script: 'Vé bao nhiêu tiền?', latin: '', q: true },
    { id: 'buswhere', cat: 'travel', script: 'Xe buýt đi từ đâu?', latin: '', q: true },
    { id: 'airport', cat: 'travel', script: 'Đến sân bay', latin: '' },
    { id: 'turnleft', cat: 'travel', script: 'Rẽ trái', latin: '' },
    { id: 'turnright', cat: 'travel', script: 'Rẽ phải', latin: '' },
    { id: 'straight', cat: 'travel', script: 'Đi thẳng', latin: '' },
    { id: 'howfar', cat: 'travel', script: 'Có xa không?', latin: '', q: true },
    { id: 'stophere', cat: 'travel', script: 'Dừng ở đây', latin: '' },
    { id: 'meter', cat: 'travel', script: 'Bật đồng hồ tính tiền', latin: '' },

    { id: 'roomavail', cat: 'stay', script: 'Còn phòng trống không?', latin: '', q: true },
    { id: 'roomprice', cat: 'stay', script: 'Một đêm bao nhiêu tiền?', latin: '', q: true },
    { id: 'seeroom', cat: 'stay', script: 'Cho tôi xem phòng trước được không?', latin: '', q: true },
    { id: 'wifi', cat: 'stay', script: 'Có wifi không?', latin: '', q: true },
    { id: 'breakfast', cat: 'stay', script: 'Có bao gồm bữa sáng không?', latin: '', q: true },
    { id: 'checkin', cat: 'stay', script: 'Mấy giờ nhận phòng?', latin: '', q: true },
    { id: 'checkout', cat: 'stay', script: 'Tôi muốn trả phòng', latin: '' },
    { id: 'keepbag', cat: 'stay', script: 'Tôi gửi hành lý ở đây được không?', latin: '', q: true },

    { id: 'cheers', cat: 'night', script: 'Cạn ly!', latin: '' },
    { id: 'onemore', cat: 'night', script: 'Thêm một cốc nữa', latin: '' },
    { id: 'glasswater', cat: 'night', script: 'Một cốc nước lọc', latin: '' },
    { id: 'recommend', cat: 'night', script: 'Ở đây có gì ngon?', latin: '', q: true },
    { id: 'noalcohol', cat: 'night', script: 'Tôi không uống rượu', latin: '' },
    { id: 'toilet', cat: 'night', script: 'Nhà vệ sinh ở đâu?', latin: '', q: true },
    { id: 'separatebill', cat: 'night', script: 'Tính riêng', latin: '' },
    { id: 'paycard', cat: 'night', script: 'Có thể trả bằng thẻ không?', latin: '', q: true },
    { id: 'closing', cat: 'night', script: 'Mấy giờ đóng cửa?', latin: '', q: true },
    { id: 'goinghome', cat: 'night', script: 'Tôi về nhà', latin: '' },
  ],
};
