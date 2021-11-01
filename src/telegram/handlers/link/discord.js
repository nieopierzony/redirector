export default ctx => {
  try {
    const [, userTag, userID] = ctx.match;
    console.log(userTag, userID);

    // TODO
    // Create id, store in redis with telegram id and discord id
    // Create function to write discord oauth2 links
    // Send user link in button to authotize
  } catch (err) {
    console.error(err);
  }
};
