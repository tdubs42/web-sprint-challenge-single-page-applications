import React, { useState, useEffect }  from "react";
import { Route, Switch } from "react-router-dom";
import axios from 'axios';
import * as Yup from 'yup';

import initialFormValues from './data/initialFormValues';
import initialFormErrors from "./data/initialFormErrors";
import yupSchema from "./data/yupSchema";
import apiUrl    from "./data/api";

import "./App.css";

import MainNav        from "./components/MainNav/MainNav";
import Home           from "./components/Home/Home";
import PizzaOrderForm from "./components/PizzaOrderForm/PizzaOrderForm";

const App = () => {
    const initialOrders        = [];
    const initialDisabled      = true;
    const [orders, setOrders] = useState( initialOrders );
    const [formValues, setFormValues]       = useState( initialFormValues );
    const [formErrors, setFormErrors]       = useState( initialFormErrors );
    const [disabled, setDisabled]           = useState( initialDisabled );

    const getOrders = () => {
        axios
            .get( apiUrl )
            .then( res => {
                setOrders( res.data );
            } )
            .catch( err => {
                    debugger;
            } );
    };

    const postNewOrder = newOrder => {
        axios
            .post( apiUrl , newOrder )
            .then( res => {
                console.log(res);
                // setOrders( [...orders, res.data] );
            } )
            .catch( err => {
                debugger;
            } );
    };

    const inputChange = ( name, value ) => {
        Yup
            .reach( yupSchema, name )
            .validate( value )
            .then( valid => {
                setFormErrors( {
                                   ...formErrors,
                                   [name]: "",
                               } );
            } )
            .catch( err => {
                setFormErrors( {
                                   ...formErrors,
                                   [name]: err.errors[0],
                               } );
            } );
        setFormValues( { ...formValues, [name]: value } );
    };

    const formSubmit = () => {
        const newOrder = {
            customerName: formValues.customerName.trim(),
            email: formValues.email.trim(),
            phoneNumber: formValues.phoneNumber.replace('-', ''),
            pizzaSize: formValues.pizzaSize,
            pizzaToppings: formValues.pizzaToppings,
            specialInstructions: formValues.specialInstructions,
            terms: formValues.terms,
        };

        postNewOrder( newOrder );
        setFormValues( initialFormValues );
    };

    useEffect( () => {
        yupSchema.isValid( formValues )
                  .then( valid => {
                      setDisabled( !valid );
                  } );
    }, [formValues] );

    return (
    <>
        <header>
            <h1>Project Mage Pizza</h1>
        </header>
        <MainNav/>
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route exact path="/pizza">
                <PizzaOrderForm
                    values={orders}
                    change={inputChange}
                    submit={formSubmit}
                    disabled={disabled}
                    errors={formErrors}
                />
            </Route>
        </Switch>
    </>
)
}

export default App;
