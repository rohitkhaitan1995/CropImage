import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { storage, database } from './firebase';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
// import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';


const styles = theme => ({
    root: {
    //   display: 'flex',
    //   flexWrap: 'wrap',
    //   justifyContent: 'space-around',
    //   overflow: 'hidden',
    //   backgroundColor: theme.palette.background.paper,
    },
    gridList: {
     
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    
});

class Bookmark extends Component {
    state = {
        data: null,
        list: [1, 2],
        url: '',
        bookmark_name: '',
        grid: 4,
        image: '',
        name: '',
        image_list: []
    };

    componentDidMount() {
        var val = database.ref('image_url');
        val.on('child_added', snap => {
            this.setState({ image_list: [...this.state.image_list, snap.val()] });
        });
    }
    handleUpload = () => {
        const { cropResult1, cropResult2, cropResult3, cropResult4 } = this.state;
        console.log(this.state.image_list);
        [[cropResult1, this.cropper1.props.name], [cropResult2, this.cropper2.props.name], [cropResult3, this.cropper3.props.name], [cropResult4, this.cropper4.props.name]].map((data, index) => {
            var strImage = data[0].replace(/^data:image\/[a-z]+;base64,/, "");
            const uploadTask = storage.ref(`images/${data[1]}`).putString(strImage, 'base64', { contentType: 'image/jpg' });
            uploadTask.on('state_changed',
                (snapshot) => {
                      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                      this.setState({progress});
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    storage.ref('images').child(`${data[1]}`).getDownloadURL().then(url => {
                        var ref = database.ref('image_url');
                        ref.push(url);
                        this.setState({ data: null });
                    })
                });
            return true;
        })
    }
    handleChanges(event) {
        var context = this;
        var reader = new FileReader();
        this.setState({ image: event.target.files[0] })
        this.setState({ name: event.target.files[0].name })
        console.log('img', event.target.files[0])
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function (e) {

            var image = new Image();

            image.src = e.target.result;

            image.onload = function () {
                var height = this.height;
                var width = this.width;
                if (height !== 1024 || width !== 1024) {
                    alert("Uploaded image pixel mismatch.");
                    console.log(document.getElementsByClassName('image'));
                    return false;
                }
                else if (true) {
                    context.setState({
                        data: image.src
                    })
                    return true;
                }

            };
        }

    }

    _crop() {
        // image in dataUrl
        // console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
    }
    cropImage1() {
        if (typeof this.cropper1.getCroppedCanvas() === 'undefined') {
            return;
        }
       
        this.setState({
            cropResult1: this.cropper1.getCroppedCanvas({
                width: 365,
                height: 212,
                fillColor: '#fff',
                imageSmoothingEnabled: false,
                imageSmoothingQuality: 'high',
            }).toDataURL()
        });
    }
    cropImage2() {
        if (typeof this.cropper2.getCroppedCanvas() === 'undefined') {
            return;
        }
        this.setState({
            cropResult2: this.cropper2.getCroppedCanvas({
                width: 365,
                height: 450,
                fillColor: '#fff',
                imageSmoothingEnabled: false,
                imageSmoothingQuality: 'high',
            }).toDataURL(),
        });
    }
    cropImage3() {
        if (typeof this.cropper3.getCroppedCanvas() === 'undefined') {
            return;
        }
        this.setState({
            cropResult3: this.cropper3.getCroppedCanvas({
                width: 380,
                height: 380,
                fillColor: '#fff',
                imageSmoothingEnabled: false,
                imageSmoothingQuality: 'high',
            }).toDataURL(),
        });
    }
    cropImage4() {
        if (typeof this.cropper4.getCroppedCanvas() === 'undefined') {
            return;
        }
        this.setState({
            cropResult4: this.cropper4.getCroppedCanvas({
                width: 755,
                height: 450,
                fillColor: '#fff',
                imageSmoothingEnabled: false,
                imageSmoothingQuality: 'high',
            }).toDataURL(),
        });
    }


    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {/* <div style={{ float: 'right' }}>
                    <div>
                        {this.state.grid === 4 && <img src="../asset/list.png" alt="" height="25" width="25" onClick={this.gridView} />}
                        {this.state.grid === 12 && <img src="../asset/grid.png" alt="" height="20" width="20" onClick={this.gridView} />}
                    </div>
                </div> */}
                <input className='image' type='file' accept='.jpg,.jpeg.,.gif,.png' onChange={(event) => {
                    this.handleChanges.bind(this)(event);
                    const context = this;
                    window.setTimeout(function () {
                        context.cropImage1.bind(context)();
                        context.cropImage2.bind(context)();
                        context.cropImage3.bind(context)();
                        context.cropImage4.bind(context)();
                    }, 500)
                }} />
                {this.state.data !== null &&
                    <div>
                        <div style={{ paddingTop: '50px', display: 'block' }}>
                            <Cropper
                                name={`365x212 ${this.state.name}`}
                                ref={cropper1 => { this.cropper1 = cropper1; }}
                                src={this.state.data}
                                style={{ height: 250, width: 250 }}
                                preview=".img-preview1"
                                aspectRatio={365 / 212}
                                guides={false}
                                crop={this._crop.bind(this)} />
                            <div>
                                <div className="box" style={{ width: '50%', float: 'right' }}>
                                    <h1>Preview</h1>
                                    <div className="img-preview1" style={{ width: '100%', float: 'left', height: 300 }} />
                                </div>
                                <div className="box" style={{ width: '50%', float: 'right' }}>
                                    <h1 >
                                        <span>Crop</span>
                                        <button onClick={this.cropImage1.bind(this)} style={{ float: 'right' }}>
                                            Crop Image
                                        </button>
                                    </h1>
                                    <img style={{ width: 365, height: 212 }} src={this.state.cropResult1} alt="cropped_image" />
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingTop: '450px', display: 'block' }}>
                            <Cropper
                                name={`365x450 ${this.state.name}`}
                                ref={cropper2 => { this.cropper2 = cropper2; }}
                                src={this.state.data}
                                style={{ height: 250, width: 250 }}
                                preview=".img-preview2"
                                aspectRatio={365 / 450}
                                guides={false}
                                crop={this._crop.bind(this)} />

                            <div>
                                <div className="box" style={{ width: '50%', float: 'right' }}>
                                    <h1>Preview</h1>
                                    <div className="img-preview2" style={{ width: '100%', float: 'left', height: 300 }} />
                                </div>
                                <div className="box" style={{ width: '50%', float: 'right' }}>
                                    <h1>
                                        <span>Crop</span>
                                        <button onClick={this.cropImage2.bind(this)} style={{ float: 'right' }}>
                                            Crop Image
                                        </button>
                                    </h1>
                                    <img style={{ width: 365, height: 450 }} src={this.state.cropResult2} alt="cropped_image" />
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingTop: '580px', display: 'block' }}>
                            <Cropper
                                name={`380x380 ${this.state.name}`}
                                ref={cropper3 => { this.cropper3 = cropper3; }}
                                src={this.state.data}
                                style={{ height: 250, width: 250 }}
                                preview=".img-preview3"
                                aspectRatio={380 / 380}
                                guides={false}
                                crop={this._crop.bind(this)} />
                            <div>
                                <div className="box" style={{ width: '50%', float: 'right' }}>
                                    <h1>Preview</h1>
                                    <div className="img-preview3" style={{ width: '100%', float: 'left', height: 300 }} />
                                </div>
                                <div className="box" style={{ width: '50%', float: 'right' }}>
                                    <h1>
                                        <span>Crop</span>
                                        <button onClick={this.cropImage3.bind(this)} style={{ float: 'right' }}>
                                            Crop Image
                                        </button>
                                    </h1>
                                    <img style={{ width: 380, height: 380 }} src={this.state.cropResult3} alt="cropped_image" />
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingTop: '500px', display: 'block' }}>
                            <Cropper
                                name={`755x450 ${this.state.name}`}
                                ref={cropper4 => { this.cropper4 = cropper4; }}
                                src={this.state.data}
                                style={{ height: 250, width: 250 }}
                                preview=".img-preview4"
                                aspectRatio={755 / 450}
                                guides={false}
                                crop={this._crop.bind(this)} />
                            <div>
                                <div className="box" style={{ width: '30%', float: 'right' }}>
                                    <h1>Preview</h1>
                                    <div className="img-preview4" style={{ width: '100%', float: 'left', height: 300 }} />
                                </div>
                                <div className="box" style={{ width: '70%', float: 'right' }}>
                                    <h1>
                                        <span>Crop</span>
                                        <button onClick={this.cropImage4.bind(this)} style={{ float: 'right' }}>
                                            Crop Image
                                        </button>
                                    </h1>
                                    <img style={{ width: 755, height: 450 }} src={this.state.cropResult4} alt="cropped_image" />
                                </div>
                            </div>
                        </div>
                        <button onClick={this.handleUpload.bind(this)}>Upload</button>
                        <button onClick={() => this.setState({ data: null })}>Clear</button>
                    </div>}
                <GridList cellHeight={180} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        {/* <ListSubheader component="div">December</ListSubheader> */}
                    </GridListTile>
                    {this.state.image_list.map((data, index) => (
                        <GridListTile cols={1/2} key={index}>
                            <img src={data} alt={data} />
                            <GridListTileBar
                                title={''}
                                subtitle={<span>size: {data.replace("https://firebasestorage.googleapis.com/v0/b/image-480de.appspot.com/o/images%2F", "").substring(0, 7)}</span>}
                                actionIcon={
                                    <IconButton className={classes.icon}>
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div >
        );
    }
}

Bookmark.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bookmark);