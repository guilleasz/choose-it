import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import CoverContainer from './containers/CoverContainer';
import LoginContainer from './containers/LoginContainer';
import SignupContainer from './containers/SignupContainer';
import PlansContainer from './containers/PlansContainer';
import AddPlanContainer from './containers/AddPlanContainer';
import SinglePlanContainer from './containers/SinglePlanContainer';
import VoteContainer from './containers/VoteContainer';
import InvitationsContainer from './containers/InvitationsContainer';

const styles = {
  navigationBar: {
    backgroundColor: 'red',
    borderBottomColor: 'red',
    height: 70,
  },
  title: {
    color: 'white',
    fontSize: 25,
  },
  scene: {
    paddingTop: 70,
  },
  addPlanButton: {
    color: 'white',
    fontSize: 30,
  },
  backButton: {
    tintColor: 'white',
  },
};


export default () => (
  <Router
    sceneStyle={styles.scene}
    titleStyle={styles.title}
    navigationBarStyle={styles.navigationBar}
    barButtonIconStyle={styles.backButton}
  >
    <Scene key="cover" component={CoverContainer} initial />
    <Scene key="auth">
      <Scene key="login" component={LoginContainer} title="Login" initial />
      <Scene key="signup" component={SignupContainer} title="Sign Up" />
    </Scene>
    <Scene key="main">
      <Scene
        panHandlers={null}
        key="plans"
        component={PlansContainer}
        title="Plans"
        onRight={() => Actions.addPlan()}
        rightTitle="+"
        rightButtonTextStyle={styles.addPlanButton}
      />
      <Scene
        panHandlers={undefined}
        key="singlePlan"
        component={SinglePlanContainer}
        title=""
      />
      <Scene
        panHandlers={undefined}
        key="vote"
        component={VoteContainer}
        title=""
      />
      <Scene
        panHandlers={undefined}
        key="addPlan"
        component={AddPlanContainer}
        title="Add Plan"
      />
      <Scene
        panHandlers={undefined}
        key="invitations"
        component={InvitationsContainer}
        title="Invitations"
      />
    </Scene>
  </Router>
);
