/*
  Copyright Jesús Pérez <jesusprubio@fsf.org>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

'use strict';

const icanhazip = require('icanhazip');
const logger = require('pown-logger');

let pkgName = require('./package').name;


pkgName = pkgName.slice(5);


exports.yargs = {
  command: pkgName,
  // TODO: Improve the engine to get it from the package.json
  // to avoid to repeat the same in multiple places.
  describe: 'Get your external IP address',

  builder: {},

  handler: () => {
    logger.title(pkgName);

    // eslint-disable-next-line new-cap
    icanhazip.IPv4()
    .then(res => logger.result(res));
  },
};
