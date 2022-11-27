/**
 * Plantilla de inicio de sesion
 * @returns loginTemplate
 */
function loginTemplate() {
  return `
    <div class="containerText" id="containerText">
    <h3>Iniciar sesión</h3>
    <p>¿Desea <a id="registerForm" class="inputLink">registrarse</a>?</p>
    </div>
    <div class="formLabel">
    <input type="text" id="user" placeholder="Usuario">
    </div>
    <div class="formLabel">
    <input type="password" id="password" placeholder="Contraseña">
    </div>
    <div id="errors"></div>
    <button class="formBtn" id="login">Iniciar sesión</button>
`;
}
/**
 * Plantilla de registro
 * @returns registerTemplate
 */
function registerTemplate() {
  return `
    <div class="containerText" id="containerText">
    <h3>Registrarse</h3>
    <p>O desea <a id="loginForm" class="inputLink">Iniciar sesión</a></p>
    </div>
    <div class="formLabel">
    <input type="text" id="user" placeholder="Ingrese un usuario">
    </div>
    <div class="formLabel">
        <input type="email" id="email" placeholder="Ingrese su email">
    </div>
    <div class="formLabel">
    <input type="password" id="password" placeholder="Escriba su contraseña">
    </div>
    <div class="formLabel">
         <input type="password" id="repeatpassword" placeholder="Reescriba su contraseña">
    </div>
    <div id="errors"></div>
    <button class="formBtn" id="register">Registrar</button>
`;
}
/**
 * Plantilla de registro completo
 * @returns succesfullyRegisterTemplate
 */
function sucessfullyRegisterTemplate() {
  return `
    <div>Usuario creado con exito!
        <div><a id="loginForm" class="inputLink">Inicie sesión</a></div>
    </div>`;
}

export { loginTemplate, registerTemplate, sucessfullyRegisterTemplate };
