from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'home.html')

def outside(request):
    return render(request, 'outside.html')

def AnniversaryBuilding(request):
    return render(request, 'AnniversaryBuilding.html')

def HumanSocialBuilding(request):
    return render(request, 'HumanSocialBuilding.html')

def Noori(request):
    return render(request, 'Noori.html')


