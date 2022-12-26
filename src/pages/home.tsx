import { trpc } from "~/src/utils/trpc";

export default function Index() {
  const hello = trpc.post.getAllPostsForHome.useQuery({ preview: false });
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{JSON.stringify(hello.data)}</p>
    </div>
  );
}
