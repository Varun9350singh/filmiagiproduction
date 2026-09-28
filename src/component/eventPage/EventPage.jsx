import React, { useMemo, useRef, useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaArrowUpRightFromSquare, FaInstagram, FaPlay } from "react-icons/fa6";
import events from "../../utils/events";
import NotFound from "../NotFound/NotFound";

const isStatement = (line) =>
  line.length > 12 &&
  (line === line.toUpperCase() ||
    line.includes("•") ||
    line.startsWith("✨") ||
    line.startsWith("👑"));

  const galleryBatchSize = 4;

function FilmCard({ film, eventTitle, index }) {
  const videoRef = useRef(null);

  const [isUnavailable, setIsUnavailable] = useState(!film.videoUrl);
  const [isPlaying, setIsPlaying] = useState(false);

  // Desktop hover
  const startPreview = () => {
    if (!film.videoUrl || isUnavailable) return;

    const video = videoRef.current;
    if (!video) return;

    const playAttempt = video.play();

    if (playAttempt) {
      playAttempt.catch(() => {
        setIsUnavailable(true);
      });
    }
  };

  const stopPreview = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    setIsPlaying(false);
  };

  // Mobile: play when card enters viewport
  useEffect(() => {
    const video = videoRef.current;
    const card = video?.parentElement;

    if (!video || !card || !film.videoUrl) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (!isMobile) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
          setIsPlaying(false);
        }
      },
      {
        threshold: 0.6,
      }
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
    };
  }, [film.videoUrl]);

  return (
    <div
      className={`event-page__film${
        isUnavailable ? " event-page__film--unavailable" : ""
      }`}
      onPointerEnter={(e) => {
        // Only use hover behavior on devices that actually support hover
        if (window.matchMedia("(hover: hover)").matches) {
          startPreview();
        }
      }}
      onPointerLeave={(e) => {
        if (window.matchMedia("(hover: hover)").matches) {
          stopPreview();
        }
      }}
    >
      <img
        src={film.poster}
        alt={`${eventTitle} film ${index + 1} thumbnail`}
        loading="lazy"
      />

      {film.videoUrl && (
        <video
          ref={videoRef}
          className={`event-page__film-video${
            isPlaying ? " is-playing" : ""
          }`}
          src={film.videoUrl}
          muted
          loop
          playsInline
          preload="metadata"
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => setIsUnavailable(true)}
        />
      )}

      {isUnavailable ? (
        <span className="event-page__unavailable">
          Video not available
        </span>
      ) : (
        <span className="event-page__film-title">
          Runway film · {String(index + 1).padStart(2, "0")}
        </span>
      )}
    </div>
  );
}

function GallerySection({ event }) {
  const [visibleGalleryCount, setVisibleGalleryCount] = useState(
    galleryBatchSize,
  );
  const [galleryLoadTarget, setGalleryLoadTarget] = useState(null);
  const [settledGalleryImages, setSettledGalleryImages] = useState(
    () => new Set(),
  );
  const isLoadingGallery =
    galleryLoadTarget !== null &&
    event.gallery
      .slice(0, galleryLoadTarget)
      .some((_, index) => !settledGalleryImages.has(index));

  const markGalleryImageSettled = (index) => {
    setSettledGalleryImages((current) => {
      if (current.has(index)) return current;
      const next = new Set(current);
      next.add(index);
      return next;
    });
  };

  const loadMoreGalleryImages = () => {
    if (isLoadingGallery) return;

    const nextCount = Math.min(
      visibleGalleryCount + galleryBatchSize,
      event.gallery.length,
    );

    if (nextCount === visibleGalleryCount) return;
    setGalleryLoadTarget(nextCount);
    setVisibleGalleryCount(nextCount);
  };

  return (
    <section className="event-page__media" aria-labelledby="event-gallery-title">
      <div className="event-page__heading-row">
        <div>
          <p className="event-page__section-label">Runway diary</p>
          <h2 id="event-gallery-title">The stills</h2>
        </div>
        <span className="event-page__count">
          {String(event.gallery.length).padStart(2, "0")} / SELECTS
        </span>
      </div>
      <div className="event-page__gallery">
        {event.gallery.slice(0, visibleGalleryCount).map((image, index) => (
          <figure className="event-page__image" key={`${image}-${index}`}>
            <img
              src={image}
              alt={`${event.title} runway moment ${index + 1}`}
              loading="eager"
              decoding="async"
              onLoad={() => markGalleryImageSettled(index)}
              onError={() => markGalleryImageSettled(index)}
            />
            <figcaption>{String(index + 1).padStart(2, "0")}</figcaption>
          </figure>
        ))}
      </div>
      {visibleGalleryCount < event.gallery.length && (
        <button
          className={`event-page__load-more${isLoadingGallery ? " is-loading" : ""}`}
          type="button"
          onClick={loadMoreGalleryImages}
          disabled={isLoadingGallery}
          aria-busy={isLoadingGallery}
        >
          {isLoadingGallery ? "Loading selects" : "Load more stills"}
        </button>
      )}
    </section>
  );
}

