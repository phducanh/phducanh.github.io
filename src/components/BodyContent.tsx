import { useEffect } from "react";
import Header from "./Header";
import Description from "./Description";
import TimeContentContainer from "./TimeContentContainer";

export const BodyContent = () => {
  useEffect(() => {
    if (document) {
      const popOverItem = document.querySelectorAll<HTMLElement>("[data-toggle='popover']");
      popOverItem.forEach((item) => {
        // item.popover();
      });
    }
  }, []);

  useEffect(() => {
    const today = new Date();
    const weekElements = document.querySelectorAll<HTMLElement>(".week");

    weekElements.forEach((element) => {
      const dateAttr = element.getAttribute("data-date");
      if (dateAttr && today < new Date(dateAttr)) {
        element.classList.add("future-date");
      }
    });
  }, []);

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