import dateData from "../../data/dateData.json";

const dates = dateData.dateList;

const WeekDiv = ({ date }) => (
    <div
        data-date={date}
        className="week border border-tertiary float-left text-center text-truncate future-date"
    >
    </div>
);

export default function TimeContentContainer() {
    return (
        <div className="row justify-content-center">
        <div className="col-12">
            <br clear="all"/>
            <a name="decade-0"></a>
            <div className="row text-left display-block w-100 mt-4">
                <div className="col sticky-top mt-1" style={{ top: '60px', backgroundColor: '#fff' }}>
                    <h2 className="mt-0">
                        My first ten years
                    </h2>
                </div>
            </div>
            <div className="border border-gray border-secondary float-left text-truncate"
                 data-toggle="popover"
                data-placement="right" data-trigger="hover" data-content="" data-original-title="" title="">
                0 in 1998
            </div>
            <div data-date="1998-07-31"
                className="week border border-tertiary float-left text-center text-truncate"
                > <a title=""
                    target="_new" data-toggle="popover" data-placement="auto" data-trigger="hover"
                    data-content="Born in Thanh Hoa city in Viet Nam. July 31st is the birthday of Harry Potter as well. I'm a Tiger, at the same time a Leo, which constitutes my stubbornness and confidence"
                    data-original-title="Jul 31, 1998">I entered the world</a>
            </div>
            {dates.map(date => (
                    <WeekDiv key={date} date={date} />
                ))}
        </div>
    </div>
    );
}