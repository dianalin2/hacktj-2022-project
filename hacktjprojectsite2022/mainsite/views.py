from django.shortcuts import render

# Create your views here.
def index(request):
    # render index
    return render(request, 'index.html')

def test(request):
    # render test
    return render(request, 'test.html')
