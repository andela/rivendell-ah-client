import React from 'react';
import { Button } from 'semantic-ui-react';
import TagInput from '../../components/TagInput';
import CategoryInput from '../../components/CategoryInput';
import BasicUserInfo from '../../components/BasicUserInfo';

const options = [
  { key: 'tagId1', text: 'age', value: 'age' },
  { key: 'tagId2', text: 'name', value: 'name' }
];


const sample = [
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
    name: 'POLITICS',
    subcategories: [
      {
        id: 10,
        name: 'INTERNATIONAL'
      },
      {
        id: 11,
        name: 'DEMOCRACY'
      },
      {
        id: 12,
        name: 'REPUBLIC'
      },
      {
        id: 13,
        name: 'MONARCHY'
      },
      {
        id: 14,
        name: 'COMMUNISM'
      },
      {
        id: 15,
        name: 'DICTATORSHIP'
      },
      {
        id: 16,
        name: 'POLITICAL CRISIS'
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
];


const NewArticle = () => (
  <div>
    <h2>Creating a new article</h2>
    <TagInput options={options} />
    <CategoryInput categories={sample} />
    <Button primary content="Create Article" />
    <BasicUserInfo
      username="tempUser"
      image="https://i.ytimg.com/vi/3YJpUROvQAk/maxresdefault.jpg"
    />
  </div>
);
export default NewArticle;
