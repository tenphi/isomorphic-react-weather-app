import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import MapSwitcherComponent from '../map-switcher';
import MapPointerComponent from '../map-pointer';
import MapStore from '../../stores/map.store';
import themeStyles from './theme';
import BEM from '../../utils/bemnames';

const { block, elem } = BEM();

class MapComponent extends Component {
  static defaultProps = {
    center: {
      lat: 52.3,
      lng: 4.766667
    },
    zoom: 7.8
  };

  state = {
    cities: [],
    type: 'name'
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    MapStore.bind(this);

    this.setState({
      type: localStorage.getItem('mapType') || 'name'
    });
  }

  componentWillUnmount() {
    MapStore.unbind(this);
  }

  onTypeChange = (type) => {
    this.setState({ type });
    localStorage.setItem('mapType', type);
  }

  render() {
    const { cities, type } = this.state;
    const { history } = this.props;

    return (
      <div {...block('map')}>
        <GoogleMap
          bootstrapURLKeys={{ key: 'AIzaSyAG0eK8h20aACdp0UxqwfUnApVzwYRpNDg' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={{
            streetViewControl: false,
            scaleControl: false,
            mapTypeControl: false,
            panControl: false,
            zoomControl: false,
            rotateControl: false,
            fullscreenControl: false,
            scrollwheel: false,
            disableDefaultUI: true,
            disableDoubleClickZoom: true,
            draggable: false,
            styles: themeStyles
          }}
        >
          {
            [...cities].reverse().map(city => (
              <MapPointerComponent
                lat={city.latitude}
                lng={city.longitude}
                data={city}
                type={type}
                key={city.name}
                history={history}
              />))
          }
        </GoogleMap>
        <div {...elem('switcher')}>
          <MapSwitcherComponent type={type} onChange={this.onTypeChange} />
        </div>
      </div>
    );
  }
}

export default MapComponent;
