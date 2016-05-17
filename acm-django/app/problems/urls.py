from django.conf.urls import patterns, url

from views import problem, problems

urlpatterns = patterns(
    'problems.views',
    url(r'^(\w+)/$', problem),
    url(r'^$', problems),
)
