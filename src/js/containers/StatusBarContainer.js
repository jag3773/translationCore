import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import path from 'path-extra';
// Components
import StatusBar from '../components/StatusBar';
// Actions
import * as modalActions from '../actions/ModalActions';
import * as AlertModalActions from '../actions/AlertModalActions';
import * as BodyUIActions from '../actions/BodyUIActions';

class StatusBarContainer extends React.Component {
  render() {
    const { displayHomeView } = this.props.homeScreenReducer;
    let projectName = getBaseName(this.props.projectDetailsReducer.projectSaveLocation);
    let { currentToolTitle } = this.props.toolsReducer;
    let { username } = this.props.loginReducer.userdata;
    let { loggedInUser } = this.props.loginReducer;

    return (
      <div>
      {displayHomeView ? null :
        <StatusBar
          {...this.props}
          toggleHomeScreen={this.props.actions.toggleHomeScreen}
          projectName={projectName}
          currentCheckNamespace={currentToolTitle}
          open={this.props.actions.openModalAndSpecificTab}
          online={this.props.online}
          currentUser={username}
          loggedInUser={loggedInUser}
        />
      }
      </div>
    );
  }
}

/**
 * @description parses project path to extract base name (appropriate to OS)
 * @param projectPath
 * @param usePath - optional for testing
 * @return {string} base name
 */
export function getBaseName(projectPath, usePath=path) {
  return usePath.basename(projectPath);
}

StatusBarContainer.propTypes = {
    actions: PropTypes.any.isRequired,
    homeScreenReducer: PropTypes.any.isRequired,
    projectDetailsReducer: PropTypes.any.isRequired,
    toolsReducer: PropTypes.any.isRequired,
    loginReducer: PropTypes.any.isRequired,
    online: PropTypes.any
};

const mapStateToProps = (state) => {
  return {
    settingsReducer: state.settingsReducer,
    toolsReducer: state.toolsReducer,
    projectDetailsReducer: state.projectDetailsReducer,
    loginReducer: state.loginReducer,
    homeScreenReducer: state.homeScreenReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      openModalAndSpecificTab: (loggedInUser, tabkey, sectionKey, visible) => {
        if (!loggedInUser) {
          if (tabkey !== 1) {
            dispatch(AlertModalActions.openAlertDialog("You must be logged in to use translationCore"));
            return;
          }
        }
        dispatch(modalActions.selectModalTab(tabkey, sectionKey, visible));
      },
      goToStep: (stepNumber) => {
        dispatch(BodyUIActions.goToStep(stepNumber));
         // Go to home screen / overview page
        dispatch(BodyUIActions.toggleHomeView(true));
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusBarContainer);
