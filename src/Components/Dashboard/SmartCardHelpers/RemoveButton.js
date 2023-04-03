import React from "react";
import "../../StyleSheets/dashboard.css";

const RemoveButton = ({handleSubmit,content,index,heading}) => {
  return (
    <div className="row remove-heading">
      <p>{heading}</p>
      <div className="col-20 remove">
        {content &&
        <button onClick={(e)=>handleSubmit(e,index)} >
          {content}
        </button>}
      </div>
    </div>
  );
};

export default RemoveButton;
