from django import forms

class ProblemForm(forms.Form):
    
    def __init__(self, fields, *args, **kwargs):
        super(ProblemForm, self).__init__(*args, **kwargs)
        for field, value in fields.items():
            self.fields[field] = forms.CharField()
            self.fields[field].initial = value
            self.fields['usernames'] = forms.CharField()