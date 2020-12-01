import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import Instruction from "./instruction/InstructionPage";
import UserNavbar from "./navbar/UserNavbar";
import { Container } from "@material-ui/core";
import Scheduler from "./scheduler/Scheduler";
import Settings from "./userSettings/AccountSettings";
import Blocks from "./blocks/modifyBlocks/BlocksListingStructure";

const UserPage = () => {
  return (
    <div>
      <Container style={{ alignItems:"center" ,justifyItems: "center", width: "100vw", margin: "0", padding: "0" }}>
      <UserNavbar />
        <HashRouter basename="/userPage/">
          <Switch>
            <Route path="/" exact component={Instruction} />
            <Route path="/instruction" component={Instruction} />
            <Route path="/calendar" component={Scheduler} />
            <Route path="/settings" component={Settings} />
            <Route path="/blocks" component={Blocks} />
          </Switch>
        </HashRouter>
    </Container>
    </div>
  );
};

export default UserPage;