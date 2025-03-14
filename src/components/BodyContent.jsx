import { useEffect } from "react";
import Header from "./Header";
import Description from "./Description";
import TimeContentContainer from "./TimeContentContainer";
export const BodyContent = () => {

  useEffect(() => {
    // Handle future dates
    const today = new Date();
    const weekElements = document.querySelectorAll(".week");

    weekElements.forEach((element) => {
      const dateAttr = element.getAttribute("data-date");
      if (dateAttr && today < Date.parse(dateAttr)) {
        element.classList.add("future-date");
      }
    });
  }, []); // Empty dependency array means this runs once on mount
  return (
    <div>
      <div id="fullscreen" className="justify-content-center">
        <section className="life-in-weeks">
          <div className="row justify-content-center">
            <div className="col-12">
              <Header />
              <Description />
            </div>
          </div>
          <TimeContentContainer />
        </section>
      </div>
    </div>
  );
};
