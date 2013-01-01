# BYU ACM Website
This currently handles the membership portion of the website

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
This is currently hosted by AppFog(http://appfog.com) at byuacm.aws.af.cm(http://byuacm.aws.af.cm). To put changes there,
<pre>
$ sudo apt-get install rubygems
$ gem install af
$ af login
$ af update byuacm 
</pre>

## Static Files
The Django server is used to serve all files, including static ones (not best practice, but easiest).
The manage.py collectstatic command will have to be run every time a static file is changed.
Don't commit the acm/static directory, as it is simply the collection of static files from the locations defined by STATIC_DIRS in settings.py.