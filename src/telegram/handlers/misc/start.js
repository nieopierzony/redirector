export default ctx => {
  try {
    if (ctx.updateType === 'message') {
      const [, startQuery] = ctx.message.text.split(' ');
      if (startQuery) {
        const decodedMessage = Buffer.from(startQuery, 'base64').toString('ascii');
        console.log(decodedMessage);
        ctx.client.handleUpdate({ callback_query: { data: decodedMessage } });
        return true;
      }
    }
  } catch (err) {
    console.error(err);
  }

  return true;
};
