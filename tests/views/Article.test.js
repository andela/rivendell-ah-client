import { shallow } from 'enzyme';
import React from 'react';
import { Article, mapStateToProps } from '../../src/views/articles/Article';
import mockData from '../config/mockData';
const { likes } = mockData;

const match = {
    params: {
        slug: 'slug'
    }
}
const likeAttributes1 = {
    divClass: 'ui labeled button',
    buttonClass: 'ui blue button',
    iconClass: 'heart icon',
    linkClass: 'ui basic left pointing label'
}
const likeAttributes2 = {
    divClass: 'ui labeled button',
    buttonClass: 'ui button',
    iconClass: 'heart icon',
    linkClass: 'ui basic left pointing label'
}

let like = true;
const unlikeArticle = () => {
    like = false;
}
const likeArticle = () => {
    like = true;
}
const history = {
    push: (path) => {
        return path;
    }
}
const article = {
    title: 'title',
    body: 'body',
    description: 'description',
    createdAt: '2018-10-1',
}
const likesCount = 4;
const shallowRender = () => (
    shallow(<Article
        like={like}
        article={article}
        match={match}
        likes={likes}
        getArticle={() => { }}
        likesCount={likesCount}
    />)
)
describe('Testing component methods', () => {
    describe('Testing componentWillReceiveProps', () => {
        it('should change likebutton attributes when user likes', () => {
            const nextProps = {
                like: true,
            }
            const wrapper = shallowRender();
            wrapper.instance().componentWillReceiveProps(nextProps)
            expect(wrapper.instance().state.likeAttributes).toEqual(likeAttributes1);
        })
        it('should change likebutton attributes when user unlikes', () => {
            const nextProps = {
                like: false,
                likes: []
            }
            const wrapper = shallowRender();
            wrapper.instance().componentWillReceiveProps(nextProps)
            expect(wrapper.instance().state.likeAttributes).toEqual(likeAttributes2);
        });
    });
    describe('Testing componentDidMount', () => {
        it('should call componentDidMount on loading the page', () => {
            jest.spyOn(Article.prototype, 'componentDidMount');
            shallowRender();
            expect(Article.prototype.componentDidMount.mock.calls.length).toEqual(1);
        });
    });
    describe('Testing componentDidUpdate', () => {
        it('it should call the getLikes action', () => {
            const prevProps = {
                like: false,
                article: {
                    likes: []
                }
            }
            const getLikes = (article) => {
                return article;
            }
            const wrapper = shallow(<Article
                like={like}
                article={article}
                match={match}
                likes={likes}
                getArticle={() => { }}
                getLikes={getLikes}
            />)
            wrapper.instance().componentDidUpdate(prevProps)
            expect(getLikes('An article')).toBe('An article');
        });
    });
})

