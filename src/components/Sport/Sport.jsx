import React, { useState } from 'react';
import { useDate } from "../../hooks/useDateContext";
import { useUser } from '../../hooks/useUserContext';
import SyncLoader from 'react-spinners/SyncLoader';

const Sport = () => {

  const { user, setUser } = useUser();

  const [sport, setSport] = useState()

  return (
    !user || !sport ? (
    <div className="text-center">
      <SyncLoader color="#3ec4fc"/>
    </div>
    ) : (
    user.id == sport.user.id && <div>SPORT</div>
      )
  )
};

export default Sport;