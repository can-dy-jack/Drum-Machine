"use client";

// import Image from "next/image";
import { Music } from "@/utils/constant";
import { useEffect, useState } from "react";

const key_code = [81, 87, 69, 65, 83, 68, 90, 88, 67];
const doms = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];

export default function Home() {
  const [type, setType] = useState(["Q", "Heater-1"]);

  function playMusic(order) {
    const sound = document.getElementById(Music[order].keyName);
    sound.currentTime = 0;
    sound.play();
    setType([Music[order].keyName, Music[order].id]);
  }

  useEffect(() => {
    document.onkeydown = (e) => {
      if (key_code.indexOf(e.keyCode) > -1) {
        const idx = key_code.indexOf(e.keyCode);
        playMusic(idx);
        // 键盘按下 按钮效果
        const drums = document.getElementById("drum-pad" + (idx + 1));
        drums.style.animation = "ease 0.25s toggle-active";
        setTimeout(() => {
          drums.style.animation = "none";
        }, 250);
      }
    };
  });

  return (
    <div className="root">
      <section className="toggle">
        {
          doms.map((item, index) => (
            <span
              className="drum-pad"
              id={"drum-pad" + (index + 1)}
              onClick={() => playMusic(index)}
              key={item}
            >
              {item}
              <audio class="clip" id={item} src={Music[index].url} />
            </span>
          ))
        }
      </section>
      <section className="control w-44">
        <div id="display" className="display text-center">
          {type[1]}
        </div>
      </section>
    </div>
  );
}
