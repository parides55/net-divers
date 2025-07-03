from django.shortcuts import render

# Create your views here.
def explore_cy(request):
    """
    Render the explore page of the NET DIVERS application.
    """
    return render(request, 'explore_cy/explore_cy.html')