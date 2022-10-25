from django.shortcuts import redirect


#If A User Is Logged In Or Not
def unauthenticated_user(view_func):
    def wrapper_func(request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('instDashboard')
        else:
            return view_func(request, *args, **kwargs)

    return wrapper_func   

#Company only
def institute_only(view_func):
    def wrapper_func(request, *args, **kwargs):
        group = None
        if request.user.groups.exists():
            group = request.user.groups.all()[0].name
        if group == 'Company':
            return redirect('Cprofile')
        if group == 'Lechead':
            return redirect('') 
        if group == 'Lecturer':
            return redirect('')             
        if group == 'Institute':
            return view_func(request, *args, **kwargs)
    return wrapper_func

