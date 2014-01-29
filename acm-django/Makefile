SHELL := /bin/bash

MAKEFLAGS = -j4

APP := app

DJANGO_MANAGE := python $(APP)/manage.py

PORT ?= 8000

APPFOG := af
APPFOG_USER := acm@byu.edu
APPFOG_APP := byuacm
APPFOG_SERVICE := byuacm-mysql

BACKUP ?= backup.sql

SQLITE_DB := $(APP)/acm/data.db

static:
	echo yes | $(DJANGO_MANAGE) collectstatic

db:
	echo no | $(DJANGO_MANAGE) syncdb

login:
	@if [ -z `af user | grep \[$(APPFOG_USER)\]` ];  \
		then $(APPFOG) login $(APPFOG_USER);         \
	fi

logout:
	$(APPFOG) logout

run: static db
	$(DJANGO_MANAGE) runserver $(PORT)

deploy: login static
	cd $(APP); $(APPFOG) update $(APPFOG_APP)

sql-tunnel: login
	$(APPFOG) tunnel $(APPFOG_SERVICE) mysql

backup: login
	$(APPFOG) export-service $(APPFOG_SERVICE)

local-backup: $(BACKUP)

local-import: $(BACKUP)
	$(RM) $(SQLITE_DB)
	$(SHELL) util/mysql2sqlite.sh < $< | sqlite3 $(SQLITE_DB)

$(BACKUP): login
	echo $(BACKUP) | $(APPFOG) tunnel $(APPFOG_SERVICE) mysqldump
