/*
  Copyright Jesús Pérez <jesusprubio@fsf.org>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

'use strict';

const address = require('address');
const icanhazip = require('icanhazip');
const logger = require('pown-logger');

let pkgName = require('./package').name;


const defaults = false;
pkgName = pkgName.slice(5);


exports.yargs = {
  command: pkgName,
  // TODO: Improve the engine to get it from the package.json
  // to avoid to repeat the same in multiple places.
  describe: 'Get info for a network interface: IPv4,' +
            ' IPv6, MAC and DNS.',

  builder: {
    interface: {
      type: 'string',
      alias: 'i',
      describe: 'Network interface [linux -> eth, mac -> en]',
    },
    external: {
      type: 'boolean',
      alias: 'e',
      describe: `Get also your external IP [${defaults}]`,
    },
  },

  handler: (argv = {}) => {
    logger.title(pkgName);

    address(argv.interface, (err, addrs) => {
      if (err) throw err;

      logger.result('Addresses', addrs);

      address.dns((errD, dns) => {
        if (err) throw err;

        logger.result('DNS', dns);

        if (argv.external) {
          // eslint-disable-next-line new-cap
          icanhazip.IPv4().then(ext => logger.result('External', ext));
        }
      });
    });
  },
};
