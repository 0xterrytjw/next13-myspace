import React from "react";

export const revalidate = 1200; // not necessary, just for ISR demonstration

export async function generateStaticParams() {
  const response = await fetch("http://localhost:3000/api/content");
  const posts = await response.json();

  console.log(
    "Generating static params for blog posts -> ",
    posts.map((post: Post) => ({
      slug: post.slug,
    }))
  );
  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}

type Post = {
  title: string;
  content: string;
  slug: string;
};

type BlogPostPageProps = {
  params: { slug: string };
};
const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  // need to use full URL for fetch in server components - relative URLs will not work
  const response = await fetch("http://localhost:3000/api/content");
  const posts = await response.json();
  const post = posts.find((post: Post) => post.slug === params.slug);

  return (
    <div>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <br />
      <p>{post.content}</p>
    </div>
  );
};

export default BlogPostPage;
