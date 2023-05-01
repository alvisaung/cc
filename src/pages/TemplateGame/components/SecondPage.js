import React, { useEffect } from "react";
import { gsap } from "gsap";

export default function SecondPage(props) {
  useEffect(() => {
    if (props.currPage == "#second-page") {
      let tl = gsap.timeline();
      tl.to(".second-page-desc", { ease: "elastic.out(1, 0.75)", autoAlpha: 1, duration: 1, delay: 1.5 });
      tl.to([".second-page-play-btn", ".second-page-term"], {
        autoAlpha: 1,
        delay: 0,
        duration: 1.5,
      });
    } else {
      gsap.to([".second-page-desc", ".second-page-play-btn", ".second-page-term"], { autoAlpha: 0 });
    }
  }, [props.currPage]);

  return (
    <div id="second-page">
      <div className="text-gp">
        <div className="header">{`Before you play, do know that`}</div>
        <div className="second-page-desc">
          We generally do not collect your personal data unless (a) it is provided to us voluntarily by you directly or
          via a third party who has been duly authorised by you to disclose your personal data to us (your "authorised
          representative") after (i) you (or your authorised representative) have been notified of the purposes for
          which the data is collected, and (ii) you authorised representative) have provided written consent to the
          collection and usage of your personal data for those purposes, or (b) collection and use of personal data
          without consent is permitted or required by the PDPA or other laws. We shall seek your consent before
          collecting any additional personal data and before using your personal data for a purpose which has not been
          notified to you (except where permitted or authorised by law).
        </div>
        <button className="second-page-play-btn btn" onClick={() => props.nextPage("#second-page", "#game-page")}>
          NEXT
        </button>
        <div className="second-page-term">
          {`By tapping NEXT, I agree to Subway collecting my email and details for the purpose of this campaign.`}
        </div>
      </div>
    </div>
  );
}
