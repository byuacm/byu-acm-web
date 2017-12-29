# BYU ACM Website

This is the website of the illustrious BYU ACM, at [acm.byu.edu](https://acm.byu.edu).

It is made of two parts:
* public pages, in [public/](public)
* registration and membership stuff, in [acm-django/](acm-django) (additional documenation here)

## Deploy

To deploy, log in to acm@acm.byu.edu, pull the repo and run `make deploy`.

Or you can deploy only certain parts:
* for public content, run `make deploy-public`
* for the membership stuff, run `make deploy-django`

## TLS Certificate

We get our certificates for HTTPS from [LetsEncrypt](https://letsencrypt.org/).  These are free and are renewed automatically.  If you have questions about this process, talk to @krrg

## Running Locally

If you want to only run the public pages, go into the public folder and use the command "python3 -m http.server --bind localhost 8080" to run it locally. 
