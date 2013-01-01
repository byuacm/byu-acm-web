from django.conf.urls import *
from django.conf.urls.defaults import *
from django.core.urlresolvers import reverse
import settings

# Enables admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Static
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),

    # Login accounts
    url(r'^$', 'membership.views.enrollment'),
    url(r'^accounts/login/', 'django.contrib.auth.views.login'),
    url(r'^accounts/logout/', 'membership.views.logout'),
    url(r'^accounts/password_change/', 'django.contrib.auth.views.password_change', {'post_change_redirect':'/'}),
    url(r'^accounts/password_reset_confirm/(?P<uidb36>[0-9A-Za-z]{1,13})-(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,25})/$', 'django.contrib.auth.views.password_reset_confirm'),
    url(r'^accounts/password_reset/', 'django.contrib.auth.views.password_reset', {'post_reset_redirect':'edit_member/'}),
    url(r'^accounts/password_reset_complete/', 'django.contrib.auth.views.password_reset_complete'),

    # Membership
    url(r'^membership/', include('membership.urls')),

    # Admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Admin
    url(r'^admin/', include(admin.site.urls)),
)

# Startup code
from startup import *
