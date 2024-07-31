import React from "react";
export const Card = (props) => {
  return (
    <div className="resource-card">
    <div className="card-image">
        <img src={require('../../img/cards-images/card-pic.png')} />
    </div>
    <div  className="card-link">
      <a href="#">
        <span>
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg"  width="30" height="30" viewBox="0 0 512 512" aria-hidden="true"><g id="Alternate External Link1_layer"><path d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z" fill="#fff"></path></g></svg>
        </span>
      </a>
    </div>
    <div className="card-content">
        <div className="card-info">
            <span className="date">Date:12/12/12</span>
            <span className="heading">Heading</span>
        </div>
        <div className="card-text">
            <p>
                In the spirit of Valentine’s Day I wrote this blog a couple weeks ago about what it was like dating a “Single Mom.” I didn’t publish it because as I started writing it the blog took on a life of it’s own and went in like 5 different directions. So this version you are reading is the paired down version of my original draft which hopefully reads clearer.
            </p>
        </div> 
      </div>
    </div>
  );
};
