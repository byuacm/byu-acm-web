## Django settings for acm project.

# Always use absolute directories
import os
import sys

ROOT = lambda base: os.path.join(os.path.dirname(__file__)+"/../", base)

# Debugging
DEBUG = True

# Receive errors from logging
ADMINS = (
    # It's Jared
    ('Jared Neil', 'jaredaneil@gmail.com'),

    # CTO
    ('Derek Argueta', 'darguetap@gmail.com'),

    # VP of Internal Affairs
    ('Jordan Nielson', 'jnielson94@gmail.com'),

    # tech team officers
    ('Cody Harrison', 'cody.d.h.harrison@gmail.com'),
    ('Naomi Johnson', 'snjohnson789@gmail.com')
)
MANAGERS = ADMINS

# Email
EMAIL_HOST      = 'smtp.gmail.com'
EMAIL_HOST_PASSWORD = 'password'  #redefind in settings_private
EMAIL_HOST_USER = 'cs.byu.acm@gmail.com'
EMAIL_PORT      = 587
EMAIL_USE_TLS   = True
DEFAULT_FROM_EMAIL  = 'acm@byu.edu'
SERVER_EMAIL    = 'acm@byu.edu'

MAILCHIMP_AUTO_SUBSCRIBE = True
MAILCHIMP_API_KEY = 'key' #redefined in settings_private
MAILCHIMP_LIST_ID = 3411312468

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# In a Windows environment this must be set to your system time zone.
TIME_ZONE = 'America/Denver'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en-us'

ALLOWED_HOSTS = [
    'acm.byu.edu',
    'localhost',
]

# Returns 304 based on content hashes
USE_ETAGS = True

# Do not use internationalization (optimizes)
USE_I18N = False

# Use local datetime formatting.
USE_L10N = True

# Use timezone-aware datetimes.
USE_TZ = True

# Absolute path to the directory static files should be collected to.
# Don't put anything in this directory yourself; store your static files
# in apps' "static/" subdirectories and in STATICFILES_DIRS.
STATIC_ROOT = ROOT('acm/static')

# URL prefix for static files.
STATIC_URL = '/static/'

# Additional locations of static files
STATICFILES_DIRS = (
    # Always use forward slashes, even on Windows.
    ROOT('static'),
#    ROOT('../../public'),
)

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)

# Security depends on this being secret
SECRET_KEY = 'secret'  # redefined in settings_private

PASSWORD_HASHERS = (
    'django.contrib.auth.hashers.PBKDF2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher',
    'django.contrib.auth.hashers.BCryptPasswordHasher',
    'django.contrib.auth.hashers.SHA1PasswordHasher',
    'django.contrib.auth.hashers.MD5PasswordHasher',
    'django.contrib.auth.hashers.CryptPasswordHasher',
)

MIDDLEWARE_CLASSES = (
    # 'django.middleware.gzip.GZipMiddleware', # currently, web server does this
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
)

ROOT_URLCONF = 'acm.urls'

# Python dotted path to the WSGI application used by Django's runserver.
WSGI_APPLICATION = 'acm.wsgi.application'

INSTALLED_APPS = (
    'suit', # third-party admin theme, must be before contrib.auth
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.forms',
    'django.contrib.admin',
    'django.contrib.admindocs',

    # Custom ACM apps
    'membership',
    'dashboard',
    'problems',
)

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            ROOT('site-templates/')
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
            'debug': True
        }
    }
]

APPEND_SLASH = True

# See http://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        },
        'console': {
            'level': 'ERROR',
            'class': 'logging.StreamHandler',
            'stream': sys.stderr
        },
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
        'django.request': {
            'handlers': ['console'],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': ROOT('acm/data.db'),     # Path to database file with sqlite3.
    }
}


SUIT_CONFIG = {
    'ADMIN_NAME': 'BYU ACM'
}

# Secure settings
try:
    from settings_private import *
except ImportError:
    print('Private settings not found')
