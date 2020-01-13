"""Generate example member placement json file."""
import json
import random
import string

# groups = [{
#     group_id: unique group id (int),
#     time: the meeting time, e.g. "Monday 4:30-5:30",
#     campus: "Central Campus"/"North Campus"/"Central Campus,North Campus",
#     grad_standing: "Undergraduate"/"Graduate",
# }]
# placed = [{
#     first: str,
#     last: str,
#     email: str,
#     gender: "F"/"M"/"O",
#     campus: "Central Campus"/"North Campus"/"Central Campus,North Campus",
#     grad_standing: "Undergraduate"/"Graduate",
#     t_mon: "6-7 pm,7-8 pm, 8-9pm",
#     t_tue: "6-7 pm,7-8 pm, 8-9pm",
#     t_wed: "6-7 pm,7-8 pm, 8-9pm",
#     t_thu: "6-7 pm,7-8 pm, 8-9pm",
#     group_id: unique group id (int),
# }]
# unplaced are the same but no group_id

GROUP_TIMES = [
    'Monday 4:00-5:00',
    'Monday 4:00-5:00',
    'Monday 5:00-6:00',
    'Monday 5:00-6:00',
    'Monday 7:00-8:00',
    'Monday 7:00-8:00',
    'Monday 8:00-9:00',
    'Tuesday 4:00-5:00',
    'Tuesday 5:00-6:00',
    'Tuesday 6:00-7:00',
    'Tuesday 6:00-7:00',
    'Tuesday 6:00-7:00',
    'Tuesday 7:00-8:00',
    'Tuesday 7:00-8:00',
    'Tuesday 8:00-9:00',
    'Wednesday 4:00-5:00',
    'Wednesday 5:00-6:00',
    'Wednesday 5:00-6:00',
    'Wednesday 6:00-7:00',
    'Wednesday 6:00-7:00',
    'Wednesday 6:00-7:00',
    'Wednesday 7:00-8:00',
    'Wednesday 7:00-8:00',
    'Wednesday 8:00-9:00',
    'Thursday 4:00-5:00',
    'Thursday 4:00-5:00',
    'Thursday 5:00-6:00',
    'Thursday 5:00-6:00',
    'Thursday 6:00-7:00',
    'Thursday 6:00-7:00',
    'Thursday 7:00-8:00',
]

# define possibilities for each field
GENDER_OPTIONS = ['M', 'F', 'O']
CAMPUS_OPTIONS = ['Central Campus', 'North Campus']
GRAD_OPTIONS = ['Undergraduate', 'Graduate']

GROUP_OPTIONS = []
for x in range(0, len(GROUP_TIMES)):
    GROUP_OPTIONS.append(x + 1)

NAME_LEN = 8
NUM_MEMBERS = 20
NUM_FLAGGED = 0


def generate_placed_members(json_data):
    """Generate regular members."""
    for _ in range(0, NUM_MEMBERS):
        first_name = ''.join(
            random.choices(string.ascii_uppercase + string.digits, k=NAME_LEN)
        )

        last_name = ''.join(
            random.choices(string.ascii_uppercase + string.digits, k=NAME_LEN)
        )
        member_data = {
            'first': first_name,
            'last': last_name,
            'email': f'{last_name[0:4]}@umich.edu',
            'gender': random.choice(GENDER_OPTIONS),
            'campus': random.choice(CAMPUS_OPTIONS),
            'grad_standing': random.choice(GRAD_OPTIONS),
            't_mon': "6-7 pm,7-8 pm, 8-9pm",
            't_tue': "6-7 pm,7-8 pm, 8-9pm",
            't_wed': "6-7 pm,7-8 pm, 8-9pm",
            't_thu': "6-7 pm,7-8 pm, 8-9pm",
            'group_id': random.choice(GROUP_OPTIONS),
        }
        json_data['results']['placed'].append(member_data)


def generate_unplaced_members(json_data):
    """Generate flagged members (no group)."""
    for _ in range(0, NUM_FLAGGED):
        first_name = ''.join(
            random.choices(string.ascii_uppercase + string.digits, k=NAME_LEN)
        )

        last_name = ''.join(
            random.choices(string.ascii_uppercase + string.digits, k=NAME_LEN)
        )
        member_data = {
            'first': first_name,
            'last': last_name,
            'email': f'{last_name[0:4]}@umich.edu',
            'gender': random.choice(GENDER_OPTIONS),
            'campus': random.choice(CAMPUS_OPTIONS),
            'grad_standing': random.choice(GRAD_OPTIONS),
            't_mon': "6-7 pm,7-8 pm, 8-9pm",
            't_tue': "6-7 pm,7-8 pm, 8-9pm",
            't_wed': "6-7 pm,7-8 pm, 8-9pm",
            't_thu': "6-7 pm,7-8 pm, 8-9pm",
        }
        json_data['results']['unplaced'].append(member_data)


def generate_groups(json_data):
    """Generate group data."""
    for i in range(0, len(GROUP_TIMES)):
        group_data = {
            'group_id': i + 1,
            'time': GROUP_TIMES[i],
            'campus': random.choice(CAMPUS_OPTIONS),
            'grad_standing': random.choice(GRAD_OPTIONS),
        }

        json_data['results']['groups'].append(group_data)


# define export object
JSON_DATA = {'results': {'placed': [], 'unplaced': [], 'groups': []}}
generate_placed_members(JSON_DATA)
generate_unplaced_members(JSON_DATA)
generate_groups(JSON_DATA)

# write file
with open('content/placement_no_flagged.json', 'w') as out_f:
    out_f.write(json.dumps(JSON_DATA, indent=2))
