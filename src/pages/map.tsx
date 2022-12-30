import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
    redirect: {
      destination: "https://goo.gl/maps/8iRXvfnw9NJAPXTy8",
      permanent: false,
    },
  };
};

const Map = () => {
  return <div />;
};

export default Map;
