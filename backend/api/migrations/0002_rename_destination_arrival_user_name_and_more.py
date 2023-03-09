# Generated by Django 4.0.1 on 2023-03-08 22:35

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='arrival',
            old_name='destination',
            new_name='user_name',
        ),
        migrations.AddField(
            model_name='arrival',
            name='arrival_time',
            field=models.TimeField(default=datetime.datetime(2023, 3, 8, 22, 35, 40, 302023, tzinfo=utc)),
            preserve_default=False,
        ),
    ]