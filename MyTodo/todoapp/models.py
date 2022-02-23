from django.db import models
from userapp.models import User


class Project(models.Model):
    name = models.CharField(max_length=32, unique=True)
    user = models.ForeignKey(User, verbose_name="пользователь", on_delete=models.CASCADE, related_name='projects')

    def __str__(self):
        return self.name


class Todo(models.Model):
    text = models.CharField(max_length=100)
    completed = models.BooleanField(default=False, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    def __str__(self):
        return self.text
