# Generated by Django 4.2 on 2024-02-05 15:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('templates', '0004_alter_element_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='Template',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('html', models.TextField()),
            ],
        ),
    ]
