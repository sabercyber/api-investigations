# api-investigations

This file contains details for the simple-post.js operation

its uses express and body parser to handle API calls
The data is stored in sqlite

There is a create-db API created called /api/create-db

This creates SQLITE db. 
Sample JSON body post 
{
    "dbname" :"information",
    "dbtable" : ["cart_data"],
    "cart_data":[
        {
            "value_name": "cart_id",
            "value_type" : "INT"
        },
        { 
            "value_name": "Solar_Panel_Voltage",
            "value_type" : "REAL"
        },
        {
            "value_name": "Inverter_Voltage",
            "value_type" : "REAL"
            
        },
        {
            "value_name": "Load_Voltage",
            "value_type" : "REAL"
            
        }
    ]
}

It has get method for the information db called /api/cart_info

to post individual card data the API is /api/cart_data


Note: DBs not added to repo, can be created looking at source code
