from django.db import models

JOB_STATUS = (
    ('Full-Time', 'Full-Time'),
    ('Internship', 'Internship')
)


class JobListing(models.Model):

    title = models.CharField(max_length=50)
    link = models.URLField()
    location = models.CharField(max_length=50, blank=True)
    company = models.CharField(max_length=50)
    status = models.CharField(max_length=25, choices=JOB_STATUS)
    add_timestamp = models.DateTimeField(auto_now=True)
    updated_timestamp = models.DateTimeField(auto_now_add=True)

    def __unicode__(self) -> str:
        return '{0} - {1}'.format(self.title, self.company)
