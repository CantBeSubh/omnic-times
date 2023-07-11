"use client"
import { Separator } from "@/components/ui/separator";
import { Post } from "@/lib/interface";
import { sanityClient } from "@/lib/sanity";
import { urlFor } from "@/lib/sanityImageUrl";
import { PortableText } from "@portabletext/react";
import { ArrowUpRight } from "lucide-react";
import moment from "moment";
import { Metadata } from "next";
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

export const metadata: Metadata = {
    title: 'OmnicTimes',
    description: 'OmnicTimes is a news site for latest Overwatch news and updates.',
}

const PostPage: React.FC<PostPageProps> = async ({ params }) => {
    const post = await getPost(params.slug) as Post;
    const PortableTextComponent = {
        types: {
            image: ({ value }: { value: any }) => (
                <Image
                    src={urlFor(value).url()}
                    alt="Image"
                    className="rounded-lg border my-10"
                    width={800}
                    height={800}
                    objectFit="fill"
                />
            ),
        },
        block: {
            h1: ({ children }: { children: any }) => (<h1 className="scroll-m-20 mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">{children}</h1>),
            h2: ({ children }: { children: any }) => (<h2 className="scroll-m-20 mb-4 border-b text-3xl font-semibold tracking-tight transition-colors first:mt-0">{children}</h2>),
            h3: ({ children }: { children: any }) => (<h3 className="scroll-m-20 mb-4 text-2xl font-semibold tracking-tight">{children}</h3>),
            h4: ({ children }: { children: any }) => (<h4 className="scroll-m-20 mb-4 text-xl font-semibold tracking-tight">{children}</h4>),
            h5: ({ children }: { children: any }) => (<h5 className="scroll-m-20 mb-4 text-lg font-semibold tracking-tight">{children}</h5>),
            h6: ({ children }: { children: any }) => (<h6 className="scroll-m-20 mb-4 text-base font-semibold tracking-tight">{children}</h6>),
            p: ({ children }: { children: any }) => (<p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>),
            blockquote: ({ children }: { children: any }) => (<blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>),
            code: ({ children }: { children: any }) => (<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">{children}</code>),
        },
        list: {
            bullet: ({ children }: { children: any }) => (<ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>),
            number: ({ children }: { children: any }) => (<ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>),
        },
        listItem: {
            bullet: ({ children }: { children: any }) => (<li className="leading-7 [&:not(:first-child)]:mt-6">{children}</li>),
            number: ({ children }: { children: any }) => (<li className="leading-7 [&:not(:first-child)]:mt-6">{children}</li>),
        },
        marks: {
            link: ({ children, value }: { children: any, value: any }) => {
                const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
                return (
                    <a href={value.href} rel={rel} className="font-medium text-primary underline underline-offset-4 decoration-wavy flex">
                        {children} <ArrowUpRight size={20} />
                    </a>
                )
            }
        }
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
                        <div
                            className="remove-all"
                            style={{ all: "unset" }}
                        >

                            <PortableText
                                value={post.content}
                                // @ts-ignore
                                components={PortableTextComponent}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default PostPage;