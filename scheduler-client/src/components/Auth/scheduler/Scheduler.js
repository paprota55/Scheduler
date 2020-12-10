import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
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
  EditRecurrenceMenu,
  AllDayPanel,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";

import { appointments } from "./appointments";
import { types } from "./Types";
import { status } from "./Status";

export default class Calendar extends React.PureComponent {
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

      addedAppointment: {},
      appointmentChanges: {},
      editingAppointment: undefined,
    };

    this.currentDateChange = (currentDate) => {
      this.setState({ currentDate });
    };
    this.commitChanges = this.commitChanges.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
  }

  changeAddedAppointment(addedAppointment) {
    this.setState({ addedAppointment });
  }

  changeAppointmentChanges(appointmentChanges) {
    this.setState({ appointmentChanges });
  }

  changeEditingAppointment(editingAppointment) {
    this.setState({ editingAppointment });
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;

      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId,  rRule:'',  typeId: undefined,  exDate: '', ...added,statusId: 1}];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }

      console.log("Added");
      console.log(added);

      console.log("changed");
      console.log(changed);

      console.log("deleted");
      console.log(deleted);

      console.log("Data");
      console.log(data);

      return { data };
    });
  }

  render() {
    const {
      currentDate,
      data,
      addedAppointment,
      appointmentChanges,
      editingAppointment,
      resources,
    } = this.state;

    return (
      <Paper style={{ height: "91vh", justifyContent: "center" }}>
        <Scheduler data={data} height={"100%"} locale={"pl"}>
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={this.currentDateChange}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={this.changeAddedAppointment}
            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={this.changeAppointmentChanges}
            editingAppointment={editingAppointment}
            onEditingAppointmentChange={this.changeEditingAppointment}
          />
          <EditRecurrenceMenu />
          <DayView startDayHour={7} endDayHour={21} displayName="Dzień"/>
          <WeekView startDayHour={7} endDayHour={21} displayName="Tydzień"/>
          <MonthView displayName="Miesiąc"/>
          <Toolbar />
          <ViewSwitcher />
          <TodayButton />
          <DateNavigator />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton />
          <AppointmentForm />
          <AllDayPanel />
          <Resources data={resources} mainResourceName="typeId" />
        </Scheduler>
      </Paper>
    );
  }
}
