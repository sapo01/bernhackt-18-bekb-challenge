import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import withRoot from "./withRoot";

import { Divider, List, ListItem, TextField } from "@material-ui/core";

import { alert } from "./Utils/Alerts";
import Select from "./components/Select";

import "./Orderscreen.css";
import customerList from "./mockData/customer.json";
import productList from "./mockData/product.json";

class Orderscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //label: "Beispielprodukt", value:"Beispielprodukt"
      productList: productList,
      lastproductInvoice: [],
      productInvoice: [],
      exampleInvoice: [],
      inputValue: "",
      customerList: customerList,
      customer: null,
      innvoiceTotal: 0
    };

    //TODO: this.getLastOrders();
  }

  componentDidMount() {}

  logout = () => {
    this.props.appContext.setState({ token: null });
  };

  deleteItem = event => {
    const index = event.target.getAttribute("id");
    const tempList = [...this.state.productInvoice];
    tempList.splice(index, 1);
    this.setState({ productInvoice: tempList });
  };

  clearProductList = () => {
    this.setState({ productInvoice: [] });
  };

  sendInvoice = () => {};

  //TODO: Tabs Layout and Code Refactoring FIX
  productListRender = () => {
    const that = this;
    if (this.state.productInvoice.length !== 0) {
      return this.state.productInvoice.map(function(product, index) {
        return (
          <ListItem key={index}>
            <TextField type="text" value={product.count} />
            <p>{product.name}</p>
            <Button
              id={index}
              variant="fab"
              aria-label="Delete"
              onClick={that.deleteItem}
            >
              <DeleteIcon style={{ float: "right" }} />
            </Button>
          </ListItem>
        );
      });
    } else {
      return <ListItem>Noch keine Leistungen vorhanden</ListItem>;
    }
  };

  addCustomer = customerInput => {
    this.setState({ customer: customerInput });
  };

  addItemToProductList = newItem => {
    console.log(newItem);
    alert("Menge für " + newItem.name, "Anzahl | Stunden")
      .then(result => {
        if (result.value) {
          newItem.count = result.value;
          this.setState(curState => ({
            productInvoice: [...curState.productInvoice, newItem]
          }));
        }
      })
      .then(console.log(this.state.productList));
  };

  render = () => {
    const productList = (
      <div>
        <h3 className="mainCenter">Neue Offerte/Rechnung für Frau Iseli</h3>
        <Grid container spacing={24} className="customerContainer">
          <Grid item xs={2} />
          <Grid item xs={8}>
            <Paper className="paper">
              <Select
                addItem={this.addItemToProductList}
                placeholder={"Produkt | Leistung | Artikelnummer"}
              />
              <Grid item>
                <Divider />
                <List className="productList">{this.productListRender()}</List>
              </Grid>
            </Paper>
            <h2 style={{ textAlign: "right" }}>
              Total: {this.state.innvoiceTotal}
            </h2>
            <br />
            <Paper style={{ marginTop: 10 }}>
              <div className="bottomBar">
                <Button
                  style={{ margin: 10 }}
                  color="secondary"
                  variant="outlined"
                  onClick={this.clearProductList}
                >
                  Rechnung zurücksetzten
                </Button>
                <Button
                  style={{ margin: 10 }}
                  color="primary"
                  variant="outlined"
                  onClick={this.sendInvoice}
                >
                  Speichern
                </Button>
                <Button
                  style={{ margin: 10 }}
                  color="primary"
                  variant="outlined"
                  onClick={this.sendInvoice}
                >
                  PDF Export
                </Button>
                <Button
                  style={{ margin: 10 }}
                  color="primary"
                  variant="outlined"
                  onClick={this.sendInvoice}
                >
                  Senden / IaaS
                </Button>
              </div>
            </Paper>
            <Grid item xs={2} />
          </Grid>
        </Grid>
      </div>
    );

    const customerInput = (
      <Grid container spacing={2} className="customerContainer">
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Paper>
            <h2 className="mainCenter">Kunde auswählen: </h2>
            <Select
              autoFocus
              id="customerSelect"
              addItem={this.addCustomer}
              placeholder={"Name | Kundennummer | Adresse"}
              inputList={this.state.customerList}
            />
          </Paper>
        </Grid>
      </Grid>
    );

    return this.state.customer ? productList : customerInput;
  };
}

export default withRoot(Orderscreen);
