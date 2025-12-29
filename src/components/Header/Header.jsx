import css from "./Header.module.scss";
import { useState, useEffect, useMemo } from "react";
import { DataPicker } from "../DataPicker/DataPicker";

export function Header({ photos, onFilter }) {
  const defaultDates = useMemo(() => {
    if (photos.length === 0) return { from: null, to: null };

    const sortedDates = photos
      .map((photo) => new Date(photo.created_at))
      .sort((a, b) => a - b);

    return {
      from: sortedDates[0],
      to: sortedDates[sortedDates.length - 1],
    };
  }, [photos]);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const effectiveFromDate = fromDate ?? defaultDates.from;
  const effectiveToDate = toDate ?? defaultDates.to;

  useEffect(() => {
    onFilter?.(effectiveFromDate, effectiveToDate);
  }, [effectiveFromDate, effectiveToDate, onFilter]);

  return (
    <header className={css.header}>
      <div className={css.container}>
        <img src="/Group 1.svg" alt="Profile" className={css.avatar} />

        <div className={css.content}>
          <div className={css.topRow}>
            <h1 className={css.username}>monblanproject</h1>
            <span className={css.badge}>Start on 29-12-2025</span>
          </div>

          <div className={css.stats}>
            <div className={css.stat}>
              <strong>870</strong> posts
            </div>
            <div className={css.stat}>
              <strong>11,787</strong> followers
            </div>
            <div className={css.stat}>
              <strong>112</strong> following
            </div>
          </div>

          <div className={css.filters}>
            <span className={css.filterLabel}>Date</span>

            <div className={css.datePicker}>
              <DataPicker
                selectedDate={effectiveFromDate}
                onChange={setFromDate}
              />
              <span className={css.dateLabel}>latest uploaded</span>
            </div>

            <div className={css.datePicker}>
              <DataPicker selectedDate={effectiveToDate} onChange={setToDate} />
              <span className={css.dateLabel}>earliest uploaded</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
