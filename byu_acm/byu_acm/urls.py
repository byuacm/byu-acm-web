"""byu_acm URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.contrib.staticfiles.views import serve
from django.contrib.staticfiles.templatetags.staticfiles import static

import home.views
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('byu_auth.urls', namespace='auth')),
    path('home/', include('home.urls', namespace='home')),
    path('membership/', include('membership.urls', namespace='membership')),
    path('staff/', include('staff.urls', namespace='staff')),

    path('', home.views.homepage),
    path('favicon.ico', serve, kwargs={'path': static('img/favicon.ico')}),
]
