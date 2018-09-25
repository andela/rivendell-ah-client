import React from 'react';
import { Button } from 'semantic-ui-react';
import propTypes from 'prop-types';

const SocialShare = (props) => {
  const { articleURL } = props;

  const socialMessage = encodeURIComponent(
    'Here is a cool'
  + ' article I just found in author\'s'
  );
  const twitterUrl = 'https://twitter.com/intent/tweet?url='
  + `${articleURL}
&text=${socialMessage}
&hashtags=${encodeURIComponent('AuthorsHaven')}`;

  const facebookUrl = `https://www.facebook.com/dialog/share?
app_id=${process.env.FACEBOOK_ID}
&display=page
&href=${articleURL}&redirect_uri=${articleURL}`;


  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&
url=${articleURL}&summary=${socialMessage}&source=Author'sHaven`;

  return (
    <div id="social-share">
      <div>
        <a href={twitterUrl}>
          <Button
            name="twitter"
            key="twitter-btn"
            icon="twitter"
            content="Share on Twitter"
            color="twitter"
          />
        </a>

        <a href={facebookUrl}>
          <Button
            key="facebook-btn"
            icon="facebook"
            content="Share on Facebook"
            color="facebook"
            name="facebook"
          />
        </a>

        <a href={linkedinUrl}>
          <Button
            key="linkedin-btn"
            icon="linkedin"
            content="Share on Linkedin"
            color="linkedin"
            name="linkedin"
          />
        </a>

      </div>
    </div>

  );
};


SocialShare.propTypes = {
  articleURL: propTypes.string.isRequired,
};

export default SocialShare;
