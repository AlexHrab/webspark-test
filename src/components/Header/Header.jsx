import css from "./Header.module.scss";
import { useState, useEffect } from "react";
import { DataPicker } from "../DataPicker/DataPicker";

export function Header({ photos, onFilter }) {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  useEffect(() => {
    if (photos.length > 0) {
      const sortedDates = photos
        .map((photo) => new Date(photo.created_at))
        .sort((a, b) => a - b);

      setTimeout(() => {
        setFromDate(sortedDates[0]);
        setToDate(sortedDates[sortedDates.length - 1]);
      }, 0);
    }
  }, [photos]);

  useEffect(() => {
    if (onFilter) {
      onFilter(fromDate, toDate);
    }
  }, [fromDate, toDate, onFilter]);

  return (
    <div className={css.header}>
      <img src="/Group 1.svg" className={css.groupImage} />

      <div className={css.logoWrapper}>
        <h1 className={css.title}>monblanproject</h1>
        <span className={css.startOn}>Start on 29-12-2025</span>

        <div className={css.statisticsWrapper}>
          <p className={css.statisticsTitle}>
            870 <span className={css.statisticsTitleItem}>posts</span>
          </p>
          <p className={css.statisticsTitle}>
            11,787 <span className={css.statisticsTitleItem}>followers</span>
          </p>
          <p className={css.statisticsTitle}>
            112 <span className={css.statisticsTitleItem}>following</span>
          </p>
        </div>

        <div className={css.pickerWrapper}>
          <p className={css.pickerWrapperTitle}>Date</p>
          <div className={css.pickerContainer}>
            <DataPicker
              selectedDate={fromDate}
              onChange={setFromDate}
              className={css.picker}
            />
            <span className={css.pickerCaption}>latest uploaded</span>
          </div>
          <div className={css.pickerContainer}>
            <DataPicker
              selectedDate={toDate}
              onChange={setToDate}
              className={css.picker}
            />
            <span className={css.pickerCaption}>earliest uploaded</span>
          </div>
        </div>
      </div>
    </div>
  );
}
