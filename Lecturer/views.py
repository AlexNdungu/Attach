from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth.models import Group


# Create your views here.

def Inherite(request):
    return render(request, 'Inherite/lecturer.html')

#Add lecturer
def lecturer(request):
    return render(request,'Lecturer/Dashboard/addLec.html')    

def createHead(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        email = request.POST.get('email')
        pass1 = request.POST.get('pass1')
        pass2 = request.POST.get('pass2')

        if(User.objects.filter(username=email).exists()):

            return JsonResponse({'Message':'Exist'})

        else:    
            if(pass1 == pass2):

                head = User.objects.create_user(username=email,email=email,password=pass1)   

                institute = InstituteProfile.objects.get(institute = request.user)

                #Now we add the institute to the School Group
                hleac = Group.objects.get(name='HLecturer')   
                lec = Group.objects.get(name='Lecturer') 

                hleac.user_set.add(head)
                lec.user_set.add(head)


                #Now we create an account 
                createdHead = HeadLecturer.objects.create(
                    lecturer = head,
                    institute = institute,
                    lec_name = head.email
                )        

                createdHead.profile_url = createdHead.profile_image.url
                createdHead.act_url = createdHead.act.url    
                createdHead.save() 
     

                NewHead = {
                    'id':createdHead.lecturer.username,
                    'name':createdHead.lec_name,
                    'profile':createdHead.profile_image.url
                }

            return JsonResponse({'status':'created','NewHead':NewHead}) 


#Now we delete the head
def deleteHead(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        headId = request.POST.get('id')

        #Get the Head with this id
        theHead = User.objects.get(username = headId)

        theHead.delete()

    return JsonResponse({'Message':'Delete'})    