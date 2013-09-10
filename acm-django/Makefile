MAKEFLAGS = -j4

APP := app

DJANGO_MANAGE := python $(APP)/manage.py

PORT ?= 8000

APPFOG := af
APPFOG_USER := acm@byu.edu
APPFOG_SERVICE := byuacm-mysql-62643

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
	$(APPFOG) update byuacm

tunnel: login
	$(APPFOG) tunnel $(APPFOG_SERVICE) mysql

backup: login
	echo backup.sql | $(APPFOG) tunnel $(APPFOG_SERVICE) mysqldump
