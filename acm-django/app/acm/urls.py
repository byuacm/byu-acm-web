from django.conf import settings
from django.conf.urls import include, patterns, url
from django.contrib import admin
from django.core.urlresolvers import reverse_lazy
from util.views import redirect_view

admin.autodiscover()

urlpatterns = patterns('',
    # Static - there is a better way to do this, but it requires access to webserver
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {
        'document_root': settings.STATIC_ROOT,
    }),

    # Login accounts
    url(r'^$',redirect_view('membership.views.enrollment')),
    url(r'^accounts/login/', 'django.contrib.auth.views.login'),
    url(r'^accounts/logout/', 'membership.views.logout'),
    url(r'^accounts/password_change/', 'django.contrib.auth.views.password_change', {
        'post_change_redirect': 'django.contrib.auth.views.login',
    }),
    url(r'^accounts/password_reset_confirm/(?P<uidb36>\w+)-(?P<token>\w+-\w+)/$', 'django.contrib.auth.views.password_reset_confirm'),
    url(r'^accounts/password_reset/', 'django.contrib.auth.views.password_reset', {
        'post_reset_redirect': reverse_lazy('membership.views.edit_member'),
    }),
    url(r'^accounts/password_reset_complete/', 'django.contrib.auth.views.password_reset_complete'),

    # Membership
    url(r'^membership/', include('membership.urls')),

    # Dashboard
    url(r'^dashboard/', include('dashboard.urls')),
    url(r'^problems/', include('problems.urls')),

    # Admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Admin
    url(r'^admin/', include(admin.site.urls)),

    # API (yaaaaaayyy)
    url(r'^api/membership/', include('membership.urls')),
)

# Startup code
from startup import *
