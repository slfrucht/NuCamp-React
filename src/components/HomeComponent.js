import React from "react";
import {Card, CardImg, CardText, CardBody, CardTitle} from "reactstrap";
import CardImgOverlay from "reactstrap/lib/CardImgOverlay";
import {Loading} from "./LoadingComponent";
import { FadeTransform } from "react-animation-components";

function RenderCard({item, isLoading, errorMessage}) {
    console.log("+++isLoading = "+ isLoading);
    console.log("+++errorMessage = "+ errorMessage);

    if(isLoading) {
        return <Loading />;
    }
    if(errorMessage) {
        return <h4>{errorMessage}</h4>;
    }
    console.log("+++item = "+ JSON.stringify(item));
    return (
        <FadeTransform
        in
        transformProps={{
            exitTransform: "scale(0.5) translateY(50%)"
        }}
        >
        <Card>
            <CardImg src={item.image} alt={item.name}/>
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
        </FadeTransform>
    )
}
function Home(props) {
    console.log("+++props = "+ JSON.stringify(props));

    return (
        <div className="container">
            <div className="row">
            <div className="col-md m-1">
                    <RenderCard 
                    item={props.campsite} 
                    isLoading={props.campsitesLoading}
                    errorMessage={props.campsitesErrorMessage}
                    />
                </div>
                <div className="col-md m-1">
                    <RenderCard item={props.promotion} />
                </div>
                <div className="col-md m-1">
                    <RenderCard item={props.partner} />
                </div>
            </div>

        </div>
    )
}
export default Home;