import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import Instruction from "./instruction/InstructionPage";
import UserNavbar from "./navbar/UserNavbar";
import SchedulerProvider from "./scheduler/SchedulerProvider";
import SchedulerHistoryProvider from "./schedulerHistory/SchedulerHistoryProvider";
import Settings from "./userSettings/AccountSettings";
import Blocks from "./blocks/modifyBlocks/BlocksListingStructure";

const UserPage = () => {
  return (
    <div style={{width: "100%"}}>
      <UserNavbar />
        <HashRouter basename="/userPage/">
          <Switch>
            <Route path="/" exact component={Instruction} />
            <Route path="/instruction" component={Instruction} />
            <Route path="/calendar" component={SchedulerProvider} />
            <Route path="/calendarHistory" component={SchedulerHistoryProvider} />
            <Route path="/settings" component={Settings} />
            <Route path="/blocks" component={Blocks} />
          </Switch>
        </HashRouter>
    </div>
  );
};

export default UserPage;