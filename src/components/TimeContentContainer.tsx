import eventData from "../../data/eventData.json";

interface DateType {
  date: string;
  content?: string;
  description?: string;
}

interface DecadeType {
  title: string;
  dateList: DateType[];
}

const WeekDiv = ({ date }: { date: DateType }) => (
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

const DecadeDiv = ({ title, dateList, index }: { title: string; dateList: DateType[]; index: number }) => {
  const startYear = new Date(dateList[0]?.date).getFullYear();
  const startDate = new Date(startYear, 6, 31);
  const endDate = new Date(startYear + 10, 6, 31);
  const weeks: JSX.Element[] = [];

  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 7)) {
    const weekDate = d.toISOString().split('T')[0];
    const weekStart = new Date(d);
    const weekEnd = new Date(d);
    weekEnd.setDate(weekStart.getDate() + 6);

    const eventForWeek = dateList.find(date => {
      const eventDate = new Date(date.date);
      return eventDate >= weekStart && eventDate <= weekEnd;
    });

    const currentDate = new Date(d);
    const july31 = new Date(currentDate.getFullYear(), 6, 31);
    const isBirthDayWeek = july31 >= currentDate && july31 <= weekEnd;

    if (!isBirthDayWeek) {
      weeks.push(
        <div key={weekDate} data-date={weekDate} className="week border border-tertiary float-left text-center text-truncate">
          {/* Blank div for the week */}
        </div>
      );
    }

    if (isBirthDayWeek) {
      const year = d.getFullYear();
      const age = year - 1998;
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

    if (eventForWeek) {
      weeks[weeks.length] = <WeekDiv key={eventForWeek.date} date={eventForWeek} />;
    }
  }

  return (
    <>
      <br clear="all" />
      <div name={`decade-${index}`}></div>
      <div className="row text-left display-block w-100 mt-4">
        <div className="col sticky-top mt-1" style={{ top: "60px", backgroundColor: "#fff" }}>
          <h2 className="mt-0">{title}</h2>
        </div>
      </div>
      {weeks}
    </>
  );
};

export default function TimeContentContainer() {
  return (
    <div className="row justify-content-center">
      <div className="col-12">
        {eventData.decadeList.map((decade: DecadeType, index: number) => (
          <DecadeDiv key={decade.title} title={decade.title} dateList={decade.dateList} index={index} />
        ))}
      </div>
    </div>
  );
} 