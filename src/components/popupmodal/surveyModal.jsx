import React, { useEffect, useState } from 'react';
import './modalstyle.css';

const SurveyPopUp = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    let formfilled = localStorage.getItem('form-filled');
    if(!formfilled){
        setTimeout(() => {
            setIsChecked(true);
          }, 2000);
    }
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleClose = () => {
    setIsChecked(false);
  };

  return (
    <div>
      <input
        className="modal-btn"
        type="checkbox"
        id="modal-btn"
        name="modal-btn"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <div className="modal">
        <div className="modal-wrap">
          <button className="close-btn" onClick={handleClose}>
            &times;
          </button>
          <div className="modal-button-container">
          {
            props?.data?.forms?.map((dataItem,index)=>{
              return <a href={"/form/"+index} target="_blank" className="survey-form-btn">
                <div>
                  <h3>{dataItem.text}</h3>
                  <p>Please fill out this form</p>
                </div>
                <div className="arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.1956 17.7007C15.5826 18.0947 16.2158 18.1004 16.6098 17.7134L21.7007 12.7134C21.8922 12.5254 22 12.2683 22 12C22 11.7317 21.8922 11.4746 21.7007 11.2866L16.6098 6.28655C16.2158 5.89956 15.5826 5.90526 15.1956 6.29929C14.8087 6.69332 14.8144 7.32646 15.2084 7.71345L18.5547 11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H18.5547L15.2084 16.2866C14.8144 16.6735 14.8087 17.3067 15.1956 17.7007Z" fill="currentColor"></path>
                    </svg>
                </div>
              </a>
            })
          }
        </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyPopUp;
