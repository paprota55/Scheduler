import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  ViewSwitcher,
  Toolbar,
  TodayButton,
  DateNavigator,
  Resources,
  AllDayPanel,
  Appointments,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";

import { appointments } from "../scheduler/appointments";
import { types } from "../scheduler/Types";
import { status } from "../scheduler/Status";

export default class CalendarHistory extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      resources: [
        {
          fieldName: "typeId",
          title: "Rodzaj wydarzenia",
          instances: types,
          allowMultiple: false,
        },
        {
          fieldName: "statusId",
          title: "Status",
          instances: status,
          allowMultiple: false,
        },
      ],
      currentDate: new Date(),
    };

    this.currentDateChange = (currentDate) => {
      this.setState({ currentDate });
    };
  }

  render() {
    const {
      currentDate,
      data,
      resources,
    } = this.state;

    return (
      <Paper style={{ height: "91vh", justifyContent: "center" }}>
        <Scheduler data={data} height={"100%"} locale={"pl"}>
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={this.currentDateChange}
          />
          <DayView startDayHour={7} endDayHour={21} displayName="Dzień"/>
          <WeekView startDayHour={7} endDayHour={21} displayName="Tydzień"/>
          <MonthView displayName="Miesiąc"/>
          <Toolbar />
          <ViewSwitcher />
          <TodayButton />
          <DateNavigator />
          <Appointments />
          
          <AppointmentForm readOnly/>
          <AllDayPanel />
          <Resources data={resources} mainResourceName="typeId" />
        </Scheduler>
      </Paper>
    );
  }
}
