import { Route } from 'react-router-dom';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
import authPages from '../views/auth';
import articlePages from '../views/articles';
import userPages from '../views/user';
import subcategoryPages from '../views/articles/subcategory';

const { AuthRoute } = authPages;
const {
  UserArticles, NewArticle, Article, EditArticle
} = articlePages;
const { SubcategoryArticles } = subcategoryPages;
const {
  EditProfile, Profile, Followers, Following
} = userPages;
const { Signup, Login } = authPages;

export default [
  {
    id: 1,
    type: Route,
    path: '/',
    component: Home,
    exact: true,
  },
  {
    id: 2,
    type: Route,
    path: '/signup',
    component: Signup,
    exact: true,
  },
  {
    id: 3,
    type: Route,
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    id: 4,
    type: Route,
    path: '/articles',
    component: UserArticles,
    exact: true,
  },
  {
    id: 5,
    type: AuthRoute,
    path: '/articles/new',
    component: NewArticle,
    exact: true,
  },
  {
    id: 6,
    type: Route,
    path: '/articles/:slug',
    component: Article,
    exact: true,
  },
  {
    id: 7,
    type: AuthRoute,
    path: '/articles/:slug/edit',
    component: EditArticle,
    exact: true,
  },
  {
    id: 8,
    type: Route,
    path: '/@:username',
    component: Profile,
    exact: true,
  },
  {
    id: 9,
    type: AuthRoute,
    path: '/@:username/edit',
    component: EditProfile,
    exact: true,
  },
  {
    id: 10,
    type: Route,
    path: '/@:username/following',
    component: Following,
    exact: true,
  },
  {
    id: 11,
    type: Route,
    path: '/@:username/followers',
    component: Followers,
    exact: true,
  },
  {
    id: 12,
    type: Route,
    path: '/:subcategory',
    component: SubcategoryArticles,
    exact: true,
  },
  {
    id: 13,
    type: Route,
    path: '/:subcategory/:slug',
    component: Article,
    exact: true,
  },
  {
    id: 14,
    type: Route,
    path: '*',
    component: NotFound,
    exact: true,
  },
];
