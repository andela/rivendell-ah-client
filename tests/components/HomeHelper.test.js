import { shallow, mount } from 'enzyme';
import React from 'react';
import {
  ArticleWithImg, Articles, PaginatedArticles, TopRated,
  Banner, FavoriteArticles, FavoriteArticleImg, CategoriesMenu,
  NoContent
} from '../../src/components/helpers/HomeHelper';

const history = {
  location: {
    pathname: '/'
  },
  listen: () => {},
  createHref: () => {},
  push: () => {},
  replace: () => {},
};

describe('Testing the NOContent component', () => {
  it('should render as expected', () => {
    const props = {
      message: 'message',
      iconSize: '100%'
    }
    const tree = shallow(<NoContent { ...props }/>);
    expect(tree).toMatchSnapshot();
  });
});


describe('Testing the ArticleWithImg component', () => {
  it('Should render as expected', () => {
    const props = {
      article: {
        title: 'title',
        author: {
          username: 'username'
        }
      },
      backgroundImage: 'image',
      articleDescription: 'description',
      slideDown: () => {},
      slideUp: () => {},
      articleImgStyles: {}
    }
    const tree = shallow(<ArticleWithImg
      article={props.article}
      backgroundImage={props.backgroundImage}
      articleDescription={props.articleDescription}
      slideDown={props.slideDown}
      slideUp={props.slideUp}
      articleImgStyles={props.articleImgStyles}
    />);
    expect(tree).toMatchSnapshot();
  });
});

describe('Testing the Articles component', () => {
  const props = {
    articles: [{
      slug: 'slug',
      title: 'title',
      description: 'description',
      author: {
        username: 'username'
      }
    }],
    slideDown: () => {},
    slideUp: () => {},
    articleImgStyles: {},
  };
  it('Should render a placeholder image if the article has no image', () => {
    const tree = shallow(<Articles
        articles={props.articles}
        slideDown={props.slideDown}
        slideUp={props.slideUp}
        articleImgStyles={props.articleImgStyles}
      />)
    expect(tree.contains(
      <ArticleWithImg
        article={props.articles[0]}
        backgroundImage="url(https://react.semantic-ui.com/images/wireframe/image.png)"
        articleDescription={props.articles[0].description}
        slideDown={props.slideDown}
        slideUp={props.slideUp}
        articleImgStyles={{}}
      />)).toBe(true);
  });
  it('Should render a the article\'s image if present', () => {
    props.articles[0].image = 'render-me';
    const tree = shallow(<Articles
        articles={props.articles}
        slideDown={props.slideDown}
        slideUp={props.slideUp}
        articleImgStyles={props.articleImgStyles}
      />)
    expect(tree.contains(
      <ArticleWithImg
        article={props.articles[0]}
        backgroundImage="url(render-me)"
        articleDescription={props.articles[0].description}
        slideDown={props.slideDown}
        slideUp={props.slideUp}
        articleImgStyles={{}}
      />)).toBe(true);
  });
  it('Should render \'...\' next to the 100th character of a description greater than 100', () => {
    props.articles[0].description = `Pellentesque ut neque. Donec posuere vulputate arcu.
    Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nulla consequat
    massa quis enim. Nullam dictum felis eu pede mollis pretium.Praesent nec nisl a purus blandit
    viverra. Mauris sollicitudin fermentum libero. Etiam imperdiet imperdiet orci. Aliquam lobortis.`;
    const tree = shallow(<Articles
        articles={props.articles}
        slideDown={props.slideDown}
        slideUp={props.slideUp}
        articleImgStyles={props.articleImgStyles}
      />)
    expect(tree.contains(
      <ArticleWithImg
        article={props.articles[0]}
        backgroundImage="url(render-me)"
        articleDescription={`${props.articles[0].description.substring(0, 100)}...`}
        slideDown={props.slideDown}
        slideUp={props.slideUp}
        articleImgStyles={{}}
      />)).toBe(true);
  });
});

describe('Testing the PaginatedArticles component', () => {
  it('Should render as expected', () => {
    const props = {
      featArticlesActivePage: 1,
      feetArticlesPageCount: 2,
      feedPageCount: 22,
      feedActivePage: 12,
      token: 'token',
      displayArticles: [{
        slug: 'slug'
      }],
      articleImgStyles: {},
      slideDown: () => {},
      slideUp: () => {},
      handlePaginationChange: () => {},
    }
    let tree = PaginatedArticles({ ...props });
    tree = shallow(tree);
    expect(tree).toMatchSnapshot();
  });
});

describe('Testing the TopRated component', () => {
  it('Should render as expected', () => {
    const props = {
      topRatedArticles: [{
        slug: 'slug',
      }]
    }
    let tree = TopRated({ ...props });
    tree = shallow(tree);
    expect(tree).toMatchSnapshot();
  });
});

describe('Testing the Banner component', () => {
  it('Should render as expected', () => {
    let tree = Banner();
    tree = shallow(tree);
    expect(tree).toMatchSnapshot();
  });
});

describe('Testing the FavoriteArticles component', () => {
  it('Should return null if the favoriteArticles array is empty', () => {
    const props = {
      favoriteArticles: [],
      nextArticle: {
        1: {
          display: 'none'
        }
      },
      getNextArticle: () => {},
    }
    let tree = FavoriteArticles({ ...props });
    expect(tree).toBeNull;
  });
  it('Should render as expected', () => {
    const props = {
      favoriteArticles: [{
        id: 'id',
        article: {
          slug: 'slug',
          title: 'title',
          author: {
            username: 'username',
          }
        }
      }],
      nextArticle: {
        1: {
          display: 'none'
        }
      },
      getNextArticle: () => {},
    }
    let tree = FavoriteArticles({ ...props });
    tree = shallow(tree);
    expect(tree).toMatchSnapshot();
  });
});

describe('Testing the FavoriteArticleImg component', () => {
  it('Should render a placeholder image if no article image is present', () => {
    const favoriteArticle = {
      article: {
        image: null,
      }
    };
    const tree = shallow(<FavoriteArticleImg favoriteArticle={favoriteArticle} />);
    expect(tree.contains(
      <div
        id="article-with-img"
        style={{
          backgroundImage: 'url(https://react.semantic-ui.com/images/wireframe/image.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />)).toBe(true);
  });
});

describe('Testing the CategoriesMenu component', () => {
  it('Should render as expected', () => {
    const categories = [{
      name: 'name',
      subcategories: [{
        id: 'id',
        name: 'name'
      }]
    }];
    const subcategoryClick = () => {};
    const tree = shallow(<CategoriesMenu subcategoryClick={subcategoryClick} categories={categories} />);
    expect(tree).toMatchSnapshot();
  });
});


