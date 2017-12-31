from django.urls import path, re_path

from . import views

app_name = 'acm_home'
urlpatterns = [
    path('', views.homepage, name='index'),
    re_path('^(?P<page>\w+)/$', views.homepage, name='page'),
]
