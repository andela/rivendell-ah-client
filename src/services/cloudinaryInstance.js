import cloudinary from 'cloudinary';

cloudinary.config('api_key', process.env.API_KEY);
cloudinary.config('api_secret', process.env.API_SECRET);
cloudinary.config('cloud_name', process.env.CLOUD_NAME);


export default cloudinary;
