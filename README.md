## Node todo app
This app was created with the [wakanda-node](https://github.com/midrissi/wakanda-node) connector.

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Running Locally

Make sure you have [Node.js](http://nodejs.org/), [node-foreman](http://strongloop.github.io/node-foreman/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone https://github.com/midrissi/todo-node.git
$ cd todo-node
$ npm i
$ nf start web=1
```

The application uses [todo-wakanda](https://github.com/midrissi/todo-wakanda.git) as a backing service to edit the database. So you can run the wakanda solution locally (dont't forget to edit the `.env` file before running the `nf` command) or feel free to use the [online demo](js-test.us.wak-apps.com).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```

## LICENCE

The MIT License (MIT)

Copyright (c) 2015 IDRISSI Mohamed

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.