from django.urls import path

from . import views

urlpatterns = [
    path("explore_cy", views.explore_cy, name="explore_cy"),
    path("diving_sites", views.diving_sites, name="diving_sites"),
]