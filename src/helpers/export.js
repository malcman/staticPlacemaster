import { createSelector } from 'reselect';

function sortByGroup(a, b) {
  if (a.group_id < b.group_id) {
    return -1;
  }
  if (a.group_id > b.group_id) {
    return 1;
  }
  return 0;
}

function createCSVData(members, unplaced) {
  // Return list of objects with member properties
  // for CSVLink component
  const unplacedData = unplaced.map(
    (flagged) => {
      const {
        t_mon: tMon,
        t_tue: tTue,
        t_wed: tWed,
        t_thu: tThu,
        ...exportData
      } = flagged;
      return ({ group_id: 'NONE', ...exportData });
    },
  );

  // go through all members
  const memberData = members.map((member) => {
    const {
      t_mon: tMon,
      t_tue: tTue,
      t_wed: tWed,
      t_thu: tThu,
      ...exportData
    } = member;
    return exportData;
  // reduce memberData and unplaced data to a single list
  }).sort(sortByGroup);
  return unplacedData.concat(memberData);
}

const membersSelector = (state) => state.Placement.members;
const unplacedSelector = (state) => state.Placement.flaggedMembers;

// selector used to cache CSV Data
export const getCSVData = createSelector(
  [membersSelector, unplacedSelector],
  (members, unplaced) => createCSVData(members, unplaced),
);

// headers for the CSV file that will be downloaded
export const csvMemberHeaders = [
  { label: 'Group', key: 'group_id' },
  { label: 'First', key: 'first' },
  { label: 'Last', key: 'last' },
  { label: 'Email', key: 'email' },
  { label: 'Gender', key: 'gender' },
  { label: 'Grad Standing', key: 'grad_standing' },
];
