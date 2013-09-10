from django.conf.urls.defaults import *

urlpatterns = patterns('problems.views',
	url(r'^(\w+)/$', 'problem'),
	url(r'^$', 'problems'),
)
