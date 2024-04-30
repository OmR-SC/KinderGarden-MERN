function validaCedula(ced) {
  let c = ced.replace(/-/g, "");
  let cedula = c.substr(0, c.length - 1);
  let verificador = c.substr(c.length - 1, 1);
  let suma = 0;
  let cedulaValida = false;
  if (ced.length < 11) {
    return false;
  }
  for (i = 0; i < cedula.length; i++) {
    mod = "";
    if (i % 2 == 0) {
      mod = 1;
    } else {
      mod = 2;
    }
    res = cedula.substr(i, 1) * mod;
    if (res > 9) {
      res = res.toString();
      uno = res.substr(0, 1);
      dos = res.substr(1, 1);
      res = eval(uno) + eval(dos);
    }
    suma += eval(res);
  }
  el_numero = (10 - (suma % 10)) % 10;
  if (el_numero == verificador && cedula.substr(0, 3) != "000") {
    return (cedulaValida = true);
  }

  return cedulaValida;
}

module.exports = { validaCedula };
