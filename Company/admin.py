from django.contrib import admin

from .models import *

# Register your models here.

admin.site.register(Category)
admin.site.register(CompanyProfile)
admin.site.register(CompanyLocation)
admin.site.register(CompanyCategory)

admin.site.register(JobLocation)
admin.site.register(JobLevel)
admin.site.register(Job)
admin.site.register(JobApplicants)
admin.site.register(StudentApplication)