import { NextSeo } from "next-seo";

interface Props {
  title: string;
  // description?: string;
  children: React.ReactNode;
}

export const PageWrapper: React.FC<Props> = ({ title, children }) => {
  return (
    <>
      <NextSeo title={title} />
      <div>{children}</div>
    </>
  );
};
