
# BYU ACM Website Setup

This assumes you have at least basic web development experience. For a more
extensive list of resources/tutorials and background on the tools being used,
please see resources.md.

Helpful courses for working on this website include CS 201R, CS 340, CS 360,
CS 460, and CS 465.

### Setting up your system
The ACM website runs on Python 3.5. Please make sure it is installed on your
system.

The development process also requires NPM (Node Package Manager). Please install
Node.js.

##### Recommended
It is recommended to set up a Python virtual environment. This prevents
libraries (and their versions) relating to this project not get mixed up with
other projects. Please set up a virtual environment for Python *3*.

- [Virtual Environments: Hitchhiker's Guide to Python](http://docs.python-guide.org/en/latest/dev/virtualenvs/)
- [Python Virtual Environments - a primer - RealPython](https://realpython.com/blog/python/python-virtual-environments-a-primer/)
- [venv - Python 3 Documentation](https://docs.python.org/3/library/venv.html)
- [VirtualEnv](https://virtualenv.pypa.io/en/stable/)
- [VirtualEnvironments in Python Made Easy - Sitepoint](https://www.sitepoint.com/virtual-environments-python-made-easy/)

*NOTE* When setting up the environment with [VirtualEnvWrapper](http://virtualenvwrapper.readthedocs.io/en/latest/#), make sure to set your interpreter
to Python 3 with

```bash
mkvirtualenv --python=$(which python3) {environment name}
```

({} are used to denote substitution)



### Github
Github is a large code-sharing and hosting website. To make changes to this
repo, you'll need a Github account. It is also recommended to [setup SSH keys]
(https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)

After setting up Github, you can pull the code down using

```bash
git clone git@github.com:byuacm/byu-acm-web.git
```

if you have your SSH keys set up, otherwise use

```bash
git clone https://github.com/byuacm/byu-acm-web.git
```


### Git
Git is a very large topic that will not be covered in this document as there
are already several great resources to learn Git. Git is one of the most
important tools in software development, used for code versioning, sharing,
and collaboration

- [Git Book](https://git-scm.com/book/en/v2)


### Running the Front-End
To run the front-end, enter the `public` folder and run a local HTTP server
like-so:

```bash
cd public
python3 -m http.server 8000
```

This will start a local HTTP server from this folder, serving `index.html`.
You can now go to `localhost:8000` in your browser and see the website.


### Running the Back-End

Firstly, install the necessary Python dependencies.

```bash
pip3 install -r requirements.txt
```

Then install [bower](https://bower.io/), the package manager for the website.

```bash
cd acm-django/app
bower install
```
Without this command, the website will still run but the JavaScript and CSS
will be fairly broken, as [bower](https://bower.io/) is used to download the
front-end libraries such as Bootstrap.

Now we need to run a [schema migration](https://docs.djangoproject.com/en/1.10/topics/migrations/).
This will populate the initial database with the basic tables it needs to do
things like authentication.

```bash
python3 manage.py migrate
```

And now we're ready to run the server.

```bash
python3 manage.py runserver
```
