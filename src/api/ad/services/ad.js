'use strict';

/**
 * ad service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ad.ad');
