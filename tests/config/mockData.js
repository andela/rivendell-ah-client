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


export const mockCategories = {
  categories: [
    {
      name: 'OTHERS',
      subcategories: [
        {
          id: 1,
          name: 'OTHERS'
        }
      ]
    },
    {
      name: 'TECH',
      subcategories: [
        {
          id: 2,
          name: 'ENGINEERING'
        },
        {
          id: 3,
          name: 'SOFTWARE DEVELOPMENT'
        },
        {
          id: 4,
          name: 'ARTIFICIAL INTELLIGENCE'
        },
        {
          id: 5,
          name: 'BIOTECHNOLOGY'
        },
        {
          id: 6,
          name: 'NANO TECHNOLOGY'
        }
      ]
    },
    {
      name: 'ENTERPRENEURSHIP',
      subcategories: [
        {
          id: 7,
          name: 'SME'
        },
        {
          id: 8,
          name: 'STARTUPS'
        },
        {
          id: 9,
          name: 'BUSINESS GROWTH'
        }
      ]
    },
    {
      name: 'SCIENCE',
      subcategories: [
        {
          id: 17,
          name: 'HEALTH SCIENCE'
        },
        {
          id: 18,
          name: 'CHEMICAL SCIENCE'
        },
        {
          id: 19,
          name: 'AGRICULTURAL SCIENCE'
        },
        {
          id: 20,
          name: 'SOCIAL SCIENCE'
        }
      ]
    },
    {
      name: 'CULTURE',
      subcategories: [
        {
          id: 21,
          name: 'ASIA'
        },
        {
          id: 22,
          name: 'AFRICA'
        },
        {
          id: 23,
          name: 'EUROPE'
        },
        {
          id: 24,
          name: 'US'
        },
        {
          id: 25,
          name: 'UK'
        }
      ]
    },
    {
      name: 'ART',
      subcategories: [
        {
          id: 26,
          name: 'FASHION'
        },
        {
          id: 27,
          name: 'FINE ART'
        },
        {
          id: 28,
          name: 'PERFORMING ART'
        },
        {
          id: 29,
          name: 'MUSEUMS'
        },
        {
          id: 30,
          name: 'BROADCASTING'
        },
        {
          id: 31,
          name: 'GRAPHICS'
        },
        {
          id: 32,
          name: 'INTERIOR ART'
        }
      ]
    },
    {
      name: 'MUSIC',
      subcategories: [
        {
          id: 33,
          name: 'HIP HOP'
        },
        {
          id: 34,
          name: 'R&B'
        },
        {
          id: 35,
          name: 'ROCK'
        },
        {
          id: 36,
          name: 'CLASSIC'
        },
        {
          id: 37,
          name: 'LEARNING'
        },
        {
          id: 38,
          name: 'OLDIES'
        }
      ]
    },
    {
      name: 'SPORTS',
      subcategories: [
        {
          id: 39,
          name: 'BALL GAMES'
        },
        {
          id: 40,
          name: 'AQUATIC SPORTS'
        },
        {
          id: 41,
          name: 'AIR SPORTS'
        },
        {
          id: 42,
          name: 'RACING'
        },
        {
          id: 43,
          name: 'CLIMBING'
        }
      ]
    },
    {
      name: 'FOODS',
      subcategories: [
        {
          id: 44,
          name: 'NUTRITION'
        },
        {
          id: 45,
          name: 'CUISINES'
        },
        {
          id: 46,
          name: 'HEALTH AND DIET'
        }
      ]
    }
  ]

};


export default {
  socialMediaPlatforms,
  searchParams,
  likeAttributes,
  getLikesData,
  likeData,
  likes,
  mockCategories,
};
