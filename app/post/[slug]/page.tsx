import { Separator } from "@/components/ui/separator";
import { Post } from "@/lib/interface";
import { sanityClient } from "@/lib/sanity";
import { urlFor } from "@/lib/sanityImageUrl";
import { PortableText } from "@portabletext/react";
import moment from "moment";
import Image from "next/image";

interface PostPageProps {
    params: {
        slug: string;
    }
}

const getPost = async (slug: string) => {
    const query = `*[_type == "post" && slug.current == "${slug}"][0]`
    const data = await sanityClient.fetch(query);
    return data;
}


const PostPage: React.FC<PostPageProps> = async ({ params }) => {
    const post = await getPost(params.slug) as Post;
    const PortableTextComponent = {
        types: {
            image: ({ value }: { value: any }) => (
                <Image
                    src={urlFor(value).url()}
                    alt="Image"
                    className="rounded-lg"
                    width={800}
                    height={800}
                    objectFit="fill"
                />
            ),
        },
    };

    return (
        <div >
            <Separator />

            <header className="pt-6 xl:pb-6">
                <div className="space-y-1 text-center">
                    <div className="space-y-10">
                        <div>
                            <p className="text-base font-medium leading-6 text-teal-500">
                                {`${moment(post._createdAt).format("Do MMMM YYYY")}, ${moment(post._createdAt).fromNow()}`}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                            {post.title}
                        </h1>
                    </div>
                </div>
            </header>
            <Separator />

            <div className="divide-y divide-gray-200 pb-7 dark:divide-gray-700 xl:divide-y-0">
                <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
                    <div className="prose max-w-none pb-8 pt-10 dark:prose-invert prose-lg">
                        <PortableText
                            value={post.content}
                            components={PortableTextComponent}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostPage;