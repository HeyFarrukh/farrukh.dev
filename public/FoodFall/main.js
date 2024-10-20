import kaboom from "./kaboom.mjs";

kaboom({
  font: "Lato",
});

// Player Characters
loadSprite("virus", "sprites/PlayerCharacters/space-virus.png");
loadSprite("ghost", "sprites/PlayerCharacters/ghost.png");
loadSprite("robot", "sprites/PlayerCharacters/robot.png");

// Game Background
loadSprite("game-bg1", "sprites/GameBG/game-bg1.png");
loadSprite("game-bg2", "sprites/GameBG/game-bg2.png");
loadSprite("game-bg3", "sprites/GameBG/game-bg3.png");
loadSprite("game-bg4", "sprites/GameBG/game-bg4.png");
loadSprite("game-bg5", "sprites/GameBG/game-bg5.png");

// Main Menu Backgrounds
loadSprite("mainmenu-1", "sprites/MainMenu/mainmenu-1.png");
loadSprite("help-1", "sprites/MainMenu/help-1.png");
loadSprite("help-text", "sprites/MainMenu/help-text.png");
loadSprite("logo", "sprites/MainMenu/logo.png");
// Game End Backgrounds
loadSprite("end-1", "sprites/GameEnd/end-1.png");

// Sound
loadSound("UI", "sounds/SoundFX/UI.mp3");
loadSound("consuming", "sounds/SoundFX/consuming.mp3");
loadSound("ha_consuming", "sounds/SoundFX/unhealthy-consuming.mp3");
loadSound("lose", "sounds/SoundFX/game-end.mp3");

loadSound("Track1", "sounds/GameTracks/game-track1.wav");

// Healthy Game Objects = h_obj
const healthyObj = [
  "apple",
  "banana",
  "broccoli",
  "carrot",
  "cherries",
  "grapes",
  "mango",
  "melon",
  "orange",
  "peach",
  "pineapple",
  "strawberry",
  "watermelon",
];

for (const h_obj of healthyObj) {
  loadSprite(h_obj, `sprites/GameObj/healthy/${h_obj}.png`);
}

// Harmful Game Objects = ha_obj
const harmfulObj = [
  "cake",
  "candy",
  "chilli",
  "chocolate",
  "cookie",
  "cupcake",
  "doughnut",
  "icecream",
  "pie",
];

for (const ha_obj of harmfulObj) {
  loadSprite(ha_obj, `sprites/GameObj/harmful/${ha_obj}.png`);
}

// Powerups - Game Objects = powerup_obj
const powerupObj = [
  "bonus",
  "car",
  "invincibility",
  "magnifying",
  "pause",
  "shield",
];

for (const powerup_obj of powerupObj) {
  loadSprite(powerup_obj, `sprites/GameObj/powerups/${powerup_obj}.png`);
}

loadSprite("run", "sprites/GameObj/shop/run.png");
loadSprite("invincibility", "sprites/GameObj/shop/invincibility.png");
loadSprite("cooldown", "sprites/GameObj/shop/cooldown.png");
loadSprite("magnifying", "sprites/GameObj/shop/magnifying.png");

loadSprite("coin", "sprites/GameObj/shop/coin.png");

// Load Custom Font
loadFont("Lato", "fonts/Lato.ttf");

setCursor("crosshair");

let playerScore = 0;
let playerHS = 0;

function addButton(txt, p, f) {
  const btn = add([text(txt), pos(p), area(), anchor("center")]);

  btn.onClick(f);

  btn.onUpdate(() => {
    if (btn.isHovering()) {
      const t = time() * 10;
      btn.color = rgb(255, 254, 255);
      btn.scale = vec2(1.6);
    } else {
      btn.scale = vec2(1.3);
      btn.color = rgb(0, 0, 0);
    }
  });
}
loadSound("main-menu", "sounds/GameTracks/main-menu.mp3");

// Setting User Choice
let ucGameMusic = true;
let ucSoundFX = true;

let mainMenuMusic = play("main-menu", {
  volume: 0,
  loop: true,
});

let gameMusic = play("Track1", {
  volume: 0,
  loop: true,
});

// GAME SHOP
let biteCoins = 0;
let speed_Shop = 2;
let invincibility_Shop = 1;
let slowdown_Shop = 1;
let shrinker_Shop = 1;

