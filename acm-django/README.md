# BYU ACM Website
This currently handles the membership portion of the [BYU ACM website](http://acm.byu.edu).

## Getting started

### Linux
To install Python and necessary Python packages,
<pre>
$ sudo apt-get install python
$ sudo apt-get install python-pip
$ sudo pip install -r requirements.txt
</pre>

To start the Django server,
<pre>
$ echo yes | python manage.py collectstatic
$ echo no | python manage.py syncdb
$ python manage.py runserver [port]
</pre>
Point web browser to `localhost:port`. By default, port is 8000.

## Hosting

This website is currently hosted by [AppFog](http://appfog.com) at [byuacm.aws.af.cm](http://byuacm.aws.af.cm).
IMPORTANT: Do not make changes that would cause Django's syncdb to erase data in the database.

### Linux
To put changes there,
<pre>
$ python manage.py collectstatic
$ sudo apt-get install ruby1.9.3
$ sudo apt-get install rubygems
$ sudo gem install af
$ af login acm@byu.edu
$ af update byuacm
</pre>
The af login requires password authentication.

For tunneling (used to access the MySQL database),
<pre>
$ sudo apt-get install mysql-client-5.5
$ sudo gem install event-machine
$ sudo gem install caldecott
$ af login
$ af tunnel
</pre>
Tunneling has been know to be buggy.
Use `mysqldump` to make backups.

## Notes

### Static Files
The Django server is used to serve all files, including static ones (not best practice, but easiest).
The `manage.py collectstatic` command collects all files from the locations in `STATIC_DIRS` into `STATIC_ROOT`, defined in acm/settings.py.

### Security
Because this repository is public, private info such as `EMAIL_HOST_PASSWORD` and `SECRET_KEY` are redefined in `settings_private.py`, which has not been added to this repository.

### Administration
The admin website (URL admin/) is necessary to add semesters, meetings, etc.
A superuser is created with acm/startup.py (imported by `acm/urls.py`). The username is admin, and the password is the same as `EMAIL_HOST_PASSWORD`.
