import React from "react";
import { Card } from "./card";
export const Cardcontainer = (props) => {
  return (
    <div id="resources-card-container">
      <div className="intro-banner">
        <div className="overlay">
          <div className="container">
            <div className="row card-row">
                <Card/>
                <Card/>
                <Card/>
            </div>
            <div className="row card-row">
                <Card/>
                <Card/>
                <Card/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
