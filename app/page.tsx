import { Separator } from "@/components/ui/separator";
import { Post } from "@/lib/interface";
import { sanityClient } from "@/lib/sanity";
import moment from "moment";
import Link from "next/link";

const getPosts = async () => {
  const query = `*[_type == "post"]`;
  const data = await sanityClient.fetch(query);
  return data;
}

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

      <ul>
        {posts.map((post) => (
          <li key={post._id} className="py-4">
            <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0 rounded-lg dark:bg-slate-900 p-4 bg-gray-200">
              <div>
                <p className="text-base font-medium leading-6 text-teal-500">
                  {moment(post._createdAt).fromNow()}
                </p>
              </div>
              <Link
                href={`/post/${post.slug.current}`}
                prefetch
                className="space-y-3 xl:col-span-3"
              >
                <div>
                  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    {post.title}
                  </h3>
                </div>

                <p className="prose max-w-none text-gray-500 line-clamp-2 text-sm text-muted-foreground">
                  {post.overview}
                </p>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IndexPage;