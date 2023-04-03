import React from 'react'
import '../../StyleSheets/dashboard.css'

const SmartCardHeading = ({heading,handleSubmit}) => {
  return (
<div className='row1 '>
                    {/* <h4 class="col-20">{heading}</h4>  */}
                    <div className="row section-heading">
                        {/* <div className="col-20" > */}
                             {/* <i className="fa fa-plus" aria-hidden="true" style={{fontSize: "2rem", color: 'var(--secondary-color)'}} onClick={(e) => addExperience(e)}></i> */}

                            <p className='add' onClick={(e) => handleSubmit(e)}><a>+Add Section</a></p>
                        </div>
                    {/* </div> */}
                    </div>
  )
}

export default SmartCardHeading