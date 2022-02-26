from django.http import Http404
from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions, status

from todoapp.models import Todo, Project
from todoapp.serializers import TodoSerializer, ProjectSerializer, TodoCreateSerializer, ProjectCreateSerializer


class TodoViewSet(ModelViewSet):

    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


class TodoCreateView(APIView):


    def post(self, request):
        serializer = TodoCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(status=201)


class TodoDeleteView(APIView):


    def get_object(self, pk):
        try:
            return Todo.objects.get(pk=pk)
        except Todo.DoesNotExist:
            raise Http404

    def delete(self, request, pk):
        todo = self.get_object(pk)
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProjectViewSet(ModelViewSet):

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ProjectCreateView(APIView):


    def post(self, request):
        serializer = ProjectCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(status=201)
