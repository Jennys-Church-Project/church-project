/*
 * File: next.config.js                                                        *
 * Project: church-project                                                     *
 * Created Date: Thursday, June 3rd 2021, 11:43:57 am                          *
 * -----                                                                       *
 * Last Modified: Thursday, June 3rd 2021 11:44:00 am                          *
 */

module.exports = {
  images: {
    domains: ["images.unsplash.com", "firebasestorage.googleapis.com"],
  },
  experimental: { granularChunks: true },
};
