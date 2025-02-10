from django.db import models


class Courses(models.Model):
    objects = None
    heading = models.CharField(max_length=100)
    heading2 = models.CharField(max_length=100)
    imgSrc = models.ImageField(upload_to="images")
    name = models.CharField(max_length=100)
    students = models.IntegerField(default=0)
    classes = models.IntegerField(default=0)
    price = models.IntegerField(default=0)
    rating = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
