from django.db import models

class Courses(models.Model):
    course_name = models.CharField(max_length=100, unique=True, null=True, blank=True, default=None)
    course_description = models.TextField(null=True, blank=True, default=None)
    course_link = models.URLField(null=True, blank=True, default=None)
    course_preview_image = models.ImageField(null=True, blank=True, default=None)
    course_teacher = models.ForeignKey('self', null=True, blank=True, default=None , on_delete=models.CASCADE)
    course_videos=models.FileField(null=True, blank=True, default=None)
    course_lessons = models.FileField(null=True, blank=True, default=None)