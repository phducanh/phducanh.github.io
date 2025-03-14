import { memo, useMemo } from "react";
import { WeekDiv } from "./WeekDiv";

export const DecadeDiv = memo(({ title, dateList, index, isLastDecade = false }) => {
    // Move calculations into useMemo to prevent recalculation on every render
    const weeks = useMemo(() => {
        const startYear = dateList[0]?.date
            ? new Date(dateList[0].date).getFullYear()
            : new Date(1998 + index * 10, 6, 31).getFullYear();
        const startDate = new Date(startYear, 6, 31);
        const endDate = new Date(startYear + 10, 6, 31);
        const currentYear = new Date().getFullYear();
        const weeksArray = [];

        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 7)) {
            const weekDate = d.toISOString().split("T")[0];
            const weekStart = new Date(d);
            const weekEnd = new Date(d);
            weekEnd.setDate(weekStart.getDate() + 6);

            // Optimize event finding by using proper date comparison
            const eventForWeek = dateList.find((date) => {
                const eventDate = new Date(date.date);
                return eventDate >= weekStart && eventDate <= weekEnd;
            });

            const july31 = new Date(d.getFullYear(), 6, 31);
            const isBirthDayWeek = july31 >= d && july31 <= weekEnd;

            if (isBirthDayWeek && (d.getFullYear() <= currentYear || isLastDecade)) {
                const year = d.getFullYear();
                const age = year - 1998;
                weeksArray.push({
                    type: "birthday",
                    key: `birthday-${year}`,
                    year,
                    age,
                    date: weekDate,
                });
            }

            if (eventForWeek) {
                weeksArray.push({
                    type: "event",
                    key: eventForWeek.date,
                    event: eventForWeek,
                });
            }

            if (isLastDecade &&
                eventForWeek &&
                dateList.indexOf(eventForWeek) === dateList.length - 1) {
                break;
            }
            if (!isBirthDayWeek) {
                weeksArray.push({
                    type: "empty",
                    key: weekDate,
                    date: weekDate,
                });
            }
        }

        return weeksArray;
    }, [dateList, index, isLastDecade]); // Dependencies for useMemo

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
            {weeks.map((week) => {
                switch (week.type) {
                    case "event":
                        return <WeekDiv key={week.key} date={week.event} />;
                    case "birthday":
                        return (
                            <div
                                key={week.key}
                                data-date={week.date}
                                className="border border-gray border-secondary float-left text-truncate"
                                style={{
                                    height: "2em",
                                    maxHeight: "2em",
                                    padding: "2px 5px",
                                    margin: "2px",
                                }}
                            >
                                {week.age} in {week.year}
                            </div>
                        );
                    default:
                        return (
                            <div
                                key={week.key}
                                data-date={week.date}
                                className="week border border-tertiary float-left text-center text-truncate" />
                        );
                }
            })}
        </>
    );
});
