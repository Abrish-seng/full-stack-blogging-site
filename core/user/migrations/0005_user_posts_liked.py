# Generated by Django 4.0.1 on 2022-03-02 05:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core_post", "0002_alter_post_edited"),
        ("core_user", "0004_alter_user_created_alter_user_updated"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="posts_liked",
            field=models.ManyToManyField(related_name="liked_by", to="core_post.Post"),
        ),
    ]