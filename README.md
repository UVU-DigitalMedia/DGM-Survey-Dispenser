# DGM Survey Dispenser

The application to manage the M&M dispenser used to get student input.

# Prerequisites

The following software can be installed via command-line on a Mac using
[homebrew](http://brew.sh/). It is recommended that you install this if you
don't have the prerequisites installed or if you just want to simplify the
bootstrapping process

* [`node`](https://nodejs.org/) `brew install node`
* [`npm`](https://docs.npmjs.com/) - This should come with your node
installation, but it is recommended that you upgrade the one given to you by
running `npm install -g npm`
* [`postgresql`](http://www.postgresql.org/) `brew install postgresql`
* `opencv` `brew install homebrew/science/opencv`

# Installation

First, you'll need to clone the repo and move into the repo's directory:

```bash
git clone git@github.com:UVU-DigitalMedia/DGM-Survey-Dispenser.git
cd DGM-Survey-Dispenser
```

Now you'll need to pull down the 3rd party packages:

```bash
npm install
# If you're on a production box, run with the production flag. Don't run it in your development environment
npm install --production
```

You'll need to set up your local SSL/TLS certificates. If you're on a Mac, I've
got a script that you can run to generate your self signed certificates!

It will ask you for the hostname. I would recommend [setting up stress free ssl
on an OSX development machine](https://gist.github.com/jed/6147872). It only
takes a few minutes to setup, and it makes dealing with ssl much easier to work
with locally. If you don't want to deal with that, just enter `localhost` as
the host name. You'll still have the "This connection isn't trusted" thing that
way, which is why I recommend you follow the instructions at the above link to
make it much easier to deal with.

```bash
npm run ssl
# If that doesn't work, change the permissions with `chmod a+x ./scripts/ssl.sh` and try again
```

After that, you'll need to set up your local configuration. Copy
`config/env.default.js` to `config/env.development.js`. Open your newly created
config file and change the host name of that url to the one you entered in the
previous step.

Now you can start up the postgres database. Once you start it, it will just run
in the tab. You'll need to open up a new tab after it starts up, but make sure
you keep that tab running.

```bash
postgres -D /usr/local/var/postgres
```

You'll need to set up the required databases. Enter the following commands to
create the databases:

```bash
psql -c "CREATE DATABASE dgm_survey_dispenser"
# the next line is only needed if your doing development, specifically, running tests
psql -c "CREATE DATABASE dgm_survey_dispenser_test"
```

With the postgres server still running, run the following to set up your first
user (so you can login to the app). It will ask you for an email and password:

```bash
npm run seed
# If you quit using ctrl-c, it will hang for a bit while it closes database connections
```

Now you need to build the assets

```bash
npm run build
# If you want to rebuild on a filechange run the following instead:
npm run watch
```

Now you're ready to run the app!

```bash
npm run server
```

That will display the url that you can hit to run the app. Once there, go to
`/login` to login to the backend portion of the app.

# Galileo Instructions

[Go here](GALILEO_SETUP.md)
