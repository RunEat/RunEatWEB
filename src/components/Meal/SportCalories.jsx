import React, { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

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
          <small>Explanation</small>
        }
      <Modal show={true}>
        <Modal.Header>Hi</Modal.Header>
        <Modal.Body>asdfasdf</Modal.Body>
        <Modal.Footer>This is the footer</Modal.Footer>
      </Modal>
      </div>
      
    </div>
  );
};

export default SportCalories;