import css from "./ImageList.module.scss";
import { FaHeart } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";
import { useState, useEffect } from "react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";

export function ImageList({ photos }) {
  const [isGrid, setIsGrid] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 576px)");

    const handleMediaChange = (e) => {
      if (e.matches) {
        setIsGrid(true);
      }
    };

    handleMediaChange(mediaQuery);

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  function changePosition(mode) {
    const isSmallScreen = window.matchMedia("(max-width: 576px)").matches;
    if (isSmallScreen) return;

    if (mode === isGrid) return;
    setIsGrid(mode);
  }

  return (
    <div className={`${css.wrapper} ${isGrid || css.list}`}>
      <div className={css.position}>
        <BsFillGrid3X3GapFill
          onClick={() => changePosition(true)}
          fill={isGrid ? "#3D8EDA" : "#C8C7C7"}
        />
        <FaList
          onClick={() => changePosition(false)}
          fill={!isGrid ? "#3D8EDA" : "#C8C7C7"}
          className={css.positionList}
        />
      </div>
      {photos.map((photo) => (
        <div key={photo.id} className={`${css.element} ${isGrid || css.list}`}>
          <img
            src={photo.urls.small}
            alt={photo.alt_description}
            className={`${css.photo} ${isGrid || css.list}`}
          />
          <div className={`${css.info} ${isGrid || css.list}`}>
            <div className={`${css.innerWraper} ${isGrid || css.list}`}>
              <div className={`${css.reactionBox} ${isGrid || css.list}`}>
                <p className={css.title}>Reactions</p>
                <div className={`${css.statisticBox} ${isGrid || css.list}`}>
                  <div style={{ display: "flex" }} className={css.likesBox}>
                    <FaHeart />
                    <span>{photo.likes}</span>
                  </div>
                  <div style={{ display: "flex" }} className={css.likesBox}>
                    <FaMessage />
                    <span>{photo.user.total_collections}</span>
                  </div>
                </div>
              </div>

              <div className={`${css.reactionBox} ${isGrid || css.list}`}>
                <p className={css.title}>Statistics</p>
                <div className={`${css.statisticBox} ${isGrid || css.list}`}>
                  <div style={{ display: "flex" }} className={css.likesBox}>
                    <IoEyeSharp />
                    <span>{photo.views}</span>
                  </div>
                  <div style={{ display: "flex" }} className={css.likesBox}>
                    <FaDownload />
                    <span>{photo.downloads}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${css.imageUpload} ${isGrid || css.list}`}>
              <p className={`${css.uploadTitle} ${isGrid || css.list}`}>
                Image Upload
              </p>
              <span className={`${css.uploadDate} ${isGrid || css.list}`}>
                {photo.created_at.split("T")[0]}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
