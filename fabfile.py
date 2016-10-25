### easy commands####
from secrets import password
from fabric.api import local,env,run,cd
env.password=password
env.user= 'acm'
env.hosts= [
	'acm.byu.edu'
	]
def host_type():
	run('uname -s')


def commit():
	local("git add -p && git commit")

def push():
	local("git push")

def prepare_deploy():
	commit()
	push()


def deploy():
	with cd('byu-acm-web'):
		run('git pull derek master')
		run('sudo make deploy-public')
	
