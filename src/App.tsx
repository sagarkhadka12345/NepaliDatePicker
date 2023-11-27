import "./App.css";
// import meropatro from "./MeroPatro";
// import "./nepalidatepicker.css";

import CalendarMain from "./Calendar";
import { CalendarProvider } from "./CalendarContext";
import CalendarComponent from "./CalendarComponent";
import { TDateStyle } from "./types";
function App() {
  const handleDate = (date: TDateStyle) => {
    console.log(date);
  };
  return (
    <div className="nepali-date-picker-flex nepali-date-picker-flex-col nepali-date-picker-gap-96 nepali-date-picker-justify-center nepali-date-picker-items-center w-screen">
      {/* <input className='nepalidatepicker' type='date' id='nepalidatepicker'  ref={DateREf} onClick={e => handleCLick(e)}>

      </input> */}
      {/* <input id="calling-element"></input> */}
      <CalendarProvider>
        <CalendarMain />
      </CalendarProvider>
      <CalendarComponent handleDate={handleDate} />
      {/* <div className="calendar-wrapper"></div> */}
    </div>
  );
}

export default App;
