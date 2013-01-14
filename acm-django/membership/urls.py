from django.conf.urls.defaults import *

urlpatterns = patterns('membership.views',
	url(r'^$', 'enrollment'),
	url(r'^enroll/$', 'enroll'),
    url(r'^new_user/$', 'new_member'),
    url(r'^edit_user/$', 'edit_member'),
    url(r'^new_user/?show_error=(?P<show_error>\w+)$', 'new_member'),
    url(r'^signin/$', 'signin'),
    url(r'^signin/(?P<meeting_pk>\d+)$', 'signin'),
    url(r'^enrollment/$', 'enrollment'),
)