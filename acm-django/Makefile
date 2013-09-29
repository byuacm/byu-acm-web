MAKEFLAGS = -j4

APP := app

DJANGO_MANAGE := python $(APP)/manage.py

PORT ?= 8000

APPFOG := af
APPFOG_USER := acm@byu.edu
APPFOG_APP := byuacm
APPFOG_SERVICE := byuacm-mysql

BACKUP ?= backup.sql

static:
	echo yes | $(DJANGO_MANAGE) collectstatic

db:
	echo no | $(DJANGO_MANAGE) syncdb

login:
	@if [ -z `af user | grep [$(APPFOG_USER)]` ];  \
		then $(APPFOG) login $(APPFOG_USER);       \
	fi

logout:
	$(APPFOG) logout

run: static db
	$(DJANGO_MANAGE) runserver $(PORT)

deploy: login static
	cd $(APP); $(APPFOG) update $(APPFOG_APP)

tunnel: login
	$(APPFOG) tunnel $(APPFOG_SERVICE) mysql

backup: $(BACKUP)

$(BACKUP): login
	echo $@ | $(APPFOG) tunnel $(APPFOG_SERVICE) mysqldump
