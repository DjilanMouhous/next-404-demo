import React from "react";
import { SingleDummyPage } from "../dummyApi/singlePage";

export default function SinglePageTemplate({
  page,
}: {
  page: SingleDummyPage;
}) {
  return (
    <div>
      <h1>{page.title}</h1>
      <p>{page.content}</p>
    </div>
  );
}
