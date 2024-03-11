from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import viewsets, status
from rest_framework.response import Response



class AnimalTypesViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = AnimalTypes.objects.all()
        serializer = AnimalTypesSerializator(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = AnimalTypesSerializator(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        project = AnimalTypes.objects.get(pk=pk)
        serializer = AnimalTypesSerializator(project)
        return Response(serializer.data)

    def update(self, request, pk=None):
        project = AnimalTypes.objects.get(pk=pk)
        serializer = AnimalTypesSerializator(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        project = AnimalTypes.objects.get(pk=pk)
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    

class BreedsViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Breeds.objects.all()
        serializer = BreedsSerializator(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = BreedsSerializator(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        project = Breeds.objects.get(pk=pk)
        serializer = BreedsSerializator(project)
        return Response(serializer.data)

    def update(self, request, pk=None):
        project = Breeds.objects.get(pk=pk)
        serializer = BreedsSerializator(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        project = Breeds.objects.get(pk=pk)
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class AnimalsViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Animals.objects.all()
        serializer = AnimalsSerializator(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = AnimalsSerializator(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        project = Animals.objects.get(pk=pk)
        serializer = AnimalsSerializator(project)
        return Response(serializer.data)

    def update(self, request, pk=None):
        project = Animals.objects.get(pk=pk)
        serializer = AnimalsSerializator(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        project = Animals.objects.get(pk=pk)
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class WeightingViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Weighting.objects.all()
        serializer = WeightingSerializator(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = WeightingSerializator(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        project = Weighting.objects.get(pk=pk)
        serializer = WeightingSerializator(project)
        return Response(serializer.data)

    def update(self, request, pk=None):
        project = Weighting.objects.get(pk=pk)
        serializer = WeightingSerializator(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        project = Weighting.objects.get(pk=pk)
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)