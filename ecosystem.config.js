module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'messaging',
      script    : 'MessagingMicroservice/app.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      key: "$/.ssh/id_rsa.pub",
      user : 'root',
      host : '206.189.208.52',
      ref  : 'origin/master',
      repo : 'https://github.com/grizzlypeaksoftware/buildingmicroservicesinnodejs.git',
      path : '/var/www/buildingmicroservicesinnodejs',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    dev : {
       key: "$/.ssh/id_rsa.pub",
      user : 'root',
      host : '206.189.208.52',
      ref  : 'origin/master',
      repo : 'https://github.com/grizzlypeaksoftware/buildingmicroservicesinnodejs.git',
      path : '/var/www/buildingmicroservicesinnodejs',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};
