import React from "react";
export const Card = (props) => {
  return (
    <div className="resource-card card-popup">
    <div className="card-image">
        <img src={require('../../img/resources/resource-placeholde.jpg')} />
    </div>
    <div  className="units-avaiable">
        <span>
          3 units available
        </span>
    </div>
    <div className="resource-card-content">
        <div className="resource-card-info">
            <span>
            Municipality of Poissy
            </span>
        </div>
        <div className="resource-card-text">
            <p>
              13 families I 600 m2 I Garden I Coworking I Bar I Games room
            </p>
        </div> 
        <span className="resource-price">From $1190</span>
        <span className="resource-learn-more">Learn more</span>

      </div>
    </div>
  );
};
