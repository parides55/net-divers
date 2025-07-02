from django.shortcuts import render


def home(request):
    """
    Render the home page of the NET DIVERS application.
    """
    return render(request, 'home_page/index.html')


def secondary(request):
    """
    Render the secondary page of the NET DIVERS application.
    """
    return render(request, 'home_page/secondary.html')