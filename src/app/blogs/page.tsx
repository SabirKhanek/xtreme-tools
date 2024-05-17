import { blogs } from "@prisma/client";
import prisma from "../shared/prisma";
import Link from "next/link";
import { Button } from "../components/button";
import Image from "next/image";

export default async function Blogs({
  searchParams,
}: {
  searchParams: { pageNum?: string };
}) {
  const itemsPerPage = 3;
  const pageNum = parseInt(searchParams.pageNum || "1");
  const offset = (pageNum - 1) * itemsPerPage;

  const recentBlogsPrm = prisma.blogs.findMany({
    orderBy: { created_at: "desc" },
    take: itemsPerPage,
    skip: offset,
  });

  const trendingBlogsPrm = prisma.blogs.findMany({
    orderBy: { views: "desc" },
    take: itemsPerPage * 2,
    skip: offset * 2,
  });

  const result = await Promise.all([recentBlogsPrm, trendingBlogsPrm]);

  return (
    <div className="py-3">
      <div className="">
        <h2 className="text-primary text-xl font-bold">Our Blogs</h2>
        <p className="py-2">
          Dive into the world of artificial intelligence with Xtreme Blogs. Stay
          informed, inspired, and ahead of the curve as we unravel the latest
          trends, insights, and innovations in the AI landscape. Explore the
          future of technology with Xtreme Blogs - where knowledge meets
          innovation.
        </p>
      </div>

      <div className="my-4 ">
        <h3 className="flex items-center text-center font-bold text-primary gap-2">
          <HeadingPreDecor />
          On trend
        </h3>
        <h2 className="text-primary text-xl font-semibold">
          Most Popular Posts
        </h2>
        <BlogCardContainer blogs={result[0]} />
      </div>

      <div className="my-4">
        <h3 className="flex items-center text-center font-bold text-primary gap-2">
          <HeadingPreDecor />
          On Top
        </h3>
        <h2 className="text-primary text-xl font-semibold">Recent Posts</h2>
        <BlogCardContainer blogs={result[0]} />
      </div>
      <div className="my-5 flex gap-5 items-center justify-center">
        {pageNum !== 1 && (
          <Link href={`?pageNum=${pageNum - 1}`}>
            <Button className="border border-primary">
              <span className="text-primary">Previous</span>
            </Button>
          </Link>
        )}
        {
          <Link href={`?pageNum=${pageNum + 1}`}>
            <Button className="bg-primary border border-primary">Next</Button>
          </Link>
        }
      </div>
    </div>
  );
}

function HeadingPreDecor() {
  return (
    <svg
      width="62"
      height="1"
      viewBox="0 0 62 1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 0.5H61"
        stroke="black"
        strokeOpacity="0.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BlogCardContainer({ blogs }: { blogs: blogs[] }) {
  if (blogs.length > 0) {
    return (
      <div className="grid py-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-7">
        {blogs.map((b, i) => (
          <>
            <BlogCard blog={b} key={i}></BlogCard>
          </>
        ))}
      </div>
    );
  } else return <div>No results</div>;
}

function BlogCard({ blog }: { blog: blogs }) {
  const image = blog.thumbnail && `${blog.thumbnail}`;

  return (
    <div className="bg-primary/5 h-full p-5 ">
      <div className="border border-black/70 rounded-lg w-full  overflow-hidden aspect-[310/179]">
        <img
          alt={"blog thumbnail"}
          className="w-full h-full object-center object-cover"
          src={image || "/assests/noimage.png"}
        ></img>
      </div>
      <div className="my-3">
        <Link href={`/blogs/${blog.slug}`} className="hover:underline">
          <h3 className="text-lg text-primary font-semibold">{blog.title}</h3>
        </Link>
        <p className="border-box relative line-clamp overflow-hidden">
          {blog.short_description ||
            "AI is changing digtal marketing and making it cooler than ever. yeah, it's not science fiction - it's 110% real. In fact, AI is the secret sauce that's making brands awesome"}
        </p>
      </div>
      <Link
        className="text-primary text-sm w-full block text-right font-semibold hover:underline"
        href={`/blogs/${blog.slug}`}
      >
        Continue Reading »
      </Link>
    </div>
  );
}
