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

We get our certificates for HTTPS from [LetsEncrypt](https://letsencrypt.org/).  These are free, but have to be renewed every 3 months.  Right now, that is done manually with `./certbot-auto`, but we're working on a way to automate the script. 







===== OLD README ======
# BYU ACM Website - membership

This takes care of registration and membership, and uses the Python Django framework.

## Compatibility

The included Makefile assumes Linux, and the instructions below assume a Debian distro.

However, Django and SQLite are cross-platform, so the project can be run on Windows or Mac OS, though the instructions will differ slightly.

## Getting started

To install Python and necessary Python packages,
<pre>
$ sudo apt-get install python python-pip
$ sudo pip install -r acm-django/app/requirements.txt
</pre>

To start the Django server,
<pre>
$ make PORT=8001 dev-run
</pre>
If `PORT` is ommitted, the default is 8000.
Then point your web browser to `localhost:port`.

### Security
Because this repository is public, private info such as `EMAIL_HOST_PASSWORD` and `SECRET_KEY` are redefined in `settings_private.py`, which has not been added to this repository.

To get this, from the root of the project run
<pre>
$ scp acm@schizo.cs.byu.edu:django-site/settings_private.py app/acm/settings_private.py
</pre>

## Administration
The ajango admin website (at `/admin`) is used to add semesters, meetings, etc.
On startup, a superuser will be created with username "admin", and password `settings.EMAIL_HOST_PASSWORD`. Log in to `/admin` with these credentials. You make make other users superusers from here.

## Data Persistence
IMPORTANT: Do not make changes that would cause Django's syncdb to erase data in the database.
(TODO: Use South to make migrations possible.)

