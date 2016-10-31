
# These are special unix values that allow the script to print in color
# To print red text, use print(TERM_RED + 'your text here' + TERM_NOCOL).
# All messages should end with TERM_NOCOL to return the following text to
# normal colors.
TERM_RED = '\033[91m'
TERM_NOCOL = '\033[0m'


# Conditonally import secrets. Some people may not have the secrets.py on
# their computer so this will warn them of that exactly.
try:
    from secrets import password
    REMOTE_AVAIL = True
except ImportError:
    print(TERM_RED + 'Secrets not available! Ask for the secrets')
    print('Cannot execute any remote commands for now' + TERM_NOCOL)
    password = 'password'
    REMOTE_AVAIL = False


from fabric.api import local, env, run, cd, lcd, sudo


# Settings for remote commands
env.password = password
env.user = 'acm'
env.hosts = [
    'acm.byu.edu'
]


# `fab run_public`
# Starts up the "public" portion of the site on 0.0.0.0:8000
def run_public():
    with lcd('public'):
        local('python -m SimpleHTTPServer')


def commit():
    local('git add -p && git commit')


def push():
    local('git push')


def prepare_deploy():
    commit()
    push()


# `fab deploy`
# SSH's into the remote server, pulls the code and uses the Makefile to move it
# into the proper place
# TODO: remove dependency on Makefile
def deploy():
    if not REMOTE_AVAIL:
        print(TERM_RED + 'Cannot deploy - secrets unavailable' + TERM_NOCOL)
        return
    with cd('byu-acm-web'):
        run('git pull derek master')
        sudo('make deploy-public')