if (width() < 1280 || height() < 720) {
  console.log("SCREEN TOO SMALL");
  add([
    sprite("mainmenu-1"),
    pos(width() / 2, height() / 2),
    anchor("center"),
    scale(Math.max(width() / 1820, height() / 1080)),
    fixed(),
  ]);
  add([
    sprite("logo"),
    scale(0.37),
    pos(width() / 2, height() / 5),
    anchor("center"),
    fixed(),
  ]);
  add([
    pos(width() / 2 + 20, height() / 2),
    anchor("center"),
    text(
      "OPEN THE GAME IN A NEW TAB \n OR MAKE IT FULL SCREEN \n\n (Screen Too Small)",
      {
        size: 23,
        width: 340,
      },
    ),
  ]);
} else {
  scene("start", () => {
    mainMenuMusic.volume = 0.5;
    gameMusic.volume = 0.5;

    if (ucGameMusic == true || ucGameMusic == false) {
      gameMusic.paused = true;
    }

    loadSprite("help-1", "sprites/MainMenu/help-1.png");
    const background = add([
      sprite("mainmenu-1"),
      pos(width() / 2, height() / 2),
      anchor("center"),
      scale(Math.max(width() / 1820, height() / 1080)),
      fixed(),
    ]);

    add([
      sprite("logo"),
      scale(0.65),
      pos(width() / 2, height() / 5),
      anchor("center"),
      fixed(),
    ]);

    addButton("START", vec2(width() / 2, height() / 2 - 100), () => {
      if (ucSoundFX == true) {
        play("UI");
      }
      if (ucGameMusic == true) {
        mainMenuMusic.paused = false;
        gameMusic.paused = true;
      } else if (ucGameMusic == false) {
        mainMenuMusic.paused = true;
        gameMusic.paused = true;
      }
      go("levels");
    });

    addButton("SETTINGS", vec2(width() / 2, height() / 2), () => {
      if (ucSoundFX == true) {
        play("UI");
      }
      if (ucGameMusic == true) {
        mainMenuMusic.paused = false;
        gameMusic.paused = true;
      } else if (ucGameMusic == false) {
        mainMenuMusic.paused = true;
        gameMusic.paused = true;
      }
      go("settings");
    });

    addButton("SHOP", vec2(width() / 2, height() / 2 + 100), () => {
      if (ucSoundFX == true) {
        play("UI");
      }
      if (ucGameMusic == true) {
        mainMenuMusic.paused = false;
        gameMusic.paused = true;
      } else if (ucGameMusic == false) {
        mainMenuMusic.paused = true;
        gameMusic.paused = true;
      }
      go("shop");
    });

    drawEllipse({
      pos: vec2(width() / 2.25, height() / 2 - 25),
      radiusX: 200,
      radiusY: 200,
      color: rgb(255, 0, 0),
    });

    addButton("HELP!", vec2(width() / 2, height() / 2 + 200), () => {
      if (ucSoundFX == true) {
        play("UI");
      }
      if (ucGameMusic == true) {
        mainMenuMusic.paused = false;
        gameMusic.paused = true;
      } else if (ucGameMusic == false) {
        mainMenuMusic.paused = true;
        gameMusic.paused = true;
      }
      go("help");
    });
  });

  // Level selection screen
  let Config_hObj = 0;
  let Config_haObj = 0;
  let Config_hDamage = 0;
  let Config_hHeal = 0;

  let easy = false;
  let medium = false;
  let hard = false;
  let playerAlive = true;

  scene("levels", () => {
    if (easy == true) {
      easy = false;
    } else if (medium == true) {
      medium = false;
    } else if (hard == true) {
      hard = false;
    }

    function addButtonLevel(txt, p, f) {
      const btnLevels = add([text(txt), pos(p), area(), anchor("center")]);
      btnLevels.onClick(f);
      btnLevels.onUpdate(() => {
        if (btnLevels.isHovering()) {
          const t = time() * 10;
          btnLevels.color = rgb(255, 254, 255);
          btnLevels.scale = vec2(1.6);
        } else {
          btnLevels.scale = vec2(1.3);
          btnLevels.color = rgb(0, 0, 0);
        }
      });
      return btnLevels;
    }

    const background = add([
      sprite("mainmenu-1"),
      pos(width() / 2, height() / 2),
      anchor("center"),
      scale(Math.max(width() / 1820, height() / 1080)),
      fixed(),
    ]);

    add([
      pos(width() / 1.9, height() / 2 - 200),
      anchor("center"),
      text("Your High Score " + "\n" + "                " + playerHS, {
        size: 48,
        width: 420,
      }),
    ]);

    const easyButton = addButtonLevel(
      "EASY",
      vec2(width() / 2, height() / 2 - 100),
      () => {
        if (ucSoundFX == true) {
          play("UI");
        }
        if (ucGameMusic == true) {
          mainMenuMusic.paused = false;
          gameMusic.paused = true;
        } else if (ucGameMusic == false) {
          mainMenuMusic.paused = true;
          gameMusic.paused = true;
        }
        onClick((easy = true));
        go("maths");
      },
    );
    onUpdate(() => {
      easyButton.color = rgb(0, 255, 0);
    });

    const mediumButton = addButtonLevel(
      "MEDIUM",
      vec2(width() / 2, height() / 2),
      () => {
        if (ucSoundFX == true) {
          play("UI");
        }
        if (ucGameMusic == true) {
          mainMenuMusic.paused = false;
          gameMusic.paused = true;
        } else if (ucGameMusic == false) {
          mainMenuMusic.paused = true;
          gameMusic.paused = true;
        }
        onClick((medium = true));
        go("maths");
      },
    );

    onUpdate(() => {
      mediumButton.color = rgb(255, 191, 0);
    });

    const hardButton = addButtonLevel(
      "HARD",
      vec2(width() / 2, height() / 2 + 100),
      () => {
        if (ucSoundFX == true) {
          play("UI");
        }
        if (ucGameMusic == true) {
          mainMenuMusic.paused = false;
          gameMusic.paused = true;
        } else if (ucGameMusic == false) {
          mainMenuMusic.paused = true;
          gameMusic.paused = true;
        }
        onClick((hard = true));
        go("maths");
      },
    );

    onUpdate(() => {
      hardButton.color = rgb(255, 0, 0);
    });

    addButton("RETURN", vec2(width() / 2, height() / 2 + 300), () => {
      if (ucSoundFX == true) {
        play("UI");
      }
      if (ucGameMusic == true) {
        mainMenuMusic.paused = false;
        gameMusic.paused = true;
      } else if (ucGameMusic == false) {
        mainMenuMusic.paused = true;
        gameMusic.paused = true;
      }
      go("start");
    });
  });

  scene("shop", () => {
    const background = add([
      sprite("mainmenu-1"),
      pos(width() / 2, height() / 2),
      anchor("center"),
      scale(Math.max(width() / 1820, height() / 1080)),
      fixed(),
    ]);

    add([
      sprite("coin"),
      pos(width() / 2 - 200, height() / 2 - 350),
      anchor("center"),
      scale(0.2),
      fixed(),
    ]);

    add([
      pos(width() / 2 + 10, height() / 2 - 350),
      anchor("center"),
      text("BITECOINS: ", {
        size: 48,
        width: 320,
      }),
    ]);

    let bitecoinstext = add([
      pos(width() / 2 + 400, height() / 2 - 350),
      anchor("center"),
      text(biteCoins, {
        size: 48,
        width: 520,
      }),
    ]);

    onUpdate(() => {
      bitecoinstext.text = biteCoins;
    });

    function shopitems(f) {
      let item1 = add([
        sprite("run"),
        pos(width() / 2 - 200, height() / 2 - 100),
        scale(width() / 5000),
        area(),
        anchor("center"),
      ]);

      add([
        pos(width() / 2 - 105, height() / 2 - 0),
        anchor("center"),
        text("SPEED", {
          size: 48,
          width: 320,
        }),
      ]);

      add([
        pos(width() / 2 - 100, height() / 2 - 210),
        anchor("center"),
        text("200", {
          size: 48,
          width: 320,
        }),
      ]);

      add([
        sprite("coin"),
        pos(width() / 2 - 150, height() / 2 - 210),
        anchor("center"),
        scale(0.1),
        fixed(),
      ]);

      item1.onClick(() => {
        if (biteCoins >= 200) {
          speed_Shop = speed_Shop + 1;
          biteCoins = biteCoins - 200;
          let item1text = add([
            pos(width() / 2 + 50, height() / 2 - 0),
            anchor("center"),
            text("x" + speed_Shop, {
              size: 48,
              width: 320,
            }),
          ]);

          onUpdate(() => {
            item1text.text = "(" + "x" + speed_Shop + ")";
          });
        }
      });
      item1.onUpdate(() => {
        if (item1.isHovering()) {
          item1.scale = vec2(width() / 4648);
        } else {
          item1.scale = vec2(width() / 6000);
        }
      });

      let item2 = add([
        sprite("invincibility"),
        pos(width() / 2 + 200, height() / 2 - 100),
        scale(width() / 5000),
        area(),
        anchor("center"),
      ]);

      add([
        pos(width() / 2 + 200, height() / 2 - 0),
        anchor("center"),
        text("INVINCIBILITY", {
          size: 48,
          width: 340,
        }),
      ]);

      add([
        pos(width() / 2 + 300, height() / 2 - 210),
        anchor("center"),
        text("500", {
          size: 48,
          width: 320,
        }),
      ]);

      add([
        sprite("coin"),
        pos(width() / 2 + 250, height() / 2 - 210),
        anchor("center"),
        scale(0.1),
        fixed(),
      ]);

      item2.onClick(() => {
        if (biteCoins >= 500) {
          invincibility_Shop = invincibility_Shop + 1;
          biteCoins = biteCoins - 500;
          let item2text = add([
            pos(width() / 2 + 530, height() / 2 - 0),
            anchor("center"),
            text("x" + invincibility_Shop, {
              size: 48,
              width: 320,
            }),
          ]);

          onUpdate(() => {
            item2text.text = "(" + "x" + invincibility_Shop + ")";
          });
        }
      });
      item2.onUpdate(() => {
        if (item2.isHovering()) {
          item2.scale = vec2(width() / 4648);
        } else {
          item2.scale = vec2(width() / 6000);
        }
      });

      let item3 = add([
        sprite("cooldown"),
        pos(width() / 2 - 200, height() / 2 + 180),
        scale(width() / 5000),
        area(),
        anchor("center"),
      ]);

      add([
        pos(width() / 2 - 170, height() / 2 + 290),
        anchor("center"),
        text("SLOWDOWN", {
          size: 48,
          width: 340,
        }),
      ]);

      add([
        pos(width() / 2 - 90, height() / 2 + 70),
        anchor("center"),
        text("150", {
          size: 48,
          width: 320,
        }),
      ]);

      add([
        sprite("coin"),
        pos(width() / 2 - 140, height() / 2 + 70),
        anchor("center"),
        scale(0.1),
        fixed(),
      ]);

      item3.onClick(() => {
        if (biteCoins >= 150) {
          slowdown_Shop = slowdown_Shop + 1;
          biteCoins = biteCoins - 150;
          let item3text = add([
            pos(width() / 2 + 123, height() / 2 + 290),
            anchor("center"),
            text("x" + slowdown_Shop, {
              size: 48,
              width: 320,
            }),
          ]);

          onUpdate(() => {
            item3text.text = "(" + "x" + slowdown_Shop + ")";
          });
        }
      });
      item3.onUpdate(() => {
        if (item3.isHovering()) {
          item3.scale = vec2(width() / 4648);
        } else {
          item3.scale = vec2(width() / 6000);
        }
      });

      let item4 = add([
        sprite("magnifying"),
        pos(width() / 2 + 200, height() / 2 + 180),
        scale(width() / 5000),
        area(),
        anchor("center"),
      ]);

      add([
        pos(width() / 2 + 240, height() / 2 + 290),
        anchor("center"),
        text("SHRINKER", {
          size: 48,
          width: 340,
        }),
      ]);

      add([
        pos(width() / 2 + 320, height() / 2 + 70),
        anchor("center"),
        text("250", {
          size: 48,
          width: 320,
        }),
      ]);

      add([
        sprite("coin"),
        pos(width() / 2 + 270, height() / 2 + 70),
        anchor("center"),
        scale(0.1),
        fixed(),
      ]);

      item4.onClick(() => {
        if (biteCoins >= 250) {
          shrinker_Shop = shrinker_Shop + 1;
          biteCoins = biteCoins - 250;
          let item4text = add([
            pos(width() / 2 + 475, height() / 2 + 290),
            anchor("center"),
            text("x" + shrinker_Shop, {
              size: 48,
              width: 320,
            }),
          ]);

          onUpdate(() => {
            item4text.text = "(" + "x" + shrinker_Shop + ")";
          });
        }
      });
      item4.onUpdate(() => {
        if (item4.isHovering()) {
          item4.scale = vec2(width() / 4648);
        } else {
          item4.scale = vec2(width() / 6000);
        }
      });
    }

    shopitems();

    addButton("RETURN", vec2(width() / 2, height() / 2 + 335), () => {
      if (ucSoundFX == true) {
        play("UI");
      }
      if (ucGameMusic == true) {
        mainMenuMusic.paused = false;
        gameMusic.paused = true;
      } else if (ucGameMusic == false) {
        mainMenuMusic.paused = true;
        gameMusic.paused = true;
      }
      go("start");
    });
  });

  scene("maths", () => {
    const background = add([
      sprite("mainmenu-1"),
      pos(width() / 2, height() / 2),
      anchor("center"),
      scale(Math.max(width() / 1820, height() / 1080)),
      fixed(),
    ]);

    function answerBox(position) {
      let questionStatus = add([]);

      let question = add([
        text("", {
          size: 90,
          width: 320,
        }),
        pos(width() / 2.26, height() / 2 - 150),
      ]);

      add([
        rect(290, 80),
        opacity(0.7),
        pos(width() / 2.3, height() / 2 - 50),
        color(0, 0, 0),
      ]);

      let user = add([text(""), pos(width() / 2.25, height() / 2 - 25)]);

      onKeyPress((ch) => {
        switch (ch) {
          case "enter":
            questionStatus.trigger("QuestionAnswered");
            break;
          case "backspace":
            user.text = user.text.slice(0, -1);
            break;
          default:
            if (ch >= "0" && ch <= "9") {
              user.text += ch;
            }
        }
      });

      return {
        question: question,
        user: user,
        onAnswer: (f) => {
          questionStatus.on("QuestionAnswered", () => {
            f(user.text);
            user.text = "";
          });
        },
      };
    }

    let dialog = answerBox();

    let num1 = Math.round(rand(1, 9));
    let num2 = Math.round(rand(1, 9));

    if (hard == true) {
      num1 = Math.round(rand(1, 19));
      num2 = Math.round(rand(1, 19));
    }

    if (num1 < num2) {
      [num1, num2] = [num2, num1];
    }
    addButton("RETURN", vec2(width() / 2, height() / 2 + 300), () => {
      if (ucSoundFX == true) {
        play("UI");
      }
      if (ucGameMusic == true) {
        mainMenuMusic.paused = false;
        gameMusic.paused = true;
      } else if (ucGameMusic == false) {
        mainMenuMusic.paused = true;
        gameMusic.paused = true;
      }
      go("levels");
    });
    const operator = ["+", "-", "/", "*", "/", "/"];
    let chosenOperator = operator[Math.round(rand(0, 5))];
    if (easy == true) {
      while (chosenOperator == "/" || chosenOperator == "*") {
        chosenOperator = operator[Math.round(rand(0, 1))];
      }
    } else if (medium == true) {
      while (chosenOperator == "/") {
        chosenOperator = operator[Math.round(rand(0, 2))];
      }
    } else {
      chosenOperator = operator[Math.round(rand(0, 5))];
      while (num1 % num2 !== 0) {
        num1 = Math.round(rand(1, 19));
        num2 = Math.round(rand(1, 19));
      }
    }

    console.log(chosenOperator);
    console.log(num1);
    console.log(num2);

    let displayOperator = null;
    if (chosenOperator == "/") {
      displayOperator = "÷";
    } else if (chosenOperator == "*") {
      displayOperator = "×";
    } else if (chosenOperator == "+") {
      displayOperator = "+";
    } else {
      displayOperator = "-";
    }

    let ans = null;
    let correctAnswer = null;
    if (chosenOperator == "+") {
      correctAnswer = num1 + num2;
      console.log("Correct Answer:", correctAnswer);
    } else if (chosenOperator == "-") {
      correctAnswer = num1 - num2;
      console.log("Correct Answer:", correctAnswer);
    } else if (chosenOperator == "*") {
      correctAnswer = num1 * num2;
      console.log("Correct Answer:", correctAnswer);
    } else {
      correctAnswer = num1 / num2;
      console.log("Correct Answer:", correctAnswer);
    }

    let real_answer = correctAnswer;
    dialog.question.text = num1 + " " + displayOperator + " " + num2;

    dialog.onAnswer((answer) => {
      if (answer == real_answer) {
        tween(0, 1, 0.5, (h) => {
          dialog.question.color = hsl2rgb(h, 1, 0.5);
        });
        wait(0.5, () => {
          dialog.question.color = rgb(255, 255, 255);
        });
        wait(0.5, () => {
          go("character");
        });
      } else {
        shake(80);
      }
    });
  });

  let sprite_defs = [
    ["ghost", width() / 3.6, height() / 2],
    ["virus", width() / 2, height() / 2],
    ["robot", width() / 1.4, height() / 2],
  ];
  let selectedCharacter = 1;

  scene("character", () => {
    const background = add([
      sprite("mainmenu-1"),
      pos(width() / 2, height() / 2),
      anchor("center"),
      scale(Math.max(width() / 1820, height() / 1080)),
      fixed(),
    ]);

    addButton(
      "PICK UR PLAYER",
      vec2(width() / 2, height() / 2 - 100),
      () => {},
    );

    let tempCharacter = null;

    let characters = [null, null, null];
    for (let i = 0; i < characters.length; i++) {
      characters[i] = add([
        sprite(sprite_defs[i][0]),
        pos(sprite_defs[i][1], sprite_defs[i][2]),
        anchor("center"),
        fixed(),
      ]);
    }

    console.log("Character Selected:", selectedCharacter);

    addButton("<-", vec2(width() / 2.7, height() / 2 - -10), () => {
      let tmp = characters[0].pos;
      characters[0].pos = characters[1].pos;
      characters[1].pos = characters[2].pos;
      characters[2].pos = tmp;

      if (selectedCharacter > 0) {
        selectedCharacter = selectedCharacter - 1;
      } else {
        selectedCharacter = 2;
      }
    });

    addButton("->", vec2(width() / 1.62, height() / 2 - -10), () => {
      let tmp = characters[2].pos;
      characters[2].pos = characters[1].pos;
      characters[1].pos = characters[0].pos;
      characters[0].pos = tmp;

      if (selectedCharacter < 2) {
        selectedCharacter = selectedCharacter + 1;
      } else {
        selectedCharacter = 0;
      }
    });

    onClick("ghost", () => {
      console.log("Character Clicked");
    });

    addButton("START", vec2(width() / 2, height() / 2 + 300), () => {
      if (ucSoundFX == true) {
        play("UI");
      }
      if (ucGameMusic == true) {
        mainMenuMusic.paused = true;
        gameMusic.paused = false;
      } else if (ucGameMusic == false) {
        mainMenuMusic.paused = true;
        gameMusic.paused = true;
      }
      go("game");
    });

    onUpdate(() => {
      console.log(selectedCharacter);
    });
  });

  let ucCounter = 0;
  let ucFXCounter = 0;

  scene("settings", () => {
    const background = add([
      sprite("mainmenu-1"),
      pos(width() / 2, height() / 2),
      anchor("center"),
      scale(Math.max(width() / 1820, height() / 1080)),
      fixed(),
    ]);

    add([
      pos(width() / 2.6, height() / 2 - 150),
      text("MUSIC ON/OFF", {
        size: 60,
        width: 1200,
      }),
      color(rgb(0, 0, 0)),
    ]);

    function addButtonMusic(txt, p, f) {
      const btnMusic = add([text(txt), pos(p), area(), anchor("center")]);

      btnMusic.onClick(f);

      btnMusic.onUpdate(() => {
        if (btnMusic.isHovering()) {
          const t = time() * 10;
          btnMusic.color = rgb(255, 254, 255);
          btnMusic.scale = vec2(1.9);
        } else {
          btnMusic.scale = vec2(1.6);
          btnMusic.color = rgb(0, 0, 0);
        }
      });
      return btnMusic;
    }

    const musicLabel = addButtonMusic(
      "ON",
      vec2(width() / 1.98, height() / 2.2),
      () => {
        if (ucSoundFX == true) {
          play("UI");
        }
        if (ucCounter == 0) {
          ucCounter = 1;
          ucGameMusic = false;
          mainMenuMusic.paused = true;
          gameMusic.paused = true;
        } else if (ucCounter == 1) {
          ucCounter = 0;
          ucGameMusic = true;
          mainMenuMusic.paused = false;
        }
      },
    );

    onUpdate(() => {
      if (ucGameMusic) {
        musicLabel.text = "ON";
        musicLabel.color = rgb(0, 255, 0);
      } else {
        musicLabel.text = "OFF";
        musicLabel.color = rgb(255, 0, 0);
      }
    });

    function addButtonSound(txt, p, f) {
      const btnSound = add([text(txt), pos(p), area(), anchor("center")]);

      btnSound.onClick(f);

      btnSound.onUpdate(() => {
        if (btnSound.isHovering()) {
          const t = time() * 10;
          btnSound.color = rgb(255, 254, 255);
          btnSound.scale = vec2(1.9);
        } else {
          btnSound.scale = vec2(1.6);
          btnSound.color = rgb(0, 0, 0);
        }
      });
      return btnSound;
    }

    const soundFXLabel = addButtonSound(
      "ON",
      vec2(width() / 1.98, height() / 1.6),
      () => {
        if (ucFXCounter == 0) {
          ucSoundFX = false;
          ucFXCounter = 1;
        } else if (ucFXCounter == 1) {
          play("UI");
          ucSoundFX = true;
          ucFXCounter = 0;
        }
      },
    );

    add([
      pos(width() / 3.2, height() / 1.9),
      text("SOUND EFFECTS ON/OFF", {
        size: 60,
        width: 1200,
      }),
      color(rgb(0, 0, 0)),
    ]);

    onUpdate(() => {
      if (ucSoundFX) {
        soundFXLabel.text = "ON";
        soundFXLabel.color = rgb(0, 255, 0);
      } else {
        soundFXLabel.text = "OFF";
        soundFXLabel.color = rgb(255, 0, 0);
      }
    });

    addButton("RETURN", vec2(width() / 2, height() / 2 + 300), () => {
      if (ucSoundFX == true) {
        play("UI");
      }
      if (ucGameMusic == true) {
        mainMenuMusic.paused = false;
        gameMusic.paused = true;
      } else if (ucGameMusic == false) {
        mainMenuMusic.paused = true;
        gameMusic.paused = true;
      }
      go("start");
    });
  });

  scene("help", () => {
    const background = add([
      sprite("help-1"),
      pos(width() / 2, height() / 2),
      anchor("center"),
      scale(Math.max(width() / 1820, height() / 800)),
      fixed(),
    ]);

    add([
      sprite("help-text"),
      pos(width() / 2, height() / 2),
      scale(Math.min(width() / 1920, height() / 1080)),
      anchor("center"),
      fixed(),
    ]);

    // start game when any key is pressed
    onKeyPress(() => {
      if (ucSoundFX == true) {
        play("UI");
      }
      go("levels");
      if (ucGameMusic == true) {
        gameMusic.paused = true;
        mainMenuMusic.paused = false;
      } else if (ucGameMusic == false) {
        gameMusic.paused = true;
        mainMenuMusic.paused = true;
      }
    });
  });

  scene("game", () => {
    let spritename = sprite_defs[selectedCharacter][0];
    let playerHealth = 100;
    playerScore = 0;
    let Config_powerup = 0;
    let Config_coins = 0;
    let Config_biteCoins = 0;
    if (easy == true && medium == false && hard == false) {
      Config_hObj = 0.5;
      Config_haObj = 0.8;
      Config_hDamage = 10;
      Config_hHeal = 7;
      Config_powerup = 1.4;
      Config_coins = 1.5;
      Config_biteCoins = 5;
    } else if (medium == true && easy == false && hard == false) {
      Config_hObj = 0.7;
      Config_haObj = 0.6;
      Config_hDamage = 20;
      Config_hHeal = 5;
      Config_powerup = 1.6;
      Config_coins = 1.2;
      Config_biteCoins = 10;
    } else if (hard == true && easy == false && medium == false) {
      Config_hObj = 1.4;
      Config_haObj = 0.2;
      Config_hDamage = 30;
      Config_hHeal = 2;
      Config_powerup = 2;
      Config_coins = 0.7;
      Config_biteCoins = 20;
    }

    let carPowerup = 400;

    console.log("Player High Score: ", playerHS);
    // Healthy Objects Spawner Function
    function spawnh_Obj() {
      const name = choose(healthyObj);

      add([
        sprite(name),
        scale(0.15),
        area(),
        body(),
        pos(rand(0, width()), 0),
        "h_Obj",
      ]);
    }

    // Coins Spawner
    function spawnCoin_Obj() {
      add([
        sprite("coin"),
        scale(0.15),
        area(),
        body(),
        color(rgb(255, 234, 0)),
        pos(rand(0, width()), 0),
        "coin",
      ]);
    }

    // Powerups Objects Spawner Function
    function spawnCar_Obj() {
      add([
        sprite("car"),
        scale(0.15),
        area(),
        body(),
        color(rgb(255, 234, 0)),
        pos(rand(0, width()), 0),
        "car",
      ]);
    }

    function spawnBonus_Obj() {
      add([
        sprite("bonus"),
        scale(0.15),
        area(),
        body(),
        color(rgb(255, 234, 0)),
        pos(rand(0, width()), 0),
        "bonus",
      ]);
    }

    function spawnInvincibility_Obj() {
      add([
        sprite("invincibility"),
        scale(0.15),
        area(),
        body(),
        color(rgb(255, 234, 0)),
        pos(rand(0, width()), 0),
        "invincibility",
      ]);
    }

    function spawnMagnifying_Obj() {
      add([
        sprite("magnifying"),
        scale(0.15),
        area(),
        body(),
        color(rgb(255, 234, 0)),
        pos(rand(0, width()), 0),
        "magnifying",
      ]);
    }

    function spawnPause_Obj() {
      add([
        sprite("pause"),
        scale(0.15),
        area(),
        body(),
        color(rgb(255, 234, 0)),
        pos(rand(0, width()), 0),
        "pause",
      ]);
    }
    const timee = time() * 10;
    function spawnShield_Obj() {
      add([
        sprite("shield"),
        scale(0.15),
        area(),
        body(),
        color(rgb(255, 234, 0)),
        pos(rand(0, width()), 0),
        "shield",
      ]);
    }

    // Harmful Objects Spawner Function
    function spawnha_Obj() {
      const name = choose(harmfulObj);

      add([
        sprite(name),
        scale(0.15),
        area(),
        body(),
        pos(rand(0, width()), 0),
        "ha_Obj",
      ]);
    }

    // stored in array
    const backgroundSprites = [
      "game-bg1",
      "game-bg2",
      "game-bg3",
      "game-bg4",
      "game-bg5",
    ];

    const background = add([
      // Pick Random Background
      sprite(choose(backgroundSprites)),
      pos(width() / 2, height() / 2),
      anchor("center"),
      scale(Math.max(width() / 1820, height() / 1080)),
      fixed(),
    ]);

    let isMagnifying = false;

    // player character
    const player = add([
      sprite(spritename),
      pos(center()),
      area(),
      body(),
      "player",
    ]);

    const screenWidth = width();

    // platform
    add([
      rect(width(), 48),
      pos(0, height() - 48),
      outline(4),
      area(),
      body({
        isStatic: true,
      }),
      color(127, 200, 255),
      "platform",
    ]);

    let clickedItem1 = false;
    let clickedItem2 = false;
    let clickedItem3 = false;
    let clickedItem4 = false;

    function shopitemsGame(f) {
      add([
        pos(width() / 2 + 650, height() / 2 - 300),
        rect(100, 100),
        outline(4),
        area(),
      ]);

      let item1 = add([
        sprite("run"),
        pos(width() / 2 + 700, height() / 2 - 250),
        scale(width() / 5000),
        area(),
        anchor("center"),
      ]);

      let preClickItem1 = null;

      if (speed_Shop >= 1) {
        preClickItem1 = add([
          pos(width() / 2 + 830, height() / 2 - 315),
          anchor("center"),
          color(0, 0, 0),
          text("x" + speed_Shop, {
            size: 38,
            width: 320,
          }),
        ]);
      }

      preClickItem1.onUpdate(() => {
        preClickItem1.text = "x" + speed_Shop;
      });
      let item1TimerStarted = false;
      item1.onClick(() => {
        if (
          clickedItem1 == false &&
          item1TimerStarted == false &&
          speed_Shop >= 1
        ) {
          let item1TimerCounter = 5;
          let item1Timer = add([
            pos(width() / 2 + 840, height() / 2 - 180),
            anchor("center"),
            color(0, 0, 0),
            text("Timer:", {
              size: 38,
              width: 320,
            }),
          ]);
          if (item1TimerStarted == false) {
            loop(1, () => {
              item1TimerCounter = item1TimerCounter - 1;
            });
            item1Timer.onUpdate(() => {
              item1Timer.text = item1TimerCounter;
            });
          }

          if (speed_Shop >= 1) {
            speed_Shop = speed_Shop - 1;
            clickedItem1 = true;

            wait(5, () => {
              item1TimerStarted = false;
              item1Timer.destroy();
              clickedItem1 = false;
            });
            let item1text = add([
              pos(width() / 2 + 690, height() / 2 - 280),
              anchor("center"),
              text("x" + speed_Shop, {
                size: 48,
                width: 320,
              }),
            ]);

            item1text.text = "USED";
            wait(3, () => {
              item1text.destroy();
            });

            let item1textRemaining = add([
              pos(width() / 2 + 620, height() / 2 - 250),
              anchor("center"),
              color(0, 0, 0),
              text("x" + speed_Shop, {
                size: 28,
                width: 320,
              }),
            ]);

            item1textRemaining.text =
              "(" + "x" + speed_Shop + " Remaining" + ")";

            wait(3, () => {
              item1textRemaining.destroy();
            });
          }
        }
      });
      item1.onUpdate(() => {
        if (item1.isHovering()) {
          item1.scale = vec2(width() / 5648);
        } else {
          item1.scale = vec2(width() / 9000);
        }
      });

      add([
        pos(width() / 2 + 650, height() / 2 - 150),
        rect(100, 100),
        outline(4),
        area(),
        color(207, 159, 255),
      ]);

      let item2 = add([
        sprite("invincibility"),
        pos(width() / 2 + 700, height() / 2 - 100),
        scale(width() / 5000),
        area(),
        anchor("center"),
      ]);

      let preClickItem2 = null;
      if (invincibility_Shop >= 1) {
        preClickItem2 = add([
          pos(width() / 2 + 830, height() / 2 - 170),
          anchor("center"),
          color(0, 0, 0),
          text("x" + invincibility_Shop, {
            size: 38,
            width: 320,
          }),
        ]);
      }

      preClickItem2.onUpdate(() => {
        preClickItem2.text = "x" + invincibility_Shop;
      });
      let item2TimerStarted = false;
      item2.onClick(() => {
        if (
          clickedItem2 == false &&
          item2TimerStarted == false &&
          invincibility_Shop >= 1
        ) {
          let item2TimerCounter = 15;
          let item2Timer = add([
            pos(width() / 2 + 840, height() / 2 - 30),
            anchor("center"),
            color(0, 0, 0),
            text("Timer:", {
              size: 38,
              width: 320,
            }),
          ]);
          if (item2TimerStarted == false) {
            loop(1, () => {
              item2TimerCounter = item2TimerCounter - 1;
            });
            item2Timer.onUpdate(() => {
              item2Timer.text = item2TimerCounter;
            });
          }

          if (invincibility_Shop >= 1) {
            invincibility_Shop = invincibility_Shop - 1;
            clickedItem2 = true;

            wait(15, () => {
              item2TimerStarted = false;
              item2Timer.destroy();
              clickedItem2 = false;
            });
            let item2text = add([
              pos(width() / 2 + 690, height() / 2 - 110),
              anchor("center"),
              text("x" + invincibility_Shop, {
                size: 48,
                width: 320,
              }),
            ]);

            item2text.text = "USED";
            wait(3, () => {
              item2text.destroy();
            });

            let item2textRemaining = add([
              pos(width() / 2 + 620, height() / 2 - 80),
              anchor("center"),
              color(0, 0, 0),
              text("x" + invincibility_Shop, {
                size: 28,
                width: 320,
              }),
            ]);

            item2textRemaining.text =
              "(" + "x" + invincibility_Shop + " Remaining" + ")";

            wait(3, () => {
              item2textRemaining.destroy();
            });
          }
        }
      });
      item2.onUpdate(() => {
        if (item2.isHovering()) {
          item2.scale = vec2(width() / 5648);
        } else {
          item2.scale = vec2(width() / 9000);
        }
      });

      add([
        pos(width() / 2 + 650, height() / 2 - -10),
        rect(100, 100),
        outline(4),
        area(),
      ]);

      let item3 = add([
        sprite("cooldown"),
        pos(width() / 2 + 700, height() / 2 - -60),
        scale(width() / 5000),
        area(),
        anchor("center"),
      ]);

      let preClickItem3 = null;

      if (slowdown_Shop >= 1) {
        preClickItem3 = add([
          pos(width() / 2 + 830, height() / 2 - 10),
          anchor("center"),
          color(0, 0, 0),
          text("x" + slowdown_Shop, {
            size: 38,
            width: 320,
          }),
        ]);
      }

      preClickItem3.onUpdate(() => {
        preClickItem3.text = "x" + slowdown_Shop;
      });
      let item3TimerStarted = false;

      item3.onClick(() => {
        if (
          clickedItem3 == false &&
          item3TimerStarted == false &&
          slowdown_Shop >= 1
        ) {
          let item3TimerCounter = 5;
          let item3Timer = add([
            pos(width() / 2 + 850, height() / 2 - -130),
            anchor("center"),
            color(0, 0, 0),
            text("Timer:", {
              size: 38,
              width: 320,
            }),
          ]);
          if (item3TimerStarted == false) {
            loop(1, () => {
              item3TimerCounter = item3TimerCounter - 1;
            });
            item3Timer.onUpdate(() => {
              item3Timer.text = item3TimerCounter;
            });
          }

          if (slowdown_Shop >= 1) {
            slowdown_Shop = slowdown_Shop - 1;
            clickedItem3 = true;
            wait(5, () => {
              item3TimerStarted = false;
              item3Timer.destroy();
              clickedItem3 = false;
            });
            let item3text = add([
              pos(width() / 2 + 680, height() / 2 - -60),
              anchor("center"),
              text("x" + slowdown_Shop, {
                size: 48,
                width: 320,
              }),
            ]);

            item3text.text = "USED";
            wait(3, () => {
              item3text.destroy();
            });

            let item3textRemaining = add([
              pos(width() / 2 + 610, height() / 2 - -90),
              anchor("center"),
              color(0, 0, 0),
              text("x" + slowdown_Shop, {
                size: 28,
                width: 320,
              }),
            ]);

            item3textRemaining.text =
              "(" + "x" + slowdown_Shop + " Remaining" + ")";

            wait(3, () => {
              item3textRemaining.destroy();
            });
          }
        }
      });
      item3.onUpdate(() => {
        if (item3.isHovering()) {
          item3.scale = vec2(width() / 5648);
        } else {
          item3.scale = vec2(width() / 9000);
        }
      });

      add([
        pos(width() / 2 + 650, height() / 2 - -155),
        rect(100, 100),
        outline(4),
        area(),
        color(207, 159, 255),
      ]);

      let item4 = add([
        sprite("magnifying"),
        pos(width() / 2 + 700, height() / 2 - -200),
        scale(width() / 5000),
        area(),
        anchor("center"),
      ]);

      let preClickItem4 = null;

      if (shrinker_Shop >= 1) {
        preClickItem4 = add([
          pos(width() / 2 + 830, height() / 2 - -140),
          anchor("center"),
          color(0, 0, 0),
          text("x" + shrinker_Shop, {
            size: 38,
            width: 320,
          }),
        ]);
      }
      let item4TimerStarted = false;
      preClickItem4.onUpdate(() => {
        preClickItem4.text = "x" + shrinker_Shop;
      });

      item4.onClick(() => {
        if (
          clickedItem4 == false &&
          item4TimerStarted == false &&
          shrinker_Shop >= 1
        ) {
          let item4TimerCounter = 5;
          let item4Timer = add([
            pos(width() / 2 + 850, height() / 2 - -280),
            anchor("center"),
            color(0, 0, 0),
            text("Timer:", {
              size: 38,
              width: 320,
            }),
          ]);
          if (item4TimerStarted == false) {
            loop(1, () => {
              item4TimerCounter = item4TimerCounter - 1;
            });
            item4Timer.onUpdate(() => {
              item4Timer.text = item4TimerCounter;
            });
          }

          if (shrinker_Shop >= 1) {
            shrinker_Shop = shrinker_Shop - 1;
            clickedItem4 = true;
            item4TimerStarted = true;

            wait(5, () => {
              clickedItem4 = false;
              item4TimerStarted = false;
              item4Timer.destroy();
            });
            let item4text = add([
              pos(width() / 2 + 680, height() / 2 - -200),
              anchor("center"),
              text("x" + shrinker_Shop, {
                size: 48,
                width: 320,
              }),
            ]);

            item4text.text = "USED";
            wait(3, () => {
              item4text.destroy();
            });

            let item4textRemaining = add([
              pos(width() / 2 + 610, height() / 2 - -230),
              anchor("center"),
              color(0, 0, 0),
              text("x" + shrinker_Shop, {
                size: 28,
                width: 320,
              }),
            ]);

            item4textRemaining.text =
              "(" + "x" + shrinker_Shop + " Remaining" + ")";

            wait(3, () => {
              item4textRemaining.destroy();
            });
          }
        }
      });
      item4.onUpdate(() => {
        if (item4.isHovering()) {
          item4.scale = vec2(width() / 5648);
        } else {
          item4.scale = vec2(width() / 9000);
        }
      });
    }

    shopitemsGame();

    addButton("RETURN", vec2(width() - 100, height() - 65), () => {
      if (ucSoundFX == true) {
        play("UI");
      }
      if (ucGameMusic == true) {
        gameMusic.paused = true;
        mainMenuMusic.paused = false;
      } else if (ucGameMusic == false) {
        gameMusic.paused = true;
        mainMenuMusic.paused = true;
      }
      go("start");
    });

    let moveSpeed = 600; // Speed of players movement
    onUpdate(() => {
      if (clickedItem1 == true) {
        moveSpeed = 1200;
        wait(5, () => {
          moveSpeed = 600;
        });
      }
    });

    // Player Score
    const playerScoreLabel = add([
      pos(0, 0),
      text("Your Score: " + "\n" + playerScore, {
        size: 48,
        width: 320,
      }),
    ]);

    // Difficulty Selection Console Logger
    if (easy == true) {
      console.log("Difficulty selected: Easy");
    } else if (medium == true) {
      console.log("Difficulty selected: Medium");
    } else if (hard == true) {
      console.log("Difficulty selected: Hard");
    }

    onUpdate(() => {
      playerScoreLabel.text = "Your Score: " + "\n" + playerScore;
    });

    // Player Health Label
    const playerHealthLabel = add([
      pos(width() - 285, 10),
      text("Your Score: " + "\n" + playerHealth, {
        size: 48,
        width: 320,
      }),
    ]);

    onUpdate(() => {
      playerHealthLabel.text = "Your Health: " + "\n" + playerHealth + "%";
    });

    // Register Keypress
    onKeyDown("right", () => {
      if (player.pos.x < screenWidth - player.width) {
        // Checks if the player's right edge is within the screen
        player.move(moveSpeed, 0);
      }
    });

    onKeyDown("d", () => {
      if (player.pos.x < screenWidth - player.width) {
        player.move(moveSpeed, 0);
      }
    });

    onKeyDown("left", () => {
      if (player.pos.x > 0) {
        // Checks if the player's left edge is within the screen
        player.move(-moveSpeed, 0);
      }
    });

    onKeyDown("a", () => {
      if (player.pos.x > 0) {
        player.move(-moveSpeed, 0);
      }
    });
    // Collision for Healthy objects
    onCollide("h_Obj", "player", (hObj) => {
      if (ucSoundFX == true) {
        play("consuming");
      }
      destroy(hObj);
      playerScore += 10;
      console.log("Player Score: ", playerScore);
    });

    let isMagnified = false;

    // Collision for Powerup objects
    onCollide("powerup_Obj", "player", (powerupObj) => {
      if (ucSoundFX == true) {
        play("consuming");
      }
      destroy(powerupObj);
    });

    onCollide("car", "player", (car) => {
      if (ucSoundFX == true) {
        play("consuming");
      }
      carPowerup = 1000;
      isMagnified = false;
      wait(7, () => {
        carPowerup = 400;
      });
      destroy(car);
    });

    onCollide("bonus", "player", (bonus) => {
      if (ucSoundFX == true) {
        play("consuming");
      }
      isMagnified = false;
      console.log("BONUSSSSS");
      carPowerup = 400;
      playerScore = playerScore * 2;
      destroy(bonus);
    });

    let isInvincibile = false;
    console.log(isInvincibile);
    onCollide("invincibility", "player", (invincibility) => {
      if (ucSoundFX == true) {
        play("consuming");
      }
      isMagnified = false;
      isInvincibile = true;
      console.log("Invincibility Activated");
      wait(15, () => {
        console.log("Invincibility Over");
        isInvincibile = false;
      });
      console.log("invincibility");
      carPowerup = 400;
      destroy(invincibility);
    });

    onUpdate(() => {
      if (clickedItem2 == true) {
        isInvincibile = true;
        wait(15, () => {
          console.log("Invincibility Over");
          isInvincibile = false;
        });
        console.log("invincibility");
      }
    });

    let isShielded = false;
    onCollide("shield", "player", (shield) => {
      if (ucSoundFX == true) {
        play("consuming");
      }
      isMagnified = false;
      console.log("Shield Activated");
      carPowerup = 400;
      isShielded = true;
      wait(15, () => {
        console.log("Shield Over");
        isShielded = false;
      });
      destroy(shield);
    });

    onCollide("pause", "player", (pause) => {
      if (ucSoundFX == true) {
        play("consuming");
      }
      isMagnified = false;
      carPowerup = 100;
      wait(15, () => {
        console.log("Pause Over");
        carPowerup = 400;
      });
      destroy(pause);
    });

    onUpdate(() => {
      if (clickedItem3 == true) {
        carPowerup = 100;
        wait(5, () => {
          console.log("Pause Over");
          carPowerup = 400;
        });
      }
    });

    onCollide("coin", "player", (coin) => {
      if (ucSoundFX == true) {
        play("consuming");
      }
      carPowerup = 400;
      isMagnified = false;

      biteCoins = biteCoins + Config_biteCoins;
      console.log("Bitecoins: " + biteCoins);
      destroy(coin);
    });

    const originalWidth = player.width;
    const originalHeight = player.height;

    let resizingInProgress = false;

    onCollide("magnifying", "player", (magnifying) => {
      if (ucSoundFX == true) {
        play("consuming");
      }
      carPowerup = 400;
      if (resizingInProgress == false) {
        player.width *= 0.6;
        player.height *= 0.6;
        resizingInProgress = true;
      }
      wait(5, () => {
        console.log("Mag Over");
        resizingInProgress = false;
        player.width = originalWidth;
        player.height = originalHeight;
      });
      destroy(magnifying);
    });

    onUpdate(() => {
      if (clickedItem4 && !resizingInProgress) {
        resizingInProgress = true;

        player.width *= 0.6;
        player.height *= 0.6;

        wait(5, () => {
          player.width = originalWidth;
          player.height = originalHeight;
          resizingInProgress = false;
        });
      }
    });

    onCollide("bonus", "platform", (bonus) => {
      destroy(bonus);
    });
    onCollide("car", "platform", (car) => {
      destroy(car);
    });
    onCollide("invincibility", "platform", (invincibility) => {
      destroy(invincibility);
    });
    onCollide("magnifying", "platform", (magnifying) => {
      destroy(magnifying);
    });
    onCollide("pause", "platform", (pause) => {
      destroy(pause);
    });
    onCollide("shield", "platform", (shield) => {
      destroy(shield);
    });
    onCollide("h_Obj", "platform", (hObj) => {
      destroy(hObj);
    });
    onCollide("coin", "platform", (coin) => {
      destroy(coin);
    });

    // Collision for hamrful objects
    onCollide("ha_Obj", "player", (haObj) => {
      if (ucSoundFX == true) {
        play("ha_consuming");
      }
      destroy(haObj);
      if (isInvincibile == false && isShielded == false) {
        if (playerScore > 0) {
          playerScore -= 10;
        }
      } else {
        console.log("Protected From Score Decrease");
      }
    });

    onCollide("ha_Obj", "platform", (haObj) => {
      destroy(haObj);
    });

    onCollide("h_Obj", "player", (hObj) => {
      console.log("Player Health:", playerHealth);
      destroy(hObj);
      if (playerHealth <= 90) {
        playerHealth += Config_hHeal;
      } else {
        playerHealth = 100; // Ensure health doesn't exceed 100
      }
    });

    onCollide("ha_Obj", "player", (haObj) => {
      destroy(haObj);
      if (isInvincibile == false) {
        if (playerHealth >= 10) {
          playerHealth -= Config_hDamage;
        } else {
          playerHealth = 0; // Ensure health doesn't go below 0
          if (playerScore >= playerHS) {
            console.log("Updating High Score!");
            playerHS = playerScore;
          }
          go("end");
          0;
        }
      } else {
        console.log("Health Maintained - Invincibility");
      }
    });

    onUpdate(() => {
      if (playerHealth <= 0) {
        console.log("Player Health is below 0!");
        if (playerScore >= playerHS) {
          console.log("Updating High Score!");
          playerHS = playerScore;
        }
        go("end");
      }
    });

    onUpdate(() => {
      setGravity(carPowerup);
    });

    // Healthy Object Function Call
    if (playerAlive == true) {
      loop(Config_hObj, () => {
        spawnh_Obj();
      });
    }

    // Harmful Object Function Call
    if (playerAlive == true) {
      loop(Config_haObj, () => {
        spawnha_Obj();
      });
    }

    // Powerup Object Function Call

    if (playerAlive == true) {
      const powerupTypes = [
        spawnCar_Obj,
        spawnBonus_Obj,
        spawnInvincibility_Obj,
        spawnMagnifying_Obj,
        spawnPause_Obj,
        spawnShield_Obj,
      ];
      loop(Config_powerup, () => {
        const type = choose(powerupTypes);
        type();
      });
    }
    // Coin Function Call
    if (playerAlive == true) {
      loop(Config_coins, () => {
        spawnCoin_Obj();
      });
    }
  });

  scene("end", () => {
    gameMusic.paused = true;
    if (ucSoundFX == true) {
      wait(0.5, () => {
        play("lose");
      });
    }

    const backgroundSprites = ["end-1"];

    const background = add([
      // Pick Random Background
      sprite(choose(backgroundSprites)),
      pos(width() / 2, height() / 2),
      anchor("center"),
      scale(Math.max(width() / 1820, height() / 1080)),
      fixed(),
    ]);

    add([
      pos(width() / 2, height() / 2 - 100),
      anchor("center"),
      text("Your Score: " + "\n" + "           " + playerScore, {
        size: 48,
        width: 320,
      }),
    ]);

    add([
      pos(width() / 2, height() / 2 + 30),
      anchor("center"),
      text("Your High Score: " + "\n" + "                " + playerHS, {
        size: 48,
        width: 420,
      }),
    ]);
    addButton("RETURN", vec2(width() / 2, height() / 2 + 300), () => {
      if (ucSoundFX == true) {
        play("UI");
      }
      if (ucGameMusic == true) {
        gameMusic.paused = true;
        mainMenuMusic.paused = false;
      } else if (ucGameMusic == false) {
        gameMusic.paused = true;
        mainMenuMusic.paused = true;
      }
      go("start");
    });
  });

  go("start");
}
