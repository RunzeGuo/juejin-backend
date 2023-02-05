
import contentTypeBuilder from '../../../node_modules/@strapi/plugin-content-type-builder/strapi-admin.js';
import email from '../../../node_modules/@strapi/plugin-email/strapi-admin.js';
import upload from '../../../node_modules/@strapi/plugin-upload/strapi-admin.js';
import usersPermissions from '../../../node_modules/@strapi/plugin-users-permissions/strapi-admin.js';
import i18N from '../../../node_modules/@strapi/plugin-i18n/strapi-admin.js';


const plugins = {
  'content-type-builder': contentTypeBuilder,
  'email': email,
  'upload': upload,
  'users-permissions': usersPermissions,
  'i18n': i18N,
};

export default plugins;
