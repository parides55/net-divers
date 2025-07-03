from django.shortcuts import render

# Create your views here.
def courses_services(request):
    """
    Render the courses and services page of the NET DIVERS application.
    """
    return render(request, 'courses_services/courses_services.html')