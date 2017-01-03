
Before working with a tool please ensure that you *thoroughly* understand how
the tool works, its purpose, and how to configure it.

This is a brain-dump of every tool being used on the website with links to
tutorials and short blurb of how/why the tool is being used.

### [Python](https://www.python.org/)
Programming language used for the internal website and misc. scripting.

### [NPM](https://www.npmjs.com/)

### [Bower](https://bower.io/)

### [Django](https://www.djangoproject.com/)

### [Fabric](http://www.fabfile.org/)
[Fabric](http://www.fabfile.org/) is what we are currently using to automate
tasks, such as deployment. Thanks to [Fabric](http://www.fabfile.org/),
deploying is as easy as `fab deploy`. No SSHing, no manually navigating around
the server. All [Fabric](http://www.fabfile.org/) tasks are written as
[Python](https://www.python.org/) functions in `fabfile.py`. The task is called
by using the `fab` CLI followed by the name of the function. Other tasks that
can be automated with [Fabric](http://www.fabfile.org/) include running tests,
linting, and removing dummy (generated) files.

### [MySQL](https://www.mysql.com/)
A powerful, tried and trusted SQL database. In terms of basic functionality,
it's not too different from [SQLite](https://sqlite.org/) or any SQL database
such as [PostgreSQL](https://www.postgresql.org/). We run [MySQL](https://www.mysql.com/)
on the same machine as the web server so all transactions are local.

### [SQLite](https://sqlite.org/)
A very simple database used for local testing. Provides a lot of the same basic
functionality of [MySQL](https://www.mysql.com/) at a fraction of the power.
[SQLite](https://sqlite.org/) databases are literally a single file on your
computer, so if for any reason you wish to clear your database or whatnot,
simply delete the file.

### [Nginx](https://www.nginx.com/)
[Nginx](https://www.nginx.com/) is the proxy that sits in front of both the
public and private portions of the website. All requests on port 80 will be
interpreted by Nginx, and directed either to the public or private sites based
on the URL.

- [Nginx Beginner's Guide](http://nginx.org/en/docs/beginners_guide.html)
- [Nginx Getting Started](https://www.nginx.com/resources/wiki/start/)
- [How to Configure Nginx](https://www.linode.com/docs/websites/nginx/how-to-configure-nginx)
- [Nginx Tutorial](http://tutorials.jenkov.com/nginx/index.html)

### [Supervisord](http://supervisord.org/index.html)
When running an application in production, it's possible for the application to
crash (It's true! Your code could have a bug!). In this case, it's ideal to
have the application restart immediately to serve other requests. This is the
purpose of [Supervisord](http://supervisord.org/index.html), to monitor the
application's process and ensure that if it dies for any reason, that it'll
restart. Other alternatives include [forever](https://github.com/foreverjs/forever),
[monit](https://mmonit.com/monit/), [pm2](http://pm2.keymetrics.io/), and more.

- [Monitoring Processes with Supervisord](https://serversforhackers.com/monitoring-processes-with-supervisord)
- [Monitor and Control Applications Using Supervisor](https://code.tutsplus.com/tutorials/monitor-and-control-applications-using-supervisor-part-1--cms-23770)
- [How to Control Your Daemon with Supervisor](https://medium.com/@thangman22/how-to-control-your-deamon-with-supervisord-on-centos-4ec4658205bf#.fwevvupm8)
- [Beginner's Guide to Supervisord Process Monitoring](http://codesamplez.com/management/supervisord-process-monitoring)
- [Example Supervisord Configuration](https://gist.github.com/didip/802561)

### Linux
The server that hosts the website runs Linux. CentOS to be specific.

### SSH
Protocol used to access the server. SSHing via passwords is disabled for
security reasons. To obtain SSH access, generate an SSH key for your machine
and provide it to someone who does have access.
