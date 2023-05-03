module.exports = {
    apps: [
      {
        name: 'myapp-api',
        script: 'yarn start:api',
        time: true,
        instances: 1,
        autorestart: true,
        max_restarts: 50,
        watch: false,
        max_memory_restart: '1G',
        env: {
          PORT: 3000,
          DATABASE_ADDRESS: process.env.DATABASE_ADDRESS
        },
      },
    ],
    deploy: {
      production: {
        user: 'username',
        host: '165.232.50.103',
        key: 'deploy.key',
        ref: 'origin/main',
        repo: 'https://github.com/username/myapp',
        path: '/home/username/myapp',
        'post-deploy':
          'yarn install && yarn build && pm2 reload ecosystem.config.js --env production && pm2 save && git checkout yarn.lock',
        env: {
          NODE_ENV: 'production',
          DATABASE_ADDRESS: process.env.DATABASE_ADDRESS
        },
      },
    },
  }