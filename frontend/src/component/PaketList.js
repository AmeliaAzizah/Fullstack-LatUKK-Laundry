// import { extend } from "jquery";
import React from "react";

export default class PaketList extends React.Component {
    render() {
        return (
            <div className="col-lg-6 col-sm-12 p-2">
                <div className="card">
                    <div className="card-body row">
                        {/* manampilkan gambar */}
                        <div className="col-5">
                            <img src={this.props.image} className="img" height="200" width="200" alt={this.props.jenis_paket} />
                        </div>

                        {/* menampilkan deskripsi */}
                        <div className="col-7">
                            <h5 className="text-info">
                                {this.props.jenis_paket}
                            </h5>
                            <h6 className="text-danger">
                                Harga: {this.props.harga}
                            </h6>

                            {/* button untuk mengedit */}
                            <button className="btn btn-sm btn-primary m-1"
                            onClick={this.props.onEdit}>
                                Edit
                            </button>

                            {/* button untuk menghapus */}
                            <button className="btn btn-sm btn-danger m-1"
                            onClick={this.props.onDrop}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}