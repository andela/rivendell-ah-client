import { Route } from 'react-router-dom';
import Home from // eslint-disable-line import/no-named-as-default
  '../views/Home';
import NotFound from '../views/NotFound';
import authPages from '../views/auth';
import routePages from '../components/routes';
import articlePages from '../views/articles';
import userPages from '../views/user';
import subcategoryPages from '../views/articles/subcategory';

const {
  UserArticles, NewArticle, Article, EditArticle
} = articlePages;
const { SubcategoryArticles } = subcategoryPages;
const {
  EditProfilePage, ProfilePage, Followers, Following,
  ForgotPassword, ResetPassword,
} = userPages;
const { Signup, Login } = authPages;
const { PrivateRoute, GuestRoute } = routePages;

export default [
  {
    type: Route,
    path: '/',
    component: Home,
    exact: true,
  },
  {
    type: GuestRoute,
    path: '/signup',
    component: Signup,
    exact: true,
  },
  {
    type: GuestRoute,
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    type: Route,
    path: '/articles',
    component: UserArticles,
    exact: true,
  },
  {
    type: PrivateRoute,
    path: '/articles/new',
    component: NewArticle,
    exact: true,
  },
  {
    type: Route,
    path: '/articles/:slug',
    component: Article,
    exact: true,
  },
  {
    type: PrivateRoute,
    path: '/articles/:slug/edit',
    component: EditArticle,
    exact: true,
  },
  {
    type: GuestRoute,
    path: '/forgot-password',
    component: ForgotPassword,
    exact: true,
  },
  {
    type: GuestRoute,
    path: '/reset-password',
    component: ResetPassword,
    exact: true,
  },
  {
    type: Route,
    path: '/not-found',
    component: NotFound,
    exact: true,
  },
  {
    type: Route,
    path: '/@:username',
    component: ProfilePage,
    exact: true,
  },
  {
    type: PrivateRoute,
    path: '/@:username/edit',
    component: EditProfilePage,
    exact: true,
  },
  {
    type: Route,
    path: '/@:username/following',
    component: Following,
    exact: true,
  },
  {
    type: Route,
    path: '/@:username/followers',
    component: Followers,
    exact: true,
  },
  {
    type: Route,
    path: '/:subcategory',
    component: SubcategoryArticles,
    exact: true,
  },
  {
    type: Route,
    path: '/:subcategory/:slug',
    component: Article,
    exact: true,
  },
  {
    type: Route,
    path: '*',
    component: NotFound,
    exact: true,
  },
];
