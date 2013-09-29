# BYU ACM Website
This currently handles the membership portion of the [BYU ACM website](http://acm.byu.edu).

## Getting started

### Linux
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

### Linux
To put changes therem
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
To open a connection to the MySQL database, use `make tunnel`.
Or to generate a MySQL dump, use `make backup`.
Tunneling has been know to be buggy.

## Notes

### Data Persistance
IMPORTANT: Do not make changes that would cause Django's syncdb to erase data in the database.
TODO: Use South to make migrations possible.
To make a backup, run `make BACKUP=some_file.sql backup`. The default backup location is `backup.sql`.

### Static Files
The Django server is used to serve all files, including static ones (not best practice, but easiest).
The `make static` command collects all files from the locations in `STATIC_DIRS` into `STATIC_ROOT`, defined in acm/settings.py.

### Security
Because this repository is public, private info such as `EMAIL_HOST_PASSWORD` and `SECRET_KEY` are redefined in `settings_private.py`, which has not been added to this repository.

### Administration
The admin website (URL admin/) is necessary to add semesters, meetings, etc.
A superuser is created with acm/startup.py (imported by `acm/urls.py`). The username is admin, and the password is the same as `EMAIL_HOST_PASSWORD`.
