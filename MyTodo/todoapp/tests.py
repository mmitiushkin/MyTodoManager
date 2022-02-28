
import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate
from .views import ProjectViewSet, TodoViewSet
from userapp.models import User


class TestProjectViewSet(TestCase):

    def setUp(self):
        self.user1 = User.objects.create(username='user1', email='user1@gmail.com', password='qwerty')

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        force_authenticate(request, user=self.user1)
        view = ProjectViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list_unauthorized(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestTodosViewSet(TestCase):

    def setUp(self):
        self.user1 = User.objects.create(username='user1', email='user1@gmail.com', password='qwerty')

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/todos/')
        force_authenticate(request, user=self.user1)
        view = TodoViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list_unauthorized(self):
        factory = APIRequestFactory()
        request = factory.get('/api/todos/')
        view = TodoViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

