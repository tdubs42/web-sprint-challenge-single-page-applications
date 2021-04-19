import React from "react";

import './PizzaOrderForm.css';

function PizzaOrderForm (props) {
    const { values, change, submit, disabled, errors } = props;

    const onSubmit = evt => {
        evt.preventDefault(); // Stops default behavior of reloading browser window
        submit();
    };

    const onChange = evt => {
        const { name, value, type, checked } = evt.target;
        const valueToUse = type === 'checkbox' ? checked : value
        change(name, valueToUse);
    }

    return (
        <form onSubmit={onSubmit}>
            <label>First and Last Name</label>
                <input
                    type="text"
                    name="customerName"
                    value={values.customerName}
                    onChange={onChange}
                    required
                    size='33'
                />
            { errors.customerName.length > 0 && <p className="error">{errors.customerName}</p> }

            <label>E-mail</label>
                <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={onChange}
                    size='33'
                />
            { errors.email.length > 0 && <p className="error">{errors.email}</p> }

            <label>Phone Number</label>
                <input
                    type="tel"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={onChange}
                    placeholder='XXX-XXX-XXXX'
                    required
                />


            <label>What Size Pie Today?</label>
                <select
                    name='pizzaSize'
                    value={values.pizzaSize}
                    onChange={onChange}
                    required
                >
                    <option value='small'>Personal</option>
                    <option value='medium'>Ok I'll Share</option>
                    <option value='largish'>I Want Leftovers</option>
                    <option value='larger'>Within Covid Guidelines</option>
                    <option value='largest'>Feeding a Small Army</option>
                </select>

            <label>What Kind of Toppings?</label>
            <select
                type='checkbox'
                name='pizzaToppings'
                value={values.pizzaToppings}
                onChange={onChange}
                size='8'
                multiple
            >
                <option value='cheese'>Cheese</option>
                <option value='sausage'>Sausage</option>
                <option value='peppers'>Lil Mama's Peppers</option>
                <option value='nanaPeppers'>Nana Peppers</option>
                <option value='olives'>Olives</option>
                <option value='pepperoni'>pepperoni</option>
                <option value='onions'>Grilled Onions</option>
                <option value='parm'>Parm It Up!</option>
            </select>

            <label>Any Special Instructions?</label>
            <input
                type='text'
                name='specialInstructions'
                value={values.specialInstructions}
                onChange={onChange}
            />

            <input type='reset'/>
            <input type='submit' value='Submit Order'/>
        </form>
    );
}

export default PizzaOrderForm;