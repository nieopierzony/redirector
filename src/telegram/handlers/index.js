import miscController from './misc/index';
import linkController from './link/index';

export default bot => {
  miscController(bot);
  linkController(bot);
};
