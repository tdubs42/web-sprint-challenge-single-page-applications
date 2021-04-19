import * as Yup from "yup";

const yupSchema = Yup.object().shape( {
                                          customerName: Yup
                                              .string()
                                              .min( 2 )
                                              .required( "Required" ),
                                          email: Yup
                                              .string()
                                              .email( "Must be a valid email" )
                                              .max( 142 )
                                              .required( "Email is required" ),
                                          phoneNumber: Yup
                                              .string()
                                              .min( 10 )
                                              .max( 15 )
                                              .required( "Phone number is required" ),
                                          pizzaSize: Yup
                                              .string()
                                              .required( "Please choose a size" ),
                                          pizzaToppings: Yup
                                              .array()
                                              .required( "Please choose at least 1 topping" ),
                                          specialInstructions: Yup
                                              .string(),
                                          terms: Yup
                                              .boolean()
                                              .oneOf( [true], "You must agree to our delivery terms to" +
                                                              " have us deliver your pizza boss" ),
                                      } );

export default yupSchema;