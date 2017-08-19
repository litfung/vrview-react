"use strict";
//todo: buscar e incluir tipos (@type) para vrview
//todo: quitar # en div id de vrview
//todo: is_debug prop = true/false
//todo: eliminar manejadores de eventos para evitar perdidas de memoria (vrview.on)
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var VRView = require("./vrview.js");
var Vrview = (function (_super) {
    __extends(Vrview, _super);
    function Vrview() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //todo: add type information to state
        _this.state = _this.props;
        return _this;
    }
    //todo: refactor this fn
    Vrview.prototype.loadHotspots = function () {
        var _this = this;
        // this.vrview.on('ready', () => {
        var hotspots = this.state.config.hotspots;
        hotspots && hotspots.forEach(function (hotspot) {
            console.log('adding hotspot', hotspot);
            _this.vrview.addHotspot(hotspot.name, {
                pitch: hotspot.pitch,
                yaw: hotspot.yaw,
                radius: hotspot.radius,
                distance: hotspot.distance
            });
        });
        // });
    };
    Vrview.prototype.addHotspotsClickHandlers = function () {
        var _this = this;
        var hotspots = this.props.config.hotspots;
        hotspots && hotspots.forEach(function (hotspot) {
            _this.vrview.on('click', function (event) {
                if (event.id === hotspot.name) {
                    console.log('hotspot click event handler', hotspot);
                    _this.setState({ config: hotspot.newScene });
                }
            });
        });
    };
    /**
     * After view init
     */
    Vrview.prototype.componentDidMount = function () {
        var _this = this;
        var onVrViewLoad = function () {
            console.log('vrview props on load', _this.props);
            console.log('vrview state on load', _this.state);
            _this.vrview = new VRView.Player('vrview', _this.state.config.scene);
            _this.vrview.on('ready', function () {
                _this.loadHotspots();
            });
            _this.addHotspotsClickHandlers();
        };
        window.addEventListener('load', onVrViewLoad);
    };
    // shouldComponentUpdate(){
    //   return false;
    // }
    Vrview.prototype.componentWillReceiveProps = function () {
        console.log('component will recive props, props', this.props);
    };
    /**
     * On State Change
     */
    Vrview.prototype.componentDidUpdate = function () {
        console.log('component did update, state:', this.state);
        // Load new scene content data from state
        this.vrview.setContent(this.state.config.scene);
        // Load hotspots
        this.loadHotspots();
        debugger;
        this.addHotspotsClickHandlers();
    };
    Vrview.prototype.render = function () {
        return (React.createElement("div", { id: 'vrview' }));
    };
    return Vrview;
}(React.Component));
exports.default = Vrview;
