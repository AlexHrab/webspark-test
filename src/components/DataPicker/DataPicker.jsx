import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function DataPicker({ selectedDate, onChange, className }) {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      isClearable
      placeholderText="Select a date"
      popperClassName="no-arrow"
      showPopperArrow={false}
      popperPlacement="bottom-start"
      className={className}
    />
  );
}
