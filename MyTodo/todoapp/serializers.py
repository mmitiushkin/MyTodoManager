from rest_framework.serializers import ModelSerializer
from .models import Project, Todo


class TodoSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'


class TodoCreateSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'


class ProjectSerializer(ModelSerializer):

    todos = TodoSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'
