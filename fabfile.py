
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
        local('python3 -m http.server')




def _update(do_update: bool):
    ''' Helper function that updates the Git repo depending on the boolean
        `do_update`.
    '''
    if do_update:
        with cd('byu-acm-web'):
            run('git pull origin master')





################################################################################
# 👀 👀 👀 👀 👀 👀 👀 👀 👀 D E P L O Y 👀 👀 👀 👀 👀 👀 👀 👀 👀 👀 👀 👀
################################################################################

# `fab deploy_nginx`
def deploy_nginx(update=True):
    ''' Updates Nginx configuration and restarts '''

    _update(update)
    configuration_file = 'byu-acm-web/deploy/nginx/byu-acm.conf'
    sudo('cp ' + configuration_file + ' /etc/nginx/conf.d/byu-acm.conf')
    sudo('nginx -s reload')


# `fab deploy_public`
def deploy_public(update=True):
    ''' Deploys the static public website '''

    _update(update)
    sudo('rsync -r --update --delete byu-acm-web/public/ /var/www/acm-public/')


# `fab deploy_django`
def deploy_django(update=True):
    ''' Deploys the Django app
        Deploy process:
        1) copy the files from the local reposity to the production area (var/www)
        2) copy over supervisor configuration
        3) copy over start script into /usr/local/bin
        4) restart supervisor
        5) create log folder
        6) restart the Django app via supervisor (which uses the start script)
    '''

    _update(update)
    sudo('rsync -r --update --delete --exclude=\'*.pyc\' acm-django/ /var/www/acm-django/')
    sudo('cp deploy/supervisor/acm-django.conf /etc/supervisor/conf.d/acm-django.conf')
    sudo('cp deploy/acm-django-start.sh /usr/local/bin/acm-django-start')
    sudo('supervisorctl reread')
    sudo('mkdir -p /var/log/acm-django')
    sudo('supervisorctl restart acm-django')

# `fab deploy`
# SSH's into the remote server, pulls the code and uses the Makefile to move it
# into the proper place
# TODO: remove dependency on Makefile
def deploy():
    if not REMOTE_AVAIL:
        print(TERM_RED + 'Cannot deploy - secrets unavailable' + TERM_NOCOL)
        return
    with cd('byu-acm-web'):
        # fetch the latest code
        
        run('git pull origin master')

        deploy_public(update=False)

        # (deploy django)
        

    deploy_nginx(update=False)
        

