cal_dias = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

cal_meses = ['Enero', 'Fabrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

cal_max_dias = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

cal_fecha = new Date();

function Calendario(mes, anho) {
  this.mes = (isNaN(mes) || mes == null) ? cal_fecha.getMonth() : mes;
  this.anho  = (isNaN(anho) || anho == null) ? cal_fecha.getFullYear() : anho;
  this.html = '';
}

Calendario.prototype.generarHTML = function(){

  var primerDia = new Date(this.anho, this.mes, 1);
  var diaInicial = primerDia.getDay();

  var mesLongitud = cal_max_dias[this.mes];

  if (this.mes == 1) {
    if((this.anho % 4 == 0 && this.anho % 100 != 0) || this.anho % 400 == 0){
      mesLongitud = 29;
    }
  }

  var mesNombre = cal_meses[this.mes]
  var html = '<table class="table table-bordered">';
  html += '<tr><th colspan="7">';
  html +=  mesNombre + "&nbsp;" + this.anho;
  html += '</th></tr>';
  html += '<tr class="calendar-header">';
  for(var i = 0; i <= 6; i++ ){
    html += '<td class="calendar-header-day">';
    html += cal_dias[i];
    html += '</td>';
  }
  html += '</tr><tr>';

  var dia = 1;

  for (var i = 0; i < 9; i++) {

    for (var j = 0; j <= 6; j++) {
      if (dia <= mesLongitud && (i > 0 || j >= diaInicial)) {
        html += '<td class="calendar-day text-center ';
        if (j == 0 || j == 6) {
          html += 'weekend';
        }
        html += '">';
      } else html += '<td class="calendar-day empty text-center">';
      if (dia <= mesLongitud && (i > 0 || j >= diaInicial)) {
        html += dia;
        dia++;
      }
      html += '</td>';
    }

    if (dia > mesLongitud) {
      break;
    } else {
      html += '</tr><tr>';
    }
  }
  html += '</tr></table>';

  this.html = html;
}

Calendario.prototype.obtenerHTML = function() {
  return this.html;
}