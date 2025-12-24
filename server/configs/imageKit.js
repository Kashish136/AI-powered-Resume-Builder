import ImageKit from '@imagekit/nodejs';

const imagekit = new ImageKit({
   privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // this is default and can be omitted








});

export default imagekit