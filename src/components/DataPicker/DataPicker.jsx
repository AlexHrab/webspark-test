import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GrFormClose } from "react-icons/gr";
import { MdCalendarMonth } from "react-icons/md";
import css from "./DataPicker.module.css";

export function DataPicker({ selectedDate, onChange, className }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClear = () => {
    onChange(null);
  };

  return (
    <div className={css.pickerWrapper}>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          onChange(date);
          setIsOpen(false);
        }}
        open={isOpen}
        onClickOutside={() => setIsOpen(false)}
        onInputClick={(e) => e.preventDefault()}
        placeholderText="Select a date"
        popperClassName="no-arrow"
        showPopperArrow={false}
        popperPlacement="bottom-start"
        className={className}
      />

      <div className={css.closeWrapper} onClick={handleClear}>
        <GrFormClose className={css.closeIcon} />
      </div>

      <div
        className={css.calendarWrapper}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <MdCalendarMonth className={css.calendarIcon} />
      </div>
    </div>
  );
}
