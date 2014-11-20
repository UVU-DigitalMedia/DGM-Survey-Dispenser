# DGM-Survey-Dispenser

DGM-Survey-Dispenser is a diverse framework to build out an API and SPA.

# Documentation

```bash
npm run docs
```

then visit [`http://localhost:3000`](http://localhost:3000).

# Installation

Don't forget to put `sudo` before these commands if you still haven't changed
the ownership of **your** CLIs to **your** user.

Make sure you have `bower` installed. Install it with this:

```bash
npm install -g bower
```

Then run these commands:

```bash
npm i
bower i
```

It is also required that you have `mongoDB` and `redis`. If you're using a mac
and you have [homebrew](http://brew.sh/), you can use this command to get both
`mongoDB`:

```bash
brew install mongodb redis
```

You can install mongoDB on Mac or Windows (or Linux) from
[here](http://www.mongodb.org/downloads).

You can install redis on Mac or Linux from [here](http://redis.io/download).

Redis currently isn't available for Windows... but the development environment
doesn't use it by default, so you should be okay. Your sessions will expire
if your app resets, though.

# Starting the app

Make sure that the `npm i` and `bower i` commands ran successfully without
errors. You cannot begin development without this step.

Make sure you have mongoDB running (on mac, use the `mongod` command). To do
this on a Mac, open a new tab in the terminal and run `mongod`. Make sure it
gets started up. If it's your first time running mongodb, it may say that it
can't access the `/data/db` directory. You can create the folder with this
command:

```bash
mkdir -p /data/db
```

If you are using redis, open up a new tab and run `redis-server`.

Next, run `npm start`. And you're golden! Your app will have started on the port
your environment is set up on.

If you want your app to restart automatically when you make changes, run
`npm run watch`.

# Configuration

Configuration files live in `config/`. Environment configuration files are
prefixed with `env.`. All of the config files are automatically loaded into the
config object. You can get the config object by using this line in any js file
that runs on the server:

```javascript
var config = require('configly').config;
```

Then you can get configuration variables by using the `.get()` method.

```javascript
config.get('user.saltWorkFactor');
```

The above command will get the object exported in `config/user.js` and get the
`saltWorkFactor` property.

## Configuration environments

You may have different deploy environments that require different ports or
database connections. To make another configuration environment, copy an
existing one, and modify the values you need to.

The default environment when you start the app is `development`. To get the
values from the current environment, use:

```javascript
config.get('env.envVariable');
```

Then, if you want to switch environments, start the app using
`NODE_ENV=production` and it will load `config/env.production.js` instead of the
development one.

# Build processes

This app uses [`gulp`](http://gulpjs.com/). Grunt was an option (and still is if
you want to make the move over), but gulp was much faster with all of the steps
that needed to happen.

## Bower

[bower](http://bower.io/) is used as a front-end dependency manager. Get to know
it before you begin work on the front end. Just note that any dependency you
install and save to the `bower.json` that has `.js` and `.css` files will be
automatically included in your files.

## Static files

All of the files that get processed into the public directory live in the `src/`
directory. JavaScript files live in `src/scripts`, Less files live in
`src/styles`, Static files live in `src/static`, and Jade files live in
`src/views`.

### JavaScript

There are no preprocessors for JavaScript files. However, this setup assumes
an AngularJS workflow is used. Within the scripts directory, there is an `app`
directory and a `modules` directory. Any Angular module used specific to the
interaction with the front end of the app should probably go into `app/`. Things
like the view controllers and such. Any Angular module that can be reused
between other apps should probably go into `modules/`, things like api services
and reusable directives.

All of the JavaScript files get concatenated and minified into 1 file and gets
output into `public/js/app-x.x.x.min.js` (the 'x's are the version number of
the app in `package.json`). This includes all of the bower packages that include
JavaScript files. Don't worry, all of the files should be in the order that they
need to be in, as long as their dependencies are set up correctly. Your custom
files in `src/scripts` may not be in the exact order you need them, but the best
way to handle that is with Angular's dependency injection system.

```javascript
angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'myApp.Controllers'
]);

angular.module('myApp.Controllers', []);

// new file
angular.module('myApp.Controllers')
.controller('HomeController', function ($scope) {

});
```

NO GLOBAL VARIABLES. Ever. You could even wrap everything in a SEAF if you
wanted to. That way you prevent global variables from happening altogether.

For Angular stuff, you don't need to use the minification error prevention stuff
in your files. For example:

Normally, for minification purposes, you would do something like this:

```javascript
angular.module('myApp.Controllers')
.controller('HomeController', ['$scope', function ($scope) {

}]);
```

in order to have the `$scope` service be injected property into your controller.
In the build process, we are using `ngAnnotate`, which does this for you. So
just write it as if you weren't going to minify it, and it will put in the
extra syntax for you.

### Less

Pretty straightforward, everything gets concatenated and minified. The only
folder that doesn't do this is the `inc/` folder. This is used to put shared
stuff like variables and mixins in. You will need to 'include' them in every
less file you need them in. This is to prevent issues with the order in which
styles will be placed.

Also, you don't need to do vender prefixes for CSS3 styles. These will be put
in automatically for you using `autoprefixer`. You can put in additional config
options to support older versions in the gulpfile.

### Jade

This project uses [`jade`](http://jade-lang.com/reference/) as it's HTML
preprocessor. This can of course be modified to fit your needs.

Everything in the `src/views` folder gets compiled into HTML and copied straight
over to to `public`. So `src/views/index.jade` gets compiled into HTML and sent
to `public/index.html`. Simple enough, right?

It's mainly being used to pass in the path to the js and css files that get
compiled. The version can change, so we've automated that.

### Static

These are static files (such as images) that just get copied over as is to the
public directory. Do what you wish here. You can even put in straight HTML files
into here.

# Examples

Some boilerplate examples of some Express and Angular stuff can be found in the
[EXAMPLES.md](EXAMPLES.md)
