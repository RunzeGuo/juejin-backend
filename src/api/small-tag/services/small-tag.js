'use strict';

/**
 * small-tag service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::small-tag.small-tag');
