import React from 'react';
import "./LinksCard.css";
import copyIcon from "./img/copy.png";
import calendar from "./img/schedule.png";
import delet from "./img/delete.png";
import share from "./img/share.png";
import titlei from "./img/broken-link.png"
import short from "./img/foreign.png"
import traget from "./img/target.png"
import show from "./img/show.png"

function copyUrl(id) {
  const copyElement = document.getElementById(`shorturl-${id}`);
  const copyText = copyElement.href;
  navigator.clipboard.writeText(copyText).then(() => {
    alert("URL copied to clipboard!");
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

function LinksCard({ id, title, slug, target, views, createdAt }) {
  const shortUrl = `${import.meta.env.VITE_API_BACKEND_URL}/${slug}`;

  return (
    <div className='link-card'>
      <h3 className='link-card-title'><img src={titlei} style={{ height: "30px", marginRight: "10px" }} alt="" />{title || "No Title"}</h3>

      <div className='link-card-short-url'>
        <a href={shortUrl} id={`shorturl-${id}`} target='_blank' rel='noopener noreferrer'>
          <img src={short} style={{ height: "15px", marginRight: "15px" }} alt="" />{shortUrl}
        </a>
      </div>

      <div>
        <p className='link-card-target-url'>
          <a href={target} target="_blank" className='target-url' rel='noopener noreferrer'>
            <img src={traget} style={{ height: "18px", marginRight: "10px" }} alt="" /> {target.substring(0, 50)}{target.length > 50 ? "..." : null}
          </a>
        </p>
      </div>

      <div className='link-card-views'>
        Views: {views} <img src={show} style={{ height: "18px", marginLeft: "5px" }} alt="" />
      </div>
      <hr />
      <span className='link-card-created-at'>
        <img src={calendar} style={{ height: "20px", marginRight: "5px" }} alt="" />{new Date(createdAt).toLocaleString()}
      </span>
      <button className='delt-btn'>
        <img src={delet} style={{ height: "22px" }} alt="" />
      </button>
      <button className='share-btn'>
        <img src={share} style={{ height: "15px" }} alt="" />
      </button>
      <button className='cpy-btn' onClick={() => copyUrl(id)}>
        <img src={copyIcon} style={{ height: "16px" }} alt="" />Copy Url
      </button>
    </div>
  );
}

export default LinksCard;
