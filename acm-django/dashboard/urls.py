from django.conf.urls.defaults import *

urlpatterns = patterns('dashboard.views',
	url(r'^$', 'dashboard'),
    url(r'^raffle/$', 'raffle'),
    url(r'^raffle/(?P<meeting_pk>\d+)/$', 'raffle'),
    url(r'^shirt_sizes/$', 'shirt_sizes'),
    url(r'^shirt_sizes/(?P<semester_pk>\d+)/$', 'shirt_sizes'),
)