from rest_framework import routers
from .views import CoursesViewSet

router = routers.DefaultRouter()
router.register(r'api/courses', CoursesViewSet, 'courses')
urlpatterns = router.urls