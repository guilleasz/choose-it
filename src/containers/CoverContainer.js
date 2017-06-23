import React from 'react';
import { connect } from 'react-redux';
import Cover from '../components/Cover';
import { checkUser } from '../actions';

class CoverContainer extends React.Component {
  componentWillMount() {
    this.props.checkUser();
  }
  render() {
    return <Cover />;
  }
}

const mapStateToProps = ({ currentUser }) => ({ currentUser });

export default connect(mapStateToProps, { checkUser })(CoverContainer);
