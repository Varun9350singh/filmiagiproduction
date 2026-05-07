import React from "react";

function TeamCard({ name, role, image,memberId }) {

  const onClickHandler = (id)=>{

    window.location.href = `/team/${id}`;
  }

  return (
    <div className="royal-team-card">
      <div className="embroidery-frame"></div>
      <div className="card-outer-frame">
        <div className="corner-tl"></div>
        <div className="corner-tr"></div>
        <div className="corner-bl"></div>
        <div className="corner-br"></div>

        <div className="image-container">
          <div className="image-ring"></div>
          <img src={`${image}`} alt={name} className="profile-image" />
        </div>

        <div className="info-content">
          <div className="role-badge">{role}</div>
          <h2 className="member-name">{name}</h2>
          <div className="divider-gold"></div>
          
          <div className="action-footer">
            <button
             className="royal-btn"
             onClick={()=>onClickHandler(memberId)}
            >VIEW PROFILE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamCard;