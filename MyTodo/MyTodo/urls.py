from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views

from todoapp.views import TodoViewSet, ProjectViewSet
from userapp.views import UserViewSet, LogoutAndBlacklistRefreshTokenForUserView

router = DefaultRouter()
router.register('users', UserViewSet)
router.register('todos', TodoViewSet)
router.register('projects', ProjectViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/user/', include('userapp.urls', namespace='userapp')),
    path('api/token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='blacklist')
]