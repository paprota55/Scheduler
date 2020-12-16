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

import { types } from "../schedulerCommons/Types";
import { status } from "../schedulerCommons/Status";
import {
  editRecurrenceMessages,
  appointmentFormMessages,
  confirmationDialogMessages,
  todayButtonMessages,
  allDayLocalizationMessages,
} from "../../../languages/plLanguage";

const getAppointmentFormMessages = (locale) => appointmentFormMessages[locale];
const getConfirmationDialogMessages = (locale) => confirmationDialogMessages[locale];
const getAllDayMessages = (locale) => allDayLocalizationMessages[locale];
const getTodayButtonMessages = (locale) => todayButtonMessages[locale];
const getEditRecurrenceMessages = (locale) => editRecurrenceMessages[locale];

export default class CalendarHistory extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
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

      locale: "pl",
      currentDate: new Date(),
    };

    this.currentDateChange = (currentDate) => {
      this.setState({ currentDate });
    };
  }

  render() {
    const {
      currentDate,
      resources,
      locale,
    } = this.state;

    return (
      <Paper style={{ height: "91vh", justifyContent: "center" }}>
        <Scheduler
          data={this.props.events}
          height={"100%"}
          locale={locale}
        >
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={this.currentDateChange}
            defaultCurrentViewName="week"
          />
          <EditingState
          />
          <EditRecurrenceMenu messages={getEditRecurrenceMessages(locale)} />
          <DayView startDayHour={7} endDayHour={21} displayName="Dzień" />
          <WeekView
            name="week"
            startDayHour={7}
            endDayHour={21}
            displayName="Tydzień"
          />
          <MonthView displayName="Miesiąc" />
          <Toolbar />
          <ViewSwitcher />
          <TodayButton messages={getTodayButtonMessages(locale)} />
          <DateNavigator />
          <ConfirmationDialog
            messages={getConfirmationDialogMessages(locale)}
          />
          <Appointments />
          <AppointmentTooltip showOpenButton  />
          <AppointmentForm messages={getAppointmentFormMessages(locale)} readOnly />
          <AllDayPanel messages={getAllDayMessages(locale)} />
          <Resources data={resources} mainResourceName="typeId" />
        </Scheduler>
      </Paper>
    );
  }
}
