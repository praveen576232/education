import { Avatar } from '@material-ui/core'
import React from 'react'
import './MenterInfo.css'
function MenterInfo({data,onClick}) {
    return (
        <div onClick={onClick} className="dislaymoniter_info">
       <div className="displaymoniter_info_right">
       <Avatar   src={data?.photoUrl} />
        <div className="dislaymoniter_name">
          <h2>{data?.displayName}</h2>
          <a>{data?.portfoliolink}</a>
        </div>
       </div>
        <h4>{`Expert At ${data?.areaOFIntrest}`}</h4>
      </div>


    )
}

export default MenterInfo
