import prisma from "@/app/shared/prisma";
import { notFound, useParams } from "next/navigation";
import "./styles.css";
import { AppendView } from "./appendView";
import Image from "next/image";
async function increment(id: bigint) {
  "use server";
  try {
    const res = await prisma.blogs.update({
      where: { id: id },
      data: { views: { increment: 1 } },
    });
  } catch (err) {}
}
export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const blog = await prisma.blogs.findFirst({
    where: { slug: { equals: slug } },
  });
  if (!blog) return notFound();
  else {
    const image = blog.img && `${blog.img}`;
    return (
      <div className="py-5 [&>img]:mx-auto !max-w-[960px] responsive">
        <AppendView id={blog.id} increment={increment} />
        <div className="aspect-[940/460] relative rounded-lg overflow-hidden">
          <Image
            width={960}
            height={460}
            src={image || "/assests/noimage.png"}
            className="object-cover !w-full !h-full object-center hover:scale-110 transition-all duration-150 cursor-pointer"
            alt=""
          />
          <div
            style={{
              background:
                "linear-gradient(90deg, rgba(0, 0, 0, 0.6), transparent)",
            }}
            className="px-4 py-3 backdrop-blur-sm absolute w-full bottom-0 text-white/60"
          >
            <div className=" text-sm">
              {blog.created_at?.getDate()}{" "}
              {getMonthName(blog.created_at?.getMonth())}
              &middot; {5} minutes read
            </div>
            <h2 className="mt-4 text-xl font-bold text-white">{blog.title}</h2>
          </div>
        </div>
        <div
          id="blog_content"
          className="pt-12"
          dangerouslySetInnerHTML={{
            __html: blog.description || "<div>No Content</div>",
          }}
        ></div>
      </div>
    );
  }
}

function getMonthName(monthNumber?: number) {
  if (!monthNumber) return;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Check if the monthNumber is valid
  if (monthNumber >= 1 && monthNumber <= 12) {
    return months[monthNumber - 1];
  } else {
    return "Invalid month number";
  }
}
