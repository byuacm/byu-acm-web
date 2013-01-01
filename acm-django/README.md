# BYU ACM Website
This currently handles the membership portion of the [BYU ACM website](http://acm.byu.edu).

## Getting started

### Linux
To install Django,
<pre>
$ sudo apt-get install python
$ sudo apt-get install python-django
</pre>
To start the Django server, from the project root,
<pre>
$ echo yes | python manage.py collectstatic
$ echo no | python manage.py syncdb
$ python manage.py runserver [port]
</pre>
Point web browser to localhost:port. By default, port is 8000.
This website is currently hosted by [AppFog](http://appfog.com) at [byuacm.aws.af.cm](http://byuacm.aws.af.cm). To put changes there,
<pre>
$ sudo apt-get install rubygems
$ gem install af
$ af login
$ af update byuacm 
</pre>
The af login requires authentication for the acm@byu.edu account.

## Notes

### Static Files
The Django server is used to serve all files, including static ones (not best practice, but easiest).
The manage.py collectstatic command collects all files from the locations in STATIC_DIRS into STATIC_ROOT, defined in acm/settings.py.

### Security
Because this repository is public, private info such as EMAIL_HOST_PASSWORD and SECRET_KEY are redefined in settings_private.py, which has not been added to this repository.

### Administration
The admin website (URL admin/) is necessary to add semesters, meetings, etc.
A superuser is created with acm/startup.py (imported by acm/urls.py). The username is admin, and the password is the same as EMAIL_HOST_PASSWORD.