# BYU ACM Frontend

The frontend uses the React library.  You won't need to know much advanced React to work on the project, but going through a fast tutorial may help you understand what is going on.

## Getting Started

You'll need to install Node.js on your system.  I've only tested this on Node.js 8 and above, so if you're using something below that, your mileage may vary.  For Linux, the packages from NodeSource are good [https://github.com/nodesource/distributions].  I can't speak for Windows or Mac, since I don't own either of those.  If you want to use one of those, you can probably figure out a working solution; I just won't be able to give much guidance.

We also use `yarn` for managing packages.  It is very similar to NPM, but gives stronger guarantees about which versions of packages you'll end up with.  For our purposes, it just means things are less likely to break.

To install yarn, do `npm install -g yarn` (or rather `sudo npm install -g yarn` if you're using the NodeSource packages).

To pull down all of the dependencies, just do `yarn install`.  This will install a bunch of Node packages, many of which we no longer need.  Most likely we could actually get rid of a fair amount of these packages, but I haven't had time to get around to that yet.

To start the static development server, do `npm start`.  This will start a magical machine called `webpack` which will compile the React and SCSS code into something that the browser can understand.

## React

Each web page has its own file in the components directory.  Since there is currently no dynamic content, this is purely organizational.

You'll also see there is a file called `index.js` in the main frontend directory.  Each route that you can go to is defined in this file.  A simple way to think about this is that we are just telling the browser, "When you see `/` location display the `Home` component. When you see `/about` location display the `About` component."

Styles for each page should be placed in the same directory as the JavaScript file.  As an example of this, the `Sidebar.js` has an accompanying `Sidebar.scss` with all the styles.  SCSS is what is known as a CSS preprocessing language (or some such thing, Google is your friend).  It is easier to deal with than regular CSS.  Also the current rendering makes liberal use of the CSS3 flexbox.

## Production

( These notes will apply in the future )

To build the frontend for the production ACM website, ssh into the ACM server, navigate down into the frontend, and do `./webpack -p`.  You'll want to pull first of course.
