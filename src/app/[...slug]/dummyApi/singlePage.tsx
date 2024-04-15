import { title } from "process";

export type SingleDummyPage = {
  title: string;
  content: string;
  hasError: boolean;
};

export async function getSingleDummyPage(
  slug: string
): Promise<SingleDummyPage | undefined> {
  let post = undefined;
  const baseUrl = "https://jsonplaceholder.typicode.com/posts/";
  const url = baseUrl + slug;

  const response = await fetch(url, {
    method: "GET",
    next: { tags: ["pages"], revalidate: 60 },
  });
  const data = await response.json();
  if (data && data.title) {
    console.log("creating page");
    post = createPage(data);
  }

  return post;
}

function createPage(data: any): SingleDummyPage {
  // In order to simulate an api inconsistency, we will return an error according to the current time
  // Please set the time to your build time to see the error
  // Let's say the build time is 09:20
  // Until 09:25 the page will be rendered without error
  // After 09:25 and until 09:30 the page will be rendered with error which will lead to a 404 page with the error message "Error found in page"
  // After 09:30 the page will be rendered without error again BUT here is the issue :
  // The page will still have the 404 status code even if the page is rendered successfully

  const time = "15:23";
  const timeInterval = 5;

  const minutes = time.split(":")[1];
  const minutesPlusFive = parseInt(minutes) + timeInterval;
  const minutesPlusTen = parseInt(minutes) + timeInterval * 2;

  const hasError =
    new Date().getMinutes() > minutesPlusFive &&
    new Date().getMinutes() < minutesPlusTen;

  return {
    title: data.title + (hasError ? " (Error)" : ""),
    content: data.body,
    hasError: hasError,
  };
}
