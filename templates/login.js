/**
 * Plantilla de inicio de sesion
 * @returns loginTemplate
 */
function loginTemplate() {
  return `
    <div class="containerText" id="containerText">
    <h3>Ingresa tus datos para operar</h3>
    </div>
    <div class="formLabel">
    <input type="text" id="user" placeholder="Usuario">
    </div>
    <div class="formLabel">
    <input type="password" id="password" placeholder="Contraseña">
    </div>
    <div id="errors"></div>
    <button class="formBtn" id="login">Ingresar</button>
            <div class="registerbutton">
                <p>Si no tenes clave y/o usuario</p>
                <a id="registerForm" class="inputLink">Crear clave y usuario</a>
            </div>
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
    <button class="formBtn registerbtn" id="register">Registrar</button>
    <div class="loginbutton">
                <p>Si posees usuario y clave</p>
                <a id="loginForm" class="inputLink">Ingresá</a>
    </div>
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
/**
 * Muestra los datos de la tarjeta
 */
function showCardInfo(card, movements) {
  return `
  <div class="cardInfo options">
  <div class="availablemoney"><h3>$${card.money}</h3></div>
  <div class="cardbuttons">
  <button id="paycard">Pagar</button>
  <button id="withdraw">Retirar efectivo</button>
  </div>
  </div>
  <div id="cardInfo" class="cardInfo">
    <div class="ourCard">Mis tarjetas</div>
     <div class="cardBody">
        <div class="logotype">Vaisa</div>
        <div class="cardcontent">
          <div class="cardUser">
          ${card.user}
          </div>
            <div class="cardData">
              <div class="cardValue"><label>Desde ${card.thru}</div>
              <div class="cardValue"><label>Hasta ${card.exp}</div>
              <div class="cardValue ccv"><label>CCV ${card.ccv}</div>
            </div>
          <div class="cardNumber">${card.cardId}</div>
        </div>
      </div>
  </div>
  <div id="cardInfo" class="cardInfo movements">
  <div class="ourCard">Mis movimientos</div>
  ${showMovements(movements)}
  </div>`;
}
function showMovements(movements) {
  let content = "";
  movements.forEach((movement) => {
    content += `<p id="movements" class="log">${movement.time}:${movement.name}</p>`;
  });
  return content;
}

export {
  loginTemplate,
  registerTemplate,
  sucessfullyRegisterTemplate,
  showCardInfo,
};
