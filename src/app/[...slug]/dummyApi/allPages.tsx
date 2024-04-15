const allPagesJson = {
  pages: [
    {
      slug: "1",
    },
    {
      slug: "2",
    },
    {
      slug: "3",
    },
  ],
};

export async function getDummyPages() {
  return allPagesJson.pages;
}
