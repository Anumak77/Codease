# Generated by Django 4.1.5 on 2024-02-21 21:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('templates', '0010_template_owner_alter_template_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='template',
            name='owner',
        ),
        migrations.AlterField(
            model_name='template',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
