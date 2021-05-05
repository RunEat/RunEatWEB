import React, { useState } from 'react';
import { useDate } from "../../hooks/useDateContext";
import { useUser } from '../../hooks/useUserContext';
import SyncLoader from 'react-spinners/SyncLoader';
import Chronometer from './Chronometer';
import Geolocation from './Geolocation';
import Navbar from '../Navbar/Navbar'

const Sport = () => {

  const { user, setUser } = useUser();
  const [sport, setSport] = useState()

  return !user ? (
    <div className="text-center">
      <SyncLoader color="#3ec4fc" />
    </div>
  ) : (
    <>
      <Chronometer />
      <Geolocation />
      <Navbar /> 
    </>
  );
};

export default Sport;