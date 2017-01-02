from django.conf.urls import url
from util.views import redirect_view

from .views import enroll, new_member, edit_member, signin, enrollment

urlpatterns = [
    url(r'^$', redirect_view('membership.views.enrollment')),
    url(r'^enroll/$', enroll),
    url(r'^new_user/$', new_member),
    url(r'^edit_user/$', edit_member),
    url(r'^new_user/?show_error=(?P<show_error>\w+)$', new_member),
    url(r'^signin/$', signin),
    url(r'^signin/(?P<meeting_pk>\d+)$', signin),
    url(r'^enrollment/$', enrollment),
]
