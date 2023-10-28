export const goBack = (router, ref) => {
  if (!router) {
    return;
  } else {
    router.push(ref);
  }
};
