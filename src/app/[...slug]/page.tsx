import { notFound } from "next/navigation";
import React from "react";
import { getDummyPages } from "./dummyApi/allPages";
import { SingleDummyPage, getSingleDummyPage } from "./dummyApi/singlePage";
import SinglePageTemplate from "./templates/singlePageTemplate";

export default function Page({ params }: { params: { slug: string[] } }) {
  return generatePage(params.slug.join("/"));
}
async function generatePage(slug: string) {
  const pageDetails: SingleDummyPage | undefined = await getSingleDummyPage(
    slug
  );
  let template = null;
  if (pageDetails) {
    if (!pageDetails.hasError) {
      template = <SinglePageTemplate page={pageDetails} />;
    } else {
      console.error("Error found in page");
      notFound();
    }
  } else {
    console.error("Page not found");
    notFound();
  }

  return template;
}
export async function generateStaticParams() {
  let pages = await getDummyPages();
  let allPages = pages.map((page) => {
    const array = page.slug.split("/").filter((slug) => slug !== "");
    return {
      slug: array,
    };
  });
  console.log(allPages);
  return allPages;
}
