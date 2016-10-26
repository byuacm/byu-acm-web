# BYU ACM Website

This is the website of the illustrious BYU ACM, at [acm.byu.edu](http://acm.byu.edu).

It is made of two parts:
* public pages, in [public/](public)
* registration and membership stuff, in [acm-django/](acm-django) (additional documenation here)

## Deploy

To deploy, log in to acm@acm.byu.edu, pull the repo and run `make deploy`.

Or you can deploy only certain parts:
* for public content, run `make deploy-public`
* for the membership stuff, run `make deploy-django`
