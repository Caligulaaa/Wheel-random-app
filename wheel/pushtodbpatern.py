
import sqlite3
import psycopg2
import os

def sqlitee3_simple_dtbs(cur, nameid,name ):

    data = [nameid, name]
    try:
        data = [nameid, name]
        cur.execute('INSERT INTO backend_combackbox VALUES(NULL,?,?)', data)
        con.commit()
    except sqlite3.IntegrityError as sadas:
        print(str(sadas))
        
        
# con = sqlite3.connect("..")
# cur = con.cursor()

connection = psycopg2.connect(
    database=os.environ.get('DTBNAME'),
    user=os.environ.get("DTBUSER"),
    password=os.environ.get('DTBPASSWORD'),
    host=os.environ.get('DTBPORT'),
    port="5432",
    )
cursor = connection.cursor()
def postgresql_simple_toDTB(name,chance):
    data_tuple = (name, chance)
    cursor.execute('''INSERT INTO backend_combackbox 
                (cases,chanse) VALUES(%s, %s)''', data_tuple)


    connection.commit()



data = [
['Идеальный приз х15',80.813],['Отличный приз',1.8],['Бронзовая монета',9],['Золотая монета',0.35],['Платиновый идол',1.25],['Платиновый амулет',1.25],
['Знак победы',2],['Украшение знак луны',0.08],['Оружие знак луны',0.08],['Крылья бога удачи',0.2],
['Крылья пегаса',0.09],['Знак командира',0.12],['Печать куба',0.12],['Книга судьбы',0,1],['Камень Нюйвы',0.2],
['Камень Сюань Юань',0.2],['Камень джунглей',0.15],['Шкатулка таинственного света',0.2],
['Загадочная шкатулка',0.25],['Божественный свиток',0.015],['Алмазная броня',0.1],
['Каменная броня',0.1],['Полный контроль ситуации',0.05],['Длань управляющая тучами',0.05],['Уникальное крыло',0.01],
['Орден славы',0.01],['Красный глаз',0.2],['Камень безбрежности',0.25],['Камень морской лазури',0.25],
['Орден с гравировкой',0.7],['Меч летнего ветра', 0.1],['Загадочная лампа',0.012]]



for newKey in data:
    # sqlitee3_simple_dtbs(cur, newKey[0],newKey[1])
    postgresql_simple_toDTB(newKey[0],newKey[1])

connection.close()