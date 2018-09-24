import React from 'react';
import { Link } from 'react-router-dom';

const slug = '/articles/an-article-written-'
  + 'by-jenny-flower-and-is-'
  + 'all-about-flowers-e6c70c60-b73e-11e8-bce5-4f088dd95508';
const Home = () => (
  <div>
    <h2>Home Page</h2>
    {/* Sample article to test the like and unlike functionalities */}
    <Link
      to={slug}
    >
      An Article
    </Link>
  </div>
);
export default Home;
