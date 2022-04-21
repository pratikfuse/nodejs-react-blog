import React, { useEffect } from "react";
import api from "../../services/axios";
import { Link } from 'react-router-dom';

export const ArticleListPage: React.FC = () => {
  useEffect(() => {
    api
      .get(`/articles`)
      .then(() => {
        console.log("recieved");
      })
      .catch((e) => {
        console.log("error");
        console.log(e);
      });
  });

  return (
    <div className="wrapper">
      <div className="support-grid"></div>

      <div className="band">
        <div className="item-1">
          <Link to="post/post1" className="card">
            <div className="thumb" ></div>
            <article>
              <h1>International Artist Feature: Malaysia</h1>
              <span>Mary Winkler</span>
            </article>
          </Link>
        </div>
        <div className="item-2">
          <Link to="post/post1" className="card">
            <div className="thumb"></div>
            <article>
              <h1>How to Conduct Remote Usability Testing</h1>
              <span>Harry Brignull</span>
            </article>
          </Link>
        </div>
        <div className="item-3">
          <Link to="post/post1" className="card">
            <div className="thumb"></div>
            <article>
              <h1>Created by You, July Edition</h1>
              <p>Welcome to our monthly feature of fantastic tutorial results created by you, the Envato Tuts+ community! </p>
              <span>Melody Nieves</span>
            </article>
          </Link>
        </div>
        <div className="item-4">
          <Link to="post/post1" className="card">
            <div className="thumb"></div>
            <article>
              <h1>How to Code a Scrolling “Alien Lander” Website</h1>
              <p>We’ll be putting things together so that as you scroll down from the top of the page you’ll see an “Alien Lander” making its way to touch down.</p>
              <span>Kezz Bracey</span>
            </article>
          </Link>
        </div>
        <div className="item-5">
          <Link to="post/post1" className="card">
            <div className="thumb"></div>
            <article>
              <h1>How to Create a “Stranger Things” Text Effect in Adobe Photoshop</h1>
              <span>Rose</span>
            </article>
          </Link>
        </div>
        <div className="item-6">
          <Link to="post/post1" className="card">
            <div className="thumb"></div>
            <article>
              <h1>5 Inspirational Business Portraits and How to Make Your Own</h1>

              <span>Marie Gardiner</span>
            </article>
          </Link>
        </div>
        <div className="item-7">
          <Link to="post/post1" className="card">
            <div className="thumb"></div>
            <article>
              <h1>Notes From Behind the Firewall: The State of Web Design in China</h1>
              <span>Kendra Schaefer</span>
            </article>
          </Link>
        </div>
      </div >
    </div >
  );
};
