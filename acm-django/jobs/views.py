from rest_framework import viewsets

from .serializers import JobListingSerializer
from .models import JobListing


class JobListingViewSet(viewsets.ModelViewSet):
    '''
    A viewset for viewing and editing job instances
    '''
    serializer_class = JobListingSerializer
    queryset = JobListing.objects.all()
