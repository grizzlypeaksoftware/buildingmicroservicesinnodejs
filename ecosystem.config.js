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
      user : 'root',
      host : '192.241.196.64',
      ref  : 'origin/master',
      repo : 'https://github.com/grizzlypeaksoftware/buildingmicroservicesinnodejs.git',
      path : '/var/www/microservices/buildingmicroservicesinnodejs/MessagingMicroservice',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    dev : {
      user : 'root',
      host : '192.241.196.64',
      ref  : 'origin/development',
      repo : 'https://github.com/grizzlypeaksoftware/buildingmicroservicesinnodejs.git',
      path : '/var/www/microservices/buildingmicroservicesinnodejs/MessagingMicroservice',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};
