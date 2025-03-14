import { memo } from "react";
import eventData from "../../data/eventData.json";
import { DecadeDiv } from "./DecadeDiv";


// Memoize the entire container component
export default memo(function TimeContentContainer() {
  return (
    <div className="row justify-content-center">
      <div className="col-12">
        {eventData.decadeList.map((decade, index) => (
          <DecadeDiv
            key={decade}
            title={decade.title}
            dateList={decade.dateList}
            index={index}
            isLastDecade={index === eventData.decadeList.length - 1}
          />
        ))}
      </div>
    </div>
  );
});
