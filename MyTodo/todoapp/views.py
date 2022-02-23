from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions

from todoapp.models import Todo, Project
from todoapp.serializers import TodoSerializer, ProjectSerializer


def TodoList(request):
    todos = Todo.objects.all()
    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data)


class TodoViewSet(ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


def ProjectList(request):
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)


class ProjectViewSet(ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

