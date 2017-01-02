__author__ = 'Derek Argueta'

'''
  Routing for the `jobs` Django app
'''

from rest_framework import routers

from .views import JobListingViewSet


router = routers.SimpleRouter()
router.register(r'listings', JobListingViewSet)

urlpatterns = router.urls
