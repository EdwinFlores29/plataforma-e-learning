from django.db import models


class Mentor(models.Model):
    objects = None
    profession = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    imgSrc = models.ImageField(upload_to="images")
    created_at = models.DateTimeField(auto_now_add=True)
