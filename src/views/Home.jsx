import React from 'react';
import { Link } from 'react-router-dom';

const slug1 = '/articles/an-article-written-'
  + 'by-jenny-flower-and-is-'
  + 'all-about-flowers-e6c70c60-b73e-11e8-bce5-4f088dd95508';
const slug2 = '/articles/an-article-written-by-johnny-rocket-'
  + 'and-is-all-about-rockets-1cea6500'
  + '-ba30-11e8-bf31-a183b9a4c8a7';
const Home = () => (
  <div>
    <h2>Home Page</h2>
    {/* Sample article to test the like and unlike functionalities */}
    <Link
      to={slug1}
    >
      An Article 1
    </Link>
    <Link
      to={slug2}
    >
      An Article 2
    </Link>
  </div>
);
export default Home;
