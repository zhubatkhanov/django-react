from django.db import models

class AnimalTypes(models.Model):
    name = models.CharField(unique=True, max_length=100)
    
    def __str__(self):
        return self.name
    
    

class Breeds(models.Model):
    name = models.CharField(max_length=100)
    animal_type = models.ForeignKey(AnimalTypes, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name
    
    @property
    def type_name(self):
        return self.animal_type.name
    

class Animals(models.Model):
    SEX_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    sex = models.CharField(max_length=1, choices=SEX_CHOICES)
    name = models.CharField(max_length=100)
    arrival_date = models.DateField()
    age_on_arrival = models.IntegerField()
    breed = models.ForeignKey(Breeds, on_delete=models.CASCADE)
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self):
        return self.name
    
    @property
    def breed_name(self):
        return self.breed.name
    
    @property
    def parent_name(self):
        return self.parent.name
    
    
class Weighting(models.Model):
    animal = models.ForeignKey(Animals, on_delete=models.CASCADE)
    weight_date = models.DateField()
    weight_kg = models.FloatField()
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['animal', 'weight_date'], name='unique_animal_weighting')
        ]
        
        
    def __str__(self) -> str:
        return f"{self.animal.name} | {self.weight_kg} kg"
    
    @property
    def animal_name(self):
        return self.animal.name
        
    