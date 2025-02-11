from rest_framework import routers
from .views import MentorViewSet

router = routers.DefaultRouter()
router.register(r'api/mentor', MentorViewSet, 'mentor')
urlpatterns = router.urls