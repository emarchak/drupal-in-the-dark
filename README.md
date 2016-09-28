# Agent 008

## Decoupled Drupal 8 using PouchDB and React

@jlongbottom / [@emarchak](http://twitter.com/emarchak) / [@myplanetHQ](http://twitter.com/myplanetHQ)

## Why Decoupled Drupal 8?

*   [The future of decoupled Drupal](http://buytaert.net/the-future-of-decoupled-drupal) (Sep 24, 2015)
*   [How should you decouple Drupal?](http://buytaert.net/how-should-you-decouple-drupal) (Mar 22, 2016)
*   [Offline-capable, decoupled Drupal 8 with React.js and React Native](https://events.drupal.org/neworleans2016/sessions/offline-capable-decoupled-drupal-8-reactjs-and-react-native) (May 11, 2016)
*   [The Risks and Rewards of Fully Decoupling Drupal](https://dev.acquia.com/blog/the-risks-and-rewards-of-fully-decoupling-drupal/16/06/2016/15686) (Jun 16, 2016)


## What we are going to cover?

1.  Business Cases & Technical Goals
2.  Technical Toolkit
3.  The Build Process

## Goals

### Business

*   Technicians that maintain remote solar panel installations
*   Newspage Managers that edit content while commuting
*   Students with confined data limits


### Technical

*   Offline capable
*   View all the content, all the time!
*   Drupal to JS, without middleware

## Tools

### Drupal 8

*   Composer for dependency management
*   "Fast by default"
*   Required modules do not exist for D7
    1.  [relaxed](http://dgo.to/relaxed)
    2.  [deploy](http://dgo.to/multiversion)
    3.  [multiversion](http://dgo.to/multiversion)

# Because it's 2016




### React

*   Designed for “building large applications with data that changes over time”
*   Composable Declarative Components
*   Proven to work well with Drupal 8




### pouchDB/couchDB

*   [Offline-first development](http://offlinefirst.org/) ≃ mobile-first development
*   All content is available, all the time. No cold caches!
*   Content conflicts are elegantly handled
*   Very user friendly, very browser friendly, very friendly. 😊




### pouchDB Setup

```
var localDB  = new PouchDB('pouchDBInstance');
var remoteDB = new PouchDB('http://couch/db/instance');

localDB.sync(remoteDB).on('complete', function () {
  // sync success :)
}).on('error', function (err) {
  // 'sync error :(
});

```







## The Build Process




### Build Drupal & Friends




### Configure Relaxed




### Create React App





## Afterthoughts

*   How secure is Relaxed?
*   Is Relaxed preferable over custom controllers?
*   How feasible is pouchDB in production?




## Looking Forward

*   Let the CMS do what it does best
*   Build native with CouchDB for [Android and iOS](https://pouchdb.com/faq.html#native_support)
*   Unleash your front-end devs!


<section data-state="title-slide">

# Thank you

[@myplanetHQ](http://twitter.com/myplanetHQ)
