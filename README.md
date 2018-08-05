# Todolist [![NPM version](https://badge.fury.io/js/todolist.svg)](https://npmjs.org/package/todolist) [![Build Status](https://travis-ci.org/tangobango5/todolist.svg?branch=master)](https://travis-ci.org/tangobango5/todolist)

> React assignment

## Question Description
Create a Todo list using react / redux / react-router. Your app should have below mentioned functionality.
* Add a new item with name and estimated time at which this item will be completed.
* Start working on a particular item. This marks the time at which a particular items is started.
* Finish a particular item. This marks end time of that item. It can be greater or less than the estimated timestamp.

## Tasks:
1) User lands on the home page i.e. "/" <br />
	Show all items in a table format with below mentioned details:
	- Name
	- estimated timestamp
	- start time
	- end time
	- time taken  - (end timestamp - start timestamp)
	- deviation - (estimated timestamp - end timestamp) can be negative
	- start button
	- end button

	Finished items will appear at the bottom of the table with a different backgroud color.
	Keep updating the list in every 10 seconds.

2) At the bottom of the list there should be an "Add new" button. That takes the user to the /add-item route which shows "name","time" fields and a submit button. On successfull submission show a success message and take the user back to the list.

3) At the top right corner of the home page show overall deviation(sum of deviation of all finished items).

* Do rely on your intuition on the values of the fields, if its not present. <br />
	Eg: Show nothing(empty string) at the place of start button or disabled button if that particular item is already started. Do consider cases like these for all other fields.

## Backend Api
* Clone this repository, install it and start the server for backend apis of this todolist. By default server will look for an empty port starting from 3000. If server finds that port busy then it will look for 3001 and so on till it finds an unused port.
Suppose server starts at port 3001. Then your host is http://localhost:3001.
* This server stores the data in memory. So whenever you stop the server data gets lost.
* If you wish to change to a custom port then stop the server and start again by sending it the desired port as an environment variable like below.
```sh
$ PORT=8080 npm start
```

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
      * item[name]: string, minimum 5 characters, requried
      * item[estimatedEndOn] : RFC3339 datetime, proposed time at which this item will be closed, required
    * response: 
      * newely inserted item
  * GET
    * response:
      * list of items

* /api/v1/item/:id
  * PATCH
    * args:
      * item[status]: string, oneof(['added', 'started', 'ended', 'rejected'])
    * response:
      * edited item
  * GET
    * response:
      * particular item



## License

ISC © [Ritesh](https://github.com/tangobango5/)
