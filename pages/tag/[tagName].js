import SiteHeader from "../../component/layout/SiteHeader/SiteHeader";
import Listing from "../../component/layout/BlogListing/Listing";
import SectionSwag from "../../component/layout/SectionSwag/SectionSwag";
import SiteFooter from "../../component/layout/SiteFooter/SiteFooter";
import Head from "next/head";
import PostService from "../../services/PostService";
import TagService from "../../services/TagService";
import { useState,useEffect } from "react";

export async function getServerSideProps(context) {
  const { params } = context;
  // console.log(params.tagName);
  const clickNo = 0;
  const tagsArray = await TagService.getTags();
  // console.log(tagsArray);
  const foundTag = tagsArray.find((tag) => tag.name === params.tagName);
  // console.log(foundTag);
  const { posts, count } = await PostService.getPostByTags(
    params.tagName,
    clickNo
  );
  // console.log(response);
  if (!foundTag) {
    return {
      notFound: true
    };
  } else {
    return {
      props: {
        posts: posts,
        count: count,
        params: params
      }
    };
  }
}

export default function TagName({ posts, params, count }) {
  console.log(posts);
  const name = params.tagName;
  const [newBlogs, setNewBlogs] = useState(posts);

  const currentCount = (count) => {
    getNewPosts(count);
  };
  useEffect(async () => {
    const { posts, count } = await PostService.getPostByTags(
      params.tagName,
      0
    );
    setNewBlogs(posts)
  }, [params.tagName])
  const getNewPosts = async (clickNo) => {
    const { posts, count } = await PostService.getPostByTags(name, clickNo);

    setNewBlogs((prevValue) => {
      return [...prevValue, ...posts];
    });
  };

  return (
    <div>
      <Head>
        <title> Tag: {name} | Nullcast</title>
      </Head>
      <SiteHeader />
      {/* <ListingHeader /> */}
      {posts.length > 0 ? (
        <Listing
          blog={newBlogs}
          currentCount={currentCount}
          blogCount={count}
        />
      ) : (
        <div className="h-60 text-center pt-20">
          There's no published posts for this tag yet
        </div>
      )}

      <SectionSwag />
      <SiteFooter />
    </div>
  );
}