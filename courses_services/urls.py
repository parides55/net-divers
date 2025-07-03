from django.urls import path

from . import views

urlpatterns = [
    path("courses_services", views.courses_services, name="courses_services"),
]