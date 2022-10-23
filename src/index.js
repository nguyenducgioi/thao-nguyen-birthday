const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const canvas = $("#canvas");
const ctx = canvas.getContext("2d");
const iconHandleMusics = $$(".icon-handle-music");
const audio = $("audio");
const lyricsText = $(".lyrics-text");
const hearts = [];
const precision = 100;
let indexLyric = 0;
let ww, wh;

audio.ontimeupdate = () => {
  showLyrics(audio.currentTime);
};
audio.onended = () => {
  indexLyric = 0;
  audio.play();
};

let playAttempt = setInterval(() => {
  audio
    .play()
    .then(() => {
      clearInterval(playAttempt);
    })
    .catch((error) => {
      console.log("Unable to play the video, User has not interacted yet.");
    });
}, 1000);

iconHandleMusics.forEach((icon) => {
  icon.onclick = (e) => {
    iconHandleMusics.forEach((icon) => icon.classList.add("active"));
    e.target.classList.remove("active");
    const isMusicOn = $(".fa-volume-high.active");
    audio.muted = !isMusicOn;
  };
});

function autoPlay() {
  let isPause = audio.paused;
  if (isPause) {
    audio.play();
  }
}

function onResize() {
  ww = canvas.width = window.innerWidth;
  wh = canvas.height = window.innerHeight;
}

function onMove(e) {
  if (e.type === "touchmove") {
    hearts.push(new Heart(e.touches[0].clientX, e.touches[0].clientY));
    hearts.push(new Heart(e.touches[0].clientX, e.touches[0].clientY));
  } else {
    hearts.push(new Heart(e.clientX, e.clientY));
    hearts.push(new Heart(e.clientX, e.clientY));
  }
}

