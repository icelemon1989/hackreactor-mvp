import React from 'react';

class Photos extends React.Component {
    constructor(props) {
        super();
        this.state = {
            mounted: false
        }
    }

    componentDidMount() {
        this.setState({ 'mounted': true });
    }

    render() {
        var photoNodes;

        if (this.state.mounted) {
            photoNodes = this.props.data.map(photo => {
                let id = photo.id;
                let img_url = photo.url_s;
                let title = photo.title;
                return (
                    <a href={img_url} key={id} target="_blank" className="imageBox">
                        <img src={img_url} alt={title} className="photoImage" />
                    </a>

                );
            });
        }

        return (
            <div className="photoList">
                {photoNodes}
            </div>
        );
    }
};

export default Photos;