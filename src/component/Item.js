import React, { useState, useRef } from "react";
import { convertDate } from "../utils/date.utils";
import { ImPause, ImPlay3 } from "react-icons/im";

export default function Item({
  name,
  birthDate,
  deathDate,
  imageRef,
  obituaryText,
  mp3Url,
}) {
  const formattedBirthDate = convertDate(birthDate);
  const formattedDeathDate = convertDate(deathDate);
  const [isPause, setIsPause] = useState(false);
  const [showObituary, setShowObituary] = useState(false);

  const audioRef = useRef(new Audio(mp3Url));

  function playAudio() {
    const pause = isPause;
    setIsPause(!isPause);

    if (!pause) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }

  return (
    <article className="item">
      <div
        className="img-container"
        onClick={() => {
          setShowObituary(!showObituary);
        }}
      >
        <img src={imageRef} alt={name} />{" "}
      </div>
      <div className="item-footer">
        <h3> {name} </h3>{" "}
        <p>
          {" "}
          {formattedBirthDate} - {formattedDeathDate}{" "}
        </p>
        <div className="obituary-text">
          {" "}
          {showObituary ? (
            <div>
              <p> {obituaryText} </p>
              <div>
                <button className="pause-play-btn" onClick={playAudio}>
                  {" "}
                  {isPause ? (
                    <ImPause className="pause-play-btn-icon"> </ImPause>
                  ) : (
                    <ImPlay3 className="pause-play-btn-icon"> </ImPlay3>
                  )}{" "}
                </button>{" "}
              </div>{" "}
            </div>
          ) : (
            ""
          )}{" "}
        </div>{" "}
      </div>{" "}
    </article>
  );
}