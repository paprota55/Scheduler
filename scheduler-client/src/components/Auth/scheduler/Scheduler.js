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
  DragDropProvider,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";


import { types, newAppointmentStartId } from "../schedulerCommons/Types";
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

const DateEditor = ({ excludeTime, ...restProps }) => {

  return (
    <AppointmentForm.DateEditor
      {...restProps}
      excludeTime={excludeTime}
    />
  );
};

export default class Calendar extends React.PureComponent {
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
          fieldName: "blockId",
          title: "Wybierz gdzie ma występować wydarzenie",
          instances: this.props.blocksList,
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

    });

    if (added) {
      if(added.title === undefined){
        added.title = 'Nowy';
      }
      this.props.addNewEventt({
        allDay: false,
        notes: '',
        rRule: '',
        typeId: newAppointmentStartId,
        exDate: '',
        blockId: 0,
        ...added,
        statusId: 0,
      });
    }
    if (changed) {
      this.props.events.map((appointment) =>
        changed[appointment.id]
          ? this.props.changeOldEvent({
              ...appointment, 
              ...changed[appointment.id],
            })
          : null
      );
    }
    if (deleted !== undefined) {
      this.props.deleteEventt(deleted);
    }
  }

  render() {
    const {
      currentDate,
      addedAppointment,
      appointmentChanges,
      editingAppointment,
      resources,
      locale,
    } = this.state;

    return (
      <Paper style={{ height: "89vh", justifyContent: "center" }}>
        <Scheduler
          data={this.props.events}
          height={"100%"}
          locale={locale}
        >
          <ViewState
            defaultCurrentDate={currentDate}
            onCurrentDateChange={this.currentDateChange}
            defaultCurrentViewName="week"
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
          <AppointmentTooltip showOpenButton showDeleteButton />
          <AppointmentForm dateEditorComponent={DateEditor} messages={getAppointmentFormMessages(locale)}/>
          <AllDayPanel messages={getAllDayMessages(locale)} />
          <DragDropProvider />
          <Resources data={resources} mainResourceName="typeId" />
        </Scheduler>
      </Paper>
    );
  }
}
