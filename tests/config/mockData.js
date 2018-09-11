const socialMediaPlatforms = [
  {
    id: 1,
    link: '/api/auth/google',
    text: 'Sign in with Google',
    textClass: 'googleTextDesign social-right-pad socialfont',
    iconClass: 'google icon',
    iconSpanClass: 'googleIconDesign socialfont'
  },
  {
    id: 2,
    link: '/api/auth/linkedin',
    text: 'Sign in with Linkedin',
    textClass: 'linkedInTextDesign social-right-pad socialfont',
    iconClass: 'linkedin icon',
    iconSpanClass: 'linkedInIconDesign socialfont'
  },
  {
    id: 3,
    link: '/api/auth/facebook',
    text: 'Sign in with Facebook',
    textClass: 'facebookTextDesign social-right-pad socialfont',
    iconClass: 'facebook f icon',
    iconSpanClass: 'facebookIconDesign socialfont'
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
