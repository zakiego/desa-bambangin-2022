const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL as string;

const getImage = (image: string) => {
  return `${cmsUrl}/wp-content/uploads/${image}`;
};

export default getImage;
