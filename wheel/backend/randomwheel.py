import random
from .models import CombackBox

def get_randombox():
    data = CombackBox.objects.all().values()
    newdata = list()

    for ar in data:
        newdata += [ar['id'] for _ in range(int(ar['chanse'] * 1000))]
    random.shuffle(newdata)
    id = random.choice(newdata)
    return [id,CombackBox.objects.get(pk=id)]





