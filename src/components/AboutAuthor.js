import React, { PropTypes, Component } from 'react';
import {Image, PageHeader, Grid, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import { signIn } from '../actions/UserActions';

@connect(state => ({
    user: state.user
}), {signIn})

export default class AboutAuthor extends Component {
    render() {
        return (
            <Grid>
                <Row className='show-grid'>
                    <Col md={12}>
                        <PageHeader>About page. User name - {this.props.user.username}</PageHeader>
                    </Col>
                </Row>

                <Row className='show-grid'>
                    <Col md={12} style={{textAlign: 'center'}}>
                        <Image style={{height: '100px'}}
                               src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/NewTux.svg/625px-NewTux.svg.png'
                               rounded/>
                    </Col>
                </Row>

                <Row className='show-grid'>
                    <Col md={12}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam molestie ligula vitae
                            mauris maximus, a placerat erat maximus. Vestibulum sagittis risus sed sem fermentum
                            lacinia. Nullam eleifend dictum mauris. Donec et vestibulum ipsum. Sed eu libero id sem
                            efficitur elementum. Mauris sodales diam eu orci semper vehicula. Integer ligula velit,
                            rhoncus et nisl sit amet, rutrum sagittis ipsum. Vivamus elit urna, dapibus vel turpis id,
                            aliquet tempus ante. Sed et aliquam dui. Quisque congue turpis id metus convallis, at
                            fringilla turpis aliquet. Nullam posuere scelerisque ante. Phasellus laoreet neque facilisis
                            urna congue, et tincidunt sem vestibulum. Nam eleifend eu enim quis rutrum. Etiam malesuada
                            elementum scelerisque. Sed lacus nisl, aliquet nec dui quis, maximus efficitur urna. Cras
                            laoreet, dolor vel ultricies hendrerit, ante est vehicula turpis, nec consectetur arcu nunc
                            egestas felis.
                        </p>
                        <p>
                            Ut tellus ex, semper a dapibus ut, laoreet ut risus. Sed sagittis eros eget sagittis porta.
                            Vestibulum at pharetra massa. Mauris finibus pellentesque velit. Maecenas ut nisi pharetra,
                            pellentesque tellus non, fringilla lorem. Ut sollicitudin nunc ac odio ullamcorper, sit amet
                            ultrices leo malesuada. Donec dapibus massa nisi, non tincidunt nunc maximus quis. Etiam
                            efficitur augue et augue sollicitudin, eget posuere ex blandit. Ut varius mauris vel
                            fringilla molestie. Integer id lacus efficitur, convallis est ut, malesuada lacus.
                        </p>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

AboutAuthor.propTypes = {
    user: PropTypes.object
}