import React, { Component } from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavItem,
    NavLink,Badge} from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";


class CartSummary extends Component {

    renderEmpty() {
        return (
            <NavItem>
            <NavLink href="/components/">Cart Is Empty</NavLink>
          </NavItem>
        )
    }

    renderSummary() {
        return (
            <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
            Your Cart
            </DropdownToggle>

            <DropdownMenu right>
                {this.props.cart.map(cartItem => (
                    <DropdownItem key={cartItem.product.id}>
                        <Badge color="danger" onClick={()=>this.props.actions.removeFromCart(cartItem.product)}>(-)</Badge>
                        {cartItem.product.productName}
                        <Badge color="success">{cartItem.quantity}</Badge>
                    </DropdownItem>
                ))}
            <DropdownItem divider />
            <DropdownItem> Cart Details</DropdownItem>
            </DropdownMenu>

        </UncontrolledDropdown>
        )
    }


    render() {
        return (
            <div>
                {
                this.props.cart.length > 0 ?this.renderSummary():this.renderEmpty()
                }
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

export default connect(mapStateToProps,mapDispatchToProps)(CartSummary);