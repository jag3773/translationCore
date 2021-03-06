/* eslint-env jest */
jest.unmock('fs-extra');
import path from 'path-extra';
import * as fs from 'fs-extra';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../src/js/reducers';
//helpers
import * as ProjectDetailsHelpers from '../src/js/helpers/ProjectDetailsHelpers';
//actions
import * as ProjectDetailsActions from '../src/js/actions/ProjectDetailsActions';
import * as ProjectSelctionActions from '../src/js/actions/ProjectSelectionActions';
//projects
const alignmentToolProject = '__tests__/fixtures/project/wordAlignment/normal_project';

describe('ProjectDetailsHelpers.getWordAlignmentProgress', () => {

  beforeAll(() => {
    // // TRICKY: this is a bad hack to get these tests working.
    // // the code hard-codes production paths so we have to populate the data.
    const ResourcesActions = require('../src/js/actions/ResourcesActions');
    ResourcesActions.getResourcesFromStaticPackage();
});

  test('should get the progress of a word alignment project', () => {
    let projectSaveLocation = alignmentToolProject;
    let bookId = 'tit';
    const pathToWordAlignmentData = path.join(projectSaveLocation, '.apps', 'translationCore', 'alignmentData', bookId);
    let progress = ProjectDetailsHelpers.getWordAlignmentProgress(pathToWordAlignmentData, bookId);
    expect(progress).toBeCloseTo(0.086);
  });

  test('should get the progress of a word alignment project', () => {
    let projectSaveLocation = '.../randomPath';
    let bookId = 'tit';
    const pathToWordAlignmentData = path.join(projectSaveLocation, '.apps', 'translationCore', 'alignmentData', bookId);
    let progress = ProjectDetailsHelpers.getWordAlignmentProgress(pathToWordAlignmentData, bookId);
    expect(progress).toBe(0);
  });

});

describe('Load a Tool from actions', () => {
  let store;
  beforeEach(() => {
    // create a new store instance for each test
    store = createStore(
      reducers,
      applyMiddleware(thunk)
    );
  });

  test('should select word Alignment tool and load it to the store', () => {
    store.dispatch(ProjectSelctionActions.selectProject(alignmentToolProject));
    store.dispatch(ProjectDetailsActions.getProjectProgressForTools('wordAlignment'));
    const { currentProjectToolsProgress:{
      wordAlignment
    }, projectSaveLocation } = store.getState().projectDetailsReducer;
    expect(wordAlignment).toBeCloseTo(0.086);
    fs.removeSync(projectSaveLocation);
  });
});
