from django.conf.urls import url

from .views import problem, problems

urlpatterns = [
    url(r'^(\w+)/$', problem),
    url(r'^$', problems),
]
