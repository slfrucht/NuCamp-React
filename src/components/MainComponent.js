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
import { addComment, fetchCampsites, fetchComments, fetchPromotions } from "../redux/ActionCreators";
import { TransitionGroup, CSSTransition } from "react-transition-group";

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
  resetFeedbackForm: () => (actions.reset("feedbackForm")),
  fetchComments: () => (fetchComments()),
  fetchPromotions: () => (fetchPromotions())
};

class Main extends Component {

  componentDidMount() {
    this.props.fetchCampsites();
    this.props.fetchComments();
    this.props.fetchPromotions();
  }

  render() {
    const HomePage = () => {
      return (
        <Home campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
          campsitesLoading={this.props.campsites.isLoading}
          campsitesErrorMessage={this.props.campsites.errorMessage}
          promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
          promotionLoading={this.props.promotions.isLoading}
          promotionErrMess={this.props.promotions.errMess}
          partner={this.props.partners.filter(partner => partner.featured)[0]}
        />
      );
    }
    const CampsiteWithId = ({ match }) => {
      return (
        <CampsiteInfo campsite={this.props.campsites.campsites.filter(campsite => campsite.id ===
          +match.params.campsiteId)[0]}
          isLoading={this.props.campsites.isLoading}
          errorMessage={this.props.campsites.errorMessage}
          comments={this.props.comments.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
          commentsErrMess={this.props.comments.errMess}
          addComment={this.props.addComment}
        />
      )
    }
    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={1300}>
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path="/directory" render={() =>
                <Directory campsites={this.props.campsites} />}
              />
              <Route exact path="/contactus" render={() =>
                <Contact resetFeedbackForm={this.props.resetFeedbackForm} />}
              />
              <Route path="/directory/:campsiteId" component={CampsiteWithId} />
              <Route exact path="/aboutus" render={() =>
                <About partners={this.props.partners} />}
              />

              <Redirect to="./home" />

            </Switch>
          </CSSTransition>
        </TransitionGroup>

        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