class Heart {
  constructor(x, y) {
    this.x = x || Math.random() * ww;
    this.y = y || Math.random() * wh;
  }
  x;
  y;
  size = Math.random() * 2 + 1;
  shadowBlur = Math.random() * 10;
  speedX = (Math.random() + 0.2 - 0.6) * 8;
  speedY = (Math.random() + 0.2 - 0.6) * 8;
  speedSize = Math.random() * 0.05 + 0.01;
  opacity = 1;
  vertices = createVetices(precision);
  draw() {
    this.size -= this.speedSize;
    this.x += this.speedX;
    this.y += this.speedY;
    ctx.save();
    ctx.translate(-1000, this.y);
    ctx.scale(this.size, this.size);
    ctx.beginPath();
    for (var i = 0; i < precision; i++) {
      var vector = this.vertices[i];
      ctx.lineTo(vector.x, vector.y);
    }
    ctx.globalAlpha = this.size;
    ctx.shadowBlur = Math.round((3 - this.size) * 10);
    ctx.shadowColor = "hsla(0, 100%, 60%,0.5)";
    ctx.shadowOffsetX = this.x + 1000;
    ctx.globalCompositeOperation = "screen";
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

function createVetices(precision) {
  let vertices = [];
  for (var i = 0; i < precision; i++) {
    var step = (i / precision - 0.5) * (Math.PI * 2);
    var vector = {
      x: 15 * Math.pow(Math.sin(step), 3),
      y: -(
        13 * Math.cos(step) -
        5 * Math.cos(2 * step) -
        2 * Math.cos(3 * step) -
        Math.cos(4 * step)
      ),
    };
    vertices.push(vector);
  }
  return vertices;
}

function render() {
  requestAnimationFrame(render);

  hearts.push(new Heart());
  ctx.clearRect(0, 0, ww, wh);
  for (var i = 0; i < hearts.length; i++) {
    hearts[i].draw();
    if (hearts[i].size <= 0) {
      hearts.splice(i, 1);
      i--;
    }
  }
}

function showMessage() {
  swal({
    title: "Gửi Thảo Nguyên 🐤♏",
    text: `Gửi đến em tuổi 17 đầy thơ mộng, hãy sống hết mình với đam mê tuổi trẻ, không còn nhút nhát, biết yêu thương bản thân và quý trọng gia đình. Mong em luôn vui vẻ, hạnh phúc và xinh đẹp. Chúc em luôn như ý, sống một đời an nhiên.
    Happy birthday to you!!!🎂🎂💟💟`,
    button: {
      text: "💞",
    },
  });
}

let lyrics = [
  {
    text: "Háp pi bớt đây tu Thảo Nguyên 💖💖💖",
    startAt: 0,
  },
  {
    text: "It's your birthday",
    startAt: 10.8,
  },
  {
    text: "We gon' celebrate cho đến hết ngày",
    startAt: 12.6,
  },
  {
    text: "Sao em không vui lên, buồn đến thế này",
    startAt: 15.2,
  },
  {
    text: "Anh là một món quà, hãy ôm lấy nó vào hôm nay",
    startAt: 17.7,
  },
  {
    text: "It's your birthday",
    startAt: 21.6,
  },
  {
    text: "We gon' celebrate cho đến hết ngày",
    startAt: 23.2,
  },
  {
    text: "Sao em không vui lên, buồn đến thế này",
    startAt: 25.8,
  },
  {
    text: "Em cũng là món quà and I want you in my life",
    startAt: 28.5,
  },
  {
    text: "Hôm nay là sinh nhật của em phải không",
    startAt: 33,
  },
  {
    text: "Thằng kia đâu sao để cho em phải mong",
    startAt: 35.2,
  },
  {
    text: "Có rất nhiều bộ váy mặc dù anh thì không phải bóng",
    startAt: 37.8,
  },
  {
    text: "Nhà có cái sảnh lớn và chắc chắn nó đủ cho em trải lòng",
    startAt: 40.6,
  },
  {
    text: "Cầm hoa hồng trên tay xong rồi anh rải vòng,",
    startAt: 43.4,
  },
  {
    text: "Em bên anh đêm nay, và nỗi buồnnnn em không phải bồng",
    startAt: 45.5,
  },
  {
    text: "Em cũng không phải Black, vì phiền lo anh lái đi xa",
    startAt: 47.9,
  },
  {
    text: "Tim đập mạnh như là Cái trống, làm em gãy như cái guitar. Toàn là á i a ooh",
    startAt: 50.2,
  },
  {
    text: "Nên gọi anh vô địch, người Việt hạ Indonesia ooh",
    startAt: 54.25,
  },
  {
    text: "Giao cho em tất cả, nên gọi anh Go việt",
    startAt: 56.9,
  },
  {
    text: "Anh con người thật thà, cứ yêu nhanh đâu thiệt",
    startAt: 59,
  },
  {
    text: "Chưa nghe ai nói xấu anh đâu, em tiểu thư đài cát, vậy thì anh sẽ là Châu Kiệt Luân",
    startAt: 60.9,
  },
  {
    text: "Nhạc anh ai cũng BIỂU TÌNH họ gọi anh thằng Việt Tân.",
    startAt: 64.9,
  },
  {
    text: "7uppercuts waves alpha cho thiệt punk",
    startAt: 67.8,
  },
  {
    text: "Bạn hay là người yêu cả hai Cũng là Hiếu chứ ai",
    startAt: 70.4,
  },
  {
    text: "Em thì luôn là nhất nên tên anh mới là HIEUTHUHAI",
    startAt: 73.1,
  },
  {
    text: "It's your birthday",
    startAt: 75.3,
  },
  {
    text: "We gon' celebrate cho đến hết ngày",
    startAt: 76.5,
  },
  {
    text: "Sao em không vui lên, buồn đến thế này",
    startAt: 79,
  },
  {
    text: "Anh là một món quà, hãy ôm lấy nó vào hôm nay",
    startAt: 81.5,
  },
  {
    text: "It's your birthday",
    startAt: 85.4,
  },
  {
    text: "We gon' celebrate cho đến hết ngày",
    startAt: 87,
  },
  {
    text: "Sao em không vui lên, buồn đến thế này",
    startAt: 89.6,
  },
  {
    text: "Em cũng là món quà and I want you in my life",
    startAt: 92.3,
  },
  {
    text: "Anh đã gặp rất nhiều cô gái nên anh biết em cực đặc biệt",
    startAt: 97,
  },
  {
    text: "Nhìn vào thì đã thấy đắt giá, đập vào mắt anh là mặt tiền",
    startAt: 99.6,
  },
  {
    text: "Giống tờ polime, rớt khỏi túi người ta nhặt liền",
    startAt: 102,
  },
  {
    text: "Và phụ huynh thì sẽ rất vui em có Hiếu lại còn thật hiền",
    startAt: 104.6,
  },
  {
    text: "Giống như một con gấu, luôn cho em tựa đầu ooh",
    startAt: 107.4,
  },
  {
    text: "Nó chỉ thích đá bóng mới sút em như cầu thủ",
    startAt: 110.1,
  },
  {
    text: "Em cứ gọi vào số của anh, đó là đường dây nóng",
    startAt: 112.5,
  },
  {
    text: "Không phải bác sĩ phẫu thuật, không bao giờ có thay lòng",
    startAt: 115.6,
  },
  {
    text: "Đốt cái nến đó lên cho Birthday Girl",
    startAt: 118.2,
  },
  {
    text: "1 2 3 4 5 6 7",
    startAt: 120,
  },
  {
    text: "Qua cái tuổi 18 em thì rồi sẽ hết ngây thơ",
    startAt: 121.2,
  },
  {
    text: "Quá nhiều nến trên một cái bánh, nên anh mua cái bánh thiệt bự",
    startAt: 123.5,
  },
  {
    text: "Như là căn biệt thự, có nhiều tầng gọi là layer",
    startAt: 126.2,
  },
  {
    text: "Hát bài mừng sinh nhật, giống như Phan Đình Tùng",
    startAt: 128.7,
  },
  {
    text: "2 mình cùng vui, đem tất cả món ngon rồi 2 mình dùng",
    startAt: 131,
  },
  {
    text: "Birthday girl hạnh phúc là birthday girl anh quen",
    startAt: 133.6,
  },
  {
    text: "Birthday girl thích hát, birthday girl mà nóng, birthday girl có anh là fan",
    startAt: 135.4,
  },
  {
    text: "It's your birthday",
    startAt: 139.1,
  },
  {
    text: "We gon' celebrate cho đến hết ngày",
    startAt: 140.6,
  },
  {
    text: "Sao em không vui lên, buồn đến thế này",
    startAt: 143.2,
  },
  {
    text: "Anh là một món quà, hãy ôm lấy nó vào hôm nay",
    startAt: 146,
  },
  {
    text: "It's your birthday",
    startAt: 149.7,
  },
  {
    text: "We gon' celebrate cho đến hết ngày",
    startAt: 151.3,
  },
  {
    text: "Sao em không vui lên, buồn đến thế này",
    startAt: 153.9,
  },
  {
    text: "Em cũng là món quà and I want you in my life",
    startAt: 156.7,
  },
  {
    text: "Anh luôn gần bên em, nhưng em không để ý đâu",
    startAt: 160.9,
  },
  {
    text: "Nhiều thật nhiều tâm tư, rồi cũng cho vào ví sau",
    startAt: 163.6,
  },
  {
    text: "Nhưng vẫn ở đây thôi, bôi đi những u sầu",
    startAt: 171.8,
  },
  {
    text: "Y tu Eres el numero uno",
    startAt: 174.1,
  },
  {
    text: "It's your It's your birthday",
    startAt: 181.2,
  },
  {
    text: "We gon' celebrate cho đến hết ngày",
    startAt: 183.2,
  },
  {
    text: "Sao em không vui lên, buồn đến thế này",
    startAt: 185.8,
  },
  {
    text: "Anh là một món quà, hãy ôm lấy nó vào hôm nay",
    startAt: 188.3,
  },
  {
    text: "It's your birthday",
    startAt: 192.2,
  },
  {
    text: "We gon' celebrate cho đến hết ngày",
    startAt: 193.8,
  },
  {
    text: "Sao em không vui lên, buồn đến thế này",
    startAt: 196.4,
  },
  {
    text: "Em cũng là món quà and I want you in my life",
    startAt: 199.1,
  },
  {
    text: "It's your It's your birthday",
    startAt: 202.8,
  },
  {
    text: "Háp pi bớt đây tu Thảo Nguyên 💖💖💖",
    startAt: 204.2,
  },
];

function showLyrics(time) {
  let isShow;
  if (indexLyric < lyrics.length) {
    isShow = time > lyrics[indexLyric].startAt;
    if (isShow) {
      lyricsText.innerText = lyrics[indexLyric].text;
      indexLyric++;
    }
  }
}

onResize();
window.addEventListener("mousemove", onMove);
window.addEventListener("touchmove", onMove);
window.addEventListener("resize", onResize);
document.addEventListener("click", autoPlay);
document.addEventListener("touchmove", autoPlay);
render();
