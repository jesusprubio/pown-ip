/*
  Copyright Jesús Pérez <jesusprubio@fsf.org>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

'use strict';

const icanhazip = require('icanhazip');
let pkgName = require('./package').name;


pkgName = pkgName.slice(5);


exports.yargs = {
  command: `${pkgName} [options]`,
  describe: 'Get your external IP address in pown.js',

  builder: {},

  handler: () => {
    const logger = require('pown-logger');

    logger.title(pkgName);

    // eslint-disable-next-line new-cap
    icanhazip.IPv4()
    .then((res) => {
      logger.result(res);
    });
  },
};
