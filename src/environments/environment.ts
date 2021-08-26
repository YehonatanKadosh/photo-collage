export const environment = {
  production: process.env.production || 'false',
  PIXABAY_API_KEY:
    process.env.PIXABAY_API_KEY || '22587962-22f41904ba2284a9141fdbac6',
  PIXABAY_API_URL:
    process.env.PIXABAY_API_URL || 'https://pixabay.com/api/?key=',
  GOOGLE_MAPS_API_KEY:
    process.env.GOOGLE_MAPS_API_KEY ||
    'AIzaSyASgW_mk-RWPbAipJEGJGl8mAIaTgVBWgM',
  Photos_API_URl: process.env.Photos_API_URl || 'http://localhost:3000/Photos',
  User_API_URL: process.env.User_API_URL || 'http://localhost:3000/User',
  DARK_MODE: process.env.DARK_MODE || 'dark-mode',
  LIGHT_MODE: process.env.LIGHT_MODE || 'light-mode',
  Template_GRID: process.env.Template_GRID || 'Grid',
  Template_LIST: process.env.Template_LIST || 'List',
};
