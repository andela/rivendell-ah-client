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
  searchParams
};
