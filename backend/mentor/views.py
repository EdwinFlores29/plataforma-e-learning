from rest_framework import viewsets, permissions
from .models import Mentor
from .serializers import MentorSerializer


class MentorViewSet(viewsets.ModelViewSet):
    queryset = Mentor.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = MentorSerializer
