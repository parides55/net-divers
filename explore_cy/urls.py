from django.urls import path

from . import views

urlpatterns = [
    path("explore_cy", views.explore_cy, name="explore_cy"),
]