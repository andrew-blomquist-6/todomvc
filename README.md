# TodoMVC Sandbox

This repository is meant to be a personal sandbox for testing different technologies.
Originally a fork of http://todomvc.com/, this repository assumes you'll be using Angular2+ as a foundation for testing other technologies.
The master branch can be considered the baseline - it is a working demo of TodoMVC using Angular 8.

Each branch in this repository is meant to contain a working (or in progress) demo of a technology.
Whenever possible, each branch will also try to stay current with changes to the master branch.
A branch may have additional information in their README, so please check below for branch-specific information.

## Project Setup

This section is under construction -- I need to learn more.

Please make sure you have yarn and the angular-cli installed.

## Development

Run `ng serve` to build and serve platform-ui web. 
Navigate to `http://localhost:4200/` to view the website.
The app will automatically reload if you change any of the source files.

## Testing

Once you have your local environment running, you can execute `yarn run e2e:open` to open up Cypress for e2e testing.

## Branch-specific Documentation

Execute `npm start` to run the graphQL server. 
You can go to `http://localhost:8080/graphql` to see a nice little interface for testing queries and mutations.
