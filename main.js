/**
 * Funciones controladoras
 */
import { createUser, authenticateUser, userOnSession} from './app/user.js';
import { eventHandler, loadHandler } from './app/handler/eventHandler.js';
import {showLoginTemplate,showRegisterTemplate} from "./app/handler/viewhandler.js"

export {eventHandler, createUser, authenticateUser};

eventHandler("login", "click", authenticateUser);
eventHandler("registerForm", "click", showRegisterTemplate);
eventHandler("loginForm", "click", showLoginTemplate);
loadHandler("DOMContentLoaded", window.location.href ,userOnSession);
