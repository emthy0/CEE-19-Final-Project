module.exports = {
    apps: [
      {
        name: 'mcv-calendar-api',
        script: 'index.js',
        time: true,
        instances: 1,
        autorestart: true,
        max_restarts: 50,
        watch: false,
        max_memory_restart: '1G',
        env: {
          PORT: 3000,
          JWT_SECRET: "rKJ@mBk%3c3c3Ibuk%hj@xKJtLq%F6wzLBsXVFJW)WnYb56n%)NSnRYFtSEG9Szz",
          assignmentPriorityTableName: "assignment_priority_table",
          AWS_REGION: "us-east-1",
          aws_access_key_id: "ASIAVVQSHUGF346AMXSZ",
          aws_secret_access_key: "UWXYtbBSrzI4G7YKswcPs2dcfqaOViC23VxQ",
          aws_session_token: "FwoGZXIvYXdzEND//////////wEaDAlBf7ngw/PYwopbziLLAUB9fqneHA8j/b9aEG/08DcUw3iwjanD3a0vDqEogHyCzAtoxxRwZ8jIU178HY06NGwKhuWV79p1013FksIcFSwSNEgpQf1sOWzLmNeMOW+/ujQ8GeY2c2kbHQXctZQHF7yj+BH6wzcNpogRhFsZcQkH/I3Rhdn/IYpgqUU0cVrturK2t3ZL93llSyoKOhneB2+qdhngWJtohV1Kne7pGHpe8F2N5WlxZpzQW+5PvYraOA5CSzmVCAbj537PCtI55GIEN62eXDg+IL7LKOeqxqIGMi0V7yy7K2wJqX/OPPhOGY2QVN0xQSIFm7qC+haldT2rRHW1nGeyRvozsio+tjk=",

          cliend_id: "VKz2z7bQjburvYXnzVYvmhpbafeO3vMwLTUy6NIg",
          client_secret: "doYh9ccp9YoUWsKte0xejIguKZQ6osU535t8Mrlt",

          frontendIPAddress: "3.217.142.246",
          backendIPAddress: "3.217.142.246",
        },
      },
    ],
    // deploy: {
    //   production: {
    //     user: 'username',
    //     host: '165.232.50.103',
    //     key: 'deploy.key',
    //     ref: 'origin/main',
    //     repo: 'https://github.com/username/myapp',
    //     path: '/home/username/myapp',
    //     'post-deploy':
    //       'yarn install && yarn build && pm2 reload ecosystem.config.js --env production && pm2 save && git checkout yarn.lock',
    //     env: {
    //       NODE_ENV: 'production',
    //       DATABASE_ADDRESS: process.env.DATABASE_ADDRESS
    //     },
    //   },
    // },
  }