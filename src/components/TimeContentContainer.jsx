import eventData from "../../data/eventData.json";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

const WeekDiv = ({ date }) => (
  <div
    data-date={date.date}
    className="week border border-tertiary float-left text-center text-truncate"
  >
    <Tooltip>
      <TooltipTrigger asChild>
        <div>{date.content}</div>
      </TooltipTrigger>
      {date.description && (
        <TooltipContent>
          <p
            className={`!bg-gray-300 text-lg !text-gray-600 font-semibold px-2 py-1 ${
              date.description?.length > 0 ? "!mb-2" : "!mb-0"
            }`}
          >
            {new Date(date.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </p>
          {date.description?.length > 0 && (
            <p className="text-md px-2 !mb-0 pb-2">{date.description}</p>
          )}
        </TooltipContent>
      )}
    </Tooltip>
  </div>
);

const DecadeDiv = ({ title, dateList, index, isLastDecade = false }) => {
  const startYear = dateList[0]?.date
    ? new Date(dateList[0].date).getFullYear()
    : new Date(1998 + index * 10, 6, 31).getFullYear(); // Get start year from title (e.g., "2020-2029" -> 2020) if dateList is empty
    console.log("Start year", startYear)
  const startDate = new Date(startYear, 6, 31); // Start from July 31st of the start year
  const endDate = new Date(startYear + 10, 6, 31); // End at July 31st of the next decade
  const weeks = []; // Array to hold the weeks

  // Generate weeks between start and end dates
  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 7)) {
    const weekDate = d.toISOString().split("T")[0]; // Format date as "YYYY-MM-DD"

    // Calculate week start and end dates
    const weekStart = new Date(d);
    const weekEnd = new Date(d);
    weekEnd.setDate(weekStart.getDate() + 6);

    // Find any event that falls within this week
    const eventForWeek = dateList.find((date) => {
      const eventDate = new Date(date.date);
      return eventDate >= weekStart && eventDate <= weekEnd;
    });

    // Check if July 31st falls within this week
    const currentDate = new Date(d);
    const july31 = new Date(currentDate.getFullYear(), 6, 31);
    const isBirthDayWeek = july31 >= currentDate && july31 <= weekEnd;

    // Stop adding items if this is the last decade and the last event

    // Always push a blank div for the week
    if (!isBirthDayWeek) {
      weeks.push(
        <div
          key={weekDate}
          data-date={weekDate}
          className="week border border-tertiary float-left text-center text-truncate"
        >
          {/* Blank div for the week */}
        </div>
      );
    }
    // If there's an event for the week, render the WeekDiv
    if (eventForWeek) {
      console.log("Push event for week", eventForWeek);
      weeks[weeks.length] = (
        <WeekDiv key={eventForWeek.date} date={eventForWeek} />
      );
    }
    if (
      isLastDecade &&
      eventForWeek &&
      dateList.indexOf(eventForWeek) === dateList.length - 1
    ) {
      break;
    }
    // Show the special birthday div every year on July 31st
    if (isBirthDayWeek) {
      const year = d.getFullYear();
      const currentYear = new Date().getFullYear();
      
      // Only show birthday if it's not in the future
      if (year <= currentYear) {
        const age = year - 1998;
        weeks.push(
          <div
            key={`birthday-${year}`}
            data-date={weekDate}
            className="border border-gray border-secondary float-left text-truncate"
            style={{
              height: "2em",
              maxHeight: "2em",
              padding: "2px 5px",
              margin: "2px",
            }}
            data-toggle="popover"
            data-placement="right"
            data-trigger="hover"
            data-content=""
            data-original-title=""
            title=""
          >
            {age} in {year}
          </div>
        );
      }
    }
  }

  return (
    <>
      <br clear="all" />
      <div name={`decade-${index}`}></div>
      <div className="row text-left display-block w-100 mt-4">
        <div
          className="col sticky-top mt-1"
          style={{ top: "60px", backgroundColor: "#fff" }}
        >
          <h2 className="mt-0">{title}</h2>
        </div>
      </div>
      {weeks} {/* Render the weeks */}
    </>
  );
};

export default function TimeContentContainer() {
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
}
