from rest_framework import serializers
from .models import *

class AnimalTypesSerializator(serializers.ModelSerializer):
    class Meta:
        model = AnimalTypes
        fields = ['id', 'name']
        

class BreedsSerializator(serializers.ModelSerializer):
    type_name = serializers.ReadOnlyField()
    class Meta:
        model = Breeds
        fields = ['id', 'name', 'animal_type', 'type_name']
        

class AnimalsSerializator(serializers.ModelSerializer):
    breed_name = serializers.ReadOnlyField()
    parent_name = serializers.ReadOnlyField()
    class Meta:
        model = Animals
        fields = ['id', 'sex', 'name', 'arrival_date', 'age_on_arrival', 'breed', 'parent', 'breed_name', 'parent_name']
        
class WeightingSerializator(serializers.ModelSerializer):
    animal_name = serializers.ReadOnlyField()
    class Meta:
        model = Weighting
        fields = ['id', 'animal', 'weight_date', 'weight_kg', 'animal_name']