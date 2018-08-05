# todolist [![NPM version](https://badge.fury.io/js/todolist.svg)](https://npmjs.org/package/todolist) [![Build Status](https://travis-ci.org/tangobango5/todolist.svg?branch=master)](https://travis-ci.org/tangobango5/todolist)

> React assignment

## Requirement
* node >=7.0.0
* npm  >=3.10.8

## Installation

```sh
$ npm install
```

## Usage
```sh
$ npm start
```
* Starts api server.
* And shows port on which api started.

## Api Description
* /api/v1/item
  * POST
    * args:
      * name: string, minimum 5 characters, requried
      * estimatedEndOn : RFC3339 datetime, proposed time at which this item will be closed, required
    * response: 
      * newely inserted item
  * GET
    * response:
      *list of items

* /api/v1/item/:id
  * PATCH
    * args:
      * status: string, oneof(['added', 'started', 'ended', 'rejected'])
    * response:
      * edited item
  * GET
    * response:
      * particular item



## License

ISC © [Ritesh](https://github.com/tangobango5/)
