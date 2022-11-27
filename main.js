/**
 * Funciones controladoras
 */
import { createUser, authenticateUser } from './app/user.js';
import { eventHandler } from './app/handler/eventHandler.js';
import {showLoginTemplate,showRegisterTemplate} from "./app/handler/viewhandler.js"

export {eventHandler, createUser, authenticateUser};

eventHandler("login", "click", authenticateUser);
eventHandler("registerForm", "click", showRegisterTemplate);
eventHandler("loginForm", "click", showLoginTemplate);
