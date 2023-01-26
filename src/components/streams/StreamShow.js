import React from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    render() {
        if (!this.props.stream) {
            return (
                <div>
                    Loading...
                </div>
            );
        }

        const { title, description, username } = this.props.stream;
        return (
            <div className="show-article">
                <h1 className="show-article__header">{title}</h1>
                <h5 className="show-article__author">{`By ${username}`}</h5>
                <h4 className="show-article__description">{description}</h4>
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);