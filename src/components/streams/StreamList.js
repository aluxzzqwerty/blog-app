import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams, fetchStream } from "../../actions";

class StreamList extends React.Component {
    state = { showRedHeart: false };

    componentDidMount() {
        this.props.fetchStreams();
        this.props.fetchStream(this.props.match.params.id);
    }

    renderAdmin(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="sidebar-posts-list__item__btns">
                    <Link to={`/streams/edit/${stream.id}`} className="button edit-btn">
                        EDIT
                    </Link>
                    <Link to={`/streams/delete/${stream.id}`} className="button delete-btn">
                        DELETE
                    </Link>
                </div>
            );
        }
    }

    onHeartClick = () => {
        this.setState({ showRedHeart: !this.state.showRedHeart });
    }

    renderSideBarList() {
        const MAX_ARTICLES_NUMBER = 4;
        let count = 0;
        return this.props.streams.map(stream => {
            count++;
            if (count < MAX_ARTICLES_NUMBER) {
                return;
            }
            return (
                <div className="sidebar-posts-list__item" key={stream.id}>
                    <div className="sidebar-posts-list__item__container">
                        <div className="sidebar-posts-list__item__content">
                            <Link to={`/streams/${stream.id}`} className="sidebar-posts-list__item__content--header">
                                {stream.title}
                            </Link>
                            <div className="sidebar-posts-list__item__content--description">{stream.description}</div>
                        </div>
                    </div>
                    {this.renderAdmin(stream)}
                </div>
            );
        });
    }

    renderMovingTitles() {
        return this.props.streams.map(stream => {
            return <span key={stream.title} className="moving-title">
                {stream.title}
            </span>
        });
    }

    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className="article-list-center-item" key={stream.id}>
                    <div className="article-list-center-item__container">
                        <div className="article-list-center-item__content">
                            <Link to={`/streams/${stream.id}`} className="article-list-center-item__content--header">
                                {stream.title}
                            </Link>
                            <div className="article-list-center-item__content--description">{stream.description}</div>
                        </div>
                    </div>
                    {this.renderAdmin(stream)}
                </div>
            );
        });
    }

    render() {
        return (
            <div className="main-content">
                <div id="article-container" className="article-container">
                    <h2 className="article-container__big-title">Articles</h2>
                    <div className="article-list-center">
                        {this.renderList()}
                    </div>
                </div>
                <div className="sidebar-container">
                    <div className="sidebar-top-part">
                        <marquee width="100%" direction="left">
                            {this.renderMovingTitles()}
                        </marquee>
                        <div className="sidebar-top-part__feautured-titles">Feautured Titles</div>
                    </div>
                    <div className="sidebar-posts-list">
                        {this.renderSideBarList()}
                    </div>
                </div>
            </div>
        );
    }

};

const mapStateToProps = (state, ownProps) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn,
        stream: state.streams[ownProps.match.params.id]
    };
}

export default connect(mapStateToProps, { fetchStreams, fetchStream })(StreamList);