describe('Testing mapStateToProps', () => {
    it('should map the state to the props correctly', () => {
        const state = {
            article: {
                isLoading: false,
                errors: {
                    status: false,
                    message: '',
                    response: {},
                },
                article: {},
            },
            like: {
                isLoading: false,
                errors: {
                    status: false,
                    message: '',
                    response: {},
                },
                likes: [],
                like: false,
                likesCount: 0,
            },
            profile: {
                userProfile: {
                    id: 1
                },
            },
            auth: {
                token: '',
            }
        };
        const componentState = mapStateToProps(state);
        expect(componentState).toEqual(
            {
                article: state.article.article,
                userProfile: state.profile.userProfile,
                likes: state.like.likes,
                like: state.like.like,
                likesCount: state.like.likesCount,
                token: state.auth.token,
            });
    })
})
describe('Testing the Article Component functions', () => {
    describe('Testing the renderLikeBy function in the Article component', () => {
        it('Should return a list of users when the number of likes is > 0', () => {
            const wrapper = shallowRender();
            wrapper.instance().renderLikeBy();
            expect(wrapper.find('Item').length).toBeGreaterThanOrEqual(0);
        });
        it('Should return a NO likes message when the number of likes is 0', () => {
            const wrapper = shallow(<Article
                like={like}
                article={article}
                match={match}
                getArticle={() => { }}
                likes={[]}
            />)
            wrapper.instance().renderLikeBy();
            expect(wrapper.instance().renderLikeBy()).toBe('No Likes');
        });

    });
    describe('Testing the handleClick function in the Article component', () => {
        it('Should return like=false when handleClick is called with like=true', () => {
            const wrapper = shallow(<Article
                like={true}
                article={article}
                match={match}
                getArticle={() => { }}
                likes={[]}
                history={history}
                token={'token'}
                likeArticle={likeArticle}
                unlikeArticle={unlikeArticle}
            />)
            wrapper.instance().handleClick();
            expect(like).toBe(false);
        })
        it('Should return a like=true when handleClick is called with like=false', () => {
            const wrapper = shallow(<Article
                like={false}
                article={article}
                match={match}
                getArticle={() => { }}
                likes={[]}
                history={history}
                token={'token'}
                likeArticle={likeArticle}
                unlikeArticle={unlikeArticle}
            />)
            wrapper.instance().handleClick();
            expect(like).toBe(true);
        })
        it('Should navigate the user to the login page when a user tries to like and token is undefined', () => {
            const wrapper = shallow(<Article
                like={false}
                article={article}
                match={match}
                getArticle={() => { }}
                likes={[]}
                history={history}
                token={''}
                likeArticle={likeArticle}
                unlikeArticle={unlikeArticle}
            />)
            const spy = jest.spyOn(wrapper.instance(), 'handleClick');
            wrapper.instance().handleClick();
            expect(history.push('/login')).toBe('/login');
        })
        describe('Testing the checkUserLikes function in the Article component', () => {
            const userProfile = {
                id: 'ea7f7f11-3040-49b6-a247-df1170d4ee22',
            }
            const wrapper = shallow(<Article
                like={like}
                article={article}
                match={match}
                likes={likes}
                getArticle={() => { }}
                userProfile={userProfile}
            />)
            expect(wrapper.instance().checkUserLikes(likes)).toBe(true);


        })
        describe('Testing the onLoadMore function in the Article component', () => {
            it('Should should set state values start and end to 3 and 1 respectively', () => {
                const wrapper = shallowRender();
                wrapper.instance().onLoadMore();
                expect(wrapper.instance().state.end).toBe(3);
                expect(wrapper.instance().state.start).toBe(1);
            })
            it('Should should set state values start and end to 3 and 1 respectively', () => {
                const wrapper = shallowRender();
                wrapper.instance().onLoadMore();
                expect(wrapper.instance().state.end).toBe(3);
                expect(wrapper.instance().state.start).toBe(1);
            })
            it('Should should set state values start, end and disableShowMore to 3, 1 and true respectively', () => {
                const newLikes =3;
                const wrapper = shallow(<Article
                    like={like}
                    article={article}
                    match={match}
                    likes={likes}
                    getArticle={() => { }}
                    likesCount={newLikes}
                />);
                wrapper.instance().onLoadMore();
                expect(wrapper.instance().state.end).toBe(3);
                expect(wrapper.instance().state.start).toBe(1);
                expect(wrapper.instance().state.disableShowMore).toBe(true);
            })
        })
        describe('Testing the onShowPrevious function in the Article component', () => {
            it('Should should set state values start and end to 0 and 2 respectively', () => {
                const wrapper = shallowRender();
                wrapper.instance().onShowPrevious();
                expect(wrapper.instance().state.end).toBe(2);
                expect(wrapper.instance().state.start).toBe(0);
            })
            it('Should should set state values start and end to 0 and 3 respectively', () => {
                const wrapper = shallowRender();
                wrapper.instance().setState({ start: 1, end: 4 })
                wrapper.instance().onShowPrevious();
                expect(wrapper.instance().state.end).toBe(3);
                expect(wrapper.instance().state.start).toBe(0);
            })
            it('Should should set state values start and end to 0 and 1 respectively', () => {
                const wrapper = shallowRender();
                wrapper.instance().setState({ start: 2, end: 0 })
                wrapper.instance().onShowPrevious();
                expect(wrapper.instance().state.end).toBe(0);
                expect(wrapper.instance().state.start).toBe(1);
            })
        })
    })
    it('Should render all elements properly on test environment', () => {
        shallowRender();
    });
});
