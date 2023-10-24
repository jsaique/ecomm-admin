export const goBack = (router) => {
  if (!router) {
    return;
  } else {
    router.push("/products");
  }
};
