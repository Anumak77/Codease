# Generated by Django 4.2 on 2024-02-04 18:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('templates', '0002_elements_remove_customuser_is_staff_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Elements',
            new_name='Element',
        ),
    ]
