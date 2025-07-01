from django.shortcuts import render


def index(request):
    """
    Render the home page of the NET DIVERS application.
    """
    return render(request, 'home_page/index.html')