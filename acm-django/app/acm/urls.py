from django.conf import settings
from django.conf.urls import include, patterns, url
from django.contrib import admin
from django.contrib.auth.views import login, password_reset_complete, password_reset_confirm, password_change, password_reset
from django.core.urlresolvers import reverse_lazy
from util.views import redirect_view

from membership.views import logout

admin.autodiscover()

urlpatterns = patterns('',
    # Static - there is a better way to do this, but it requires access to webserver
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {
        'document_root': settings.STATIC_ROOT,
    }),

    # Login accounts
    url(r'^$',redirect_view('membership.views.enrollment')),
    url(r'^accounts/login/', login),
    url(r'^accounts/logout/', logout),
    url(r'^accounts/password_change/', password_change, {
        'post_change_redirect': 'django.contrib.auth.views.login',
    }),
    url(r'^accounts/password_reset_confirm/(?P<uidb36>\w+)-(?P<token>\w+-\w+)/$', password_reset_confirm),
    url(r'^accounts/password_reset/', password_reset, {
        'post_reset_redirect': reverse_lazy('membership.views.edit_member'),
    }),
    url(r'^accounts/password_reset_complete/', password_reset_complete),

    # Membership
    url(r'^membership/', include('membership.urls')),

    # Dashboard
    url(r'^dashboard/', include('dashboard.urls')),

    # Dashboard
    url(r'^problems/', include('problems.urls')),

    # Admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Admin
    url(r'^admin/', include(admin.site.urls)),
)

# Startup code
from startup import *
