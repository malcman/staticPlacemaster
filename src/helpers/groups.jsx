// helper functions related to groups

export function getNumericTimeVal(timeStr) {
  // returns a number representing the time of the week
  // to allow for more accurate sorting
  // Day Value: 4th digit
  // Time value: remaining digits of start time

  // "Monday 6:30-7:30" => 1630
  // "Thursday 5:00-6:00" => 4500
  const dayValues = {
    Monday: 1000,
    Tuesday: 2000,
    Wednesday: 3000,
    Thursday: 4000,
    Friday: 5000,
    Saturday: 6000,
    Sunday: 7000,
  };
  let numericTimeVal = 0;
  // gets day and first time period
  const regex = /^(?<day>\w+)? ?(?<time>\d:\d+)/g;
  const matches = regex.exec(timeStr);
  if (matches && matches.groups) {
    if (matches.groups.day) {
      numericTimeVal += dayValues[matches.groups.day];
    }
    let hourStr = matches.groups.time;
    hourStr = hourStr.replace(':', '');
    numericTimeVal += Number(hourStr);
  }
  return numericTimeVal;
}

export function groupIsValid(groupObj, memberData) {
  // checks if group represented by groupObj is a valid group
  // for this memberData. Checks times in props against groupObj's time.

  // specify mappings for days to availability prop for that specific day
  const dayMappings = {
    Monday: 't_mon',
    Tuesday: 't_tue',
    Wednesday: 't_wed',
    Thursday: 't_thu',
  };
  // get the day for this group
  // format: "Monday 6:00-7:00"
  const [groupDay, groupTimeStr] = groupObj.time.split(' ');

  // get the prop key associated with this day's time availability
  const timeKey = dayMappings[groupDay];

  // get numeric time values for the group's time
  const [groupStartStr, groupEndStr] = groupTimeStr.trim().split('-');
  const groupStart = getNumericTimeVal(groupStartStr.trim());
  const groupEnd = getNumericTimeVal(groupEndStr.trim());

  if (!memberData[timeKey] || memberData[timeKey] === 'null') {
    return false;
  }
  const availableTimes = memberData[timeKey].split(',');
  let validGroup = false;
  availableTimes.forEach((timeStr) => {
    // skip work if a match has already been found
    if (validGroup) return;

    // get start and end times from props
    const digitRegex = /(?<start>\d{1})-(?<end>\d{1})/g;
    // set bounds with times in availability
    let lowerBound = Infinity;
    let upperBound = 0;
    const matches = digitRegex.exec(timeStr.trim());
    if (matches && matches.groups) {
      // format start and end digits into times,
      // get numeric value for comparisons
      lowerBound = getNumericTimeVal(`${matches.groups.start}:00`);
      upperBound = getNumericTimeVal(`${matches.groups.end}:00`);
    }
    // if available within the group's bounds, set true
    if (lowerBound >= groupStart && upperBound <= groupEnd) {
      validGroup = true;
    }
  });
  return validGroup;
}
