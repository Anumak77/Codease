# Generated by Django 4.2 on 2024-02-22 19:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('templates', '0015_merge_0012_alter_template_id_0014_alter_customuser_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='template',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
