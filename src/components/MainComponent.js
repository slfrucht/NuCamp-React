import React, { Component } from "react";
import Directory from "./DirectoryComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import About from "./AboutComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
import Contact from "./ContactComponent";
import Home from "./HomeComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actions } from "react-redux-form"; //makes actions.reset available
import {addComment, fetchCampsites} from "../redux/ActionCreators";

const mapStateToProps = state => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions
  };
}

const mapDispatchToProps = {
  addComment: (campsiteId, rating, author, text) => (addComment(campsiteId, rating, author, text)),
  fetchCampsites: () => (fetchCampsites()),
  resetFeedbackForm: () => (actions.reset("feedbackForm"))
};

class Main extends Component {

  componentDidMount() {
    this.props.fetchCampsites();
  }

  render() {
    const HomePage = () => {
      return (
        <Home campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
          campsitesLoading={this.props.campsites.isLoading}
          campsitesErrorMessage={this.props.campsites.errorMessage}
          promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
          partner={this.props.partners.filter(partner => partner.featured)[0]}
        />
      );
    }
    const CampsiteWithId = ({match}) => {
      return(
        <CampsiteInfo campsite={this.props.campsites.campsites.filter(campsite => campsite.id === 
          +match.params.campsiteId)[0]}
          isLoading={this.props.campsites.isLoading}
          errorMessage={this.props.campsites.errorMessage}
          comments={this.props.comments.filter(comments => comments.campsiteId === 
          +match.params.campsiteId)} 
          addComment = {this.props.addComment}
        />
      )
    }
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/directory" render={() =>
            <Directory campsites={this.props.campsites} />}
          />
          <Route exact path="/contactus" render= {() => 
            <Contact resetFeedbackForm= {this.props.resetFeedbackForm} /> } 
          />
          <Route path="/directory/:campsiteId" component={CampsiteWithId} />
          <Route exact path="/aboutus" render={() =>
            <About partners={this.props.partners} />}
          />

          <Redirect to="./home" />

        </Switch>
        <Footer />
      </div>
    );
  }
}

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
