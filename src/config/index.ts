/**
 * This loads every parameter in .env file into process.env
 * For more details : https://github.com/motdotla/dotenv
 */
require('dotenv').config(); 


/**
 * This is a index file
 * The main objective of this file are : 
 *  1. Import everything inside the parent folder of this index file
 *  2. Do some processing if required
 *  3. Export everything back
 */

import APPLICATION_CONFIG from './application.config';
import DATABASE_CONFIG from './database.config';

export  {APPLICATION_CONFIG , DATABASE_CONFIG};