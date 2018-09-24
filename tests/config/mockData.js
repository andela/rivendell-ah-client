const image = 'https://lh3.googleusercontent.com'
  + '/-I_0oCoVvYI8/AAAAAAAAAAI/AAAAAAAAAAA/'
  + 'APUIFaN9PJ6oaKcGZ1DVcKTTbpxyZ-9x-w/mo/photo.jpg?sz=50';
const likes = [
  {
    timeLiked: '2018-09-20T12:18:12.972Z',
    user: {
      firstName: 'CA',
      lastName: 'Jane',
      bio: null,
      image,
      id: 'ea7f7f11-3040-49b6-a247-df1170d4ee22',
      username: 'chiomimo15@gmail.com'
    }
  },
  {
    timeLiked: '2018-09-13T12:42:20.082Z',
    user: {
      firstName: 'jammy',
      lastName: 'rocket',
      bio: 'Just a guy who likes rockets as well',
      image: null,
      id: 'fef127a5-b3d5-463c-acf2-f6e365d1c998',
      username: 'jammyrocket'
    }
  },
  {
    timeLiked: '2018-09-13T12:42:20.082Z',
    user: {
      firstName: 'jesyy',
      lastName: 'rocket',
      bio: 'Just a girl who likes rockets as well',
      image: null,
      id: 'fef127a5-b3d5-463c-acf2-f6e365d1c998',
      username: 'jessyrocket'
    }
  },
];
const getLikesData = {
  data: {
    data: [
      {
        timeLiked: '2018-09-13T12:42:20.082Z',
        user:
        {
          firstName: 'johnny',
          lastName: 'rocket',
          bio: 'Just a guy who likes rockets',
          image: null,
          id: 'fef127a5-b3d5-463c-acf2-f6e365d1c998',
          username: 'johnnyrocket'
        }
      }
    ],
    totalLikes: 2
  }
};
const likeData = {
  data: {
    data: {
      id: '1cea6500-ba30-11e8-bf31-a183b9a4c8a7',
      title: 'An article written by Johnny Rocket  and is all about rockets',
      slug: 'an-article-written-by-johnny-'
        + 'rocket-and-is-all-about-rockets-'
        + '1cea6500-ba30-11e8-bf31-a183b9a4c8a7',
      authorId: 'fef127a5-b3d5-463c-acf2-f6e365d1c998',
      author: {
        id: 'fef127a5-b3d5-463c-acf2-f6e365d1c998',
        firstName: 'johnny',
        lastName: 'rocket',
        image: null
      }
    },
    message: 'You had already liked this article'
  }
};
const socialMediaPlatforms = [
  {
    id: 1,
    link: '/api/auth/google',
    text: 'Sign in with Google',
    divClass: 'social_btn google',
    iconClass: 'google icon',
  },
  {
    id: 2,
    link: '/api/auth/linkedin',
    text: 'Sign in with Linkedin',
    divClass: 'social_btn linkedin',
    iconClass: 'linkedin icon',
  },
  {
    id: 3,
    link: '/api/auth/facebook',
    text: 'Sign in with Facebook',
    divClass: 'social_btn facebook',
    iconClass: 'facebook f icon',
  }
];
const likeAttributes = {
  divClass: 'ui labeled button',
  buttonClass: 'ui button',
  iconClass: 'heart icon',
  linkClass: 'ui basic left pointing label'
};

const searchParams = '?email=chiomimo15%40gmail.com'
  + '&image=https%3A%2F%2Flh3.googleusercontent.com%2F-I_'
  + '0oCoVvYI8%2FAAAAAAAAAAI%2FAAAAAAAAAAA%2FAPUI'
  + 'FaN9PJ6oaKcGZ1DVcKTTbpxyZ-9x-w%2Fmo%2Fphoto.jpg%3Fsz%3D50'
  + '&firstName=CA&lastName=Jane'
  + '&bio=&username=chiomimo15%40gmail.com'
  + '&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
  + '.eyJpZCI6ImVhN2Y3ZjExLTMwNDAtNDliNi1hMjQ3LWRmMTE3MGQ0ZWU'
  + 'yMiIsImVtYWlsIjoiY2hpb21pbW8xNUBnbWFpbC5jb20iLCJpYXQiOjE1MzY'
  + '2ODY2NzUsImV4cCI6MTUzNjk0NTg3NX0'
  + '.hBwzhSqAAwnmDB2VKGR8n05_zt9xO2jogEz_OD967Rg';

export default {
  socialMediaPlatforms,
  searchParams,
  likeAttributes,
  getLikesData,
  likeData,
  likes
};
