from django import forms


class SubmissionForm(forms.Form):

    subreddit = forms.CharField(
        max_length=255,
        required=True,
    )

    timeParam = forms.ChoiceField(
        choices=[
            ('day', 'Day'),
            ('week', 'Week'),
            ('month', 'Month'),
            ('year', 'Year'),
            ('all', 'All')],
        required=True,
    )


class getUserPosts(forms.Form):

    nUser = forms.CharField(max_length=255, required=True)
