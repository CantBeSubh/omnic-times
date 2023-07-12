import Gallary from "@/components/gallary";
import { Separator } from "@/components/ui/separator";
import { Post } from "@/lib/interface";
import { sanityClient } from "@/lib/sanity";


const getPosts = async () => {
  const query = `*[_type == "post"] | order(_createdAt desc)  `;
  const data = await sanityClient.fetch(query);
  return data;
}
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

const IndexPage = async () => {

  const posts = await getPosts() as Post[];

  return (
    <div >
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          ALL POSTS
        </h1>
      </div>
      <Separator />

      <Gallary posts={posts} />
    </div>
  );
}

export default IndexPage;