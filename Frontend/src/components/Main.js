import React from "react";
import Notes from './Notes';
const Main = (props) => {
  const {showAlert} = props;
  
  return (
    <div>
      <Notes showAlert={showAlert} />
    </div>
  );
};

export default Main;
