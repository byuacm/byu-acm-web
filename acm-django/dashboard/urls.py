from django.conf.urls.defaults import *

urlpatterns = patterns('dashboard.views',
	url(r'^$', 'make_member_list'),
    url(r'^raffle/$', 'raffle'),
    url(r'^raffle/(?P<meeting_pk>\d+)/$', 'raffle'),
    url(r'^shirt_sizes/$', 'shirt_sizes'),
    url(r'^shirt_sizes/(?P<semester_pk>\d+)/$', 'shirt_sizes'),
    url(r'^member_list/$', 'make_member_list'),
    url(r'^member_list/(?P<semester_pk>\d+)/$', 'member_list'),
    url(r'^points/$', 'points'),
)
