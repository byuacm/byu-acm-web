# BYU ACM Website
This currently handles the membership portion of the [BYU ACM website](http://acm.byu.edu).

## Compatibility

The included Makefile assumes Linux, and the instructions below assume a Debian distro.

However, Django, SQLite, and AppFog are cross-platform, so the project can be run on Windows or Mac OS, though the instructions will differ slightly.

## Getting started

To install Python and necessary Python packages,
<pre>
$ sudo apt-get install python
$ sudo apt-get install python-pip
$ sudo pip install -r app/requirements.txt
</pre>

To start the Django server,
<pre>
$ make PORT=8001 run
</pre>
If `PORT` is ommitted, the default is 8000.
Then point your web browser to `localhost:port`.

## Hosting

This website is currently hosted by [AppFog](http://appfog.com) at [byuacm.aws.af.cm](http://byuacm.aws.af.cm).

### Setup

To make changes to the hosted site
<pre>
$ sudo apt-get install ruby rubygems
$ sudo gem install --no-ri --no-rdoc af
$ make deploy
</pre>
You will be prompted for a password if you are not logged in.

For tunneling (used to access the MySQL database), first run
<pre>
$ sudo apt-get install mysql-client
$ sudo gem install --no-ri --no-rdoc caldecott
</pre>
If you wish to use `make local-import` (see [Persistence](#data-persistence)), edit `/var/lib/gems/1.8/gems/af-0.3.18.12/config/clients.yml` (or the equivalent). Change the mysql line to
<pre>
  mysqldump: --protocol=TCP --host=${host} --port=${port} --user=${user} --password=${password} --compatible=ansi --skip-extended-insert --compact ${name} | tee ${Output file}; (exit $PIPESTATUS)
</pre>

### Data Persistence
IMPORTANT: Do not make changes that would cause Django's syncdb to erase data in the database.
(TODO: Use South to make migrations possible.)

To open a connection to the MySQL database, use `make sql-tunnel`.
To make a backup on AppFog's servers, run `make backup`.
If you would like to import the mysql data to the local sqlite database for testing, run `make local-import`.
Tunneling has been known to be buggy.

## Notes

### Static Files
The Django server is used to serve all files, including static ones (not best practice, but easiest).
The `make static` command collects all files from the locations in `STATIC_DIRS` into `STATIC_ROOT`, defined in acm/settings.py.

FYI, static files are gzipped only when `DEBUG` is `False`. (Use `python app/manage.py run --nostatic` to gzip while debugging.)

### Security
Because this repository is public, private info such as `EMAIL_HOST_PASSWORD` and `SECRET_KEY` are redefined in `settings_private.py`, which has not been added to this repository.

### Administration
The admin website (URL admin/) is necessary to add semesters, meetings, etc.
A superuser is created with acm/startup.py (imported by `acm/urls.py`). The username is admin, and the password is the same as `EMAIL_HOST_PASSWORD`.
