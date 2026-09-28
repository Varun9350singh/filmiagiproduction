import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { FaEnvelope, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import team from "../../utils/team";
import NotFound from "../NotFound/NotFound";

function TeamPage() {
  const { teamId } = useParams();
  const member = useMemo(() => team.find((item) => String(item.id) === String(teamId)), [teamId]);
  if (!member) return <NotFound />;

  const contact = member.contact || {};
  const profileNumber = String(team.findIndex((item) => item.id === member.id) + 1).padStart(2, "0");

  return (
    <main className="team-profile">

      <section className="team-profile__intro">
        <div className="team-profile__title-block">
          <p className="team-profile__role">{member.role}</p>
          <h1>{member.name}</h1>
          <div className="team-profile__title-rule"><span /> <span>Team Filmiagi</span></div>
        </div>
        <p className="team-profile__statement">The people behind every perfectly placed spotlight.</p>
      </section>

      <section className="team-profile__dossier">
        <div className="team-profile__portrait">
          <div className="team-profile__portrait-grid" aria-hidden="true" />
          <img src={member.image} alt={member.name} />
          <p className="team-profile__portrait-caption">Filmiagi / {profileNumber}</p>
        </div>
        <div className="team-profile__bio">
          <div className="team-profile__bio-head"><span>01</span><p>Studio profile</p></div>
          <h2>Building the vision, beyond the runway.</h2>
          <div className="team-profile__bio-copy">
            {member.description?.map((paragraph, index) => <p key={`${member.id}-${index}`}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      <section className="team-profile__signature">
        <span className="team-profile__signature-mark">F</span>
        <p>“The detail is not a detail. It is the design.”</p>
        <span>FILMIAGI / STUDIO</span>
      </section>

      {Object.values(contact).some(Boolean) && <section className="team-profile__contact">
        <div><p className="team-profile__kicker">Collaborate</p><h2>Let’s make an<br />entrance.</h2></div>
        <div className="team-profile__contact-list">
          {contact.email && <a href={`mailto:${contact.email}`}><FaEnvelope /><span>Email</span><strong>{contact.email}</strong></a>}
          {contact.instagram && <span><FaInstagram /><span>Instagram</span><strong>{contact.instagram}</strong></span>}
          {contact.linkedin && <a href={`tel:${contact.linkedin.replace(/\s/g, "")}`}><FaPhoneAlt /><span>Phone</span><strong>{contact.linkedin}</strong></a>}
        </div>
      </section>}
    </main>
  );
}

export default TeamPage;
