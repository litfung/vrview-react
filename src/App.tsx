import * as React from 'react';
import Vrview from './vrview/VrviewCmp';
import {IScene} from "./vrview/interfaces/IScene";
import {Fabric} from "office-ui-fabric-react/lib/Fabric";
import {CommandBar} from "office-ui-fabric-react/lib/CommandBar";
import {IContextualMenuItem, ContextualMenuItemType} from "office-ui-fabric-react/lib/ContextualMenu";
import {Panel, PanelType} from 'office-ui-fabric-react/lib/Panel';
import {Nav, INavLinkGroup} from 'office-ui-fabric-react/lib/Nav';
import {DocumentCard} from 'office-ui-fabric-react/lib/DocumentCard';
import {ChoiceGroup, IChoiceGroupOption} from 'office-ui-fabric-react/lib/ChoiceGroup';
import ScenesCollection from "./scenes/Scenes";
import './App.css';


export class App extends React.PureComponent<{}, IScene> {

  // Collection of scenes
  private scenes: ScenesCollection = new ScenesCollection();

  // Initial state contains first scene of the collection
  public state: IScene = this.scenes.getSceneByArrayIndex(0);

  // Reference to Vrview Component to invoke some of its member methods
  private vrviewCmp: Vrview;

  /**
   * Reset state to the initial scene.
   */
  resetScene = (): void => {
    if(this.state.scene.id !== 1){
      this.vrviewCmp.showLoader();
      this.setState(this.scenes.getSceneByArrayIndex(0));
    } else {
      alert('Current scene is initial scene');
    }
  };

  /**
   * Debug mode: a small window shows FPS (frames per second) in canvas
   */
  toggleDebugMode = (): void => {
    this.vrviewCmp.toggleDebugMode()
  };

  /**
   * Show user interface left menu
   */
  showLeftPanel = (): void => {
    (this.refs.panel as Panel).open();
  };

  /**
   * Hide user interface left menu
   */
  hideLeftPanel = (): void => {
    (this.refs.panel as Panel).dismiss();
  };

  /**
   * Invoke action when clicking left panel menu item
   * @param action {Function}
   * @param params {} Optional. Arguments to pass to the function
   */
  leftPanelAction = (action: Function, params?: {}): void => {
    action(params); this.hideLeftPanel();
  };

  /**
   * Load new scene when clicking a hotspot
   * @param idScene {number | string} Id new scene to load
   */
  handleClickHotspot = (idScene: number | string): void => {
    const newSceneObj = this.scenes.findSceneBydId(idScene) as IScene;
    if(!newSceneObj){
      alert('No scene found for id: ' + idScene);
      return;
    }
    this.vrviewCmp.showLoader();
    if(!newSceneObj.hotspots){
      this.setState({scene: newSceneObj.scene, hotspots: undefined});
    } else {
      this.setState({scene: newSceneObj.scene, hotspots: newSceneObj.hotspots});
    }
  };

  /**
   * Use Google's Format Conversor to transform a 360 img to an apropiated format for visualization with this component
   */
  openImageFormatConversor = () => {
    window.open('https://storage.googleapis.com/cardboard-camera-converter/index.html');
    this.hideLeftPanel();
  };

