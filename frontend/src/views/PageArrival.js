import ArrivalList from "../components/ArrivalList";

import { useContext } from "react";

import AuthContext from "../context/AuthContext";



const PageArrival = () => {
    const { user } = useContext(AuthContext);
    return (
      <div id="arrival">
        <ArrivalList />
      </div>
    );
  };

export default PageArrival;
