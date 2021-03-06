import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';
// components
import TemplateCard from '../TemplateCard';
import ProjectCardMenu from './ProjectCardMenu';
import Hint from '../../Hint';
import TranslateIcon from 'material-ui/svg-icons/action/translate';

let ProjectCard = (props) => {
  const { projectName, projectSaveLocation, accessTimeAgo, bookAbbr, bookName, target_language, isSelected } = props.projectDetails;
  let cardDetails = [
    {
      glyph: 'time',
      text: accessTimeAgo
    },
    {
      glyph: 'book',
      text: bookName && bookAbbr ? bookName + ' (' + bookAbbr + ')' : 'No book information found'
    },
    {
      translateIcon: true,
      text: target_language.name && target_language.id ? target_language.name + ' (' + target_language.id + ')' : 'No language information found'
    }
  ];

  // content
  let content = (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-10px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Hint position={'bottom'} label={projectName}>
          <strong style={{
            fontSize: 'x-large',
            overflow: 'hidden',
            maxWidth: 400,
            textOverflow: 'ellipsis',
            display: 'block',
            whiteSpace: 'nowrap'
          }}> {projectName} </strong>
        </Hint>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '410px', marginBottom: '6px' }}>
          <table style={{width: '100%'}}>
            <tbody>
              <tr>
              {
                cardDetails.map((cardDetail, index) => {
                  let width;
                  switch(cardDetail.glyph){
                    case 'time':
                    case 'book':
                    default:
                      width = '30%';
                      break;
                  }
                  return (
                    <td style={{width: width, verticalAlign: 'top'}} key={index}>
                      <table style={{width: '100%'}}>
                        <tbody>
                          <tr>
                            <td style={{width: '1px', verticalAlign: 'top'}}>
                              { cardDetail.translateIcon ?
                                  <TranslateIcon style={{ height: '20px', width: '20px', color: '#000000', marginRight: '5px', marginTop: '6px' }} />
                                :
                                  <Glyphicon glyph={cardDetail.glyph} style={{ marginRight: '5px', top: '2px' }} />
                              }
                            </td>
                            <td style={{verticalAlign: 'top', paddingRight: '3px'}}>
                              {cardDetail.text}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  );
                })
              }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'right', marginRight: '-6px' }}>
        <ProjectCardMenu projectSaveLocation={projectSaveLocation} {...props} />
        <div>
          <button className='btn-prime' disabled={isSelected} onClick={() => { props.actions.selectProject(projectSaveLocation) }} style={{ width: '90px', marginBottom: '0' }}>
            Select
          </button>
        </div>
      </div>
    </div>
  );

  // heading
  const heading = (
    <span></span>
  );

  return (
    <TemplateCard
      heading={heading}
      content={content}
    />
  );
};

ProjectCard.propTypes = {
  projectDetails: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default ProjectCard;
