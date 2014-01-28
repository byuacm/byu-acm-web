from django.conf.urls import patterns, url

urlpatterns = patterns('dashboard.views',
    url(r'^$', 'make_member_list'),
    url(r'^raffle/$', 'raffle'),
    url(r'^raffle/(?P<meeting_pk>\d+)/$', 'raffle'),
    url(r'^attendance/$', 'attendance'),
    url(r'^attendance/(?P<meeting_pk>\d+)/$', 'attendance'),
    url(r'^shirt_sizes/$', 'shirt_sizes'),
    url(r'^shirt_sizes/(?P<semester_pk>\d+)/$', 'shirt_sizes'),
    url(r'^member_list/$', 'make_member_list'),
    url(r'^member_list/(?P<semester_pk>\d+)/$', 'member_list'),
    url(r'^points/(?P<meeting_pk>\d+/)?$', 'points'),
)
