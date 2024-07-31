import React from "react";
export const Survey = (props) => {
  return (
    <div id="survey">
      {console.log(props.data)}
      <div className="container">
        <div className="text-container">
          {props.data
              ?  <h2>{props.data.text}</h2>
              : "Loading..."}
        </div>
        
        <a href="https://momunity-survey.web.app/" className="survey-form-btn">
          <div>
            <h3>Survey Form</h3>
            <p>Please fill out this form</p>
          </div>
          <div className="arrow">
             <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.1956 17.7007C15.5826 18.0947 16.2158 18.1004 16.6098 17.7134L21.7007 12.7134C21.8922 12.5254 22 12.2683 22 12C22 11.7317 21.8922 11.4746 21.7007 11.2866L16.6098 6.28655C16.2158 5.89956 15.5826 5.90526 15.1956 6.29929C14.8087 6.69332 14.8144 7.32646 15.2084 7.71345L18.5547 11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H18.5547L15.2084 16.2866C14.8144 16.6735 14.8087 17.3067 15.1956 17.7007Z" fill="currentColor"></path>
              </svg>
          </div>
        </a>
      </div>
    </div>
  );
};