  render(){

    const {scene} = this.state;

    const topMenuItems: IContextualMenuItem[] = [
      {
        key: 'menuBtn',
        icon: 'CollapseMenu',
        onClick: this.showLeftPanel,
        title: 'Left Menu'
      },
      {
        key: 'divider',
        itemType: ContextualMenuItemType.Divider
      },
      {
        key: 'resetScene',
        name: 'Reset Scene',
        icon: 'RevToggleKey',
        onClick: () => this.resetScene(),
        title: 'Return to Initial Scene'
      },
      {
        key: 'toggleDebugMode',
        name: 'Toggle Debug Mode',
        icon: 'PowerBILogo',
        onClick: this.toggleDebugMode,
        title: 'Show/Hide small window with canvas info in low left corner'
      }
    ];

    // links[].name.links.keys must be equal to scene ids
    const leftMenuItems: INavLinkGroup[] = [{
      links:
        [
          {name: 'Reset Scene',
            url: '',
            key: 'resetScene',
            onClick: () => this.leftPanelAction(this.resetScene)
          },
          {name: 'Toggle Debug Mode',
            url: '',
            key: 'toggleDebugMode',
            onClick: () => this.leftPanelAction(this.toggleDebugMode)
          },
          {name: 'Change Scene', url: '',
            links: [{
              name: 'Scene 1',
              key: '1',
              url: 'javascript:void(0)',
              onClick: () => this.leftPanelAction(this.handleClickHotspot, 1)
            },
            {
              name: 'Scene 2',
              key: '2',
              url: 'javascript:void(0)',
              onClick: () => this.leftPanelAction(this.handleClickHotspot, 2)
            },
            {
              name: 'Scene 3',
              key: '3',
              url: 'javascript:void(0)',
              onClick: () => this.leftPanelAction(this.handleClickHotspot, 3)
            },
            {
              name: 'Scene 4',
              key: '4',
              url: 'javascript:void(0)',
              onClick: () => this.leftPanelAction(this.handleClickHotspot, 4)
            }],
            isExpanded: false
          },
          {
            name: 'Change Img Format',
            key: 'imageFormatConversor',
            url: '',
            onClick: this.openImageFormatConversor
          }
        ]
    }];

    const choiceGroup: IChoiceGroupOption[] =[
      {
        key: '1',
        imageSrc: require('./img/small-coral.jpg'),
        selectedImageSrc: require('./img/small-coral.jpg'),
        imageSize: { width: 80, height: 50 },
        text: 'Scene 1',
        checked: this.state.scene.id == 1,
        onClick: () => this.handleClickHotspot(1)
      },
      {
        key: '2',
        imageSrc: require('./img/small-landscape1.jpg'),
        selectedImageSrc: require('./img/small-landscape1.jpg'),
        imageSize: { width: 80, height: 50 },
        text: 'Scene 2',
        checked: this.state.scene.id == 2,
        onClick: () => this.handleClickHotspot(2)
      },
      {
        key: '3',
        imageSrc: require('./img/small-palmbeach.jpg'),
        selectedImageSrc: require('./img/small-palmbeach.jpg'),
        imageSize: { width: 80, height: 50 },
        text: 'Scene 3',
        checked: this.state.scene.id == 3,
        onClick: () => this.handleClickHotspot(3)
      },
      {
        key: '4',
        imageSrc: require('./img/small-landscape2.jpg'),
        selectedImageSrc: require('./img/small-landscape2.jpg'),
        imageSize: { width: 80, height: 50 },
        text: 'Scene 4',
        checked: this.state.scene.id == 4,
        onClick: () => this.handleClickHotspot(4)
      }

    ];

    return(

      <Fabric>
        <CommandBar isSearchBoxVisible={ false } items={ topMenuItems } className="command-bar" />

        <Panel
          ref="panel"
          type={ PanelType.smallFixedNear }
          isLightDismiss={ true }
          headerText="Vrview React"
        >
          <Nav groups={ leftMenuItems } selectedKey={ scene.id.toString() } />
        </Panel>

        <div className="pad15">
          <div className="centered header">Vrview React Component</div>
          <div className="centered subheader">Visualization of virtual tours, 360º photos and videos</div>
        </div>

        <DocumentCard className="layout shadow">
          {/* Vrview Component ----------------------------------------------------------- */}
          <Vrview {...this.state}
            ref={ (vrview: Vrview) => {this.vrviewCmp = vrview} }
            onClickHotspot={ this.handleClickHotspot }
          />
          {/* /Vrview Component ---------------------------------------------------------- */}
          <div className="pad15">
            <div className="card-title">{ scene.title }</div>
            <div dangerouslySetInnerHTML={{__html: scene.description as string}} />
          </div>
        </DocumentCard>

        <ChoiceGroup label='Change Scene Programatically' options={ choiceGroup } className="centered pad15" />
      </Fabric>

    )
  }
}