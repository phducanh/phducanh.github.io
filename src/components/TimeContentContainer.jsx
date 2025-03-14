
import eventData from "../../data/eventData.json";

const WeekDiv = ({ date }) => (
    <div
    data-date={date.date}
    className="week border border-tertiary float-left text-center text-truncate"
  >
    
    <div
      title=""
      target="_new"
      data-toggle="popover"
      data-placement="auto"
      data-trigger="hover"
      data-content={date.description}
      data-original-title={date.date}
    >
      {date.content}
    </div>
  </div>
);

const DecadeDiv = ({ title, dateList, index }) => {
  const startYear = new Date(dateList[0]?.date).getFullYear(); // Get the start year from the first event
  const startDate = new Date(startYear, 6, 31); // Start from July 31st of the start year
  const endDate = new Date(startYear + 10, 6, 31); // End at July 31st of the next decade
  const weeks = []; // Array to hold the weeks

  // Generate weeks between start and end dates
  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 7)) {
    const weekDate = d.toISOString().split('T')[0]; // Format date as "YYYY-MM-DD"
    
    // Calculate week start and end dates
    const weekStart = new Date(d);
    const weekEnd = new Date(d);
    weekEnd.setDate(weekStart.getDate() + 6);

    // Find any event that falls within this week
    const eventForWeek = dateList.find(date => {
      const eventDate = new Date(date.date);
      return eventDate >= weekStart && eventDate <= weekEnd;
    });
    
    // Check if July 31st falls within this week
    const currentDate = new Date(d);
    const july31 = new Date(currentDate.getFullYear(), 6, 31);
    const isBirthDayWeek = july31 >= currentDate && july31 <= weekEnd;
    
    // Always push a blank div for the week
    if(!isBirthDayWeek) {
        weeks.push(
        <div key={weekDate} data-date={weekDate} className="week border border-tertiary float-left text-center text-truncate">
            {/* Blank div for the week */}
        </div>
        );
    }

        // Show the special birthday div every year on July 31st
        if (isBirthDayWeek) { // July is month 6 (0-indexed)

            console.log("Date ne", d.getDate(), d.getMonth(), d.getFullYear())
          const year = d.getFullYear(); // Get the current year
          const age = year - 1998; // Calculate age based on birth year
          weeks.push(
            <div key={`birthday-${year}`}
            data-date={weekDate}
            className="border border-gray border-secondary float-left text-truncate"
              style={{ height: "2em", maxHeight: "2em", padding: "2px 5px", margin: "2px" }}
              data-toggle="popover"
              data-placement="right" data-trigger="hover" data-content="" data-original-title="" title="">
              {age} in {year}
            </div>
          );
        }

    // If there's an event for the week, render the WeekDiv
    if (eventForWeek) {
        console.log("Push event for week", eventForWeek)
      weeks[weeks.length] = <WeekDiv key={eventForWeek.date} date={eventForWeek} />;
    }


  }

  return (
    <>
      <br clear="all"/>
      <div name={`decade-${index}`}></div>
      <div className="row text-left display-block w-100 mt-4">
        <div className="col sticky-top mt-1" style={{ top: "60px", backgroundColor: "#fff" }}>
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
          <DecadeDiv key={decade} title={decade.title} dateList={decade.dateList} index={index} />
        ))}
        {/* <br clear="all" />
        <a name="decade-0"></a>
        <div className="row text-left display-block w-100 mt-4">
          <div
            className="col sticky-top mt-1"
            style={{ top: "60px", backgroundColor: "#fff" }}
          >
            <h2 className="mt-0">My first ten years</h2>
          </div>
        </div>
        <div
          className="border border-gray border-secondary float-left text-truncate"
          data-toggle="popover"
          data-placement="right"
          data-trigger="hover"
          data-content=""
          data-original-title=""
          title=""
        >
          0 in 1998
        </div>
        <div
          data-date="1998-07-31"
          className="week border border-tertiary float-left text-center text-truncate"
        >
          {" "}
          <a
            title=""
            target="_new"
            data-toggle="popover"
            data-placement="auto"
            data-trigger="hover"
            data-content="Born in Thanh Hoa city in Viet Nam. July 31st is the birthday of Harry Potter as well. I'm a Tiger, at the same time a Leo, which constitutes my stubbornness and confidence"
            data-original-title="Jul 31, 1998"
          >
            I entered the world
          </a>
        </div>
        {dates.map((date) => (
          <WeekDiv key={date} date={date} />
        ))} */}
      </div>
    </div>
  );
}
