"""Generate example member placement json file."""
import json
import random
import string

# define export object
JSON_DATA = {'results': {'placed': [], 'flagged': []}}

# define possibilities for each field
GENDER_OPTIONS = ['male', 'female', 'non-binary']
CAMPUS_OPTIONS = ['central', 'north']
YEAR_OPTIONS = ['freshman', 'sophomore', 'junior', 'senior', 'grad']

NUM_GROUPS = 31
GROUP_OPTIONS = []
for x in range(1, NUM_GROUPS):
    GROUP_OPTIONS.append(x)

NAME_LEN = 8
NUM_MEMBERS = 500
NUM_FLAGGED = 5

# generate regular members
for i in range(0, NUM_MEMBERS):
    name = ''.join(random.choices(string.ascii_uppercase +
                                  string.digits, k=NAME_LEN))
    member_data = {
        'name': name,
        'email': f'{name[0:4]}@umich.edu',
        'campus': random.choice(CAMPUS_OPTIONS),
        'year': random.choice(YEAR_OPTIONS),
        'group': random.choice(GROUP_OPTIONS),
        'gender': random.choice(GENDER_OPTIONS)
    }
    JSON_DATA['results']['placed'].append(member_data)

# generate flagged members (no group)
for i in range(0, NUM_FLAGGED):
    name = ''.join(random.choices(string.ascii_uppercase +
                                  string.digits, k=NAME_LEN))
    member_data = {
        'name': name,
        'email': f'{name[0:4]}@umich.edu',
        'campus': random.choice(CAMPUS_OPTIONS),
        'year': random.choice(YEAR_OPTIONS),
        'gender': random.choice(GENDER_OPTIONS)
    }
    JSON_DATA['results']['flagged'].append(member_data)

# write file
with open('content/placement_generated.json', 'w') as out_f:
    out_f.write(json.dumps(JSON_DATA, indent=2))
