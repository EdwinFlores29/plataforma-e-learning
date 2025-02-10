from rest_framework import viewsets, permissions
from .models import Courses
from .serializers import CoursesSerializer


class CoursesViewSet(viewsets.ModelViewSet):
    queryset = Courses.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CoursesSerializer
