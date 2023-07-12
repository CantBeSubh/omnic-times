"use client"
import { Post } from "@/lib/interface";
import { urlFor } from "@/lib/sanityImageUrl";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

interface GallaryProps {
    posts: Post[]
}

const Gallary: React.FC<GallaryProps> = ({ posts }) => {
    return (
        <ul>
            {posts.map((post) => (
                <li key={post._id} className="py-4">
                    <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-center xl:space-y-0 rounded-lg dark:bg-slate-900 p-4 bg-gray-200">
                        <div className=" flex flex-col items-center justify-center space-y-2 h-full">
                            <div className=" opacity-100 ">
                                {post.content.filter((item: any) => item._type === "image").length > 0 &&
                                    <Image
                                        src={urlFor(post.content.filter((item: any) => item._type === "image")[0]).url()}
                                        alt={post.title}
                                        width={200}
                                        height={200}
                                        className="rounded-lg"
                                    />
                                }
                            </div>
                            <p className="text-base font-medium leading-6 text-teal-500">
                                {moment(post._createdAt).fromNow()}
                            </p>
                        </div>
                        <Link
                            href={`/post/${post.slug.current}`}
                            className="space-y-3 xl:col-span-3 ml-4"
                            prefetch
                            target="_blank"
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
    );
}

export default Gallary;