import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActions from "../../redux/actions/productActions";
import * as cartActions from "../../redux/actions/cartActions";
import { Badge, Table,Button } from "reactstrap";
import alertify from "alertifyjs";


class CartDetail extends Component {

    removeFromCart(product) {
        this.props.actions.removeFromCart(product);
        alertify.error(product.productName + " is deleted");
    }

    render() {
        return (
            <div>
               <h1>Cart Details</h1>

               <Table>
                <thead>
                    <tr>
                    <th>Product Number</th>
                    <th>Product Name</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Units In Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.cart.map(cartItem => (
                    <tr key={cartItem.product.id}>
                        <th scope="row">{cartItem.product.id}</th>
                        <td>{cartItem.product.productName}</td>
                        <td>{cartItem.product.unitPrice}</td>
                        <td>{cartItem.quantity}</td>
                        <td><Button color="danger" onClick={()=> this.removeFromCart(cartItem.product)}>Delete</Button></td>
                    </tr>
                    ))}
                </tbody>
            </Table>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        actions: {
            removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
        }
    }
}


function mapStateToProps(state) {
    return {
        cart: state.cartReducer
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartDetail);