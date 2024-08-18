from django import forms
from .models import ComboRegistration #add mod

class uploadFileForm(forms.Form):
    file = forms.FileField()


