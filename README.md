<img src="https://i.ibb.co/xCzcwH3/racoon-text.png" alt="Racoon Logo" />

## Description

Racoon CLI is a command-line interface tool that initializes and helps you create components for [ExpressJS](https://expressjs.com/es/) applications. You can generate JavaScript and TypeScript projects and automatically generate controllers, services and middlewares, maintaining consistency and structure.

## Installation

```bash
$ npm install -g racoon-cli
```

## Usage

1. Create new ExpressJS project:
```bash
$ racoon new PROJECT_NAME [--path=APP_CONTEXT] [--lang=LANGUAGE]
```
* Replace `PROJECT_NAME` with _the name of your project_.
* Replace `APP_CONTEXT` with _base path of your project_ (default='').
* Replace `LANGUAGE` with _the language of your project_. (default='javascript').


2. Generate new component:
```bash
$ racoon generate COMPONENT NAME [--path=ROUTE]
```
* Replace `COMPONENT` with _controller, service or middleware_.
* Replace `NAME` with _the name of your component.
* Replace `ROUTE` with _the route of your controller_ (default is your component name). Controller only.