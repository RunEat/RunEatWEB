import React, { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import './SportCalories.css'

const SportCalories = ({ countBurnedCals, setCountBurnedCals }) => {
  
  const [show, setShow] = useState(false);
  
  const onChange = (e) => {
    // e.preventDefault();
    console.log(e.target)
    setCountBurnedCals(!countBurnedCals)
  }

  const onClick = (e) => {
    setShow(!show);
  }

  return (
    <div className="SportCalories mt-4">
      <div className="form-check form-switch">
        <input 
          className="form-check-input"
          type="checkbox" 
          id="SportCalories"
          onChange={onChange}
          value={countBurnedCals}
        />
        <label 
          className="form-check-label" 
          htmlFor="SportCalories"
        > 
          Add Calories Burned
        </label>
        <i onClick={onClick} class="fas fa-info-circle ms-2"></i>
        <br/>
        { show &&
          <div className="d-flex align-items-center justify-content-center" style={{height: '100%'}}>
          (<Modal className="rounded text-center" style={{top: '40vh'}} show={true}>
            <Modal.Body>Increase today's calories allowance by adding the calories you burned today to the total.</Modal.Body>
            <Modal.Footer className="d-flex align-self-center justify-content-center w-100">
              <button 
                onClick={onClick} 
                className="btn btn-success w-50"
                style={{
                  borderRadius: "6rem",
                  backgroundColor: "#00bd56",
                }}
              >
                Hide              
              </button>
            </Modal.Footer>
          </Modal>)
          </div>
        }
      </div>
      
    </div>
  );
};

export default SportCalories;