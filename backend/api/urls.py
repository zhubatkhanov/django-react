from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('animaltype', views.AnimalTypesViewSet, basename='animaltype')
router.register('breed', views.BreedsViewSet, basename='breed')
router.register('animal', views.AnimalsViewSet, basename='animal')
router.register('weighting', views.WeightingViewSet, basename='weighting')
urlpatterns = router.urls

