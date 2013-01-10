from django.conf.urls.defaults import *

urlpatterns = patterns('membership.views',
	url(r'^enroll/$', 'enroll'),
    url(r'^new_user/$', 'new_member'),
    url(r'^edit_user/$', 'edit_member'),
    url(r'^new_user/?show_error=(?P<show_error>\w+)$', 'new_member'),
    url(r'^signin/$', 'signin'),
    url(r'^signin/(?P<meeting>\d+)$', 'signin'),
    url(r'^enrollment/$', 'enrollment'),
    url(r'^make_raffle/$', 'make_raffle'),
    url(r'^raffle/(?P<meeting_pk>\d+)$', 'raffle'),
)