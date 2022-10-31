window.onload = () => {
  const { width: scrWidth, height: scrHeight } = window.screen;

  let starCount = 0;

  const minStars = 100;
  const maxStars = 7;
  const ticksBetweenChecks = 50;
  const tickCount = 0;

  const minStarSize = 10;
  const maxStarSize = 30;

  const canvas = document.getElementById("bgCanvas");
  canvas.width = scrWidth;
  canvas.height = scrHeight;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  const srces = [
    "../imgs/StarSpriteSheetPink.png",
    "../imgs/StarSpriteSheetYellow.png",
    "../imgs/StarSpriteSheetBlue.png",
  ];
  const starSheets = [new Image(), new Image(), new Image()];
  for (let i = 0; i < 3; i++) starSheets[i].src = srces[i];

  //код частично спизжен с сайта catinweb.
  class Star {
    constructor(options) {
      this.ctx = options.ctx;

      this.image = options.image;

      this.width = options.width;
      this.height = options.height;

      this.starSize = Math.floor(
        Math.random() * (maxStarSize - minStarSize) + minStarSize
      );

      this.frameIndex = 0;
      this.tickCount = 0;
      this.ticksPerFrame = options.ticksPerFrame || 0;
      this.numberOfFrames = options.numberOfFrames || 1;
      this.x = Math.floor(Math.random() * scrWidth);
      this.y = Math.floor(Math.random() * scrHeight);

      this.rgb = options.rgb;

      this.start();
    }

    render() {
      this.ctx.drawImage(
        this.image,
        this.frameIndex * (this.width / this.numberOfFrames),
        0,
        10,
        10,
        this.x,
        this.y,
        this.starSize,
        this.starSize
      );
    }

    update() {
      this.tickCount++;

      if (this.tickCount > this.ticksPerFrame) {
        this.ctx.clearRect(this.x, this.y, 30, 30);
        this.tickCount = 0;
        this.frameIndex++;
      }
    }
    start() {
      const loop = () => {
        this.update();
        this.render();

        if (this.frameIndex < this.numberOfFrames)
          window.requestAnimationFrame(loop);
        else {
          starCount--;
        }
      };

      window.requestAnimationFrame(loop);
    }
  }
  //хоспаде, я не знаю яваскрипта, так что на вот эту вот простую строчку мне потребовалась пара часов.

  setInterval(() => {
    if (starCount < minStars && starCount < maxStars) {
      new Star({
        ctx: canvas.getContext("2d"),
        image: starSheets[Math.floor(Math.random() * 3)],
        width: 50,
        height: 10,
        numberOfFrames: 5,
        ticksPerFrame: 20,
      });
      starCount++;
    }
  }, 100);
};
