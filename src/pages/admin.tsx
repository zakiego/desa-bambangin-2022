import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const adminPage = `${process.env.NEXT_PUBLIC_CMS_URL}/wp-admin`;
  return {
    props: {},
    redirect: {
      destination: adminPage,
      permanent: false,
    },
  };
};

const Map = () => {
  return <div />;
};

export default Map;
