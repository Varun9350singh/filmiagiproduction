import React, { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'

import team from '../../utils/team.js'
import NotFound from '../NotFound/NotFound'

function TeamPage() {
    const { teamId } = useParams();
    const teamMembers = team;
    const member = useMemo(
        () => teamMembers.find((item) => String(item.id) === String(teamId)),
        [teamId]
    )

    if (!member) return <NotFound />;

    return (
        <section className='profile-page-container'>
            <header className='profile-hero'>
                <div className='hero-copy'>
                    <span className='hero-label'>Executive Profile</span>
                    <h1>{member.name}</h1>
                    <p className='hero-intro'>{member.summary}</p>
                </div>
                <div className='hero-accent'>
                    <span className='accent-line'></span>
                    <span className='accent-dot'></span>
                </div>
            </header>

            <div className='profile-layout'>
                <aside className='profile-sidebar'>
                    <div className='profile-image-wrap'>
                        <img src={member.image} alt={member.name} />
                        <div className='role-badge'>{member.role}</div>
                    </div>
                </aside>

                <main className='profile-main'>
                    <section className='profile-card'>
                        <div className='profile-card-head'>
                            <span>Profile</span>
                            <h2>Professional Overview</h2>
                        </div>
                        <div className='profile-card-body'>
                            {
                                member.description && member.description.length>0 && member.description.map((desc,index)=>{
                                    return (
                                        <>
                                            <p key={`${member.id}+${index}`}>{desc}</p>
                                            <br />
                                        </>
                                    )
                                })
                            }
                            <p></p>
                        </div>
                    </section>

                    <section className='profile-card profile-contact-card'>
                        <div className='profile-card-head'>
                            <span>Contact</span>
                            <h2>Direct connection</h2>
                        </div>
                        <div className='contact-grid'>
                            <p  className='contact-pill'>
                                <span>✉</span>
                                <span>{member.contact.email}</span>
                            </p>
                            <p  rel='noreferrer' className='contact-pill'>
                                <span></span>
                                <span>{member.contact.instagram}</span>
                            </p>
                            <p rel='noreferrer' className='contact-pill'>
                                <span></span>
                                <span>{member.contact.linkedin}</span>
                            </p>
                        </div>
                    </section>
                </main>
            </div>
        </section>
    )
}

export default TeamPage
