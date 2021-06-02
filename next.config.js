const path = require("path");

module.exports = {
  future: {
    webpack5: true
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    CLIENT_URL: process.env.CLIENT_URL,
    ENV: process.env.ENV,
    EDITOR_URL:
      process.env.EDITOR_URL
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999, must-revalidate',
          }
        ],
      },
    ]
  }
};
