from rest_framework.serializers import ModelSerializer
from .models import Project, Todo


class TodoSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
