from django.conf.urls import patterns, url

urlpatterns = patterns(
    'problems.views',
    url(r'^(\w+)/$', 'problem'),
    url(r'^$', 'problems'),
)