export default function EventPage() {
  const { eventName } = useParams();
  const event = useMemo(
    () => events.find((item) => item.id === eventName),
    [eventName],
  );

  if (!event) return <NotFound />;

  const descriptionLines = event.description
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <main className="event-page">
      <section className="event-page__hero">
        <div
          className="event-page__hero-image"
          style={{ backgroundImage: `url(${event.image})` }}
        />
        <div className="event-page__hero-shade" />
        <div className="event-page__hero-content">
          <div id="logo">
            <img src={event.logo} alt={`${event.tagline} logo`} />
          </div>
          <p className="event-page__eyebrow">Filmiagi Production presents</p>
          <div className="event-page__brand-lockup">
            <span className="event-page__brand-rule" aria-hidden="true" />
            <span className="event-page__tagline">{event.tagline}</span>
            <span className="event-page__brand-rule" aria-hidden="true" />
          </div>
          <h1>{event.title}</h1>
          
          <p className="event-page__hero-note">
            An experience by Abhishek Dhohar
          </p>
        </div>
        <span className="event-page__issue">EST. 2024 · LUCKNOW</span>
      </section>

      <section className="event-page__story">
        <p className="event-page__section-label">The story</p>
        <div className="event-page__story-grid">
          <div className="event-page__monogram" aria-hidden="true">
            F
          </div>
          <div>
            <div className="event-page__description">
              {descriptionLines.map((line, index) => {
                const statement = isStatement(line);
                return statement ? (
                  <h3
                    className="event-page__description-statement"
                    key={`${line}-${index}`}
                  >
                    {line}
                  </h3>
                ) : (
                  <p
                    className={
                      index === 0 ? "event-page__lead" : "event-page__body-copy"
                    }
                    key={`${line}-${index}`}
                  >
                    {line}
                  </p>
                );
              })}
            </div>
            <div className="event-page__curator">
              <span>Curated & organised by</span>
              <strong>Abhishek Dhohar</strong>
            </div>
          </div>
        </div>
      </section>

      <GallerySection event={event} />

      <section
        className="event-page__films"
        aria-labelledby="event-films-title"
      >
        <div className="event-page__heading-row">
          <div>
            <p className="event-page__section-label">In motion</p>
            <h2 id="event-films-title">The films</h2>
          </div>
          <p className="event-page__films-note">Watch the runway unfold</p>
        </div>
        <div className="event-page__film-grid">
          {event.films.map((filmItem, index) => {
            const film =
              typeof filmItem === "string"
                ? { poster: filmItem, videoUrl: "" }
                : filmItem;
            return (
              <FilmCard
                film={film}
                eventTitle={event.title}
                index={index}
                key={`${film.poster}-${index}`}
              />
            );
          })}
        </div>
      </section>

      <section className="event-page__outro">
        <p>More moments. More movement. More Filmiagi.</p>
        <a
          className="event-page__instagram-button"
          href={event.instagramUrl}
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram /> See more{" "}
          <FaArrowUpRightFromSquare aria-hidden="true" />
        </a>
      </section>
    </main>
  );
}
