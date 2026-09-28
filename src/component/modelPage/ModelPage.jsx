import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaEnvelope,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import modelsInfo from "../../utils/model";
import NotFound from "../NotFound/NotFound";

const formatLabel = (label) => label.replace(/([A-Z])/g, " $1").trim();

function Film({ src, poster, onUnavailable }) {
  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      onError={onUnavailable}
    />
  );
}

function ModelPage() {
  const { artistId } = useParams();
  const model = useMemo(
    () => modelsInfo.find((item) => item.id === artistId),
    [artistId],
  );
  const [showVideo, setShowVideo] = useState(Boolean(model?.video));

  if (!model) return <NotFound />;

  const heroImage = model?.coverImg;
  const contact = model.contact || {};

  return (
    <main className="model-page">
      <section
        className="model-page__hero"
        style={heroImage ? { "--hero-image": `url(${heroImage})` } : undefined}
      >
        <div className="model-page__hero-copy">
          <p className="model-page__eyebrow">Filmiagi Model Portfolio</p>
          <p className="model-page__edition">
            {model.winningEvent || "The Filmiagi Edit"}
          </p>
          <h1>{model.name}</h1>
          <div className="model-page__hero-line">
            <span /> <p>Confidence in every frame</p> <span />
          </div>
        </div>
        <p className="model-page__issue">
          Portfolio · {new Date().getFullYear()}
        </p>
      </section>

      {showVideo && (
        <section
          className="model-page__film"
          aria-labelledby="model-film-title"
        >
          <div className="model-page__section-heading">
            <div>
              <p className="model-page__eyebrow">In motion</p>
              <h2 id="model-film-title">Catwalk film</h2>
            </div>
            <p className="model-page__section-note">A moving introduction</p>
          </div>
          <div className="model-page__film-frame">
            <Film
              src={model.video}
              poster={heroImage}
              onUnavailable={() => setShowVideo(false)}
            />
          </div>
        </section>
      )}

      <section className="model-page__profile">
        <div className="model-page__monogram" aria-hidden="true">
          {model.name.charAt(0)}
        </div>
        <div className="model-page__profile-copy">
          <p className="model-page__eyebrow">The profile</p>
          <h2>
            More than a face.
            <br />A presence.
          </h2>
          {model.description && (
            <p className="model-page__lead">{model.description}</p>
          )}
          {model.vision && (
            <blockquote>
              <span>Vision</span>
              {model.vision}
            </blockquote>
          )}
        </div>
      </section>

      {Object.keys(model.stats || {}).length > 0 && (
        <section className="model-page__details">
          <div className="model-page__section-heading">
            <div>
              <p className="model-page__eyebrow">The details</p>
              <h2>Model card</h2>
            </div>
          </div>
          <div className="model-page__stats">
            {Object.entries(model.stats).map(([label, value]) => (
              <div className="model-page__stat" key={label}>
                <span>{formatLabel(label)}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </section>
      )}

      {model.achievements?.length > 0 && (
        <section className="model-page__achievements">
          <div className="model-page__section-heading">
            <div>
              <p className="model-page__eyebrow">The milestones</p>
              <h2>On her terms</h2>
            </div>
          </div>
          <ol>
            {model.achievements.map((achievement, index) => (
              <li key={`${achievement}-${index}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{achievement}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {model.images?.length > 0 && (
        <section className="model-page__gallery">
          <div className="model-page__section-heading">
            <div>
              <p className="model-page__eyebrow">The portfolio</p>
              <h2>Selected frames</h2>
            </div>
            <p className="model-page__section-note">
              {String(model.images.length).padStart(2, "0")} captures
            </p>
          </div>
          <div className="model-page__gallery-grid">
            {model.images.map((image, index) => (
              <figure key={image}>
                <img
                  src={image}
                  alt={`${model.name} portfolio image ${index + 1}`}
                  loading="lazy"
                />
                <figcaption>{String(index + 1).padStart(2, "0")}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {Object.values(contact).some(Boolean) && (
        <section className="model-page__contact">
          <p className="model-page__eyebrow">Connect</p>
          <h2>For bookings & collaborations</h2>
          <div className="model-page__contact-links">
            {contact.phone && (
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                <FaPhoneAlt /> Call
              </a>
            )}
            {contact.whatsapp && (
              <a
                href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            )}
            {contact.email && (
              <a href={`mailto:${contact.email}`}>
                <FaEnvelope /> Email
              </a>
            )}
            {contact.instagram && (
              <span>
                <FaInstagram /> {contact.instagram}
              </span>
            )}
            {contact.location && (
              <span>
                <FaMapMarkerAlt /> {contact.location}
              </span>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

export default ModelPage;
