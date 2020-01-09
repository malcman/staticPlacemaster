"""Generate json of room data based on csv."""
import json

json_data = {'rooms': []}
with open('../../data/roomsData2019.csv') as f:
    for line in f.readlines():
        day_time, campus, level, group_num = line.split(',')
        day, time = day_time.split(' ')
        new_room = {
            'number': int(group_num.strip()),
            'day': day,
            'time': time,
            'campus': campus,
            'level': level,
        }
        json_data['rooms'].append(new_room)

with open('content/roomData.json', 'w') as out_f:
    out_f.write(json.dumps(json_data, indent=2))
