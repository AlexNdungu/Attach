from django.shortcuts import render

# Create your views here.

def Inherite(request):
    return render(request, 'Inherite/lecturer.html')

#Add lecturer
def lecturer(request):
    return render(request,'Lecturer/Dashboard/addLec.html')    