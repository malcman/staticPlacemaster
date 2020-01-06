import React from 'react';

import GroupManager from './GroupManager';
import Group from './Group';
import MemberManager from './MemberManager';
import Member from './Member';

const classNames = require('classnames');

class Placement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [
        <Group
          key={1}
          number={1}
          day="Mon"
          time="6:00 - 7:00"
          campus="North"
          room="BBB 1670"
          level="Grad"
        />,
        <Group
          key={2}
          number={2}
          day="Tues"
          time="7:00 - 8:00"
          campus="Central"
          room="NQ 1500"
          level="UG"
        />,
      ],
      members: [
        <Member
          name="Jimmy"
          email="jim@umich.edu"
          campus="central"
          gender="male"
          year="senior"
          groupNumber={1}
          key={1}
        />,
        <Member
          name="Jane"
          email="janejane@umich.edu"
          campus="north"
          gender="female"
          year="freshman"
          groupNumber={2}
          key={2}
        />,
      ],
      groupFocus: true,
    };
    this.fetchPlacement = this.fetchPlacement.bind(this);
    this.toggleFocusEl = this.toggleFocusEl.bind(this);
    this.sortMembers = this.sortMembers.bind(this);
    this.sortGroups = this.sortGroups.bind(this);
  }

  toggleFocusEl(groupFocus) {
    // set groupFocus as indicated by target with the attached handler
    this.setState({
      groupFocus,
    });
  }

  sortMembers(sortFunc) {
    this.setState((prevState) => ({
      members: prevState.members.sort(sortFunc),
    }));
  }

  sortGroups(sortFunc) {
    this.setState((prevState) => ({
      groups: prevState.groups.sort(sortFunc),
    }));
  }

  fetchPlacement(fetchURL) {
    fetch(fetchURL, { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        const groups = [];
        const members = [];
        data.members.forEach((member) => {
          console.log(member);
        });
        this.setState({
          groups,
          members,
        });
      })
      .catch();
  }

  render() {
    return (
      <section className="Placement">
        <h1 className="placementName">{this.props.title}</h1>
        <ul
          id="placementTabs"
          role="tablist"
        >
          {/* group tab */}
          <li
            id="GroupTag"
            role="tab"
            aria-selected={this.state.groupFocus}
            aria-controls="GroupManager"
            onClick={(e) => this.toggleFocusEl(true, e)}
          >
            <h3>Groups</h3>
          </li>

          {/* member tab */}
          <li
            id="MemberTag"
            role="tab"
            aria-selected={!this.state.groupFocus}
            aria-controls="MemberManager"
            onClick={(e) => this.toggleFocusEl(false, e)}
          >
            <h3>Members</h3>
          </li>
        </ul>
        <GroupManager
          role="tabpanel"
          focused={this.state.groupFocus}
          groups={this.state.groups}
          sortHandler={this.sortGroups}
        />
        <MemberManager
          role="tabpanel"
          focused={!this.state.groupFocus}
          members={this.state.members}
          sortHandler={this.sortMembers}
        />
      </section>
    );
  }
}

export default Placement;
