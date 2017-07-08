import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// components
import ToolCard from './ToolCard';
import { Card, CardText } from 'material-ui'

class ToolsCards extends Component {
  render() {
    const {
      toolsMetadata,
      bookName,
      projectSaveLocation,
      loggedInUser,
      currentProjectToolsProgress
    } = this.props;

    if (toolsMetadata.length == 0 || !toolsMetadata) {
      return (
        <MuiThemeProvider>
          <Card style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "6px 0px 10px", height: "200px" }}>
            <CardText style={{ fontWeight: "bold" }}>
              No tC default tools found.
            </CardText>
          </Card>
        </MuiThemeProvider>
      );
    } else if (bookName.length == 0 && projectSaveLocation == 0) {
      return (
        <MuiThemeProvider>
          <Card style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "6px 0px 10px", height: "200px" }}>
            <CardText style={{ fontWeight: "bold" }}>
              No project was selected. Please
              <span
                style={{ color: "var(--accent-color-dark)", cursor: "pointer" }}
                onClick={() => this.props.actions.goToStep(2)}
              >
                &nbsp;select a project&nbsp;
              </span>first.
            </CardText>
          </Card>
        </MuiThemeProvider>
      );
    } else {
      return (
        <div style={{ height: '100%', overflowY: 'auto' }}>
          {
            toolsMetadata.map((metadata, i) => {
              return (
                <ToolCard
                  key={i}
                  actions={this.props.actions}
                  loggedInUser={loggedInUser}
                  metadata={metadata}
                  currentProjectToolsProgress={currentProjectToolsProgress}
                />
              );
            })
          }
        </div>
      );
    }
  }
}

ToolsCards.propTypes = {
  actions: PropTypes.object.isRequired,
  toolsMetadata: PropTypes.array.isRequired,
  bookName: PropTypes.string.isRequired,
  projectSaveLocation: PropTypes.string.isRequired,
  loggedInUser: PropTypes.bool.isRequired,
  currentProjectToolsProgress: PropTypes.object.isRequired
}

export default ToolsCards;
